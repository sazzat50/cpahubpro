import React from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { 
  Star, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight, 
  Filter
} from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  const { sponsors, setSearchQuery, setIsSubmitModalOpen, adSpaces } = useDirectory();

  // Sort sponsors by order
  const sortedSponsors = [...sponsors].sort((a, b) => a.order - b.order);

  // Check if sidebar ad is active
  const sidebarAd = adSpaces.find(a => a.key === 'sidebar_ad');

  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-5 min-w-0 max-w-full">
      
      {/* Featured Sponsors Header Box */}
      <div className="rounded-2xl border border-[#D2D9C5] bg-white p-4 shadow-xs">
        <div className="pb-3 border-b border-[#D2D9C5]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-2 rounded-xl bg-[#EFE9DE] text-[#111A05] border border-[#D2D9C5] shrink-0">
              <Zap className="w-4 h-4 fill-[#B5F714] text-[#111A05]" />
            </span>
            <div className="min-w-0">
              <h2 className="text-xs font-black text-[#111A05] uppercase tracking-wider truncate">
                FEATURED NETWORKS
              </h2>
              <p className="text-[11px] text-[#54653D] font-medium truncate">
                Verified CPA & Smartlink Sponsors
              </p>
            </div>
          </div>
        </div>

        {/* Sponsor List */}
        <div className="mt-3.5 space-y-3">
          {sortedSponsors.map((sponsor) => (
            <div 
              key={sponsor.id}
              className="group relative rounded-xl border border-[#D2D9C5] bg-[#FAF7F2] p-3 hover:border-[#111A05]/40 hover:bg-white transition-all duration-200 shadow-2xs"
            >
              <div className="flex items-start gap-3 min-w-0">
                
                {/* Sponsor Logo or Fallback */}
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#D2D9C5] bg-white shrink-0 flex items-center justify-center p-1">
                  {sponsor.logo ? (
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain rounded"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-full rounded-lg bg-[#111A05] flex items-center justify-center text-xs font-black text-[#B5F714]">
                    {sponsor.name.slice(0, 2).toUpperCase()}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1 min-w-0 truncate">
                      <span className="font-extrabold text-sm text-[#111A05] group-hover:text-black transition-colors truncate">
                        {sponsor.name}
                      </span>
                      {sponsor.verified && (
                        <span title="Verified Network" className="shrink-0">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#54653D]" />
                        </span>
                      )}
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 shrink-0 font-mono text-xs text-[#111A05] bg-[#EFE9DE] px-1.5 py-0.5 rounded-lg border border-[#D2D9C5] font-bold">
                      <Star className="w-3 h-3 fill-[#111A05] text-[#111A05]" />
                      <span>{sponsor.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#54653D] truncate mt-0.5 font-medium">
                    {sponsor.tagline}
                  </p>

                  {/* Payment & Min Payout Metadata */}
                  <div className="mt-2 flex items-center justify-between text-[11px] text-[#54653D] border-t border-[#D2D9C5] pt-1.5 font-mono">
                    <div className="truncate">
                      <span>Min: </span>
                      <span className="text-[#111A05] font-bold">{sponsor.minPayout}</span>
                    </div>
                    <div className="truncate text-right ml-1">
                      <span>{sponsor.paymentFrequency}</span>
                    </div>
                  </div>

                  {/* Actions: Direct Link + Filter offers */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <a
                      href={sponsor.link}
                      target="_blank"
                      rel="sponsored nofollow"
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg bg-[#B5F714] text-[#111A05] border border-[#111A05]/20 hover:bg-[#A2E20E] transition-all text-center shadow-2xs active:scale-95 cursor-pointer"
                    >
                      <span className="truncate">Join Network</span>
                      <ArrowUpRight className="w-3 h-3 shrink-0 stroke-[2.5]" />
                    </a>

                    <button
                      onClick={() => setSearchQuery(sponsor.name)}
                      className="px-2 py-1.5 text-xs text-[#54653D] hover:text-[#111A05] bg-white hover:bg-[#EFE9DE] rounded-lg border border-[#D2D9C5] transition-colors shrink-0 cursor-pointer"
                      title={`Filter offers from ${sponsor.name}`}
                    >
                      <Filter className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sponsor Application CTA */}
        <div className="mt-4 p-3.5 rounded-xl border border-dashed border-[#D2D9C5] bg-[#FAF7F2] text-center">
          <p className="text-xs text-[#111A05] font-bold">List Your Affiliate Network?</p>
          <p className="text-[11px] text-[#54653D] mt-0.5">Reach 40,000+ active publishers and media buyers.</p>
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="mt-2 text-xs font-bold text-[#111A05] hover:underline underline-offset-4 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Apply for Placement</span>
            <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Sidebar Ad Widget (Adsterra / Promo) if enabled */}
      {sidebarAd && sidebarAd.active && (
        <div className="rounded-2xl border border-[#D2D9C5] bg-white p-3 shadow-xs overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-[#54653D] font-mono font-bold">
              Partner Spotlight
            </span>
            <span className="text-[10px] text-[#111A05] font-bold bg-[#B5F714] px-1.5 py-0.2 rounded border border-[#111A05]/20">Ad</span>
          </div>

          {sidebarAd.adType === 'Image Banner with Link' && sidebarAd.imageUrl ? (
            <a 
              href={sidebarAd.targetUrl || '#'} 
              target="_blank" 
              rel="sponsored nofollow"
              className="block overflow-hidden rounded-xl border border-[#D2D9C5] hover:opacity-95 transition-opacity"
            >
              <img 
                src={sidebarAd.imageUrl} 
                alt={sidebarAd.altText || 'Sponsor Ad'} 
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover rounded-xl"
              />
            </a>
          ) : (
            <div 
              className="ad-script-container text-xs overflow-hidden rounded-xl"
              dangerouslySetInnerHTML={{ __html: sidebarAd.htmlCode || '' }}
            />
          )}
        </div>
      )}

      {/* Directory Trust / Methodology Box */}
      <div className="rounded-2xl border border-[#D2D9C5] bg-white p-4 text-xs text-[#54653D] space-y-2 shadow-xs">
        <div className="font-extrabold text-[#111A05] flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#54653D]" />
          <span>Verified Network Guarantee</span>
        </div>
        <p className="text-[11px] leading-relaxed break-words">
          Every CPA offer & Smartlink is verified for tracking authenticity, pixel firing, and on-time payouts. Traffic terms strictly enforced.
        </p>
      </div>

    </aside>
  );
};
