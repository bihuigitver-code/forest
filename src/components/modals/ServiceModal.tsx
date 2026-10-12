import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { CitizenService } from '../../types';
import { 
  X, 
  FileCheck, 
  CheckCircle2, 
  Phone, 
  Send
} from 'lucide-react';

interface ServiceModalProps {
  service: CitizenService;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  const { lang, t } = useLanguage();
  const [applicantName, setApplicantName] = useState('');
  const [applicantMobile, setApplicantMobile] = useState('');
  const [isDemoApplied, setIsDemoApplied] = useState(false);
  const [demoAppRef, setDemoAppRef] = useState('');

  const handleDemoApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantMobile) {
      alert(lang === 'hi' ? 'कृपया नाम और मोबाइल नंबर भरें।' : 'Please enter name and mobile number.');
      return;
    }
    setDemoAppRef(`FD-APP-2026-${Math.floor(10000 + Math.random() * 90000)}`);
    setIsDemoApplied(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white max-w-2xl w-full max-h-[92vh] overflow-y-auto border-2 border-[#174A32] rounded-xs shadow-2xl flex flex-col justify-between my-auto">
        {/* Header */}
        <div className="bg-[#174A32] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#B79A52]">
          <div className="flex items-center space-x-2">
            <FileCheck className="w-5 h-5 text-[#B79A52]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-200">
              {lang === 'hi' ? 'नागरिक सेवा विवरण' : 'Citizen Service Portal'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#24563B] rounded text-slate-200 hover:text-white"
            aria-label="Close service modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 text-xs text-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#183153] font-devanagari leading-snug">
              {lang === 'hi' ? service.titleHi : service.titleEn}
            </h2>
            <p className="text-slate-600 mt-2 leading-relaxed text-xs sm:text-sm">
              {lang === 'hi' ? service.fullDescHi : service.fullDescEn}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-[#F5F4EC] border border-[#D7DED8] p-3 rounded-xs">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                {t('serviceTimeline')}
              </span>
              <span className="font-bold text-[#174A32]">{service.timeframe}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                {t('serviceFee')}
              </span>
              <span className="font-bold text-[#183153]">{service.fee}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                {lang === 'hi' ? 'सेवा का प्रकार' : 'Service Type'}
              </span>
              <span className="font-semibold text-emerald-800">
                {service.onlineAvailable ? t('serviceOnline') : t('serviceInfo')}
              </span>
            </div>
          </div>

          {/* Emergency Helpline highlight if present */}
          {service.helpline && (
            <div className="bg-red-50 border-l-4 border-red-700 p-3 rounded-r-xs flex items-center space-x-2 text-red-900 font-bold">
              <Phone className="w-4 h-4 text-red-700 flex-shrink-0" />
              <span>{service.helpline}</span>
            </div>
          )}

          {/* Required Documents Checklist */}
          <div className="bg-[#FAFAF7] border border-[#D7DED8] p-4 rounded-xs space-y-2">
            <h3 className="font-bold uppercase tracking-wider text-[#174A32] text-xs">
              {lang === 'hi' ? 'अनिवार्य संलग्नक एवं आवश्यक दस्तावेज' : 'Mandatory Enclosures & Documents Required'}
            </h3>
            <ul className="space-y-1.5">
              {(lang === 'hi' ? service.documentsHi : service.documentsEn).map((doc, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#24563B] flex-shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Procedure Steps */}
          <div className="bg-white border border-[#D7DED8] p-4 rounded-xs space-y-2">
            <h3 className="font-bold uppercase tracking-wider text-[#183153] text-xs">
              {lang === 'hi' ? 'आवेदन व स्वीकृति प्रक्रिया (क्रमवार)' : 'Step-by-Step Statutory Procedure'}
            </h3>
            <ol className="space-y-1.5 list-decimal pl-4 text-slate-700">
              {(lang === 'hi' ? service.procedureStepsHi : service.procedureStepsEn).map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Prototype Demonstration Application Form */}
          <div className="border border-amber-300 bg-amber-50/50 p-4 rounded-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900 text-xs uppercase tracking-wide">
                {lang === 'hi' ? 'प्रारूप डिजिटल आवेदन विंडो' : 'Prototype Online Submission Window'}
              </span>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-mono">
                New
              </span>
            </div>

            {!isDemoApplied ? (
              <form onSubmit={handleDemoApply} className="space-y-2.5">
                <p className="text-[11px] text-slate-600">
                  {lang === 'hi'
                    ? 'नीचे विवरण भरें ताकि सेवा स्वीकृति पर्ची (Acknowlegement Slip) का प्रारूप उत्पन्न किया जा सके:'
                    : 'Fill basic details below to preview standard statutory service acknowledgement:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder={lang === 'hi' ? 'आवेदक का नाम' : 'Applicant Full Name'}
                    className="p-1.5 border border-[#D7DED8] rounded-xs bg-white text-xs"
                  />
                  <input
                    type="tel"
                    required
                    value={applicantMobile}
                    onChange={(e) => setApplicantMobile(e.target.value)}
                    placeholder={lang === 'hi' ? '10-अंकीय मोबाइल नंबर' : '10-digit Mobile'}
                    className="p-1.5 border border-[#D7DED8] rounded-xs bg-white text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#24563B] hover:bg-[#174A32] text-white font-semibold rounded-xs transition text-xs flex items-center space-x-1"
                >
                  <Send className="w-3 h-3" />
                  <span>{lang === 'hi' ? 'प्रारूप पावती उत्पन्न करें' : 'Generate Demo Acknowledgement'}</span>
                </button>
              </form>
            ) : (
              <div className="p-3 bg-white border border-emerald-300 rounded-xs space-y-1.5">
                <div className="flex items-center space-x-1.5 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>
                    {lang === 'hi'
                      ? 'प्रारूप पावती टोकन सफलतापूर्वक उत्पन्न हुआ!'
                      : 'Sample Service Acknowledgement Slip Generated!'}
                  </span>
                </div>
                <div className="font-mono text-xs bg-slate-100 p-2 rounded">
                  <div><strong>Application Ref:</strong> {demoAppRef}</div>
                  <div><strong>Applicant:</strong> {applicantName} ({applicantMobile})</div>
                  <div><strong>Service:</strong> {service.titleEn}</div>
                  <div><strong>Routing Office:</strong> Divisional Forest Office (DFO)</div>
                  <div><strong>Status:</strong> PROTOTYPE SIMULATION (Not submitted to official state server)</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F5F4EC] px-5 py-3 border-t border-[#D7DED8] flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            {lang === 'hi' ? 'मार्गदर्शिका: राज्य वन नियम संग्रह' : 'Manual Ref: State Forest Regulatory Compendium'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#174A32] hover:bg-[#24563B] text-white font-semibold rounded-xs transition text-xs"
          >
            {lang === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
