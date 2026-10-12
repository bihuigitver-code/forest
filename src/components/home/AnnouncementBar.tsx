import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { noticesData } from '../../data/notices';
import { Bell, AlertCircle } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { lang, t, openModal } = useLanguage();

  const handleNoticeClick = (notice: typeof noticesData[0]) => {
    openModal('notice', notice);
  };

  return (
    <div className="bg-[#24563B] text-white border-y border-[#B79A52] shadow-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-stretch md:items-center">
        {/* Left Badge: Official Flash */}
        <div className="flex items-center space-x-2 bg-[#174A32] text-[#E8DFB8] px-3.5 py-2 font-bold text-xs uppercase tracking-wider border-r border-[#2E6F4C] flex-shrink-0 z-10 shadow-sm">
          <Bell className="w-3.5 h-3.5 text-[#B79A52] animate-pulse" />
          <span>{t('announcementLabel')}</span>
        </div>

        {/* Scrolling / Sliding Announcements */}
        <div className="overflow-hidden relative flex-1 py-1.5 md:py-0 px-2">
          <div className="animate-ticker flex items-center space-x-8 text-xs text-slate-100">
            {noticesData.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNoticeClick(item)}
                className="inline-flex items-center space-x-2 hover:text-[#E8DFB8] transition-colors focus:outline-none focus:underline"
              >
                <span className="bg-[#B79A52] text-[#183153] text-[10px] font-bold px-1.5 py-0.2 rounded-xs uppercase">
                  {item.category}
                </span>
                <span className="font-medium underline-offset-2">
                  {lang === 'hi' ? item.titleHi : item.titleEn}
                </span>
                <span className="text-[#E8DFB8] text-[11px] font-mono">
                  [{item.date}]
                </span>
                <span className="text-slate-400">|</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Badge: Demo indicator */}
        <div className="hidden lg:flex items-center space-x-1 px-3 py-1 bg-[#174A32] text-[11px] text-[#E8DFB8] flex-shrink-0 border-l border-[#2E6F4C]">
          <AlertCircle className="w-3 h-3 text-[#B79A52]" />
          <span>{lang === 'hi' ? 'प्सूचना पट्ट' : 'Notice Board'}</span>
        </div>
      </div>
    </div>
  );
};
