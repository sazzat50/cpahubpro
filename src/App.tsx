/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DirectoryProvider, useDirectory } from './context/DirectoryContext';
import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { TopAdBanner } from './components/TopAdBanner';
import { OfferListingTable } from './components/OfferListingTable';
import { OfferDetailModal } from './components/OfferDetailModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { SubmitOfferModal } from './components/SubmitOfferModal';
import { SmartlinksView } from './components/SmartlinksView';
import { CategoriesView } from './components/CategoriesView';
import { BlogView } from './components/BlogView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';

const DirectoryMain: React.FC = () => {
  const { activeTab } = useDirectory();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F2EB] text-[#242E1B] bg-cream-radial">
      
      {/* 1. Header & Navigation Bar */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 overflow-hidden">
        
        {/* Render View based on activeTab */}
        {activeTab === 'offers' && (
          <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
            
            {/* Left Featured Sidebar (Custom Networks / Sponsors from Admin) */}
            <LeftSidebar />

            {/* Main Area: Top Right Banner / Ad Section + Main Offer Listing Table */}
            <div className="flex-1 w-full min-w-0 max-w-full space-y-6">
              {/* Top Banner Ad Section (Adsterra Integration) */}
              <TopAdBanner />

              {/* Main CPA Offers & Smartlinks Table */}
              <OfferListingTable />
            </div>

          </div>
        )}

        {activeTab === 'smartlinks' && <SmartlinksView />}
        {activeTab === 'categories' && <CategoriesView />}
        {activeTab === 'blog' && <BlogView />}
        {activeTab === 'contact' && <ContactView />}

      </main>

      {/* Footer Section */}
      <Footer />

      {/* Modals & Overlays */}
      <OfferDetailModal />
      <AdminPanelModal />
      <SubmitOfferModal />

    </div>
  );
};

export default function App() {
  return (
    <DirectoryProvider>
      <DirectoryMain />
    </DirectoryProvider>
  );
}
