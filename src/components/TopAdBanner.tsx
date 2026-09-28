import React, { useEffect, useRef } from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export const TopAdBanner: React.FC = () => {
  const { adSpaces, setActiveTab } = useDirectory();
  const topAd = adSpaces.find(ad => ad.key === 'top_banner');
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  // When raw HTML contains <script> tags, standard innerHTML doesn't execute them.
  // This effect safely evaluates scripts if the user provided Adsterra / third-party scripts.
  useEffect(() => {
    if (topAd?.active && topAd.adType === 'Raw HTML Script Code (Adsterra/Popads)' && topAd.htmlCode && scriptContainerRef.current) {
      const container = scriptContainerRef.current;
      container.innerHTML = topAd.htmlCode;

      // Execute scripts if present
      const scripts = container.querySelectorAll('script');
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    }
  }, [topAd?.htmlCode, topAd?.adType, topAd?.active]);

  if (!topAd || !topAd.active) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl border border-dashed border-[#D2D9C5] bg-[#FAF7F2] p-4 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-3xl mx-auto">
          <div className="text-left">
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#54653D] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#111A05]" />
              <span>SPONSORED PLACEMENT (728x90)</span>
            </div>
            <p className="text-xs text-[#54653D] mt-0.5">
              Premium header banner reserved for Adsterra script or top CPA Network partner.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('contact')}
            className="px-4 py-2 rounded-xl bg-[#B5F714] hover:bg-[#A2E20E] text-xs font-bold text-[#111A05] border border-[#111A05]/20 transition-all shrink-0 shadow-2xs cursor-pointer flex items-center gap-1"
          >
            <span>Reserve Space</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[#D2D9C5] bg-white p-2.5 sm:p-3 shadow-xs">
      
      {/* Ad Label */}
      <div className="flex items-center justify-between px-1 pb-1.5 text-[10px] text-[#54653D] font-mono">
        <span className="flex items-center gap-1.5 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B5F714] border border-[#111A05]/30"></span>
          <span>SPONSORED ADSTERRA / NETWORK PARTNER</span>
        </span>
        <span className="text-[10px] text-[#54653D] font-medium">Ad</span>
      </div>

      {/* Render Banner or Raw HTML Script */}
      {topAd.adType === 'Image Banner with Link' && topAd.imageUrl ? (
        <a
          href={topAd.targetUrl || '#'}
          target="_blank"
          rel="sponsored nofollow"
          className="block w-full overflow-hidden rounded-xl border border-[#D2D9C5] hover:border-[#111A05]/40 transition-all"
        >
          <img
            src={topAd.imageUrl}
            alt={topAd.altText || 'Sponsor Banner'}
            referrerPolicy="no-referrer"
            className="w-full max-h-32 sm:max-h-24 object-cover rounded-xl"
          />
        </a>
      ) : (
        <div
          ref={scriptContainerRef}
          className="w-full overflow-x-auto rounded-xl text-[#111A05]"
        />
      )}
    </div>
  );
};
