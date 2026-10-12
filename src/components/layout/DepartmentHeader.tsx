import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Emblem } from './Emblem';
import { Search, ShieldAlert } from 'lucide-react';

export const DepartmentHeader: React.FC = () => {
  const { lang, t, searchQuery, setSearchQuery } = useLanguage();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    const noticesSection = document.getElementById('notices-section');
    if (noticesSection) {
      noticesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white border-b border-[#D7DED8] shadow-gov-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left: Emblem + Bilingual Identity */}
          <div className="flex items-center space-x-4 sm:space-x-5 text-center sm:text-left">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Emblem size={74} className="hover:scale-105 transition-transform drop-shadow-sm" />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-wider text-[#24563B] uppercase border-b border-amber-200 pb-0.5 max-w-fit">
                {lang === 'hi' ? 'राज्य सरकार (प्रदर्शन पोर्टल)' : 'Government of State Portal'}
              </span>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-2 mt-0.5">
                <h1 className="text-xl sm:text-2xl font-bold font-devanagari text-[#174A32] tracking-tight leading-tight">
                  वन विभाग
                </h1>
                <span className="text-base sm:text-xl font-bold text-[#183153] tracking-wide">
                  | FOREST DEPARTMENT
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-0.5">
                {lang === 'hi'
                  ? 'पर्यावरण, वन एवं जलवायु परिवर्तन प्रभाग'
                  : 'Department of Environment, Forests & Climate Change'}
              </p>

              <span className="text-[11px] font-semibold text-[#B79A52] tracking-wide italic mt-0.5">
                {t('motto')}
              </span>
            </div>
          </div>

          {/* Right: Quick Search & Emergency Control Room */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto justify-end">
            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72 md:w-80" role="search">
              <label htmlFor="portal-search" className="sr-only">
                {t('searchPlaceholder')}
              </label>
              <input
                id="portal-search"
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-3 pr-20 py-2 text-xs border border-[#D7DED8] rounded-sm bg-[#FAFAF7] text-slate-800 placeholder-slate-500 focus:bg-white focus:outline-none focus:border-[#24563B] focus:ring-1 focus:ring-[#24563B]"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-[#24563B] hover:bg-[#174A32] text-white text-xs font-semibold rounded-sm transition flex items-center space-x-1"
                aria-label="Submit search"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('searchButton')}</span>
              </button>
            </form>

            {/* 24x7 Control Room Badge */}
            <div className="hidden sm:flex items-center space-x-2.5 bg-[#F5F4EC] border border-[#D7DED8] px-3 py-1.5 rounded-sm">
              <div className="w-8 h-8 rounded-full bg-[#174A32] text-white flex items-center justify-center flex-shrink-0 shadow-inner">
                <ShieldAlert className="w-4 h-4 text-[#E8DFB8]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  {lang === 'hi' ? '24x7 राज्य नियंत्रण कक्ष' : 'State Control Room'}
                </span>
                <span className="text-xs font-bold text-[#174A32] tracking-wide">
                  1926 (Toll-Free)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
