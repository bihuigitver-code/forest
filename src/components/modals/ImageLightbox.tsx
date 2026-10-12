import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { GalleryItem } from '../../types';
import { X, MapPin, Calendar } from 'lucide-react';

interface ImageLightboxProps {
  image: GalleryItem;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({ image, onClose }) => {
  const { lang } = useLanguage();

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="bg-white max-w-4xl w-full border-2 border-[#174A32] rounded-xs overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#174A32] text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-[#B79A52]">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-200">
            {lang === 'hi' ? 'चित्र वीथिका अवलोकन' : 'Field Photography Record'}
          </span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#24563B] rounded text-slate-200 hover:text-white"
            aria-label="Close image lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High Resolution Image Container */}
        <div className="relative bg-black flex-1 flex items-center justify-center max-h-[60vh] overflow-hidden">
          <img
            src={image.imageUrl}
            alt={lang === 'hi' ? image.titleHi : image.titleEn}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Caption & Location metadata */}
        <div className="p-4 bg-white text-slate-800 space-y-2 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <h3 className="text-sm sm:text-base font-bold text-[#183153] leading-snug">
              {lang === 'hi' ? image.titleHi : image.titleEn}
            </h3>
            <span className="bg-[#F5F4EC] text-[#174A32] border border-[#D7DED8] px-2 py-0.5 rounded-xs font-semibold text-[10px] uppercase tracking-wider">
              {image.category}
            </span>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {lang === 'hi' ? image.captionHi : image.captionEn}
          </p>

          <div className="flex flex-wrap items-center justify-between pt-1 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-[#24563B]" />
              <span>{lang === 'hi' ? image.locationHi : image.locationEn}</span>
            </span>
            <span className="flex items-center space-x-1 font-mono">
              <Calendar className="w-3.5 h-3.5 text-[#B79A52]" />
              <span>{image.date}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
