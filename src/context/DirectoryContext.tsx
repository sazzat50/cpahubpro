import React, { createContext, useContext, useState, useEffect } from 'react';
import { Offer, FeaturedSponsor, AdSpace, ActiveTab, FilterState, OfferCategory, OfferType } from '../types';
import { INITIAL_OFFERS, INITIAL_SPONSORS, INITIAL_AD_SPACES } from '../data/initialData';

interface DirectoryContextType {
  offers: Offer[];
  sponsors: FeaturedSponsor[];
  adSpaces: AdSpace[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  filters: FilterState;
  setSearchQuery: (query: string) => void;
  setCategory: (category: OfferCategory) => void;
  setGeo: (geo: string) => void;
  setType: (type: OfferType) => void;
  setSortBy: (sort: FilterState['sortBy']) => void;
  resetFilters: () => void;
  
  // Modals & Drawers
  selectedOffer: Offer | null;
  setSelectedOffer: (offer: Offer | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isSubmitModalOpen: boolean;
  setIsSubmitModalOpen: (open: boolean) => void;

  // Admin Actions for Collections
  addOffer: (offer: Omit<Offer, 'id' | 'dateAdded'>) => void;
  updateOffer: (offer: Offer) => void;
  deleteOffer: (id: string) => void;
  
  addSponsor: (sponsor: Omit<FeaturedSponsor, 'id'>) => void;
  updateSponsor: (sponsor: FeaturedSponsor) => void;
  deleteSponsor: (id: string) => void;
  
  updateAdSpace: (adSpace: AdSpace) => void;
  toggleAdActive: (id: string) => void;
  resetAllData: () => void;
}

const DirectoryContext = createContext<DirectoryContextType | undefined>(undefined);

const LOCAL_STORAGE_OFFERS = 'cpahub_offers_v1';
const LOCAL_STORAGE_SPONSORS = 'cpahub_sponsors_v1';
const LOCAL_STORAGE_ADS = 'cpahub_adspaces_v1';

export const DirectoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [offers, setOffers] = useState<Offer[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_OFFERS);
      return saved ? JSON.parse(saved) : INITIAL_OFFERS;
    } catch {
      return INITIAL_OFFERS;
    }
  });

  const [sponsors, setSponsors] = useState<FeaturedSponsor[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SPONSORS);
      return saved ? JSON.parse(saved) : INITIAL_SPONSORS;
    } catch {
      return INITIAL_SPONSORS;
    }
  });

  const [adSpaces, setAdSpaces] = useState<AdSpace[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ADS);
      return saved ? JSON.parse(saved) : INITIAL_AD_SPACES;
    } catch {
      return INITIAL_AD_SPACES;
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('offers');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Direct URL access check: Decap CMS admin can be triggered via direct /admin or #admin URL access
  useEffect(() => {
    const handleUrlAdminCheck = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname.toLowerCase();
        const hash = window.location.hash.toLowerCase();
        const search = window.location.search.toLowerCase();
        if (path.includes('/admin') || hash === '#admin' || search.includes('admin=true')) {
          setIsAdminOpen(true);
        }
      }
    };
    handleUrlAdminCheck();
    window.addEventListener('hashchange', handleUrlAdminCheck);
    window.addEventListener('popstate', handleUrlAdminCheck);
    return () => {
      window.removeEventListener('hashchange', handleUrlAdminCheck);
      window.removeEventListener('popstate', handleUrlAdminCheck);
    };
  }, []);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'All',
    geo: 'All',
    type: 'All',
    sortBy: 'newest'
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_OFFERS, JSON.stringify(offers));
    } catch (e) {
      console.warn('Storage quota exceeded', e);
    }
  }, [offers]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SPONSORS, JSON.stringify(sponsors));
    } catch (e) {
      console.warn('Storage quota exceeded', e);
    }
  }, [sponsors]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ADS, JSON.stringify(adSpaces));
    } catch (e) {
      console.warn('Storage quota exceeded', e);
    }
  }, [adSpaces]);

  // Filter setters
  const setSearchQuery = (searchQuery: string) => setFilters(prev => ({ ...prev, searchQuery }));
  const setCategory = (category: OfferCategory) => setFilters(prev => ({ ...prev, category }));
  const setGeo = (geo: string) => setFilters(prev => ({ ...prev, geo }));
  const setType = (type: OfferType) => setFilters(prev => ({ ...prev, type }));
  const setSortBy = (sortBy: FilterState['sortBy']) => setFilters(prev => ({ ...prev, sortBy }));
  const resetFilters = () => setFilters({
    searchQuery: '',
    category: 'All',
    geo: 'All',
    type: 'All',
    sortBy: 'newest'
  });

  // Offer CRUD
  const addOffer = (newOfferData: Omit<Offer, 'id' | 'dateAdded'>) => {
    const newOffer: Offer = {
      ...newOfferData,
      id: `off-${Date.now().toString(36)}`,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setOffers(prev => [newOffer, ...prev]);
  };

  const updateOffer = (updatedOffer: Offer) => {
    setOffers(prev => prev.map(o => o.id === updatedOffer.id ? updatedOffer : o));
    if (selectedOffer?.id === updatedOffer.id) {
      setSelectedOffer(updatedOffer);
    }
  };

  const deleteOffer = (id: string) => {
    setOffers(prev => prev.filter(o => o.id !== id));
    if (selectedOffer?.id === id) {
      setSelectedOffer(null);
    }
  };

  // Sponsor CRUD
  const addSponsor = (newSponsorData: Omit<FeaturedSponsor, 'id'>) => {
    const newSponsor: FeaturedSponsor = {
      ...newSponsorData,
      id: `spon-${Date.now().toString(36)}`
    };
    setSponsors(prev => [...prev, newSponsor]);
  };

  const updateSponsor = (updatedSponsor: FeaturedSponsor) => {
    setSponsors(prev => prev.map(s => s.id === updatedSponsor.id ? updatedSponsor : s));
  };

  const deleteSponsor = (id: string) => {
    setSponsors(prev => prev.filter(s => s.id !== id));
  };

  // Ad space CRUD
  const updateAdSpace = (updatedAd: AdSpace) => {
    setAdSpaces(prev => prev.map(ad => ad.id === updatedAd.id ? updatedAd : ad));
  };

  const toggleAdActive = (id: string) => {
    setAdSpaces(prev => prev.map(ad => ad.id === id ? { ...ad, active: !ad.active } : ad));
  };

  const resetAllData = () => {
    setOffers(INITIAL_OFFERS);
    setSponsors(INITIAL_SPONSORS);
    setAdSpaces(INITIAL_AD_SPACES);
    localStorage.removeItem(LOCAL_STORAGE_OFFERS);
    localStorage.removeItem(LOCAL_STORAGE_SPONSORS);
    localStorage.removeItem(LOCAL_STORAGE_ADS);
  };

  return (
    <DirectoryContext.Provider
      value={{
        offers,
        sponsors,
        adSpaces,
        activeTab,
        setActiveTab,
        filters,
        setSearchQuery,
        setCategory,
        setGeo,
        setType,
        setSortBy,
        resetFilters,
        selectedOffer,
        setSelectedOffer,
        isAdminOpen,
        setIsAdminOpen,
        isSubmitModalOpen,
        setIsSubmitModalOpen,
        addOffer,
        updateOffer,
        deleteOffer,
        addSponsor,
        updateSponsor,
        deleteSponsor,
        updateAdSpace,
        toggleAdActive,
        resetAllData
      }}
    >
      {children}
    </DirectoryContext.Provider>
  );
};

export const useDirectory = () => {
  const context = useContext(DirectoryContext);
  if (!context) {
    throw new Error('useDirectory must be used within a DirectoryProvider');
  }
  return context;
};
