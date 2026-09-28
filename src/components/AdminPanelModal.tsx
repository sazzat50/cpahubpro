import React, { useState } from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { Offer, FeaturedSponsor, AdSpace, OfferCategory, OfferType } from '../types';
import { 
  X, 
  Layers, 
  Users, 
  Megaphone, 
  FileCode2, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Copy, 
  RotateCcw, 
  ExternalLink,
  Save,
  Eye
} from 'lucide-react';

export const AdminPanelModal: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    offers, 
    addOffer, 
    updateOffer, 
    deleteOffer,
    sponsors,
    updateSponsor,
    adSpaces,
    updateAdSpace,
    toggleAdActive,
    resetAllData
  } = useDirectory();

  const [activeTab, setActiveTab] = useState<'offers' | 'sponsors' | 'ads' | 'config'>('offers');
  const [copiedConfig, setCopiedConfig] = useState(false);

  // Edit states
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
  const [offerFormData, setOfferFormData] = useState<Partial<Offer>>({});

  const [editingSponsorId, setEditingSponsorId] = useState<string | null>(null);
  const [sponsorFormData, setSponsorFormData] = useState<Partial<FeaturedSponsor>>({});

  const [isCreatingOffer, setIsCreatingOffer] = useState(false);

  if (!isAdminOpen) return null;

  // Decap CMS YAML Configuration Representation
  const decapConfigYaml = `backend:
  name: git-gateway
  branch: main

local_backend: true
media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  # 1. Offers Collection
  - name: "offers"
    label: "CPA Offers & Smartlinks"
    folder: "content/offers"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Offer Name", name: "title", widget: "string" }
      - { label: "Category", name: "category", widget: "select", options: ["Dating", "Gaming", "E-commerce", "Finance & Crypto", "Nutra & Health", "Sweepstakes", "Software & Utilities", "Smartlinks", "Surveys & Rewards"] }
      - { label: "Payout Amount", name: "payout", widget: "string" }
      - { label: "Payout Value Numeric", name: "payoutValue", widget: "number", value_type: "float" }
      - { label: "Smartlink / Affiliate URL", name: "affiliateUrl", widget: "string" }
      - { label: "Target Countries / GEOs", name: "targetGeos", widget: "list" }
      - { label: "Network Name", name: "network", widget: "string" }
      - { label: "Offer Type", name: "type", widget: "select", options: ["CPA", "CPL", "Smartlink", "RevShare", "CPI"] }
      - { label: "Description", name: "description", widget: "markdown" }

  # 2. Featured Sidebar Items (Left Section)
  - name: "featured_networks"
    label: "Featured Sponsors & Networks"
    folder: "content/sponsors"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Sponsor/Network Name", name: "name", widget: "string" }
      - { label: "Logo Image", name: "logo", widget: "image" }
      - { label: "Rating Score", name: "rating", widget: "number", value_type: "float", min: 1, max: 5 }
      - { label: "Target Link", name: "link", widget: "string" }
      - { label: "Min Payout", name: "minPayout", widget: "string" }
      - { label: "Payment Frequency", name: "paymentFrequency", widget: "string" }

  # 3. Ad Spaces & Adsterra Scripts (Right Banner Section)
  - name: "ad_spaces"
    label: "Ad Spaces & Adsterra Scripts"
    folder: "content/ads"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Ad Placement Name", name: "name", widget: "string" }
      - { label: "Ad Type", name: "adType", widget: "select", options: ["Raw HTML Script Code (Adsterra/Popads)", "Image Banner with Link"] }
      - { label: "Active Toggle", name: "active", widget: "boolean" }
      - { label: "Raw HTML / Script Code", name: "htmlCode", widget: "code" }
      - { label: "Image Banner URL", name: "imageUrl", widget: "image" }
      - { label: "Destination Target URL", name: "targetUrl", widget: "string" }`;

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(decapConfigYaml);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  // Offer handlers
  const startEditOffer = (offer: Offer) => {
    setEditingOfferId(offer.id);
    setOfferFormData({ ...offer });
    setIsCreatingOffer(false);
  };

  const handleSaveOffer = () => {
    if (editingOfferId) {
      updateOffer(offerFormData as Offer);
      setEditingOfferId(null);
    }
  };

  const handleCreateOffer = () => {
    if (!offerFormData.title || !offerFormData.payout) return;
    addOffer({
      title: offerFormData.title || 'New CPA Campaign',
      category: (offerFormData.category as OfferCategory) || 'Smartlinks',
      payout: offerFormData.payout || '$5.00 CPA',
      payoutValue: parseFloat(String(offerFormData.payoutValue)) || 5.0,
      currency: '$',
      affiliateUrl: offerFormData.affiliateUrl || 'https://affiliate.example.com',
      targetGeos: offerFormData.targetGeos || ['US', 'Global'],
      network: offerFormData.network || 'TopNetwork',
      type: (offerFormData.type as OfferType) || 'CPA',
      device: offerFormData.device || 'All Devices',
      cr: offerFormData.cr || '12.0%',
      epc: offerFormData.epc || '$0.90',
      featured: offerFormData.featured || false,
      description: offerFormData.description || 'Campaign description goes here.',
      terms: offerFormData.terms || 'Traffic terms: No incent.',
      flowType: offerFormData.flowType || 'Single Opt-in (SOI)'
    });
    setIsCreatingOffer(false);
    setOfferFormData({});
  };

  // Sponsor handlers
  const startEditSponsor = (spon: FeaturedSponsor) => {
    setEditingSponsorId(spon.id);
    setSponsorFormData({ ...spon });
  };

  const handleSaveSponsor = () => {
    if (editingSponsorId) {
      updateSponsor(sponsorFormData as FeaturedSponsor);
      setEditingSponsorId(null);
    }
  };

  const handleClose = () => {
    setIsAdminOpen(false);
    if (typeof window !== 'undefined' && window.location.hash.toLowerCase() === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#111A05]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl h-[90vh] flex flex-col rounded-3xl border border-[#D2D9C5] bg-[#F7F2EB] shadow-2xl text-[#111A05] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#D2D9C5] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#111A05] text-[#B5F714]">
              <Layers className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-[#111A05]">
                  Decap CMS & Content Management Panel
                </h2>
                <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-lg bg-[#B5F714] text-[#111A05] border border-[#111A05]/20">
                  Live Synced
                </span>
              </div>
              <p className="text-xs text-[#54653D] font-medium">
                Manage Offers, Featured Sidebar Sponsors, and Adsterra/Banner Scripts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetAllData}
              className="px-3 py-1.5 text-xs text-[#54653D] hover:text-rose-600 hover:bg-[#FAF7F2] rounded-xl transition-colors flex items-center gap-1 font-mono font-bold cursor-pointer"
              title="Reset all collections to initial seed data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
            <button
              onClick={handleClose}
              className="p-2 text-[#54653D] hover:text-[#111A05] rounded-xl hover:bg-[#FAF7F2] cursor-pointer"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-[#D2D9C5] bg-white flex gap-4 overflow-x-auto scrollbar-thin">
          <button
            onClick={() => setActiveTab('offers')}
            className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'offers'
                ? 'border-[#111A05] text-[#111A05]'
                : 'border-transparent text-[#54653D] hover:text-[#111A05]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>1. Offers Collection ({offers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sponsors')}
            className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'sponsors'
                ? 'border-[#111A05] text-[#111A05]'
                : 'border-transparent text-[#54653D] hover:text-[#111A05]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>2. Featured Sidebar Items ({sponsors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ads')}
            className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'ads'
                ? 'border-[#111A05] text-[#111A05]'
                : 'border-transparent text-[#54653D] hover:text-[#111A05]'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>3. Ad Spaces & Adsterra Scripts ({adSpaces.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'config'
                ? 'border-[#111A05] text-[#111A05]'
                : 'border-transparent text-[#54653D] hover:text-[#111A05]'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>Decap CMS config.yml</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* TAB 1: OFFERS */}
          {activeTab === 'offers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#242E1B]">Offers Collection</h3>
                  <p className="text-xs text-[#5C6E45]">Add, update, or remove CPA Offers & Smartlinks</p>
                </div>
                {!isCreatingOffer && (
                  <button
                    onClick={() => {
                      setIsCreatingOffer(true);
                      setOfferFormData({
                        title: '',
                        category: 'Smartlinks',
                        payout: '$5.00 CPA',
                        payoutValue: 5.0,
                        network: 'LosPollos',
                        affiliateUrl: 'https://smartlink.example.com',
                        targetGeos: ['US', 'UK', 'CA'],
                        type: 'CPA',
                        device: 'All Devices',
                        cr: '15.0%',
                        epc: '$0.85',
                        description: 'Top converting landing flow.',
                        terms: 'No incent traffic.',
                        flowType: 'Single Opt-in (SOI)'
                      });
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#8B9A6E] hover:bg-[#78875C] text-[#F7F2EB] text-xs font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Offer</span>
                  </button>
                )}
              </div>

              {/* Create Offer Form */}
              {isCreatingOffer && (
                <div className="p-4 rounded-xl border border-[#8B9A6E]/40 bg-white space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#8B9A6E]/20 pb-2">
                    <span className="text-xs font-bold text-[#8B9A6E]">Create New CPA Offer Entry</span>
                    <button onClick={() => setIsCreatingOffer(false)} className="text-xs text-[#5C6E45] hover:text-[#242E1B]">Cancel</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[#5C6E45] font-semibold mb-1">Offer Title</label>
                      <input
                        type="text"
                        value={offerFormData.title || ''}
                        onChange={(e) => setOfferFormData({ ...offerFormData, title: e.target.value })}
                        placeholder="e.g. FlirtFinder Global Dating Smartlink"
                        className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded p-2 text-[#242E1B] focus:outline-none focus:border-[#8B9A6E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5C6E45] font-semibold mb-1">Network Name</label>
                      <input
                        type="text"
                        value={offerFormData.network || ''}
                        onChange={(e) => setOfferFormData({ ...offerFormData, network: e.target.value })}
                        placeholder="e.g. ClickDealer"
                        className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded p-2 text-[#242E1B] focus:outline-none focus:border-[#8B9A6E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5C6E45] font-semibold mb-1">Category</label>
                      <select
                        value={offerFormData.category || 'Smartlinks'}
                        onChange={(e) => setOfferFormData({ ...offerFormData, category: e.target.value as OfferCategory })}
                        className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded p-2 text-[#242E1B] focus:outline-none focus:border-[#8B9A6E]"
                      >
                        {['Dating', 'Gaming', 'E-commerce', 'Finance & Crypto', 'Nutra & Health', 'Sweepstakes', 'Software & Utilities', 'Smartlinks', 'Surveys & Rewards'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#5C6E45] font-semibold mb-1">Payout String (e.g. $4.50 CPA)</label>
                      <input
                        type="text"
                        value={offerFormData.payout || ''}
                        onChange={(e) => setOfferFormData({ ...offerFormData, payout: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded p-2 text-[#242E1B] focus:outline-none focus:border-[#8B9A6E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5C6E45] font-semibold mb-1">Affiliate / Smartlink URL</label>
                      <input
                        type="text"
                        value={offerFormData.affiliateUrl || ''}
                        onChange={(e) => setOfferFormData({ ...offerFormData, affiliateUrl: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded p-2 text-[#242E1B] font-mono focus:outline-none focus:border-[#8B9A6E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5C6E45] font-semibold mb-1">Target GEOs (comma-separated)</label>
                      <input
                        type="text"
                        value={offerFormData.targetGeos?.join(', ') || ''}
                        onChange={(e) => setOfferFormData({ ...offerFormData, targetGeos: e.target.value.split(',').map(s => s.trim().toUpperCase()).filter(Boolean) })}
                        placeholder="US, CA, UK, AU"
                        className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded p-2 text-[#242E1B] font-mono focus:outline-none focus:border-[#8B9A6E]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[#5C6E45] font-semibold mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={offerFormData.description || ''}
                        onChange={(e) => setOfferFormData({ ...offerFormData, description: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded p-2 text-[#242E1B] focus:outline-none focus:border-[#8B9A6E]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setIsCreatingOffer(false)}
                      className="px-3 py-1.5 rounded bg-[#FAF7F2] text-[#5C6E45] text-xs font-semibold hover:bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateOffer}
                      className="px-4 py-1.5 rounded bg-[#8B9A6E] hover:bg-[#78875C] text-[#F7F2EB] font-bold text-xs"
                    >
                      Publish Offer
                    </button>
                  </div>
                </div>
              )}

              {/* Offer Listing Table in Admin */}
              <div className="space-y-2">
                {offers.map((offer) => {
                  const isEditing = editingOfferId === offer.id;
                  return (
                    <div 
                      key={offer.id}
                      className="rounded-lg border border-[#8B9A6E]/30 bg-white p-3 flex flex-col gap-2 shadow-2xs"
                    >
                      {isEditing ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div>
                              <label className="text-[#5C6E45] font-bold text-[10px]">Title</label>
                              <input
                                type="text"
                                value={offerFormData.title || ''}
                                onChange={(e) => setOfferFormData({ ...offerFormData, title: e.target.value })}
                                className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded px-2 py-1 text-[#242E1B]"
                              />
                            </div>
                            <div>
                              <label className="text-[#5C6E45] font-bold text-[10px]">Payout</label>
                              <input
                                type="text"
                                value={offerFormData.payout || ''}
                                onChange={(e) => setOfferFormData({ ...offerFormData, payout: e.target.value })}
                                className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded px-2 py-1 text-[#242E1B]"
                              />
                            </div>
                            <div>
                              <label className="text-[#5C6E45] font-bold text-[10px]">Affiliate URL</label>
                              <input
                                type="text"
                                value={offerFormData.affiliateUrl || ''}
                                onChange={(e) => setOfferFormData({ ...offerFormData, affiliateUrl: e.target.value })}
                                className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded px-2 py-1 text-[#242E1B] font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[#5C6E45] font-bold text-[10px]">GEOs (comma-separated)</label>
                              <input
                                type="text"
                                value={offerFormData.targetGeos?.join(', ') || ''}
                                onChange={(e) => setOfferFormData({ ...offerFormData, targetGeos: e.target.value.split(',').map(s => s.trim().toUpperCase()).filter(Boolean) })}
                                className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded px-2 py-1 text-[#242E1B] font-mono"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingOfferId(null)}
                              className="px-2.5 py-1 text-xs text-[#5C6E45] hover:text-[#242E1B]"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSaveOffer}
                              className="px-3 py-1 text-xs bg-[#8B9A6E] hover:bg-[#78875C] text-[#F7F2EB] rounded font-bold flex items-center gap-1"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save Changes</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-[#242E1B] truncate">
                                {offer.title}
                              </span>
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#FAF7F2] text-[#8B9A6E] border border-[#8B9A6E]/30">
                                {offer.network}
                              </span>
                              <span className="text-[10px] text-[#5C6E45] font-semibold">
                                {offer.category}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#5C6E45] font-mono mt-0.5 flex items-center gap-2">
                              <span className="text-[#8B9A6E] font-bold">{offer.payout}</span>
                              <span>·</span>
                              <span>GEOs: {offer.targetGeos.join(', ')}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => startEditOffer(offer)}
                              className="p-1.5 text-[#5C6E45] hover:text-[#8B9A6E] hover:bg-[#FAF7F2] rounded transition-colors"
                              title="Edit offer"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteOffer(offer.id)}
                              className="p-1.5 text-[#5C6E45] hover:text-rose-600 hover:bg-[#FAF7F2] rounded transition-colors"
                              title="Delete offer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: FEATURED SPONSORS (LEFT SIDEBAR) */}
          {activeTab === 'sponsors' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#242E1B]">Featured Sidebar Items (Left Section)</h3>
                <p className="text-xs text-[#5C6E45]">
                  Update CPA Network sponsors, logo images, rating score, and direct affiliate links.
                </p>
              </div>

              <div className="space-y-3">
                {sponsors.map((sponsor) => {
                  const isEditing = editingSponsorId === sponsor.id;
                  return (
                    <div 
                      key={sponsor.id}
                      className="rounded-lg border border-[#8B9A6E]/30 bg-white p-3.5 space-y-2 shadow-2xs"
                    >
                      {isEditing ? (
                        <div className="space-y-3 text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[#5C6E45] font-bold block mb-1">Sponsor/Network Name</label>
                              <input
                                type="text"
                                value={sponsorFormData.name || ''}
                                onChange={(e) => setSponsorFormData({ ...sponsorFormData, name: e.target.value })}
                                className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded px-2.5 py-1.5 text-[#242E1B]"
                              />
                            </div>
                            <div>
                              <label className="text-[#5C6E45] font-bold block mb-1">Rating Score (1.0 - 5.0)</label>
                              <input
                                type="number"
                                step="0.1"
                                min="1"
                                max="5"
                                value={sponsorFormData.rating ?? 4.9}
                                onChange={(e) => setSponsorFormData({ ...sponsorFormData, rating: parseFloat(e.target.value) })}
                                className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded px-2.5 py-1.5 text-[#242E1B] font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[#5C6E45] font-bold block mb-1">Target Link URL</label>
                              <input
                                type="text"
                                value={sponsorFormData.link || ''}
                                onChange={(e) => setSponsorFormData({ ...sponsorFormData, link: e.target.value })}
                                className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded px-2.5 py-1.5 text-[#242E1B] font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[#5C6E45] font-bold block mb-1">Logo Image URL</label>
                              <input
                                type="text"
                                value={sponsorFormData.logo || ''}
                                onChange={(e) => setSponsorFormData({ ...sponsorFormData, logo: e.target.value })}
                                className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded px-2.5 py-1.5 text-[#242E1B] font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[#5C6E45] font-bold block mb-1">Tagline</label>
                              <input
                                type="text"
                                value={sponsorFormData.tagline || ''}
                                onChange={(e) => setSponsorFormData({ ...sponsorFormData, tagline: e.target.value })}
                                className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded px-2.5 py-1.5 text-[#242E1B]"
                              />
                            </div>
                            <div>
                              <label className="text-[#5C6E45] font-bold block mb-1">Min Payout / Terms</label>
                              <input
                                type="text"
                                value={sponsorFormData.minPayout || ''}
                                onChange={(e) => setSponsorFormData({ ...sponsorFormData, minPayout: e.target.value })}
                                className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded px-2.5 py-1.5 text-[#242E1B]"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-2">
                            <button
                              onClick={() => setEditingSponsorId(null)}
                              className="px-3 py-1 rounded bg-[#FAF7F2] text-[#5C6E45] hover:text-[#242E1B]"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSaveSponsor}
                              className="px-3.5 py-1 rounded bg-[#8B9A6E] hover:bg-[#78875C] text-[#F7F2EB] font-bold flex items-center gap-1"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save Sponsor</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded bg-[#FAF7F2] border border-[#8B9A6E]/30 flex items-center justify-center font-bold text-[#8B9A6E] text-xs shrink-0 overflow-hidden">
                              {sponsor.logo ? (
                                <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-cover" />
                              ) : sponsor.name.slice(0, 2)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-[#242E1B]">{sponsor.name}</span>
                                <span className="font-mono text-xs text-[#242E1B] bg-[#8B9A6E]/15 px-1.5 py-0.2 rounded border border-[#8B9A6E]/30 font-bold">
                                  ★ {sponsor.rating.toFixed(1)}
                                </span>
                              </div>
                              <div className="text-[11px] text-[#5C6E45]">
                                {sponsor.tagline} · Min {sponsor.minPayout} ({sponsor.paymentFrequency})
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={sponsor.link}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-[#5C6E45] hover:text-[#242E1B]"
                              title="Visit link"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => startEditSponsor(sponsor)}
                              className="p-1.5 text-[#5C6E45] hover:text-[#8B9A6E] hover:bg-[#FAF7F2] rounded transition-colors"
                              title="Edit sponsor details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: AD SPACES & ADSTERRA SCRIPTS */}
          {activeTab === 'ads' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#242E1B]">Ad Spaces & Adsterra Scripts (Right Banner Section)</h3>
                <p className="text-xs text-[#5C6E45]">
                  Inject raw HTML/Script code (Adsterra, Popads, Google AdSense) or image banners with active toggles.
                </p>
              </div>

              <div className="space-y-4">
                {adSpaces.map((ad) => (
                  <div 
                    key={ad.id}
                    className="rounded-xl border border-[#8B9A6E]/30 bg-white p-4 space-y-4 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#8B9A6E]/20">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#242E1B]">{ad.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF7F2] text-[#5C6E45] font-bold">
                            Key: {ad.key}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#5C6E45]">
                          Current Type: <strong className="text-[#8B9A6E]">{ad.adType}</strong>
                        </span>
                      </div>

                      {/* Active Toggle */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#5C6E45] font-semibold">Status:</span>
                        <button
                          onClick={() => toggleAdActive(ad.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                            ad.active 
                              ? 'bg-[#8B9A6E] text-[#F7F2EB]'
                              : 'bg-[#FAF7F2] text-[#5C6E45] border border-[#8B9A6E]/30'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${ad.active ? 'bg-[#F7F2EB]' : 'bg-[#5C6E45]'}`} />
                          <span>{ad.active ? 'Active (Displaying)' : 'Disabled (Hidden)'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Ad Type Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-[#5C6E45] font-bold block mb-1">Select Ad Type</label>
                        <select
                          value={ad.adType}
                          onChange={(e) => updateAdSpace({ ...ad, adType: e.target.value as AdSpace['adType'] })}
                          className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded px-3 py-2 text-[#242E1B]"
                        >
                          <option value="Raw HTML Script Code (Adsterra/Popads)">Raw HTML Script Code (Adsterra/Popads)</option>
                          <option value="Image Banner with Link">Image Banner with Link</option>
                        </select>
                      </div>

                      {ad.adType === 'Image Banner with Link' ? (
                        <>
                          <div>
                            <label className="text-[#5C6E45] font-bold block mb-1">Destination Target URL</label>
                            <input
                              type="text"
                              value={ad.targetUrl || ''}
                              onChange={(e) => updateAdSpace({ ...ad, targetUrl: e.target.value })}
                              placeholder="https://adsterra.com/?ref=..."
                              className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded px-3 py-2 text-[#242E1B] font-mono"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-[#5C6E45] font-bold block mb-1">Image Banner URL / Asset Path</label>
                            <input
                              type="text"
                              value={ad.imageUrl || ''}
                              onChange={(e) => updateAdSpace({ ...ad, imageUrl: e.target.value })}
                              placeholder="/src/assets/images/warm_sage_banner_h_..."
                              className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded px-3 py-2 text-[#242E1B] font-mono"
                            />
                          </div>
                        </>
                      ) : (
                        <div className="sm:col-span-2">
                          <label className="text-[#5C6E45] font-bold block mb-1">
                            Raw HTML / Script Code (Adsterra, Popads, JavaScript or iFrame)
                          </label>
                          <textarea
                            rows={5}
                            value={ad.htmlCode || ''}
                            onChange={(e) => updateAdSpace({ ...ad, htmlCode: e.target.value })}
                            placeholder="<!-- Paste your Adsterra script tag or HTML banner here -->"
                            className="w-full bg-[#FAF7F2] border border-[#8B9A6E]/30 rounded p-2.5 text-xs text-[#242E1B] font-mono"
                          />
                        </div>
                      )}
                    </div>

                    {/* Quick Live Preview Box */}
                    <div className="rounded-lg border border-[#8B9A6E]/20 bg-[#FAF7F2] p-3 overflow-hidden">
                      <div className="flex items-center gap-1.5 text-[#5C6E45] text-[11px] mb-2 font-mono font-bold">
                        <Eye className="w-3.5 h-3.5 text-[#8B9A6E]" />
                        <span>Live Sandbox Render Preview:</span>
                      </div>
                      {ad.adType === 'Image Banner with Link' && ad.imageUrl ? (
                        <img 
                          src={ad.imageUrl} 
                          alt="Banner Preview" 
                          referrerPolicy="no-referrer"
                          className="max-h-24 w-auto rounded border border-[#8B9A6E]/30"
                        />
                      ) : (
                        <div 
                          className="text-xs text-[#242E1B]"
                          dangerouslySetInnerHTML={{ __html: ad.htmlCode || '<em>No HTML Code provided yet.</em>' }}
                        />
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DECAP CMS CONFIG & SETUP GUIDE */}
          {activeTab === 'config' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#242E1B]">Decap CMS Configuration (/public/admin/config.yml)</h3>
                  <p className="text-xs text-[#5C6E45]">
                    Pre-configured for Netlify Git Gateway with 3 collections: Offers, Featured Sidebar Sponsors, and Ad Spaces.
                  </p>
                </div>
                <button
                  onClick={handleCopyConfig}
                  className="px-3 py-1.5 rounded-lg bg-[#8B9A6E] hover:bg-[#78875C] text-[#F7F2EB] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  {copiedConfig ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedConfig ? 'Copied YAML!' : 'Copy config.yml'}</span>
                </button>
              </div>

              {/* Netlify Deployment Steps */}
              <div className="p-4 rounded-xl border border-[#8B9A6E]/30 bg-white text-xs text-[#242E1B] space-y-2 shadow-xs">
                <span className="font-bold text-[#8B9A6E] block">How to Deploy Decap CMS on Netlify:</span>
                <ol className="list-decimal pl-4 space-y-1 text-[#4A5936]">
                  <li>Push this repository to GitHub or GitLab.</li>
                  <li>Link your repository to Netlify.</li>
                  <li>In Netlify Site Settings &rarr; Identity, enable <strong>Netlify Identity</strong> and configure Git Gateway.</li>
                  <li>Visit <code className="text-[#8B9A6E] font-mono font-bold">yoursite.com/admin/</code> to log in with your Netlify credentials and manage offers, sponsors, and ads directly from the Decap UI.</li>
                </ol>
              </div>

              {/* Code block preview */}
              <div className="relative rounded-xl border border-[#8B9A6E]/30 bg-[#242E1B] p-4 font-mono text-xs text-[#F7F2EB] overflow-x-auto max-h-96">
                <pre>{decapConfigYaml}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#8B9A6E]/30 bg-white flex items-center justify-between text-xs">
          <div className="text-[#5C6E45] font-mono font-semibold">
            Decap CMS v3.0 Compatible · Netlify Git Gateway
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-[#8B9A6E] hover:bg-[#78875C] text-[#F7F2EB] font-bold"
          >
            Save & Exit Admin
          </button>
        </div>

      </div>
    </div>
  );
};
