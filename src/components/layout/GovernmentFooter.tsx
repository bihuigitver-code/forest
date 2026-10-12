import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Emblem } from './Emblem';
import { ArrowUp, ExternalLink, Info } from 'lucide-react';

export const GovernmentFooter: React.FC = () => {
  const { lang, t, openModal } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePolicyClick = (policyType: string) => {
    openModal('policy', { policyType });
  };

  return (
    <footer className="bg-[#183153] text-slate-300 border-t-4 border-[#174A32] text-xs">
      {/* Top Footer Banner: Disclaimer */}
      <div className="bg-[#0F2038] py-2 px-4 border-b border-slate-700 text-center text-[11px] text-[#E8DFB8]">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-1.5">
          <Info className="w-3.5 h-3.5 text-[#B79A52] flex-shrink-0" />
          <span>{t('disclaimerBanner')}</span>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Identity & About */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Emblem size={56} className="bg-white p-1 rounded-full shadow-inner" />
              <div>
                <h4 className="text-sm font-bold text-white font-devanagari">
                  {lang === 'hi' ? 'वन विभाग' : 'FOREST DEPARTMENT'}
                </h4>
                <p className="text-[11px] text-amber-200">
                  {lang === 'hi' ? 'पर्यावरण, वन एवं जलवायु परिवर्तन' : 'Environment & Forests Division'}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t('footerAboutText')}
            </p>
            <div className="pt-2 text-[11px] text-slate-400">
              <span className="font-semibold text-white block">{t('tollFreeEmergency')}</span>
              <span>{t('workingHours')}</span>
            </div>
          </div>

          {/* Column 2: External National & State Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#E8DFB8] uppercase tracking-wider border-b border-slate-700 pb-1.5">
              {t('footerImportantLinks')}
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <a
                  href="https://moef.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center space-x-1"
                >
                  <ExternalLink className="w-3 h-3 text-[#B79A52] flex-shrink-0" />
                  <span className="line-clamp-1">{t('linkMoEFCC')}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wii.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center space-x-1"
                >
                  <ExternalLink className="w-3 h-3 text-[#B79A52] flex-shrink-0" />
                  <span className="line-clamp-1">{t('linkWII')}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://fsi.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center space-x-1"
                >
                  <ExternalLink className="w-3 h-3 text-[#B79A52] flex-shrink-0" />
                  <span className="line-clamp-1">{t('linkFSI')}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://ntca.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center space-x-1"
                >
                  <ExternalLink className="w-3 h-3 text-[#B79A52] flex-shrink-0" />
                  <span className="line-clamp-1">{t('linkNTCA')}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://rtionline.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center space-x-1"
                >
                  <ExternalLink className="w-3 h-3 text-[#B79A52] flex-shrink-0" />
                  <span className="line-clamp-1">{t('linkRTI')}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Citizen Services Quick Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#E8DFB8] uppercase tracking-wider border-b border-slate-700 pb-1.5">
              {t('footerCitizenPortal')}
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <a href="#services-section" className="hover:text-white transition flex items-center space-x-1">
                  <span className="text-[#B79A52]">•</span>
                  <span>{t('navPermits')}</span>
                </a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-white transition flex items-center space-x-1">
                  <span className="text-[#B79A52]">•</span>
                  <span>{t('navWildlifeRescue')}</span>
                </a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-white transition flex items-center space-x-1">
                  <span className="text-[#B79A52]">•</span>
                  <span>{t('navFireReporting')}</span>
                </a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-white transition flex items-center space-x-1">
                  <span className="text-[#B79A52]">•</span>
                  <span>{t('navSaplingDistribution')}</span>
                </a>
              </li>
              <li>
                <a href="#contact-section" className="hover:text-white transition flex items-center space-x-1">
                  <span className="text-[#B79A52]">•</span>
                  <span>{t('navGrievance')}</span>
                </a>
              </li>
              <li>
                <a href="#documents-section" className="hover:text-white transition flex items-center space-x-1">
                  <span className="text-[#B79A52]">•</span>
                  <span>{lang === 'hi' ? 'आवेदन प्रपत्र संग्रह' : 'Official Application Forms'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Mandatory Website Policies */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#E8DFB8] uppercase tracking-wider border-b border-slate-700 pb-1.5">
              {t('footerPolicies')}
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button
                  onClick={() => handlePolicyClick('hyperlink')}
                  className="hover:text-white transition text-left"
                >
                  {t('policyHyperlink')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePolicyClick('privacy')}
                  className="hover:text-white transition text-left"
                >
                  {t('policyPrivacy')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePolicyClick('copyright')}
                  className="hover:text-white transition text-left"
                >
                  {t('policyCopyright')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePolicyClick('disclaimer')}
                  className="hover:text-white transition text-left"
                >
                  {t('policyDisclaimer')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePolicyClick('terms')}
                  className="hover:text-white transition text-left"
                >
                  {t('policyTerms')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePolicyClick('accessibility')}
                  className="hover:text-white transition text-left"
                >
                  {t('policyAccessibility')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Administration Metadata Strip */}
        <div className="mt-8 pt-6 border-t border-slate-700/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] text-slate-400">
          <div>
            <span className="text-slate-300 font-semibold block">{t('contentManagedBy')}</span>
            <span>Aranya Bhavan, Capital State Zone</span>
          </div>

          <div>
            <span className="text-slate-300 font-semibold block">{t('developedBy')}</span>
            <span>Standard GIGW-Compliant Architecture</span>
          </div>

          <div className="flex md:justify-end items-center">
            <span className="bg-[#0F2038] px-2.5 py-1 rounded border border-slate-700 text-[#E8DFB8] font-mono">
              {t('lastUpdated')}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Back to Top Bar */}
      <div className="bg-[#0F2038] border-t border-slate-800 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>{t('copyrightNotice')}</div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-1 bg-[#174A32] hover:bg-[#24563B] text-white rounded-xs border border-[#B79A52] transition text-xs font-semibold"
            aria-label="Scroll back to top of page"
          >
            <span>{t('backToTop')}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#B79A52]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
