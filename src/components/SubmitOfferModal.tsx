import React, { useState } from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { X, PlusCircle, CheckCircle2 } from 'lucide-react';
import { OfferCategory, OfferType } from '../types';

export const SubmitOfferModal: React.FC = () => {
  const { isSubmitModalOpen, setIsSubmitModalOpen, addOffer } = useDirectory();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    network: '',
    category: 'Smartlinks' as OfferCategory,
    payout: '',
    affiliateUrl: '',
    targetGeos: 'US, UK, CA, Global',
    type: 'CPA' as OfferType,
    description: '',
    terms: 'No incent. Search, Native, Social allowed.',
    contactEmail: ''
  });

  if (!isSubmitModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.payout) return;

    addOffer({
      title: formData.title,
      category: formData.category,
      payout: formData.payout,
      payoutValue: parseFloat(formData.payout.replace(/[^0-9.]/g, '')) || 10,
      currency: '$',
      affiliateUrl: formData.affiliateUrl || 'https://example.com/offer',
      targetGeos: formData.targetGeos.split(',').map(s => s.trim().toUpperCase()).filter(Boolean),
      network: formData.network || 'Independent Partner',
      type: formData.type,
      device: 'All Devices',
      cr: '14.5%',
      epc: '$1.10',
      featured: true,
      description: formData.description || 'Newly listed verified campaign in CPAHub Directory.',
      terms: formData.terms,
      flowType: 'Single Opt-in (SOI)'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsSubmitModalOpen(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#111A05]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl rounded-3xl border border-[#D2D9C5] bg-white p-5 sm:p-6 shadow-2xl text-[#111A05]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsSubmitModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-[#54653D] hover:text-[#111A05] rounded-xl hover:bg-[#FAF7F2] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-[#B5F714] text-[#111A05] border border-[#111A05]/20">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-black text-[#111A05]">Offer Submitted Successfully!</h3>
            <p className="text-xs text-[#54653D] max-w-sm mx-auto font-medium">
              Your campaign has been added to the directory and queued for verification.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#111A05] text-[#B5F714]">
                <PlusCircle className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-lg font-black text-[#111A05]">Submit Offer or Smartlink</h2>
                <p className="text-xs text-[#54653D] font-medium">
                  Promote your CPA campaign to thousands of high-volume media buyers and publishers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="sm:col-span-2">
                <label className="text-[#54653D] font-bold block mb-1">Campaign / Offer Name *</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. UltraVPN Global Mobile App Install"
                  className="w-full bg-[#FAF7F2] border border-[#D2D9C5] rounded-xl p-2.5 text-[#111A05] focus:outline-none focus:ring-1 focus:ring-[#B5F714]"
                />
              </div>

              <div>
                <label className="text-[#54653D] font-bold block mb-1">Network / Brand Name</label>
                <input
                  type="text"
                  value={formData.network}
                  onChange={(e) => setFormData({ ...formData, network: e.target.value })}
                  placeholder="e.g. LosPollos / ClickDealer"
                  className="w-full bg-[#FAF7F2] border border-[#D2D9C5] rounded-xl p-2.5 text-[#111A05] focus:outline-none focus:ring-1 focus:ring-[#B5F714]"
                />
              </div>

              <div>
                <label className="text-[#54653D] font-bold block mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as OfferCategory })}
                  className="w-full bg-[#FAF7F2] border border-[#D2D9C5] rounded-xl p-2.5 text-[#111A05] focus:outline-none focus:ring-1 focus:ring-[#B5F714]"
                >
                  {['Smartlinks', 'Dating', 'Finance & Crypto', 'Gaming', 'Nutra & Health', 'Sweepstakes', 'Software & Utilities', 'E-commerce', 'Surveys & Rewards'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[#54653D] font-bold block mb-1">Payout Amount (e.g. $6.50 CPA) *</label>
                <input
                  required
                  type="text"
                  value={formData.payout}
                  onChange={(e) => setFormData({ ...formData, payout: e.target.value })}
                  placeholder="$14.00 CPA"
                  className="w-full bg-[#FAF7F2] border border-[#D2D9C5] rounded-xl p-2.5 text-[#111A05] focus:outline-none focus:ring-1 focus:ring-[#B5F714]"
                />
              </div>

              <div>
                <label className="text-[#54653D] font-bold block mb-1">Supported GEOs (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.targetGeos}
                  onChange={(e) => setFormData({ ...formData, targetGeos: e.target.value })}
                  placeholder="US, CA, UK, AU"
                  className="w-full bg-[#FAF7F2] border border-[#D2D9C5] rounded-xl p-2.5 text-[#111A05] font-mono focus:outline-none focus:ring-1 focus:ring-[#B5F714]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[#54653D] font-bold block mb-1">Affiliate Landing Page / Tracking URL</label>
                <input
                  type="url"
                  value={formData.affiliateUrl}
                  onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
                  placeholder="https://network.example.com/click?offer_id=..."
                  className="w-full bg-[#FAF7F2] border border-[#D2D9C5] rounded-xl p-2.5 text-[#111A05] font-mono focus:outline-none focus:ring-1 focus:ring-[#B5F714]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[#54653D] font-bold block mb-1">Offer Description & Angles</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe conversion requirements, prelander recommendations, etc."
                  className="w-full bg-[#FAF7F2] border border-[#D2D9C5] rounded-xl p-2.5 text-[#111A05] focus:outline-none focus:ring-1 focus:ring-[#B5F714]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#FAF7F2] text-[#54653D] hover:text-[#111A05] text-xs font-bold border border-[#D2D9C5] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#B5F714] hover:bg-[#A2E20E] text-[#111A05] font-black text-xs border border-[#111A05]/20 shadow-xs cursor-pointer active:scale-95 transition-all"
              >
                Submit Campaign to Directory
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
