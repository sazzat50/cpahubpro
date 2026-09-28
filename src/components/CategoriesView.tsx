import React from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { OfferCategory } from '../types';
import { 
  Heart, 
  Gamepad2, 
  ShoppingBag, 
  Coins, 
  Pill, 
  Gift, 
  Cpu, 
  Zap, 
  ClipboardList,
  ArrowRight
} from 'lucide-react';

interface CategoryCardMeta {
  category: OfferCategory;
  description: string;
  icon: React.ReactNode;
  popularFlow: string;
}

const CATEGORY_METAS: CategoryCardMeta[] = [
  {
    category: 'Smartlinks',
    description: 'Auto-optimizing multi-GEO algorithms routing pop, push, and remnant traffic.',
    icon: <Zap className="w-5 h-5 text-[#111A05]" />,
    popularFlow: 'SOI / DOI Smart Redirects',
  },
  {
    category: 'Finance & Crypto',
    description: 'High-ticket crypto trading, forex brokerages, loans, and banking bounties.',
    icon: <Coins className="w-5 h-5 text-[#111A05]" />,
    popularFlow: 'First Time Deposit (FTD)',
  },
  {
    category: 'Dating',
    description: 'Mainstream, niche, and mature dating offer walls across Tier 1, 2, and 3 countries.',
    icon: <Heart className="w-5 h-5 text-[#111A05]" />,
    popularFlow: 'Single Opt-In (SOI)',
  },
  {
    category: 'Nutra & Health',
    description: 'Dietary supplements, keto, skin care, and wellness trials with high CPA payouts.',
    icon: <Pill className="w-5 h-5 text-[#111A05]" />,
    popularFlow: 'Credit Card Submit (CC)',
  },
  {
    category: 'Sweepstakes',
    description: 'Lead gen gift card giveaways, gadgets, and consumer survey entry sweeps.',
    icon: <Gift className="w-5 h-5 text-[#111A05]" />,
    popularFlow: 'SOI Email Submit',
  },
  {
    category: 'Gaming',
    description: 'Desktop MMORPGs, mobile RPG game installs, and battle royale apps.',
    icon: <Gamepad2 className="w-5 h-5 text-[#111A05]" />,
    popularFlow: 'Cost Per Install (CPI)',
  },
  {
    category: 'Software & Utilities',
    description: 'VPNs, antivirus, RAM cleaners, browser extensions, and developer utilities.',
    icon: <Cpu className="w-5 h-5 text-[#111A05]" />,
    popularFlow: 'RevShare & Direct Download',
  },
  {
    category: 'E-commerce',
    description: 'Direct-to-consumer trending gadgets, fashion subscriptions, and holiday sales.',
    icon: <ShoppingBag className="w-5 h-5 text-[#111A05]" />,
    popularFlow: 'Cost Per Sale (CPS)',
  },
  {
    category: 'Surveys & Rewards',
    description: 'Market research consumer panels, opinion rewards, and cashback platforms.',
    icon: <ClipboardList className="w-5 h-5 text-[#111A05]" />,
    popularFlow: 'Double Opt-In (DOI)',
  }
];

export const CategoriesView: React.FC = () => {
  const { offers, setCategory, setActiveTab } = useDirectory();

  const handleSelectCategory = (cat: OfferCategory) => {
    setCategory(cat);
    setActiveTab('offers');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[#111A05] tracking-tight">
          CPA Offer Verticals & Categories
        </h1>
        <p className="text-xs sm:text-sm text-[#54653D] mt-1 font-medium">
          Explore high-converting verticals tailored to your traffic source and media buying channels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORY_METAS.map((item) => {
          const count = offers.filter(o => o.category === item.category).length;
          return (
            <div
              key={item.category}
              onClick={() => handleSelectCategory(item.category)}
              className="rounded-2xl border border-[#D2D9C5] bg-white p-5 hover:border-[#111A05]/40 transition-all cursor-pointer group flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#D2D9C5] group-hover:bg-[#EFE9DE] transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono text-[#111A05] font-black bg-[#B5F714] px-2.5 py-0.5 rounded-lg border border-[#111A05]/20">
                    {count} {count === 1 ? 'Offer' : 'Offers'}
                  </span>
                </div>

                <h3 className="mt-3.5 text-base font-extrabold text-[#111A05] group-hover:text-black transition-colors">
                  {item.category}
                </h3>

                <p className="mt-1 text-xs text-[#54653D] leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D2D9C5] flex items-center justify-between text-xs">
                <span className="text-[#54653D] font-mono text-[11px]">
                  Flow: <strong className="text-[#111A05]">{item.popularFlow}</strong>
                </span>
                <span className="text-[#111A05] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Browse</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
