import React, { useState } from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { ActiveTab } from '../types';
import { 
  Layers, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  Twitter, 
  Linkedin, 
  MessageSquare 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setIsSubmitModalOpen } = useDirectory();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[#D2D9C5] bg-[#F7F2EB] mt-16 text-[#54653D]">
      
      {/* Upper Footer: Newsletter & Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-10 border-b border-[#D2D9C5]">
          
          <div className="lg:col-span-7 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#111A05] font-mono font-bold bg-[#EFE9DE] px-2.5 py-1 rounded-lg border border-[#D2D9C5]">
              <Zap className="w-3.5 h-3.5 fill-[#B5F714] text-[#111A05]" />
              <span>Weekly High-Converting Offer Alert</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#111A05] tracking-tight">
              Get the Top Converting Smartlinks Delivered Weekly
            </h3>
            <p className="text-xs sm:text-sm text-[#54653D] max-w-xl break-words">
              Join 18,500+ performance affiliates receiving freshly vetted CPA campaigns, private cap boosts, and high-CPM Adsterra placement secrets.
            </p>
          </div>

          <div className="lg:col-span-5 w-full">
            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-white border border-[#D2D9C5] text-[#111A05] text-xs flex items-center gap-2 shadow-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#111A05]" />
                <span className="font-bold">You're subscribed! Check your inbox for the 2026 CPA Cheat Sheet.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your affiliate email..."
                  className="w-full bg-white border border-[#D2D9C5] rounded-xl px-3.5 py-2.5 text-xs text-[#111A05] placeholder-[#54653D]/70 focus:outline-none focus:ring-2 focus:ring-[#B5F714] font-mono shadow-2xs"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#B5F714] hover:bg-[#A2E20E] text-[#111A05] font-extrabold text-xs border border-[#111A05]/20 shadow-xs shrink-0 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </form>
            )}
            <span className="text-[10px] text-[#54653D] font-mono mt-1.5 block">
              Zero spam. Unsubscribe anytime with 1-click.
            </span>
          </div>

        </div>

        {/* Middle Footer: Links & Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#111A05] flex items-center justify-center text-[#B5F714] shadow-xs">
                <Layers className="w-4 h-4 font-bold" />
              </div>
              <span className="font-black text-[#111A05] text-base tracking-tight">CPAHub<span className="text-[#54653D]">.pro</span></span>
            </div>
            <p className="text-xs text-[#54653D] leading-relaxed break-words font-medium">
              The premier CPA offer listing and Smartlink directory for media buyers, webmasters, and performance networks.
            </p>
            <div className="text-[11px] font-mono text-[#111A05] font-bold">
              Built with Next.js (App Router) & Decap CMS
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-[#111A05] uppercase tracking-wider text-[11px] font-mono">
              Directory Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('offers')} className="hover:text-[#111A05] hover:underline transition-colors text-left cursor-pointer">
                  All CPA Offers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('smartlinks')} className="hover:text-[#111A05] hover:underline transition-colors text-left cursor-pointer">
                  Top Smartlinks
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('categories')} className="hover:text-[#111A05] hover:underline transition-colors text-left cursor-pointer">
                  Categories & Verticals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-[#111A05] hover:underline transition-colors text-left cursor-pointer">
                  Publisher Guides & Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Networks & Advertisers (No Admin Links) */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-[#111A05] uppercase tracking-wider text-[11px] font-mono">
              For Networks & Advertisers
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setIsSubmitModalOpen(true)} className="hover:text-[#111A05] hover:underline transition-colors text-left cursor-pointer font-bold text-[#111A05]">
                  List Your Network
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#111A05] hover:underline transition-colors text-left cursor-pointer">
                  Adsterra & Top Banner Space
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#111A05] hover:underline transition-colors text-left cursor-pointer">
                  Featured Sponsor Placement
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#111A05] hover:underline transition-colors text-left cursor-pointer">
                  API & Direct Feed Integration
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Social */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-[#111A05] uppercase tracking-wider text-[11px] font-mono">
              Compliance & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-[#54653D] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#111A05]" />
                  <span>rel="sponsored nofollow" Enforced</span>
                </span>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#111A05] hover:underline transition-colors text-left cursor-pointer">
                  DMCA & Advertising Disclosure
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#111A05] hover:underline transition-colors text-left cursor-pointer">
                  Terms of Service & Privacy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#111A05] hover:underline transition-colors text-left cursor-pointer">
                  Editorial Guidelines
                </button>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white border border-[#D2D9C5] flex items-center justify-center text-[#54653D] hover:text-[#111A05] hover:border-[#111A05] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white border border-[#D2D9C5] flex items-center justify-center text-[#54653D] hover:text-[#111A05] hover:border-[#111A05] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://telegram.org" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white border border-[#D2D9C5] flex items-center justify-center text-[#54653D] hover:text-[#111A05] hover:border-[#111A05] transition-colors"
                aria-label="Community Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a 
                href="https://cpahub.pro" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white border border-[#D2D9C5] flex items-center justify-center text-[#54653D] hover:text-[#111A05] hover:border-[#111A05] transition-colors"
                aria-label="Website"
              >
                <Globe2 className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Lower Footer: Copyright Notice (Clean, No Admin Link) */}
        <div className="pt-6 border-t border-[#D2D9C5] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#54653D]">
          <div>
            © 2026 Offer Directory. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B5F714] border border-[#111A05]/30 animate-pulse"></span>
              <span>Daily Offer Database Sync Live</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
