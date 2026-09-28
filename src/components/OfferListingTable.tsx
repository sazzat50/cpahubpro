import React, { useState, useMemo } from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { Offer, OfferCategory, OfferType, FilterState } from '../types';
import { 
  ExternalLink, 
  Smartphone, 
  Laptop, 
  Globe, 
  ArrowUpDown, 
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid,
  Info,
  CheckCircle2,
  Copy,
  Zap
} from 'lucide-react';

const CATEGORIES: OfferCategory[] = [
  'All',
  'Smartlinks',
  'Dating',
  'Finance & Crypto',
  'Gaming',
  'Nutra & Health',
  'Sweepstakes',
  'Software & Utilities',
  'E-commerce',
  'Surveys & Rewards'
];

const POPULAR_GEOS = [
  'All',
  'US',
  'CA',
  'UK',
  'AU',
  'DE',
  'FR',
  'Global'
];

const PAYOUT_TYPES: OfferType[] = ['All', 'CPA', 'CPL', 'Smartlink', 'RevShare', 'CPI'];

export const OfferListingTable: React.FC = () => {
  const { 
    offers, 
    filters, 
    setCategory, 
    setGeo, 
    setType, 
    setSortBy, 
    resetFilters,
    setSelectedOffer 
  } = useDirectory();

  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter & sort offers
  const filteredOffers = useMemo(() => {
    return offers
      .filter((offer) => {
        // Search filter
        if (filters.searchQuery) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = offer.title.toLowerCase().includes(q);
          const matchDesc = offer.description.toLowerCase().includes(q);
          const matchNetwork = offer.network.toLowerCase().includes(q);
          const matchCategory = offer.category.toLowerCase().includes(q);
          const matchGeo = offer.targetGeos.some(g => g.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchNetwork && !matchCategory && !matchGeo) {
            return false;
          }
        }

        // Category filter
        if (filters.category !== 'All' && offer.category !== filters.category) {
          return false;
        }

        // GEO filter
        if (filters.geo !== 'All') {
          const matchGeo = offer.targetGeos.some(g => 
            g.toUpperCase() === filters.geo.toUpperCase() || g.toLowerCase() === 'global'
          );
          if (!matchGeo) return false;
        }

        // Type filter
        if (filters.type !== 'All' && offer.type !== filters.type) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'payout-desc') {
          return b.payoutValue - a.payoutValue;
        }
        if (filters.sortBy === 'payout-asc') {
          return a.payoutValue - b.payoutValue;
        }
        if (filters.sortBy === 'epc-desc') {
          const epcA = parseFloat(a.epc.replace('$', '')) || 0;
          const epcB = parseFloat(b.epc.replace('$', '')) || 0;
          return epcB - epcA;
        }
        if (filters.sortBy === 'cr-desc') {
          const crA = parseFloat(a.cr.replace('%', '')) || 0;
          const crB = parseFloat(b.cr.replace('%', '')) || 0;
          return crB - crA;
        }
        // default newest
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      });
  }, [offers, filters]);

  const handleCopyLink = (e: React.MouseEvent, offer: Offer) => {
    e.stopPropagation();
    navigator.clipboard.writeText(offer.affiliateUrl);
    setCopiedId(offer.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getDeviceIcon = (device: Offer['device']) => {
    if (device === 'Mobile Only') return <span title="Mobile Only"><Smartphone className="w-3.5 h-3.5 text-[#54653D]" /></span>;
    if (device === 'Desktop Only') return <span title="Desktop Only"><Laptop className="w-3.5 h-3.5 text-[#54653D]" /></span>;
    return <span title="All Devices"><Globe className="w-3.5 h-3.5 text-[#54653D]" /></span>;
  };

  return (
    <div className="w-full min-w-0 max-w-full space-y-4">

      {/* Filter Bar & Controls */}
      <div className="w-full max-w-full rounded-2xl border border-[#D2D9C5] bg-white p-4 sm:p-5 shadow-xs space-y-4">
        
        {/* Category Horizontal Filter Tabs */}
        <div className="w-full min-w-0">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-black text-[#111A05] uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#54653D]" />
              <span>Browse Offer Verticals</span>
            </span>
            <span className="text-xs font-mono text-[#54653D] font-bold">
              {filteredOffers.length} {filteredOffers.length === 1 ? 'Campaign' : 'Campaigns'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = filters.category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#111A05] text-[#B5F714] shadow-xs'
                      : 'bg-[#FAF7F2] text-[#54653D] hover:bg-[#EFE9DE] hover:text-[#111A05] border border-[#D2D9C5]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filter Row: GEOs, Flow Types, Sort & View Mode */}
        <div className="pt-3 border-t border-[#D2D9C5] flex flex-wrap items-center justify-between gap-3">
          
          {/* Quick GEO Chips */}
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="text-xs font-bold text-[#54653D] font-mono mr-1 shrink-0">GEO:</span>
            {POPULAR_GEOS.map((geo) => (
              <button
                key={geo}
                onClick={() => setGeo(geo)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors shrink-0 cursor-pointer ${
                  filters.geo === geo
                    ? 'bg-[#B5F714] text-[#111A05] border border-[#111A05]/30'
                    : 'bg-[#FAF7F2] text-[#54653D] hover:text-[#111A05] border border-[#D2D9C5]'
                }`}
              >
                {geo}
              </button>
            ))}
          </div>

          {/* Controls: Type, Sort, View Toggle */}
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* Offer Type Dropdown */}
            <select
              value={filters.type}
              onChange={(e) => setType(e.target.value as OfferType)}
              className="bg-[#FAF7F2] border border-[#D2D9C5] text-[#111A05] rounded-xl px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#B5F714]"
            >
              {PAYOUT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All Models (CPA/CPL)' : t}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => setSortBy(e.target.value as FilterState['sortBy'])}
                className="bg-[#FAF7F2] border border-[#D2D9C5] text-[#111A05] rounded-xl pl-2.5 pr-7 py-1.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#B5F714] appearance-none"
              >
                <option value="newest">Sort: Newest</option>
                <option value="payout-desc">Highest Payout</option>
                <option value="payout-asc">Lowest Payout</option>
                <option value="epc-desc">Highest EPC</option>
                <option value="cr-desc">Highest CR %</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-[#54653D] absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#FAF7F2] rounded-xl border border-[#D2D9C5] p-0.5">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-[#111A05] text-[#B5F714]' : 'text-[#54653D] hover:text-[#111A05]'
                }`}
                title="Table view"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'cards' ? 'bg-[#111A05] text-[#B5F714]' : 'text-[#54653D] hover:text-[#111A05]'
                }`}
                title="Card grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Main Table / Cards View */}
      {filteredOffers.length === 0 ? (
        <div className="rounded-2xl border border-[#D2D9C5] bg-white p-12 text-center shadow-xs">
          <div className="inline-flex p-3 rounded-2xl bg-[#FAF7F2] text-[#54653D] mb-3 border border-[#D2D9C5]">
            <Info className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#111A05]">No CPA Offers Match Your Filter</h3>
          <p className="text-xs text-[#54653D] mt-1 max-w-md mx-auto">
            Try resetting your GEO or category filter, or type a different search keyword.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-[#B5F714] hover:bg-[#A2E20E] text-xs font-bold text-[#111A05] border border-[#111A05]/20 shadow-xs cursor-pointer"
          >
            Show All CPA Offers
          </button>
        </div>
      ) : viewMode === 'table' ? (
        
        /* TABLE VIEW - Fixed Layout & Overflow Protected with overflow-x-auto */
        <div className="w-full max-w-full overflow-hidden rounded-2xl border border-[#D2D9C5] bg-white shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-[#D2D9C5] bg-[#FAF7F2] text-[11px] font-bold text-[#54653D] uppercase tracking-wider font-mono">
                  <th className="py-3.5 px-4 w-[34%]">Offer Title</th>
                  <th className="py-3.5 px-3 w-[14%]">Network Badge</th>
                  <th className="py-3.5 px-3 w-[13%]">Category Badge</th>
                  <th className="py-3.5 px-3 w-[13%]">Supported GEOs</th>
                  <th className="py-3.5 px-3 text-right w-[11%]">Metrics</th>
                  <th className="py-3.5 px-4 text-right w-[15%]">Payout</th>
                  <th className="py-3.5 px-4 text-center shrink-0">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D2D9C5] text-sm">
                {filteredOffers.map((offer) => (
                  <tr
                    key={offer.id}
                    onClick={() => setSelectedOffer(offer)}
                    className="hover:bg-[#FAF7F2]/80 transition-colors cursor-pointer group"
                  >
                    
                    {/* Offer Title & Meta */}
                    <td className="py-3.5 px-4 max-w-[260px] sm:max-w-xs break-words">
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-[#FAF7F2] border border-[#D2D9C5]">
                          {getDeviceIcon(offer.device)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-extrabold text-[#111A05] group-hover:text-black transition-colors leading-snug break-words">
                            <span>{offer.title}</span>
                            {offer.featured && (
                              <span className="ml-1.5 inline-block text-[10px] font-mono text-[#111A05] bg-[#B5F714] border border-[#111A05]/20 px-1.5 py-0.2 rounded font-black">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1 text-xs text-[#54653D] truncate font-medium">
                            <span>{offer.type}</span>
                            <span aria-hidden="true">·</span>
                            <span className="truncate">{offer.flowType || 'Direct URL'}</span>
                            <span aria-hidden="true" className="hidden sm:inline">·</span>
                            <span className="hidden sm:inline">{offer.device}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Network Badge */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-[#FAF7F2] text-[#111A05] border border-[#D2D9C5] font-mono truncate max-w-[120px]">
                        {offer.network}
                      </span>
                    </td>

                    {/* Category Badge */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs text-[#54653D] bg-[#EFE9DE] border border-[#D2D9C5] font-semibold">
                        {offer.category}
                      </span>
                    </td>

                    {/* Supported GEOs */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1 flex-wrap max-w-[130px]">
                        {offer.targetGeos.slice(0, 3).map((geo) => (
                          <span 
                            key={geo}
                            className="px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#FAF7F2] text-[#111A05] border border-[#D2D9C5]"
                          >
                            {geo}
                          </span>
                        ))}
                        {offer.targetGeos.length > 3 && (
                          <span className="text-[11px] text-[#54653D] font-mono font-bold">
                            +{offer.targetGeos.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Metrics (EPC / CR) */}
                    <td className="py-3.5 px-3 text-right whitespace-nowrap font-mono text-xs">
                      <div className="text-[#111A05] font-bold">{offer.epc} <span className="text-[10px] text-[#54653D] font-normal">EPC</span></div>
                      <div className="text-[#54653D] text-[11px] font-bold">{offer.cr} <span className="text-[10px] text-[#54653D] font-normal">CR</span></div>
                    </td>

                    {/* Payout */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap font-mono">
                      <div className="text-sm sm:text-base font-black text-[#111A05]">
                        {offer.payout}
                      </div>
                    </td>

                    {/* Action Button: Run Offer / Get Link (Lime Green CTA #B5F714 with Dark Text) */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap shrink-0" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        <a
                          href={offer.affiliateUrl}
                          target="_blank"
                          rel="sponsored nofollow"
                          className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-[#B5F714] hover:bg-[#A2E20E] text-[#111A05] border border-[#111A05]/20 shadow-xs active:scale-95 transition-all cursor-pointer"
                          title="Open affiliate landing page in new tab"
                        >
                          <span>Run Offer</span>
                          <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                        </a>

                        <button
                          onClick={(e) => handleCopyLink(e, offer)}
                          className="p-1.5 rounded-lg border border-[#D2D9C5] bg-[#FAF7F2] text-[#54653D] hover:text-[#111A05] hover:bg-white transition-colors cursor-pointer"
                          title="Copy tracking affiliate link"
                        >
                          {copiedId === offer.id ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#111A05]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (

        /* CARD GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              onClick={() => setSelectedOffer(offer)}
              className="rounded-2xl border border-[#D2D9C5] bg-white p-4 hover:border-[#111A05]/40 transition-all cursor-pointer group flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-[#FAF7F2] text-[#111A05] border border-[#D2D9C5] font-mono truncate max-w-[150px]">
                    {offer.network}
                  </span>
                  <div className="font-mono text-base font-black text-[#111A05]">
                    {offer.payout}
                  </div>
                </div>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111A05] group-hover:text-black transition-colors line-clamp-2 break-words">
                  {offer.title}
                </h3>

                <p className="mt-1 text-xs text-[#54653D] line-clamp-2 break-words">
                  {offer.description}
                </p>

                {/* Tags & GEOs */}
                <div className="mt-3 flex items-center justify-between text-xs border-t border-[#D2D9C5] pt-2 font-mono">
                  <span className="text-[#54653D] font-bold">{offer.category}</span>
                  <div className="flex items-center gap-1">
                    {offer.targetGeos.slice(0, 3).map(g => (
                      <span key={g} className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FAF7F2] text-[#111A05] border border-[#D2D9C5]">
                        {g}
                      </span>
                    ))}
                    {offer.targetGeos.length > 3 && (
                      <span className="text-[10px] text-[#54653D] font-bold">+{offer.targetGeos.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-4 pt-2.5 border-t border-[#D2D9C5] flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                <div className="text-[11px] font-mono text-[#54653D]">
                  CR: <span className="text-[#111A05] font-bold">{offer.cr}</span> · EPC: <span className="text-[#111A05] font-bold">{offer.epc}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => handleCopyLink(e, offer)}
                    className="p-1.5 rounded-lg border border-[#D2D9C5] bg-[#FAF7F2] text-[#54653D] hover:text-[#111A05] cursor-pointer"
                    title="Copy tracking link"
                  >
                    {copiedId === offer.id ? <CheckCircle2 className="w-3.5 h-3.5 text-[#111A05]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <a
                    href={offer.affiliateUrl}
                    target="_blank"
                    rel="sponsored nofollow"
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-[#B5F714] hover:bg-[#A2E20E] text-[#111A05] border border-[#111A05]/20 shadow-xs cursor-pointer"
                  >
                    <span>Run Offer</span>
                    <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Directory Disclaimer & Sponsored tag notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-[#54653D] font-mono pt-2">
        <span>* All affiliate links tagged with rel="sponsored nofollow" per FTC & search compliance.</span>
        <span>Tracking IDs auto-generated</span>
      </div>

    </div>
  );
};
