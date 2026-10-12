import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { servicesData } from '../../data/services';
import type { CitizenService } from '../../types';
import { 
  Trees, 
  ShieldAlert, 
  Flame, 
  Sprout, 
  FileText, 
  BookOpen, 
  Compass, 
  Download, 
  Clock, 
  FileCheck, 
  ChevronRight
} from 'lucide-react';

export const ForestServices: React.FC = () => {
  const { lang, t, openModal } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Trees':
        return <Trees className="w-5 h-5 text-[#174A32]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-red-700" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-700" />;
      case 'Sprout':
        return <Sprout className="w-5 h-5 text-[#174A32]" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-[#183153]" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-[#183153]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#174A32]" />;
      default:
        return <Download className="w-5 h-5 text-[#174A32]" />;
    }
  };

  const filteredServices = servicesData.filter((srv) => {
    if (filterCategory === 'all') return true;
    return srv.category === filterCategory;
  });

  const handleOpenService = (srv: CitizenService) => {
    openModal('service', srv);
  };

  return (
    <section id="services-section" className="py-12 bg-[#F5F4EC] border-b border-[#D7DED8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#174A32] pb-3 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#B79A52] uppercase tracking-wider">
              <FileCheck className="w-3.5 h-3.5 text-[#24563B]" />
              <span>{lang === 'hi' ? 'नागरिक सेवा पोर्टल' : 'Citizen Service Delivery Window'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-[#174A32] mt-0.5">
              {t('servicesHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              {t('servicesSubheading')}
            </p>
          </div>

          {/* Compliance note */}
          <div className="text-[11px] text-slate-600 bg-white border border-[#D7DED8] px-3 py-1.5 rounded-xs max-w-md">
            <span className="font-bold text-[#174A32]">
              {lang === 'hi' ? 'महत्वपूर्ण सूचना: ' : 'Administrative Note: '}
            </span>
            {t('demoDisclaimerService')}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xs border transition ${
              filterCategory === 'all'
                ? 'bg-[#174A32] text-white border-[#174A32]'
                : 'bg-white text-slate-700 border-[#D7DED8] hover:bg-slate-100'
            }`}
          >
            {lang === 'hi' ? 'सभी सेवाएं' : 'All Services'} ({servicesData.length})
          </button>
          <button
            onClick={() => setFilterCategory('permits')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xs border transition ${
              filterCategory === 'permits'
                ? 'bg-[#174A32] text-white border-[#174A32]'
                : 'bg-white text-slate-700 border-[#D7DED8] hover:bg-slate-100'
            }`}
          >
            {lang === 'hi' ? 'अनुमतियां एवं प्रपत्र' : 'Permits & Forms'}
          </button>
          <button
            onClick={() => setFilterCategory('emergency')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xs border transition ${
              filterCategory === 'emergency'
                ? 'bg-[#174A32] text-white border-[#174A32]'
                : 'bg-white text-slate-700 border-[#D7DED8] hover:bg-slate-100'
            }`}
          >
            {lang === 'hi' ? 'आपातकालीन सेवाएं' : 'Emergency & Rescue'}
          </button>
          <button
            onClick={() => setFilterCategory('community')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xs border transition ${
              filterCategory === 'community'
                ? 'bg-[#174A32] text-white border-[#174A32]'
                : 'bg-white text-slate-700 border-[#D7DED8] hover:bg-slate-100'
            }`}
          >
            {lang === 'hi' ? 'पौध वितरण व समुदाय' : 'Nurseries & Community'}
          </button>
          <button
            onClick={() => setFilterCategory('grievance')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xs border transition ${
              filterCategory === 'grievance'
                ? 'bg-[#174A32] text-white border-[#174A32]'
                : 'bg-white text-slate-700 border-[#D7DED8] hover:bg-slate-100'
            }`}
          >
            {lang === 'hi' ? 'जन शिकायत (समाधान)' : 'Public Grievance'}
          </button>
          <button
            onClick={() => setFilterCategory('information')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xs border transition ${
              filterCategory === 'information'
                ? 'bg-[#174A32] text-white border-[#174A32]'
                : 'bg-white text-slate-700 border-[#D7DED8] hover:bg-slate-100'
            }`}
          >
            {lang === 'hi' ? 'सूचना अधिकार व पर्यटन' : 'RTI & Eco-Tourism'}
          </button>
        </div>

        {/* 8 Citizen Service Cards: Government portal style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              onClick={() => handleOpenService(srv)}
              className="bg-white border border-[#D7DED8] hover:border-[#174A32] rounded-xs p-4 shadow-gov-sm transition cursor-pointer flex flex-col justify-between group hover:shadow-gov-md"
            >
              <div>
                {/* Header row with icon and status pill */}
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-[#F5F4EC] border border-[#D7DED8] rounded-xs group-hover:bg-[#E8DFB8] transition">
                    {getServiceIcon(srv.iconName)}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-xs border uppercase tracking-wider ${
                      srv.onlineAvailable
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-amber-50 text-amber-900 border-amber-300'
                    }`}
                  >
                    {srv.onlineAvailable ? t('serviceOnline') : t('serviceInfo')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-sm font-bold text-[#183153] group-hover:text-[#174A32] leading-snug">
                  {lang === 'hi' ? srv.titleHi : srv.titleEn}
                </h3>

                {/* Short description */}
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {lang === 'hi' ? srv.shortDescHi : srv.shortDescEn}
                </p>
              </div>

              {/* Footer details: Timeline & Action button */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[#24563B]" />
                    <span className="truncate">{srv.timeframe}</span>
                  </span>
                  <span className="font-semibold text-slate-700 truncate max-w-[110px]">
                    {srv.fee}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenService(srv);
                  }}
                  className="w-full py-1.5 px-2 bg-[#F5F4EC] group-hover:bg-[#174A32] text-[#174A32] group-hover:text-white border border-[#D7DED8] group-hover:border-[#174A32] text-xs font-semibold rounded-xs transition flex items-center justify-center space-x-1"
                >
                  <span>{t('serviceActionBtn')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
