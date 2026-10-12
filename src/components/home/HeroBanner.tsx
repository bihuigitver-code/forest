import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { leadershipData } from '../../data/department';
import { Compass, FileText, Phone, ShieldCheck, Award } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { lang, t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 110;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative bg-[#174A32] text-white overflow-hidden border-b border-[#D7DED8]">
      {/* Background Nature Image with subtle government overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85"
          alt="Majestic dense sal and teak forest canopy in misty morning"
          className="w-full h-full object-cover object-center filter brightness-50"
        />
        {/* Government tint overlay: Deep forest green gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#174A32]/95 via-[#174A32]/85 to-[#183153]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Column (7 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Official Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#24563B]/90 border border-[#B79A52] px-3 py-1 rounded-sm text-xs font-semibold text-[#E8DFB8] tracking-wider uppercase shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B79A52]" />
              <span>
                {lang === 'hi'
                  ? 'राज्य वन, वन्यजीव एवं जैव विविधता संरक्षण'
                  : 'State Forest, Wildlife & Biodiversity Conservation'}
              </span>
            </div>

            {/* Formal Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-devanagari text-white tracking-tight leading-tight">
              {t('heroTitle')}
            </h1>

            {/* Subheading Quote */}
            <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl leading-relaxed font-normal border-l-2 border-[#B79A52] pl-3">
              {t('heroSubtitle')}
            </p>

            {/* Compact Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo('conservation-section')}
                className="px-5 py-2.5 bg-[#B79A52] hover:bg-[#a68a44] text-[#183153] font-bold text-xs sm:text-sm rounded-sm transition shadow flex items-center space-x-2 border border-amber-200"
              >
                <Compass className="w-4 h-4 text-[#183153]" />
                <span>{t('btnExplore')}</span>
              </button>

              <button
                onClick={() => scrollTo('services-section')}
                className="px-5 py-2.5 bg-[#24563B] hover:bg-[#1f4a33] text-white font-bold text-xs sm:text-sm rounded-sm transition shadow flex items-center space-x-2 border border-[#B79A52]"
              >
                <FileText className="w-4 h-4 text-[#E8DFB8]" />
                <span>{t('btnServices')}</span>
              </button>

              <a
                href="tel:1926"
                className="px-4 py-2.5 bg-[#183153] hover:bg-[#12253f] text-[#E8DFB8] font-bold text-xs sm:text-sm rounded-sm transition border border-slate-600 flex items-center space-x-1.5"
              >
                <Phone className="w-4 h-4 text-[#B79A52]" />
                <span>1926 (Control Desk)</span>
              </a>
            </div>

            {/* Quick feature bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4 border-t border-slate-600/60 text-xs text-slate-200">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B79A52]"></span>
                <span>{lang === 'hi' ? '31,842 वर्ग किमी वन क्षेत्र' : '31,842 sq km Forests'}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B79A52]"></span>
                <span>{lang === 'hi' ? '14 वन्यजीव अभयारण्य' : '14 Wildlife Reserves'}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B79A52]"></span>
                <span>{lang === 'hi' ? '3,450+ वन समितियां' : '3,450+ JFMC Bodies'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Leadership Administrative Card (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-[#FAFAF7] text-slate-800 rounded-sm border-2 border-[#B79A52] p-4 shadow-gov-md">
              <div className="border-b border-slate-200 pb-2 mb-3 flex items-center justify-between">
                <span className="text-xs font-bold text-[#174A32] uppercase tracking-wider flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-[#B79A52]" />
                  <span>{lang === 'hi' ? 'विभागीय संदेश' : 'Leadership Message'}</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded">
                  {lang === 'hi' ? 'प्रारूप' : 'Demo Profile'}
                </span>
              </div>

              {/* Minister Snippet */}
              <div className="flex items-start space-x-3 pb-3 border-b border-slate-200">
                <div className="w-14 h-16 rounded border border-slate-300 overflow-hidden flex-shrink-0 bg-slate-200">
                  <img
                    src={leadershipData[0].image}
                    alt={leadershipData[0].nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#183153] leading-tight">
                    {lang === 'hi' ? leadershipData[0].nameHi : leadershipData[0].nameEn}
                  </h4>
                  <p className="text-[11px] font-semibold text-[#174A32] mt-0.5">
                    {lang === 'hi' ? leadershipData[0].roleHi : leadershipData[0].roleEn}
                  </p>
                  <p className="text-[11px] text-slate-600 line-clamp-2 italic mt-1">
                    {lang === 'hi' ? leadershipData[0].messageHi : leadershipData[0].messageEn}
                  </p>
                </div>
              </div>

              {/* HoFF / PCCF Snippet */}
              <div className="flex items-start space-x-3 pt-3">
                <div className="w-14 h-16 rounded border border-slate-300 overflow-hidden flex-shrink-0 bg-slate-200">
                  <img
                    src={leadershipData[1].image}
                    alt={leadershipData[1].nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#183153] leading-tight">
                    {lang === 'hi' ? leadershipData[1].nameHi : leadershipData[1].nameEn}
                  </h4>
                  <p className="text-[11px] font-semibold text-[#174A32] mt-0.5">
                    {lang === 'hi' ? leadershipData[1].roleHi : leadershipData[1].roleEn}
                  </p>
                  <p className="text-[11px] text-slate-600 line-clamp-2 italic mt-1">
                    {lang === 'hi' ? leadershipData[1].messageHi : leadershipData[1].messageEn}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
