import React, { useState } from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { 
  X, 
  ExternalLink, 
  Copy, 
  CheckCircle2, 
  AlertCircle, 
  Globe2, 
  Smartphone, 
  Sliders, 
  Zap
} from 'lucide-react';

export const OfferDetailModal: React.FC = () => {
  const { selectedOffer, setSelectedOffer } = useDirectory();

  const [subId1, setSubId1] = useState('traffic_source');
  const [subId2, setSubId2] = useState('campaign_01');
  const [clickId, setClickId] = useState('');
  const [copied, setCopied] = useState(false);

  if (!selectedOffer) return null;

  // Construct customized tracking link with query params
  const buildTrackingUrl = () => {
    try {
      const url = new URL(selectedOffer.affiliateUrl);
      if (subId1) url.searchParams.set('sub1', subId1);
      if (subId2) url.searchParams.set('sub2', subId2);
      if (clickId) url.searchParams.set('clickid', clickId);
      return url.toString();
    } catch {
      const sep = selectedOffer.affiliateUrl.includes('?') ? '&' : '?';
      return `${selectedOffer.affiliateUrl}${sep}sub1=${encodeURIComponent(subId1)}&sub2=${encodeURIComponent(subId2)}`;
    }
  };

  const finalTrackingUrl = buildTrackingUrl();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(finalTrackingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#111A05]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#D2D9C5] bg-white p-5 sm:p-6 shadow-2xl text-[#111A05]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedOffer(null)}
          className="absolute top-4 right-4 p-2 text-[#54653D] hover:text-[#111A05] rounded-xl hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          aria-label="Close offer details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3 pr-8">
          <div className="p-2.5 rounded-2xl bg-[#111A05] text-[#B5F714] shrink-0">
            <Zap className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-[#FAF7F2] text-[#111A05] border border-[#D2D9C5]">
                {selectedOffer.network}
              </span>
              <span className="text-xs text-[#54653D] font-bold">
                {selectedOffer.category}
              </span>
              <span className="text-xs text-[#111A05] font-mono font-black flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#B5F714] border border-[#111A05]/30"></span>
                <span>Verified Direct Offer</span>
              </span>
            </div>
            <h2 className="mt-1 text-base sm:text-xl font-black text-[#111A05] leading-snug break-words">
              {selectedOffer.title}
            </h2>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#D2D9C5]">
            <span className="text-[11px] font-mono uppercase text-[#54653D] font-bold">Payout</span>
            <div className="text-base sm:text-lg font-black text-[#111A05] font-mono mt-0.5">
              {selectedOffer.payout}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#D2D9C5]">
            <span className="text-[11px] font-mono uppercase text-[#54653D] font-bold">Model</span>
            <div className="text-sm font-bold text-[#111A05] mt-0.5 truncate">
              {selectedOffer.type} ({selectedOffer.flowType || 'CPA'})
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#D2D9C5]">
            <span className="text-[11px] font-mono uppercase text-[#54653D] font-bold">Avg EPC</span>
            <div className="text-base font-bold text-[#111A05] font-mono mt-0.5">
              {selectedOffer.epc}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#D2D9C5]">
            <span className="text-[11px] font-mono uppercase text-[#54653D] font-bold">Conversion Rate</span>
            <div className="text-base font-black text-[#111A05] font-mono mt-0.5">
              {selectedOffer.cr}
            </div>
          </div>
        </div>

        {/* Description & Targeting */}
        <div className="mt-5 space-y-4 text-xs">
          <div>
            <h3 className="font-extrabold text-[#111A05] mb-1">Offer Overview</h3>
            <p className="text-[#54653D] leading-relaxed text-sm break-words font-medium">
              {selectedOffer.description}
            </p>
          </div>

          {/* GEO & Device specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#D2D9C5]">
              <span className="font-bold text-[#111A05] flex items-center gap-1 mb-1.5">
                <Globe2 className="w-3.5 h-3.5 text-[#54653D]" />
                <span>Target Countries / Supported GEOs</span>
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {selectedOffer.targetGeos.map(geo => (
                  <span key={geo} className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-white text-[#111A05] border border-[#D2D9C5]">
                    {geo}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#D2D9C5]">
              <span className="font-bold text-[#111A05] flex items-center gap-1 mb-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#54653D]" />
                <span>Device Compatibility</span>
              </span>
              <div className="text-[#111A05] font-mono font-semibold mt-1">
                {selectedOffer.device} · Fast Mobile Landers
              </div>
            </div>
          </div>

          {/* Traffic Terms & Rules */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D2D9C5] space-y-1">
            <div className="font-bold text-[#111A05] flex items-center gap-1.5 text-xs">
              <AlertCircle className="w-3.5 h-3.5 text-[#54653D]" />
              <span>Traffic Terms & Restrictions</span>
            </div>
            <p className="text-[#54653D] text-xs leading-relaxed break-words font-medium">
              {selectedOffer.terms}
            </p>
          </div>

          {/* Affiliate SubID & Tracking Parameter Generator */}
          <div className="rounded-2xl border border-[#D2D9C5] bg-[#FAF7F2] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-[#111A05] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#54653D]" />
                <span>Custom SubID Tracking Link Builder</span>
              </span>
              <span className="text-[11px] text-[#54653D] font-mono font-bold">Dynamic generator</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-[#54653D] font-bold block mb-1 font-mono">SubID 1 (Traffic Source)</label>
                <input
                  type="text"
                  value={subId1}
                  onChange={(e) => setSubId1(e.target.value)}
                  placeholder="e.g. adsterra"
                  className="w-full bg-white border border-[#D2D9C5] rounded-lg px-2.5 py-1.5 text-xs text-[#111A05] font-mono focus:outline-none focus:ring-1 focus:ring-[#B5F714]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#54653D] font-bold block mb-1 font-mono">SubID 2 (Campaign / Angle)</label>
                <input
                  type="text"
                  value={subId2}
                  onChange={(e) => setSubId2(e.target.value)}
                  placeholder="e.g. lander_v2"
                  className="w-full bg-white border border-[#D2D9C5] rounded-lg px-2.5 py-1.5 text-xs text-[#111A05] font-mono focus:outline-none focus:ring-1 focus:ring-[#B5F714]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#54653D] font-bold block mb-1 font-mono">ClickID / Postback ID</label>
                <input
                  type="text"
                  value={clickId}
                  onChange={(e) => setClickId(e.target.value)}
                  placeholder="e.g. {clickid}"
                  className="w-full bg-white border border-[#D2D9C5] rounded-lg px-2.5 py-1.5 text-xs text-[#111A05] font-mono focus:outline-none focus:ring-1 focus:ring-[#B5F714]"
                />
              </div>
            </div>

            {/* Generated URL output box */}
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={finalTrackingUrl}
                className="w-full bg-white border border-[#D2D9C5] rounded-xl px-3 py-2 text-xs text-[#111A05] font-mono font-bold select-all focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#D2D9C5] hover:bg-[#FAF7F2] text-[#111A05] flex items-center gap-1.5 text-xs font-bold shrink-0 transition-colors shadow-2xs cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#111A05]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#54653D]" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-6 pt-4 border-t border-[#D2D9C5] flex items-center justify-between gap-3">
          <button
            onClick={() => setSelectedOffer(null)}
            className="px-4 py-2 text-xs font-bold text-[#54653D] hover:text-[#111A05] rounded-xl hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          >
            Close
          </button>

          <a
            href={finalTrackingUrl}
            target="_blank"
            rel="sponsored nofollow"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B5F714] hover:bg-[#A2E20E] text-[#111A05] font-black text-xs border border-[#111A05]/20 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span>Run Offer on {selectedOffer.network}</span>
            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

      </div>
    </div>
  );
};
