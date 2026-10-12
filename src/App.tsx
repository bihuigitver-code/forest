import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { UtilityBar } from './components/layout/UtilityBar';
import { DepartmentHeader } from './components/layout/DepartmentHeader';
import { MainNavigation } from './components/navigation/MainNavigation';
import { AnnouncementBar } from './components/home/AnnouncementBar';
import { HeroBanner } from './components/home/HeroBanner';
import { NoticeBoard } from './components/home/NoticeBoard';
import { StatisticsSection } from './components/home/StatisticsSection';
import { ForestServices } from './components/home/ForestServices';
import { ForestInformation } from './components/home/ForestInformation';
import { DepartmentOverviewSection } from './components/home/DepartmentOverviewSection';
import { PhotoGallerySection } from './components/gallery/PhotoGallerySection';
import { DocumentRepositorySection } from './components/documents/DocumentRepositorySection';
import { ContactSection } from './components/contact/ContactSection';
import { GovernmentFooter } from './components/layout/GovernmentFooter';
import { RecruitmentApplyPage } from './components/recruitment/RecruitmentApplyPage';
import { AdminDashboard } from './components/causes/AdminDashboard';

// Modals
import { ServiceModal } from './components/modals/ServiceModal';
import { NoticeModal } from './components/modals/NoticeModal';
import { ImageLightbox } from './components/modals/ImageLightbox';
import { PolicyModal } from './components/modals/PolicyModal';

import { PhoneCall } from 'lucide-react';
import { DemoAppWrapper } from './demo-control';

const MainPortal: React.FC = () => {
  const { modal, closeModal, lang, currentView } = useLanguage();
  const [isCausesAdmin, setIsCausesAdmin] = useState(
    () => typeof window !== 'undefined' && window.location.pathname.startsWith('/causes')
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setIsCausesAdmin(window.location.pathname.startsWith('/causes'));
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (isCausesAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F4EC]">
        <AdminDashboard onBackToPortal={() => {
          window.history.pushState({}, '', '/');
          setIsCausesAdmin(false);
        }} />
      </div>
    );
  }

  if (currentView === 'apply') {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F4EC]">
        <RecruitmentApplyPage initialTab="apply" />
      </div>
    );
  }

  if (currentView === 'status') {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F4EC]">
        <RecruitmentApplyPage initialTab="status" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F4EC] text-slate-800">
  
      {/* 1. Top Utility Strip */}
      <UtilityBar />

      {/* 2. Main Identity Header */}
      <DepartmentHeader />

      {/* 3. Horizontal Navigation Bar */}
      <MainNavigation />

      {/* 4. Urgent Announcement Ticker */}
      <AnnouncementBar />

      {/* 5. Main Content Area */}
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {/* Hero Banner Section */}
        <HeroBanner />

        {/* Notices, Tenders & Recruitment */}
        <NoticeBoard />

        {/* Department at a Glance Statistics */}
        <StatisticsSection />

        {/* Citizen Services */}
        <ForestServices />

        {/* Forest & Wildlife Information Wings */}
        <ForestInformation />

        {/* Department Overview, Vision, Mission & Cadre Structure */}
        <DepartmentOverviewSection />

        {/* Photo Gallery & Field Operations */}
        <PhotoGallerySection />

        {/* Acts, Rules & Repository */}
        <DocumentRepositorySection />

        {/* Contact, DFO Directory & Grievance Lodgement */}
        <ContactSection />
      </main>

      {/* 6. Traditional Government Footer */}
      <GovernmentFooter />

      {/* Floating 24x7 Quick Emergency Call Trigger for Mobile / Desk */}
      <div className="fixed bottom-4 right-4 z-40">
        <a
          href="tel:1926"
          className="flex items-center space-x-2 bg-red-700 hover:bg-red-800 text-white px-3.5 py-2.5 rounded-full shadow-lg border-2 border-amber-300 font-bold text-xs tracking-wider transition transform hover:scale-105"
          title="Forest Fire & Wildlife Emergency Toll-Free 1926"
          aria-label="Dial Forest Fire and Wildlife Emergency Hotline 1926"
        >
          <PhoneCall className="w-4 h-4 text-amber-200 animate-bounce" />
          <span className="hidden sm:inline">
            {lang === 'hi' ? 'वन आपात: 1926' : 'Forest Helpline: 1926'}
          </span>
          <span className="sm:hidden font-mono">1926</span>
        </a>
      </div>

      {/* Global Modals Manager */}
      {modal.type === 'service' && modal.data && (
        <ServiceModal service={modal.data} onClose={closeModal} />
      )}

      {modal.type === 'notice' && modal.data && (
        <NoticeModal notice={modal.data} onClose={closeModal} />
      )}

      {modal.type === 'image' && modal.data && (
        <ImageLightbox image={modal.data} onClose={closeModal} />
      )}

      {(modal.type === 'policy' || modal.type === 'grievanceSuccess') && (
        <PolicyModal data={modal.data} onClose={closeModal} />
      )}
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <DemoAppWrapper>
        <MainPortal />
      </DemoAppWrapper>
    </LanguageProvider>
  );
}

export default App;
