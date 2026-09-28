import React, { useState } from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { ActiveTab } from '../types';
import { 
  Search, 
  Layers, 
  PlusCircle, 
  Menu, 
  X, 
  Zap
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    filters, 
    setSearchQuery, 
    setIsSubmitModalOpen 
  } = useDirectory();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon?: React.ReactNode }[] = [
    { id: 'offers', label: 'Offers' },
    { id: 'smartlinks', label: 'Top Smartlinks', icon: <Zap className="w-3.5 h-3.5 text-[#54653D]" /> },
    { id: 'categories', label: 'Categories' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#D2D9C5] bg-[#F7F2EB]/95 backdrop-blur-md">
      {/* Top Bar Notification Ticker */}
      <div className="bg-[#EFE9DE] border-b border-[#D2D9C5] px-4 py-1 text-xs text-[#1C2612]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex h-2 w-2 rounded-full bg-[#B5F714] border border-[#111A05]/30 animate-pulse"></span>
            <span className="text-[#1C2612] font-bold">2026 Directory:</span>
            <span className="text-[#54653D] hidden sm:inline">1,240+ Verified CPA Offers, Direct Advertisers & Auto-Optimizing Smartlinks</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#54653D] shrink-0">
            <span className="hidden md:inline">Daily Sync Active</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B5F714]"></span>
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => handleNavClick('offers')}
              className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#111A05] text-[#B5F714] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5 font-extrabold" />
              </div>
              <div>
                <div className="text-lg font-black tracking-tight text-[#111A05]">
                  CPAHub<span className="text-[#54653D]">.pro</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#54653D] font-bold -mt-1 hidden sm:block">
                  Offer & Smartlink Directory
                </div>
              </div>
            </button>
          </div>

          {/* Search Bar in Header */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#54653D]" />
              </div>
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search offers, smartlinks, geos..."
                className="block w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-[#D2D9C5] rounded-xl text-[#111A05] placeholder-[#54653D]/70 focus:outline-none focus:ring-2 focus:ring-[#B5F714] focus:border-[#111A05] transition-colors shadow-2xs"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#54653D] hover:text-[#111A05] text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 text-sm font-bold transition-colors py-1 relative cursor-pointer ${
                    isActive 
                      ? 'text-[#111A05]' 
                      : 'text-[#54653D] hover:text-[#111A05]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B5F714] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons (Only Submit Offer, No Admin Links) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-[#B5F714] hover:bg-[#A2E20E] text-[#111A05] border border-[#111A05]/20 shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Submit Offer</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#111A05] hover:bg-[#EFE9DE] border border-[#D2D9C5] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input when on mobile */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#54653D]" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search offers, smartlinks, geos..."
              className="block w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#D2D9C5] rounded-xl text-[#111A05] placeholder-[#54653D]/70 focus:outline-none focus:ring-2 focus:ring-[#B5F714]"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#D2D9C5] bg-[#F7F2EB] px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold cursor-pointer ${
                activeTab === item.id
                  ? 'bg-[#EFE9DE] text-[#111A05]'
                  : 'text-[#54653D] hover:bg-[#EFE9DE] hover:text-[#111A05]'
              }`}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {activeTab === item.id && <span className="w-2 h-2 rounded-full bg-[#B5F714]"></span>}
            </button>
          ))}
          <div className="pt-2 border-t border-[#D2D9C5]">
            <button
              onClick={() => {
                setIsSubmitModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold rounded-xl bg-[#B5F714] text-[#111A05] border border-[#111A05]/20 shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Submit Offer / Network</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
