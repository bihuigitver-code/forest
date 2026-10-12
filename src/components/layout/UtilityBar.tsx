import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Phone, Eye, Volume2 } from 'lucide-react';

export const UtilityBar: React.FC = () => {
  const { lang, setLang, t, fontSize, setFontSize, highContrast, toggleHighContrast, setCurrentView } = useLanguage();

  return (
    <div className="bg-[#183153] text-white border-b border-[#24563B] text-xs font-medium">
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-1 focus:left-2 focus:z-50 focus:bg-[#B79A52] focus:text-[#183153] focus:px-3 focus:py-1 focus:font-bold focus:shadow-md"
      >
        {t('skipToMain')}
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-1.5 gap-y-1">
          {/* Left: State & Department Identity */}
          <div className="flex items-center space-x-3 text-slate-200">
            <span className="font-semibold text-white tracking-wide border-r border-slate-600 pr-3 hidden sm:inline">
              {t('stateGovernment')}
            </span>
            <span className="text-slate-300 hidden md:inline truncate max-w-xs lg:max-w-none">
              {t('departmentNameFull')}
            </span>
            <div className="flex items-center space-x-1 text-[#E8DFB8] font-bold pl-1 sm:pl-0">
              <Phone className="w-3 h-3 text-[#B79A52]" />
              <span className="tracking-wide">1926</span>
              <span className="hidden xl:inline text-slate-300 font-normal text-[11px]">
                ({lang === 'hi' ? 'वनाग्नि व वन्यजीव आपात' : 'Toll-Free Control Room'})
              </span>
            </div>
            <button
              onClick={() => setCurrentView('status')}
              className="hidden md:inline-flex items-center space-x-1 text-[#E8DFB8] hover:text-white font-bold border border-[#B79A52]/60 px-2 py-0.5 rounded-xs bg-[#B79A52]/20 hover:bg-[#B79A52]/40 transition cursor-pointer text-[11px]"
              title={lang === 'hi' ? 'आवेदन स्थिति जांचें' : 'Track Application Status'}
            >
              <span>{lang === 'hi' ? '🔍 आवेदन स्थिति' : '🔍 Track Status'}</span>
            </button>
          </div>

          {/* Right: Accessibility Controls & Language Selector */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Screen Reader quick link */}
            <button
              onClick={() => {
                alert(
                  lang === 'hi'
                    ? 'यह पोर्टल भारत सरकार के GIGW मानकों के अनुरूप स्क्रीन रीडर सुलभ है (NVDA, JAWS, TalkBack समर्थित)।'
                    : 'This portal complies with Indian Government Web Guidelines (GIGW) for Screen Reader accessibility (Supports NVDA, JAWS, VoiceOver).'
                );
              }}
              title={t('screenReader')}
              className="hidden lg:flex items-center space-x-1 text-slate-300 hover:text-white transition-colors"
            >
              <Volume2 className="w-3 h-3 text-[#B79A52]" />
              <span className="text-[11px]">{t('screenReader')}</span>
            </button>

            {/* Font Sizing Controls (A-, A, A+) */}
            <div className="flex items-center bg-[#0F2038] rounded border border-slate-700 px-1 py-0.5 space-x-1">
              <span className="text-[11px] text-slate-400 mr-1 hidden sm:inline">
                {lang === 'hi' ? 'आकार:' : 'Font:'}
              </span>
              <button
                onClick={() => setFontSize('sm')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition ${
                  fontSize === 'sm'
                    ? 'bg-[#B79A52] text-[#183153]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="Decrease font size"
                aria-label="Decrease font size"
              >
                {t('fontAminus')}
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition ${
                  fontSize === 'base'
                    ? 'bg-[#B79A52] text-[#183153]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="Default font size"
                aria-label="Default font size"
              >
                {t('fontAnormal')}
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition ${
                  fontSize === 'lg'
                    ? 'bg-[#B79A52] text-[#183153]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="Increase font size"
                aria-label="Increase font size"
              >
                {t('fontAplus')}
              </button>
            </div>

            {/* High Contrast Mode Toggle */}
            <button
              onClick={toggleHighContrast}
              className={`flex items-center space-x-1 px-2 py-0.5 rounded border text-[11px] transition ${
                highContrast
                  ? 'bg-yellow-400 text-black border-yellow-300 font-bold'
                  : 'bg-[#0F2038] text-slate-300 border-slate-700 hover:text-white'
              }`}
              title="Toggle High Contrast Display"
            >
              <Eye className="w-3 h-3 text-[#B79A52]" />
              <span className="hidden sm:inline">
                {highContrast ? t('contrastNormal') : t('contrastHigh')}
              </span>
            </button>

            {/* Bilingual Language Switcher */}
            <div className="flex items-center border border-[#B79A52] rounded overflow-hidden">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 text-[11px] font-bold transition ${
                  lang === 'en'
                    ? 'bg-[#B79A52] text-[#183153]'
                    : 'bg-[#183153] text-slate-200 hover:bg-[#24563B]'
                }`}
                aria-pressed={lang === 'en'}
              >
                English
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-0.5 text-[11px] font-bold font-devanagari transition ${
                  lang === 'hi'
                    ? 'bg-[#B79A52] text-[#183153]'
                    : 'bg-[#183153] text-slate-200 hover:bg-[#24563B]'
                }`}
                aria-pressed={lang === 'hi'}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
