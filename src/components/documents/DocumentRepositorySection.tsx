import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { documentsData } from '../../data/documents';
import type { DocumentItem } from '../../types';
import { Search, Download, Scale } from 'lucide-react';

export const DocumentRepositorySection: React.FC = () => {
  const { lang, t, openModal } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQueryLocal, setSearchQueryLocal] = useState<string>('');

  const filteredDocs = useMemo(() => {
    return documentsData.filter((doc) => {
      // Category filter
      if (selectedCategory !== 'all' && doc.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQueryLocal.trim()) {
        const q = searchQueryLocal.toLowerCase().trim();
        const title = (lang === 'hi' ? doc.titleHi : doc.titleEn).toLowerCase();
        const docNo = doc.docNumber.toLowerCase();
        return title.includes(q) || docNo.includes(q);
      }
      return true;
    });
  }, [selectedCategory, searchQueryLocal, lang]);

  const handleDownload = (doc: DocumentItem) => {
    // Interactive download feedback modal
    openModal('policy', {
      title: lang === 'hi' ? doc.titleHi : doc.titleEn,
      category: doc.category,
      docNumber: doc.docNumber,
      fileSize: doc.fileSize,
      publishedDate: doc.publishedDate
    });
  };

  return (
    <section id="documents-section" className="py-12 bg-white border-b border-[#D7DED8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#174A32] pb-3 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#B79A52] uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-[#24563B]" />
              <span>{lang === 'hi' ? 'वैधानिक दस्तावेज एवं अभिलेख' : 'Statutory Acts & Repository'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-[#174A32] mt-0.5">
              {t('docsHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              {t('docsSubheading')}
            </p>
          </div>

          <div className="text-[11px] text-slate-500 bg-[#F5F4EC] border border-[#D7DED8] px-3 py-1.5 rounded-xs">
            {lang === 'hi'
              ? 'प्रमाणित राजपत्र एवं प्रारूप प्रपत्र संग्रह'
              : 'Official Gazette Acts & Working Guidelines'}
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="bg-[#FAFAF7] border border-[#D7DED8] p-3 rounded-xs mb-5 shadow-gov-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition ${
                selectedCategory === 'all'
                  ? 'bg-[#174A32] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-[#D7DED8] hover:bg-slate-100'
              }`}
            >
              {t('allCategories')} ({documentsData.length})
            </button>
            <button
              onClick={() => setSelectedCategory('act')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition ${
                selectedCategory === 'act'
                  ? 'bg-[#174A32] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-[#D7DED8] hover:bg-slate-100'
              }`}
            >
              {lang === 'hi' ? 'अधिनियम (Acts)' : 'Statutory Acts'}
            </button>
            <button
              onClick={() => setSelectedCategory('rule')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition ${
                selectedCategory === 'rule'
                  ? 'bg-[#174A32] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-[#D7DED8] hover:bg-slate-100'
              }`}
            >
              {lang === 'hi' ? 'नियम व नियमावली' : 'Rules & Notifications'}
            </button>
            <button
              onClick={() => setSelectedCategory('circular')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition ${
                selectedCategory === 'circular'
                  ? 'bg-[#174A32] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-[#D7DED8] hover:bg-slate-100'
              }`}
            >
              {lang === 'hi' ? 'परिपत्र व दिशा-निर्देश' : 'Circulars & Guidelines'}
            </button>
            <button
              onClick={() => setSelectedCategory('form')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition ${
                selectedCategory === 'form'
                  ? 'bg-[#174A32] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-[#D7DED8] hover:bg-slate-100'
              }`}
            >
              {lang === 'hi' ? 'आवेदन प्रपत्र' : 'Forms & Proformas'}
            </button>
            <button
              onClick={() => setSelectedCategory('report')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition ${
                selectedCategory === 'report'
                  ? 'bg-[#174A32] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-[#D7DED8] hover:bg-slate-100'
              }`}
            >
              {lang === 'hi' ? 'वार्षिक प्रतिवेदन' : 'Annual Reports'}
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              value={searchQueryLocal}
              onChange={(e) => setSearchQueryLocal(e.target.value)}
              placeholder={t('searchDocsPlaceholder')}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#D7DED8] rounded-xs bg-white text-slate-800 placeholder-slate-500 focus:outline-none focus:border-[#24563B]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            {searchQueryLocal && (
              <button
                onClick={() => setSearchQueryLocal('')}
                className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Document Repository Table: Traditional government layout */}
        <div className="border border-[#D7DED8] rounded-xs overflow-x-auto shadow-gov-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#174A32] text-white border-b-2 border-[#B79A52]">
                <th className="py-2.5 px-3 font-semibold uppercase tracking-wider w-12 text-center">
                  #
                </th>
                <th className="py-2.5 px-4 font-semibold uppercase tracking-wider">
                  {t('docColTitle')}
                </th>
                <th className="py-2.5 px-3 font-semibold uppercase tracking-wider hidden sm:table-cell">
                  {t('docColCategory')}
                </th>
                <th className="py-2.5 px-3 font-semibold uppercase tracking-wider hidden md:table-cell">
                  {t('docColRef')}
                </th>
                <th className="py-2.5 px-3 font-semibold uppercase tracking-wider hidden lg:table-cell">
                  {t('docColDate')}
                </th>
                <th className="py-2.5 px-3 font-semibold uppercase tracking-wider hidden sm:table-cell">
                  {t('docColSize')}
                </th>
                <th className="py-2.5 px-3 font-semibold uppercase tracking-wider text-center w-28">
                  {t('docColAction')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D7DED8] bg-white">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc, idx) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-[#F5F4EC] transition group cursor-pointer"
                    onClick={() => handleDownload(doc)}
                  >
                    <td className="py-3 px-3 text-center font-mono text-slate-500 font-medium">
                      {idx + 1}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 group-hover:text-[#174A32] leading-snug">
                        {lang === 'hi' ? doc.titleHi : doc.titleEn}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 sm:hidden font-mono">
                        {doc.docNumber} • {doc.publishedDate}
                      </div>
                    </td>

                    <td className="py-3 px-3 hidden sm:table-cell">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-xs border border-slate-300 font-semibold text-[10px] uppercase tracking-wider">
                        {doc.category}
                      </span>
                    </td>

                    <td className="py-3 px-3 hidden md:table-cell font-mono text-slate-600 text-[11px]">
                      {doc.docNumber}
                    </td>

                    <td className="py-3 px-3 hidden lg:table-cell text-slate-600 whitespace-nowrap">
                      {doc.publishedDate}
                    </td>

                    <td className="py-3 px-3 hidden sm:table-cell whitespace-nowrap font-mono text-slate-500 text-[11px]">
                      {doc.fileSize} [{doc.fileType}]
                    </td>

                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(doc);
                        }}
                        className="px-2.5 py-1 bg-[#24563B] hover:bg-[#174A32] text-white text-[11px] font-semibold rounded-xs transition inline-flex items-center space-x-1 shadow-xs"
                      >
                        <Download className="w-3 h-3" />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    {lang === 'hi' ? 'कोई दस्तावेज नहीं मिला।' : 'No statutory documents matching your search.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info row */}
        <div className="mt-3 text-xs text-slate-500 flex items-center justify-between">
          <span>
            {lang === 'hi'
              ? 'दस्तावेज प्रारूप: आधिकारिक राजपत्र प्रतिरूप'
              : 'Repository archive maintained as demonstration statutory database.'}
          </span>
          <span className="font-semibold text-[#174A32]">
            {filteredDocs.length} {lang === 'hi' ? 'अभिलेख उपलब्ध' : 'Files Listed'}
          </span>
        </div>
      </div>
    </section>
  );
};
