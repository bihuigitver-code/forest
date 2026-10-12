import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { NoticeItem } from '../../types';
import { Emblem } from '../layout/Emblem';
import { 
  X, 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  Clock,
  Send
} from 'lucide-react';

interface NoticeModalProps {
  notice: NoticeItem;
  onClose: () => void;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({ notice, onClose }) => {
  const { lang, t, setCurrentView } = useLanguage();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSimulateDownload = () => {
    // Generate sample text file representing the departmental notice
    const textContent = `===============================================================
GOVERNMENT OF STATE — FOREST DEPARTMENT
DEPARTMENT OF ENVIRONMENT, FORESTS & CLIMATE CHANGE
ARANYA BHAVAN, HEADQUARTERS
===============================================================
OFFICIAL CIRCULAR / NOTIFICATION
Reference Number: ${notice.refNo}
Date of Notification: ${notice.date}
Issuing Directorate: ${notice.departmentEn}

SUBJECT: ${notice.titleEn}

SUMMARY / ADMINISTRATIVE ORDER:
${notice.summaryEn}

STATUTORY COMPLIANCE:
This notification is issued under the authority of the Principal Chief 
Conservator of Forests & Head of Forest Force (HoFF) for strict compliance 
by all territorial, wildlife, and social forestry circles.

Note: This is a demonstration file generated for prototype evaluation.
===============================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${notice.refNo.replace(/[/\\]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white max-w-2xl w-full max-h-[92vh] overflow-y-auto border-2 border-[#174A32] rounded-xs shadow-2xl flex flex-col justify-between my-auto">
        {/* Header */}
        <div className="bg-[#174A32] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#B79A52]">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#B79A52]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-200">
              {lang === 'hi' ? 'विभागीय राजपत्र / आदेश विवरण' : 'Departmental Order / Notice Preview'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#24563B] rounded text-slate-200 hover:text-white"
            aria-label="Close notice modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Official Document Letterhead Simulation */}
        <div className="p-6 space-y-4 text-xs text-slate-800">
          <div className="border border-[#D7DED8] p-5 bg-[#FAFAF7] rounded-xs shadow-inner">
            {/* Top official seal */}
            <div className="flex flex-col items-center text-center pb-4 border-b border-slate-300">
              <Emblem size={50} />
              <span className="text-xs font-bold uppercase tracking-wider text-[#174A32] mt-2">
                {lang === 'hi' ? 'पर्यावरण, वन एवं जलवायु परिवर्तन विभाग' : 'Department of Environment, Forests & Climate Change'}
              </span>
              <span className="text-[11px] text-slate-600 font-semibold">
                {lang === 'hi' ? 'अरण्य भवन मुख्यालय — प्रशासन प्रभाग' : 'Aranya Bhavan State Headquarters'}
              </span>
            </div>

            {/* Reference & Date strip */}
            <div className="flex flex-wrap items-center justify-between py-2.5 border-b border-slate-300 text-slate-600 font-mono text-[11px]">
              <div>
                <strong>{t('refNoLabel')}:</strong> {notice.refNo}
              </div>
              <div>
                <strong>{lang === 'hi' ? 'दिनांक' : 'Date'}:</strong> {notice.date}
              </div>
            </div>

            {/* Notice Category Badge */}
            <div className="pt-3 pb-1">
              <span className="inline-block bg-[#174A32] text-[#E8DFB8] px-2.5 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider">
                {notice.category}
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-sm sm:text-base font-bold text-[#183153] mt-2 leading-snug">
              {lang === 'hi' ? notice.titleHi : notice.titleEn}
            </h2>

            {/* Issuing Wing */}
            <div className="text-[11px] text-[#24563B] font-semibold mt-1">
              {lang === 'hi' ? notice.departmentHi : notice.departmentEn}
            </div>

            {/* Summary text */}
            <div className="mt-4 pt-3 border-t border-slate-200 space-y-2 text-slate-700 leading-relaxed text-xs sm:text-sm">
              <p>{lang === 'hi' ? notice.summaryHi : notice.summaryEn}</p>
              <p className="text-[11px] text-slate-500 italic">
                {lang === 'hi'
                  ? 'यह आदेश सक्षम प्राधिकारी के अनुमोदनोपरांत जारी किया गया है। क्षेत्रीय कार्यालयों द्वारा नियमानुसार अनुपालन सुनिश्चित किया जाए।'
                  : 'This order is released with the concurrence of the competent forest authority for immediate field compliance.'}
              </p>
            </div>

            {/* Tender specific closing date if present */}
            {notice.closingDate && (
              <div className="mt-4 p-2.5 bg-amber-50 border border-amber-300 rounded-xs flex items-center space-x-2 text-amber-900 font-semibold text-xs">
                <Clock className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>
                  {t('closingDateLabel')}: {notice.closingDate}
                </span>
              </div>
            )}
          </div>

          {/* Download Success Feedback */}
          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xs flex items-center space-x-2 text-emerald-800 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>
                {lang === 'hi'
                  ? 'दस्तावेज प्रतिरूप (Demo Document) सफलतापूर्वक डाउनलोड हुआ।'
                  : 'Sample demonstration document text downloaded successfully.'}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#F5F4EC] px-5 py-3 border-t border-[#D7DED8] flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {notice.isApplyOpen && (
              <button
                onClick={() => {
                  onClose();
                  setCurrentView('apply');
                }}
                className="px-4 py-1.5 bg-gradient-to-r from-emerald-700 to-[#174A32] hover:from-emerald-800 hover:to-[#0F2038] text-white font-bold rounded-xs transition text-xs flex items-center space-x-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'hi' ? 'ऑनलाइन आवेदन करें (Apply Now)' : 'Apply Online'}</span>
              </button>
            )}

            <button
              onClick={handleSimulateDownload}
              className="px-4 py-1.5 bg-[#24563B] hover:bg-[#174A32] text-white font-semibold rounded-xs transition text-xs flex items-center space-x-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#E8DFB8]" />
              <span>{lang === 'hi' ? 'दस्तावेज डाउनलोड करें' : 'Download Document Order'} ({notice.fileSize})</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-[#D7DED8] font-semibold rounded-xs transition text-xs flex items-center space-x-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'प्रिंट' : 'Print'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-xs transition text-xs"
          >
            {lang === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
