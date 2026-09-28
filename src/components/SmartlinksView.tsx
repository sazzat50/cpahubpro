import React from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { Zap, Globe, Cpu, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';

export const SmartlinksView: React.FC = () => {
  const { offers, setCategory, setActiveTab, setSelectedOffer } = useDirectory();

  const smartlinkOffers = offers.filter(o => o.type === 'Smartlink' || o.category === 'Smartlinks');

  return (
    <div className="space-y-6">
      
      {/* Smartlink Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-[#D2D9C5] bg-white p-6 sm:p-8 shadow-xs">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#EFE9DE] border border-[#D2D9C5] text-[#111A05] text-xs font-mono font-bold">
            <Zap className="w-3.5 h-3.5 fill-[#B5F714] text-[#111A05]" />
            <span>AI Dynamic Traffic Optimization</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111A05]">
            Top CPA Smartlinks Directory
          </h1>
          <p className="text-sm text-[#54653D] leading-relaxed font-medium">
            Auto-route global remnant traffic, popunder, and push notifications to the highest-converting offer walls in real time. 0% click loss across 220+ countries.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setCategory('Smartlinks');
                setActiveTab('offers');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#B5F714] hover:bg-[#A2E20E] text-[#111A05] font-black text-xs border border-[#111A05]/20 shadow-xs flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <span>Explore All Smartlinks in Main Table</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Pillars of CPA Smartlink Tech */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-[#D2D9C5] bg-white space-y-2 shadow-xs">
          <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#D2D9C5] w-fit text-[#111A05]">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-[#111A05]">1. Instant GEO & ISP Detection</h3>
          <p className="text-xs text-[#54653D] leading-relaxed font-medium">
            Visitors are automatically fingerprinted by Country, Carrier (3G/4G/5G/WiFi), OS, and language to receive 100% localized landers.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-[#D2D9C5] bg-white space-y-2 shadow-xs">
          <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#D2D9C5] w-fit text-[#111A05]">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-[#111A05]">2. Algorithmic Yield Optimization</h3>
          <p className="text-xs text-[#54653D] leading-relaxed font-medium">
            Smartlink engines rotate 5,000+ live affiliate offers continuously, pushing highest volume to the offers generating the top EPC that hour.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-[#D2D9C5] bg-white space-y-2 shadow-xs">
          <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#D2D9C5] w-fit text-[#111A05]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-[#111A05]">3. Built-In Bot & Proxy Shields</h3>
          <p className="text-xs text-[#54653D] leading-relaxed font-medium">
            Suspicious data center IPs and crawler traffic are scrubbed so your affiliate account maintains pristine conversion ratios and clean advertiser feedback.
          </p>
        </div>
      </div>

      {/* Featured Smartlink Listings */}
      <div className="space-y-3">
        <h2 className="text-xs font-black text-[#111A05] uppercase tracking-wider font-mono">
          Highest Converting Verified Smartlinks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {smartlinkOffers.map((smartlink) => (
            <div 
              key={smartlink.id}
              className="rounded-2xl border border-[#D2D9C5] bg-white p-5 hover:border-[#111A05]/40 transition-all space-y-4 shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-[#FAF7F2] text-[#111A05] border border-[#D2D9C5]">
                    {smartlink.network}
                  </span>
                  <h3 className="mt-2 text-base font-extrabold text-[#111A05] break-words">
                    {smartlink.title}
                  </h3>
                </div>
                <div className="text-right font-mono shrink-0">
                  <div className="text-base font-black text-[#111A05]">{smartlink.payout}</div>
                  <div className="text-xs text-[#54653D] font-bold">CR: {smartlink.cr}</div>
                </div>
              </div>

              <p className="text-xs text-[#54653D] leading-relaxed break-words font-medium">
                {smartlink.description}
              </p>

              <div className="pt-2 border-t border-[#D2D9C5] flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1 font-mono text-[#54653D]">
                  <span>GEOs:</span>
                  <span className="text-[#111A05] font-bold">{smartlink.targetGeos.join(', ')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedOffer(smartlink)}
                    className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] text-[#54653D] hover:text-[#111A05] border border-[#D2D9C5] font-bold cursor-pointer"
                  >
                    View Details
                  </button>

                  <a
                    href={smartlink.affiliateUrl}
                    target="_blank"
                    rel="sponsored nofollow"
                    className="px-4 py-1.5 rounded-xl bg-[#B5F714] text-[#111A05] font-black flex items-center gap-1 hover:bg-[#A2E20E] border border-[#111A05]/20 shadow-xs cursor-pointer active:scale-95 transition-all"
                  >
                    <span>Run Smartlink</span>
                    <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
