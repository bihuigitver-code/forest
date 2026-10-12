import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { conservationTopics } from '../../data/department';
import type { ConservationTopic } from '../../types';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Sprout, 
  Flame, 
  Users, 
  ChevronRight, 
  CheckCircle2, 
  Layers, 
  X,
  Compass
} from 'lucide-react';

export const ForestInformation: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState<ConservationTopic | null>(null);

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#174A32]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#174A32]" />;
      case 'Sprout':
        return <Sprout className="w-5 h-5 text-[#174A32]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-700" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#174A32]" />;
      default:
        return <Compass className="w-5 h-5 text-[#174A32]" />;
    }
  };

  return (
    <section id="conservation-section" className="py-12 bg-white border-b border-[#D7DED8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#174A32] pb-3 mb-8">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#B79A52] uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#24563B]" />
            <span>{lang === 'hi' ? 'संरक्षण एवं प्रबंधन' : 'Conservation & Management Wings'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-[#174A32] mt-0.5">
            {t('conservationHeading')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            {t('conservationSubheading')}
          </p>
        </div>

        {/* 2 or 3 Column Structured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conservationTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-[#FAFAF7] border border-[#D7DED8] rounded-xs overflow-hidden shadow-gov-sm flex flex-col justify-between hover:border-[#174A32] transition group"
            >
              {/* Image banner */}
              <div className="relative h-44 overflow-hidden border-b border-[#D7DED8]">
                <img
                  src={topic.image}
                  alt={lang === 'hi' ? topic.titleHi : topic.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 bg-white/95 px-2 py-1 rounded-xs border border-[#D7DED8] shadow-xs flex items-center space-x-1.5">
                  {getTopicIcon(topic.iconName)}
                  <span className="text-[11px] font-bold text-[#183153] uppercase tracking-wider">
                    {lang === 'hi' ? 'कार्यक्षेत्र' : 'Mandate'}
                  </span>
                </div>
              </div>

              {/* Content body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#183153] group-hover:text-[#174A32] transition-colors leading-snug">
                    {lang === 'hi' ? topic.titleHi : topic.titleEn}
                  </h3>
                  <p className="text-xs text-[#B79A52] font-semibold mt-1">
                    {lang === 'hi' ? topic.taglineHi : topic.taglineEn}
                  </p>
                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {lang === 'hi' ? topic.descHi : topic.descEn}
                  </p>

                  {/* Key highlights list */}
                  <div className="mt-3.5 pt-3 border-t border-slate-200/80 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {lang === 'hi' ? 'प्रमुख पहलें:' : 'Key Initiatives:'}
                    </span>
                    {(lang === 'hi' ? topic.keyInitiativesHi : topic.keyInitiativesEn).slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#24563B] flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Read more button */}
                <div className="mt-4 pt-3 border-t border-[#D7DED8]">
                  <button
                    onClick={() => setSelectedTopic(topic)}
                    className="w-full py-1.5 px-3 bg-white hover:bg-[#174A32] text-[#174A32] hover:text-white border border-[#24563B] text-xs font-semibold rounded-xs transition flex items-center justify-center space-x-1"
                  >
                    <span>{t('readMore')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal Drawer for Selected Topic */}
        {selectedTopic && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#174A32] rounded-xs shadow-2xl">
              {/* Modal Header */}
              <div className="bg-[#174A32] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#B79A52]">
                <div className="flex items-center space-x-2">
                  {getTopicIcon(selectedTopic.iconName)}
                  <h3 className="text-base sm:text-lg font-bold font-devanagari">
                    {lang === 'hi' ? selectedTopic.titleHi : selectedTopic.titleEn}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="p-1 hover:bg-[#24563B] rounded text-slate-200 hover:text-white"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="h-56 w-full relative">
                <img
                  src={selectedTopic.image}
                  alt={lang === 'hi' ? selectedTopic.titleHi : selectedTopic.titleEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                  <p className="text-xs font-semibold text-[#E8DFB8]">
                    {lang === 'hi' ? selectedTopic.taglineHi : selectedTopic.taglineEn}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-5 space-y-4 text-slate-800">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#174A32] mb-1">
                    {lang === 'hi' ? 'विस्तृत विवरण एवं अधिदेश' : 'Detailed Administrative Mandate'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {lang === 'hi' ? selectedTopic.descHi : selectedTopic.descEn}
                  </p>
                </div>

                <div className="bg-[#F5F4EC] border border-[#D7DED8] p-4 rounded-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#183153] mb-2">
                    {lang === 'hi' ? 'विभाग द्वारा संचालित प्रमुख कार्यक्रम' : 'Key Field Programmes & Measures'}
                  </h4>
                  <ul className="space-y-2">
                    {(lang === 'hi' ? selectedTopic.keyInitiativesHi : selectedTopic.keyInitiativesEn).map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-[#24563B] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    {lang === 'hi' ? 'प्रभाग: राज्य वन एवं वन्यजीव स्कंध' : 'Division: State Forest & Wildlife Wings'}
                  </span>
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className="px-4 py-1.5 bg-[#24563B] text-white text-xs font-semibold rounded-xs hover:bg-[#174A32]"
                  >
                    {lang === 'hi' ? 'बंद करें' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
