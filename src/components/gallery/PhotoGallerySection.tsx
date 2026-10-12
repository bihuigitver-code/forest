import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { galleryData } from '../../data/gallery';
import type { GalleryItem } from '../../types';
import { Image, MapPin, Calendar, ZoomIn } from 'lucide-react';

export const PhotoGallerySection: React.FC = () => {
  const { lang, t, openModal } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredItems = galleryData.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleOpenImage = (item: GalleryItem) => {
    openModal('image', item);
  };

  return (
    <section id="gallery-section" className="py-12 bg-[#FAFAF7] border-b border-[#D7DED8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#174A32] pb-3 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#B79A52] uppercase tracking-wider">
              <Image className="w-3.5 h-3.5 text-[#24563B]" />
              <span>{lang === 'hi' ? 'चित्र वीथिका एवं वृत्तचित्र' : 'Visual Documentation'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-[#174A32] mt-0.5">
              {t('galleryHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              {t('gallerySubheading')}
            </p>
          </div>

          <div className="text-[11px] text-slate-500 bg-white border border-[#D7DED8] px-3 py-1.5 rounded-xs">
            {lang === 'hi'
              ? 'क्षेत्रीय प्रभागों द्वारा सत्यापित फोटोग्राफ'
              : 'Verified Field Photographs & Wildlife Records'}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xs border transition ${
              activeCategory === 'all'
                ? 'bg-[#174A32] text-white border-[#174A32]'
                : 'bg-white text-slate-700 border-[#D7DED8] hover:bg-slate-100'
            }`}
          >
            {t('galleryFilterAll')} ({galleryData.length})
          </button>
          <button
            onClick={() => setActiveCategory('wildlife')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xs border transition ${
              activeCategory === 'wildlife'
                ? 'bg-[#174A32] text-white border-[#174A32]'
                : 'bg-white text-slate-700 border-[#D7DED8] hover:bg-slate-100'
            }`}
          >
            {t('galleryFilterWildlife')}
          </button>
          <button
            onClick={() => setActiveCategory('conservation')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xs border transition ${
              activeCategory === 'conservation'
                ? 'bg-[#174A32] text-white border-[#174A32]'
                : 'bg-white text-slate-700 border-[#D7DED8] hover:bg-slate-100'
            }`}
          >
            {t('galleryFilterConservation')}
          </button>
          <button
            onClick={() => setActiveCategory('plantations')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xs border transition ${
              activeCategory === 'plantations'
                ? 'bg-[#174A32] text-white border-[#174A32]'
                : 'bg-white text-slate-700 border-[#D7DED8] hover:bg-slate-100'
            }`}
          >
            {t('galleryFilterPlantations')}
          </button>
          <button
            onClick={() => setActiveCategory('patrol')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xs border transition ${
              activeCategory === 'patrol'
                ? 'bg-[#174A32] text-white border-[#174A32]'
                : 'bg-white text-slate-700 border-[#D7DED8] hover:bg-slate-100'
            }`}
          >
            {t('galleryFilterPatrol')}
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenImage(item)}
              className="bg-white border border-[#D7DED8] rounded-xs overflow-hidden shadow-gov-sm group hover:border-[#174A32] transition cursor-pointer flex flex-col justify-between"
            >
              {/* Image with zoom badge */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={lang === 'hi' ? item.titleHi : item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 bg-white/90 rounded-full text-[#174A32] shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded-xs flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-[#B79A52]" />
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Caption & Location */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#183153] group-hover:text-[#174A32] line-clamp-1 leading-snug">
                    {lang === 'hi' ? item.titleHi : item.titleEn}
                  </h3>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                    {lang === 'hi' ? item.captionHi : item.captionEn}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center space-x-1 truncate max-w-[180px]">
                    <MapPin className="w-3 h-3 text-[#24563B] flex-shrink-0" />
                    <span className="truncate">{lang === 'hi' ? item.locationHi : item.locationEn}</span>
                  </span>
                  <span className="text-[#B79A52] font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
