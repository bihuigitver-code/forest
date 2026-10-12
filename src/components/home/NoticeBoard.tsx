import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { noticesData } from '../../data/notices';
import type { NoticeItem } from '../../types';
import { 
  FileText, 
  Calendar, 
  Download, 
  Search, 
  ExternalLink, 
  Briefcase, 
  Bell, 
  Clock, 
  Tag, 
  Send
} from 'lucide-react';

export const NoticeBoard: React.FC = () => {
  const { lang, t, searchQuery, openModal, setCurrentView } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'notification' | 'tender' | 'recruitment'>('all');
  const [localSearch, setLocalSearch] = useState('');

  // Combine global header search with local search
  const effectiveSearch = localSearch || searchQuery;

  const filteredNotices = useMemo(() => {
    return noticesData.filter((item) => {
      // Tab filter
      if (activeTab === 'notification') {
        if (item.category !== 'notification' && item.category !== 'circular' && !item.alsoInNotifications) {
          return false;
        }
      }
      if (activeTab === 'tender' && item.category !== 'tender') return false;
      if (activeTab === 'recruitment' && item.category !== 'recruitment') return false;

      // Search query
      if (effectiveSearch.trim()) {
        const query = effectiveSearch.toLowerCase().trim();
        const title = (lang === 'hi' ? item.titleHi : item.titleEn).toLowerCase();
        const refNo = item.refNo.toLowerCase();
        const dept = (lang === 'hi' ? item.departmentHi : item.departmentEn).toLowerCase();
        return title.includes(query) || refNo.includes(query) || dept.includes(query);
      }
      return true;
    });
  }, [activeTab, effectiveSearch, lang]);

  const handleOpenNotice = (item: NoticeItem) => {
    openModal('notice', item);
  };

  const handleDownloadDemo = (e: React.MouseEvent, item: NoticeItem) => {
    e.stopPropagation();
    openModal('notice', item);
  };

  return (
    <section id="notices-section" className="py-10 bg-[#FAFAF7] border-b border-[#D7DED8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#174A32] pb-3 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#B79A52] uppercase tracking-wider">
              <Bell className="w-3.5 h-3.5 text-[#24563B]" />
              <span>{lang === 'hi' ? 'आधिकारिक सूचना पटल' : 'Official Notice Board'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-[#174A32] mt-0.5">
              {t('noticesHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t('noticesSubheading')}
            </p>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white border border-[#D7DED8] p-3 rounded-sm mb-5 shadow-gov-sm flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto" role="tablist">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition ${
                activeTab === 'all'
                  ? 'bg-[#174A32] text-white shadow-xs'
                  : 'bg-[#F5F4EC] text-slate-700 hover:bg-slate-200'
              }`}
              role="tab"
              aria-selected={activeTab === 'all'}
            >
              {lang === 'hi' ? 'सभी सूचनाएं' : 'All Notices'} ({noticesData.length})
            </button>
            <button
              onClick={() => setActiveTab('notification')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition flex items-center space-x-1 ${
                activeTab === 'notification'
                  ? 'bg-[#174A32] text-white shadow-xs'
                  : 'bg-[#F5F4EC] text-slate-700 hover:bg-slate-200'
              }`}
              role="tab"
              aria-selected={activeTab === 'notification'}
            >
              <FileText className="w-3 h-3" />
              <span>{t('tabLatestNotices')}</span>
            </button>
            <button
              onClick={() => setActiveTab('tender')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition flex items-center space-x-1 ${
                activeTab === 'tender'
                  ? 'bg-[#174A32] text-white shadow-xs'
                  : 'bg-[#F5F4EC] text-slate-700 hover:bg-slate-200'
              }`}
              role="tab"
              aria-selected={activeTab === 'tender'}
            >
              <Tag className="w-3 h-3" />
              <span>{t('tabTenders')}</span>
            </button>
            <button
              onClick={() => setActiveTab('recruitment')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition flex items-center space-x-1 ${
                activeTab === 'recruitment'
                  ? 'bg-[#174A32] text-white shadow-xs'
                  : 'bg-[#F5F4EC] text-slate-700 hover:bg-slate-200'
              }`}
              role="tab"
              aria-selected={activeTab === 'recruitment'}
            >
              <Briefcase className="w-3 h-3" />
              <span>{t('tabRecruitment')}</span>
            </button>
          </div>

          {/* Search within notices */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={t('filterSearch')}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#D7DED8] rounded-xs bg-[#FAFAF7] text-slate-800 placeholder-slate-500 focus:bg-white focus:outline-none focus:border-[#24563B]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            {localSearch && (
              <button
                onClick={() => setLocalSearch('')}
                className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Notices Table / Government Panel Grid */}
        <div className="bg-white border border-[#D7DED8] shadow-gov-sm overflow-hidden">
          <div className="divide-y divide-[#D7DED8]">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => {
                const isTender = notice.category === 'tender';
                const isRecruitment = notice.category === 'recruitment';

                return (
                  <div
                    key={notice.id}
                    onClick={() => handleOpenNotice(notice)}
                    className="p-4 sm:p-5 hover:bg-[#F5F4EC] transition cursor-pointer group flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1 pr-0 md:pr-4">
                      {/* Meta badges row */}
                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        {notice.isNew && (
                          <span className="bg-red-700 text-white font-bold px-1.5 py-0.5 rounded-xs tracking-wider animate-pulse">
                            {t('badgeNew')}
                          </span>
                        )}
                        <span
                          className={`font-semibold px-2 py-0.5 rounded-xs uppercase tracking-wide border ${
                            isTender
                              ? 'bg-amber-50 text-amber-900 border-amber-300'
                              : isRecruitment
                              ? 'bg-blue-50 text-blue-900 border-blue-300'
                              : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                          }`}
                        >
                          {notice.category}
                        </span>
                        <span className="text-slate-500 flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-[#24563B]" />
                          <span>{notice.date}</span>
                        </span>
                        <span className="font-mono text-slate-500 border-l border-slate-300 pl-2">
                          {notice.refNo}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 group-hover:text-[#174A32] leading-snug">
                        {lang === 'hi' ? notice.titleHi : notice.titleEn}
                      </h3>

                      {/* Department Wing & Summary snippet + Apply button */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5">
                        <p className="text-xs text-slate-600 line-clamp-1 flex-1">
                          <span className="font-medium text-[#24563B]">
                            {lang === 'hi' ? notice.departmentHi : notice.departmentEn}:
                          </span>{' '}
                          {lang === 'hi' ? notice.summaryHi : notice.summaryEn}
                        </p>
                        {notice.isApplyOpen && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentView('apply');
                            }}
                            className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gradient-to-r from-emerald-700 to-[#174A32] hover:from-emerald-800 hover:to-[#0F2038] text-white font-bold text-xs rounded-xs border border-emerald-500 shadow-sm transition flex-shrink-0 animate-pulse hover:animate-none"
                            title="Direct Recruitment Online Application Portal"
                          >
                            <Send className="w-3 h-3 text-amber-300" />
                            <span>{lang === 'hi' ? 'आवेदन करें (Apply Now)' : 'Apply Online'}</span>
                          </button>
                        )}
                      </div>

                      {/* Tender Closing Date info if present */}
                      {notice.closingDate && (
                        <div className="inline-flex items-center space-x-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-700" />
                          <span>{t('closingDateLabel')}: {notice.closingDate}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions column */}
                    <div className="flex items-center space-x-2 flex-shrink-0 self-end md:self-center">
                      {notice.isApplyOpen && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentView('apply');
                            }}
                            className="px-3 py-1.5 text-xs font-bold text-[#183153] bg-[#E8DFB8] hover:bg-[#d6cb99] border border-[#B79A52] rounded-xs transition flex items-center space-x-1 shadow-xs cursor-pointer"
                          >
                            <Send className="w-3 h-3 text-[#183153]" />
                            <span>{lang === 'hi' ? 'ऑनलाइन आवेदन' : 'Apply Online'}</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentView('status');
                            }}
                            className="px-2.5 py-1.5 text-xs font-bold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-400 rounded-xs transition flex items-center space-x-1 shadow-xs cursor-pointer"
                            title={lang === 'hi' ? 'आवेदन स्थिति जांचें' : 'Check Application Status'}
                          >
                            <Search className="w-3 h-3 text-emerald-800" />
                            <span>{lang === 'hi' ? 'स्थिति जांचें' : 'Track Status'}</span>
                          </button>
                        </>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenNotice(notice);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-[#174A32] bg-[#F5F4EC] hover:bg-[#E8DFB8] border border-[#D7DED8] rounded-xs transition flex items-center space-x-1"
                      >
                        <ExternalLink className="w-3 h-3 text-[#24563B]" />
                        <span>{t('viewDetails')}</span>
                      </button>

                      <button
                        onClick={(e) => handleDownloadDemo(e, notice)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#24563B] hover:bg-[#174A32] rounded-xs transition flex items-center space-x-1 shadow-xs"
                        title="Download sample document order"
                      >
                        <Download className="w-3 h-3" />
                        <span>PDF ({notice.fileSize})</span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs sm:text-sm">
                {lang === 'hi'
                  ? 'कोई सूचना नहीं मिली। कृपया भिन्न खोज शब्द का प्रयोग करें।'
                  : 'No notices found matching your criteria. Please refine your filter.'}
              </div>
            )}
          </div>
        </div>

        {/* Footer View All Link */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
          <span>
            {lang === 'hi'
              ? `कुल ${filteredNotices.length} रिकॉर्ड प्रदर्शित`
              : `Displaying ${filteredNotices.length} official entries`}
          </span>
          <button
            onClick={() => setActiveTab('all')}
            className="font-bold text-[#174A32] hover:text-[#B79A52] hover:underline flex items-center space-x-1"
          >
            <span>{t('viewAllNotices')}</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
