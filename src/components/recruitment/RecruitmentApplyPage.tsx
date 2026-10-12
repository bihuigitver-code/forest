import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Emblem } from '../layout/Emblem';
import { PaymentGateway } from './PaymentGateway';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  GraduationCap, 
  CreditCard,
  Briefcase,
  Phone,
  Mail,
  MessageSquare,
  Building2,
  Calendar,
  FileCheck,
  ShieldCheck,
  Printer,
  Receipt,
  Search
} from 'lucide-react';
import { CheckApplicationStatus } from './CheckApplicationStatus';

export interface RecruitmentApplyPageProps {
  initialTab?: 'apply' | 'status';
}

export const RecruitmentApplyPage: React.FC<RecruitmentApplyPageProps> = ({ initialTab = 'apply' }) => {
  const { lang, setCurrentView } = useLanguage();
  const [activePortalTab, setActivePortalTab] = useState<'apply' | 'status'>(initialTab);

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal & Family Details
    fullName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    gender: 'male',
    maritalStatus: 'unmarried',
    category: 'gen',
    mobile: '',
    email: '',
    aadhaar: '',
    identificationMark: '',
    domicileState: 'State Resident (मूल निवासी)',

    // Address
    addressLine: '',
    district: '',
    pincode: '',
    sameAsPermanent: true,
    permanentAddress: '',

    // Present Employment Details (As requested by user)
    isEmployed: 'no', // 'yes' | 'no'
    employerName: '',
    employmentType: 'regular', // regular | contractual | adhoc | private
    currentPost: '',
    leavingDate: '', // पद छोड़ने / कार्यमुक्त होने की तिथि (Relieving Date)
    nocStatus: 'obtained', // obtained | applied | na
    nocRefNo: '',

    // Step 2: Post & Education
    appliedPost: 'forest_guard', // 'forest_guard' | 'forest_police' | 'forest_clerk'
    
    // 10th / Matriculation
    tenthBoard: 'State Board of Secondary Education',
    tenthYear: '2022',
    tenthRollNo: '',
    tenthPercent: '78.5',

    // 12th / Intermediate
    twelfthBoard: 'State Board of Intermediate Education',
    twelfthStream: 'science',
    twelfthYear: '2024',
    twelfthRollNo: '',
    twelfthPercent: '81.2',

    // Cadre-specific qualifications
    typingCertificate: 'yes', // For Forest Clerk
    typingSpeedHindi: '30 wpm',
    typingSpeedEng: '35 wpm',
    nccWing: 'none', // For Forest Police: none | ncc_a | ncc_b | ncc_c
    physicalFitnessDeclared: true, // For Forest Guard & Police

    // Home District
    homeDistrict: '',
    preferredDivision1: 'Central Territorial Division',
    preferredDivision2: 'South Forest Division',

    // Declaration
    agreed: false
  });

  const [submittedAppNo, setSubmittedAppNo] = useState<string | null>(null);
  const [submittedUtr, setSubmittedUtr] = useState<string>('');
  const [submittedScreenshot, setSubmittedScreenshot] = useState<string | null>(null);
  const [tempAppRef] = useState<string>(() => `FD-REC-2026-${Math.floor(100000 + Math.random() * 900000)}`);

  const getFeeInfo = (cat: string) => {
    switch (cat) {
      case 'sc':
      case 'st':
        return { amount: 500, label: '₹500/-', catName: 'SC / ST (अनुसूचित जाति / जनजाति)' };
      case 'obc':
        return { amount: 600, label: '₹600/-', catName: 'OBC (अन्य पिछड़ा वर्ग)' };
      case 'gen':
      case 'ews':
      default:
        return { amount: 700, label: '₹700/-', catName: 'General (अनारक्षित / ईडब्ल्यूएस)' };
    }
  };

  const currentFee = getFeeInfo(formData.category);

  const getPostTitle = (postKey: string) => {
    switch (postKey) {
      case 'forest_police':
        return lang === 'hi' ? 'वन सुरक्षा पुलिस (Forest Police)' : 'Forest Police (Vigilance Force)';
      case 'forest_clerk':
        return lang === 'hi' ? 'वन लिपिक (Forest Clerk)' : 'Forest Clerk (Ministerial Cadre)';
      case 'forest_guard':
      default:
        return lang === 'hi' ? 'वन रक्षक (Forest Guard)' : 'Forest Guard (Beat Cadre)';
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
      window.scrollTo({ top: 250, behavior: 'smooth' });
    } else if (currentStep === 2) {
      setCurrentStep(3);
      window.scrollTo({ top: 250, behavior: 'smooth' });
    }
  };

  // Called when payment is successfully confirmed in Step 3
  const handlePaymentSuccess = (utr: string, screenshot?: string | null) => {
    setSubmittedUtr(utr);
    if (screenshot) setSubmittedScreenshot(screenshot);
    setSubmittedAppNo(tempAppRef);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F4EC] text-slate-800 flex flex-col font-sans">
      {/* Top Government Strip with Direct Helpline Integration */}
      <div className="bg-[#183153] text-white py-1.5 px-4 text-xs border-b border-[#24563B]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-[11px] sm:text-xs">
            <span className="font-semibold text-[#E8DFB8]">
              {lang === 'hi' ? 'राज्य सरकार भर्ती पोर्टल' : 'State Government Recruitment Portal'}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300 hidden sm:inline">
              {lang === 'hi' ? 'वन विभाग कर्मचारी चयन मंडल' : 'Forest Department Staff Selection Board'}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            {/* Quick Candidate Helpdesk Bar */}
            <div className="hidden md:flex items-center space-x-3 text-slate-300">
              <span className="flex items-center space-x-1">
                <Phone className="w-3 h-3 text-[#B79A52]" />
                <span className="text-white font-semibold">8276866126</span>
              </span>
              <span className="flex items-center space-x-1">
                <MessageSquare className="w-3 h-3 text-emerald-400" />
                <span className="text-white font-semibold">WhatsApp: 8389948785</span>
              </span>
            </div>

            <button
              onClick={() => setCurrentView('portal')}
              className="flex items-center space-x-1.5 px-2.5 py-0.5 bg-[#24563B] hover:bg-[#174A32] text-[#E8DFB8] font-bold rounded-xs border border-[#B79A52] transition text-[11px] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'मुख्य वेबसाइट पर वापस जाएं' : 'Back to Main Portal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recruitment Header Banner */}
      <header className="bg-white border-b-2 border-[#174A32] shadow-gov-sm py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-center sm:text-left">
            <Emblem size={64} className="flex-shrink-0" />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#24563B]">
                {lang === 'hi' ? 'पर्यावरण, वन एवं जलवायु परिवर्तन विभाग' : 'Department of Environment, Forests & Climate Change'}
              </div>
              <h1 className="text-lg sm:text-2xl font-bold font-devanagari text-[#174A32] leading-tight">
                {lang === 'hi' ? 'वन विभाग भर्ती 2026 — ऑनलाइन आवेदन पोर्टल' : 'Forest Department Recruitment 2026 — Online Application Portal'}
              </h1>
              <div className="text-xs text-slate-600 font-mono mt-0.5">
                {lang === 'hi' ? 'विज्ञापन संख्या' : 'Advertisement No'}: <strong>FD/REC/2026/01</strong> (Direct Recruitment Series)
              </div>
            </div>
          </div>

          {/* Active Intake Status without last date restriction */}
          <div className="bg-[#FAFAF7] border border-[#D7DED8] px-3.5 py-2 rounded-xs text-xs text-right">
            <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
              {lang === 'hi' ? 'पंजीकरण स्थिति' : 'Registration Status'}
            </div>
            <div className="text-emerald-700 font-bold text-sm flex items-center justify-end space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>{lang === 'hi' ? 'आवेदन खुला है (Active Intake)' : 'Open For Application'}</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {lang === 'hi' ? 'कोई अंतिम तिथि प्रतिबंध नहीं' : 'Ongoing Verification Cycle'}
            </div>
          </div>
        </div>
      </header>

      {/* Recruitment Navigation Tabs: Apply Online vs Check Application Status */}
      <div className="bg-[#EAE8DD] border-b-2 border-[#174A32]">
        <div className="max-w-6xl mx-auto px-4 flex items-center space-x-2 pt-2">
          <button
            type="button"
            onClick={() => setActivePortalTab('apply')}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-t-lg transition flex items-center space-x-2 cursor-pointer border-t-2 ${
              activePortalTab === 'apply'
                ? 'bg-white text-[#174A32] border-[#174A32] shadow-sm'
                : 'bg-transparent text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === 'hi' ? 'नया ऑनलाइन आवेदन (Apply Online)' : 'Apply Online'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePortalTab('status')}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-t-lg transition flex items-center space-x-2 cursor-pointer border-t-2 ${
              activePortalTab === 'status'
                ? 'bg-white text-[#174A32] border-[#174A32] shadow-sm'
                : 'bg-transparent text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === 'hi' ? 'आवेदन स्थिति जांचें (Track Application Status)' : 'Check Application Status'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        {activePortalTab === 'status' ? (
          <CheckApplicationStatus onBack={() => setActivePortalTab('apply')} lang={lang} />
        ) : (
          <>
            {/* Prototype Advisory Notice Banner */}
            <div className="bg-amber-50 border-l-4 border-amber-600 p-3.5 rounded-r-xs mb-6 text-xs text-amber-900 shadow-sm flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">
              {lang === 'hi' ? 'विभागीय भर्ती सूचना: ' : 'Departmental Recruitment Notice: '}
            </span>
            {lang === 'hi'
              ? 'वन रक्षक (Forest Guard), वन पुलिस (Forest Police) एवं वन लिपिक (Forest Clerk) पदों हेतु आधिकारिक ऑनलाइन आवेदन विंडो। कृपया अपने व्यक्तिगत, पारिवारिक व वर्तमान सेवा विवरण भरें तथा चरण 3 में निर्धारित परीक्षा शुल्क का ऑनलाइन भुगतान करें।'
              : 'Official application portal for Forest Guard, Forest Police, and Forest Clerk cadres. Complete your personal particulars, post selection, and proceed to the real payment gateway in Step 3.'}
          </div>
        </div>

        {/* If Application Submitted Successfully */}
        {submittedAppNo ? (
          <div className="bg-white border-2 border-emerald-600 p-6 sm:p-8 rounded-xs shadow-gov-md max-w-3xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[#174A32] font-devanagari">
                {lang === 'hi' ? 'आवेदन एवं शुल्क भुगतान सफलतापूर्वक पंजीकृत हुआ!' : 'Application & Fee Remittance Registered!'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {lang === 'hi'
                  ? 'आपका आवेदन एवं ई-ग्रास साइबर ट्रेजरी शुल्क भुगतान विभागीय डेटाबेस में दर्ज कर लिया गया है।'
                  : 'Your application and payment details have been recorded successfully in the recruitment database.'}
              </p>
            </div>

            <div className="p-4 bg-[#F5F4EC] border border-[#D7DED8] rounded-xs font-mono text-center text-sm sm:text-base font-bold text-[#183153]">
              Application Reference No: <span className="text-emerald-700">{submittedAppNo}</span>
            </div>

            {/* Comprehensive Candidate Acknowledgement Slip */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xs text-xs space-y-3 text-slate-700 font-mono">
              <div className="border-b border-slate-200 pb-1.5 flex justify-between items-center text-[11px] font-bold text-[#174A32]">
                <span>FOREST STAFF SELECTION BOARD — PROVISIONAL ADMISSION SLIP</span>
                <span className="text-emerald-700">FEE PAID & VERIFIED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div><strong>Applied Cadre / Post:</strong> {getPostTitle(formData.appliedPost)}</div>
                <div><strong>Candidate Full Name:</strong> {formData.fullName || 'N/A'}</div>
                <div><strong>Father / Guardian:</strong> {formData.fatherName || 'N/A'}</div>
                <div><strong>Mother Name:</strong> {formData.motherName || 'N/A'}</div>
                <div><strong>Date of Birth / Gender:</strong> {formData.dob || 'N/A'} ({formData.gender})</div>
                <div><strong>Marital Status:</strong> {formData.maritalStatus.toUpperCase()}</div>
                <div><strong>Category / Fee Paid:</strong> {currentFee.catName} — <span className="text-emerald-700 font-bold">{currentFee.label}</span></div>
                <div><strong>Transaction / UTR No:</strong> <span className="text-emerald-800 font-bold">{submittedUtr || 'GATEWAY-PAID'}</span></div>
                <div><strong>Payment Screenshot:</strong> <span className="text-emerald-700 font-semibold">{submittedScreenshot ? 'संलग्न (Uploaded)' : 'लागू नहीं (Optional)'}</span></div>
                <div><strong>Verification Status:</strong> <span className="text-emerald-700 font-bold">अभिलेख सुरक्षित / PROVISIONALLY VERIFIED</span></div>
                <div><strong>Contact Mobile / Email:</strong> {formData.mobile} | {formData.email || 'N/A'}</div>
                <div><strong>Home District / State:</strong> {formData.homeDistrict || 'State Level'} ({formData.domicileState})</div>
                <div><strong>Preferred Division:</strong> {formData.preferredDivision1}</div>
                <div><strong>Identification Mark:</strong> {formData.identificationMark || 'Recorded'}</div>
              </div>

              {submittedScreenshot && (
                <div className="pt-2 border-t border-slate-200 flex items-center space-x-3">
                  <span className="text-[11px] font-bold text-slate-700">Uploaded Payment Slip:</span>
                  <img src={submittedScreenshot} alt="Payment Receipt" className="h-14 w-auto rounded border border-slate-300 shadow-xs" />
                </div>
              )}

              {/* Present Employment Details in Slip */}
              <div className="pt-2 border-t border-slate-200">
                <strong>Current Employment Status: </strong>
                {formData.isEmployed === 'yes' ? (
                  <span className="text-amber-800 font-semibold">
                    Employed at {formData.employerName || 'Organization'} as {formData.currentPost || 'Post'} | 
                    Expected Relieving Date: <span className="underline">{formData.leavingDate || 'Not specified'}</span> (NOC: {formData.nocStatus.toUpperCase()})
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold">Not Currently Employed (Fresher / Unemployed)</span>
                )}
              </div>
            </div>

            {/* Candidate Helpline Box Inside Receipt */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-300 rounded-xs text-xs text-emerald-950 space-y-1">
              <div className="font-bold flex items-center space-x-1.5 text-[#174A32]">
                <ShieldCheck className="w-4 h-4 text-[#24563B]" />
                <span>{lang === 'hi' ? 'भर्ती सहायता प्रकोष्ठ (Candidate Support Helpdesk):' : 'Candidate Support Helpdesk:'}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                <span><strong>Calling Helpline:</strong> 8276866126</span>
                <span><strong>WhatsApp Desk:</strong> 8389948785</span>
                <span><strong>Official Email:</strong> Info.forest.gov@gmail.com</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-[#24563B] text-white text-xs font-bold rounded-xs hover:bg-[#174A32] transition flex items-center space-x-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{lang === 'hi' ? 'आवेदन पावती पर्ची प्रिंट करें' : 'Print Application Slip'}</span>
              </button>

              <button
                onClick={() => setCurrentView('portal')}
                className="px-5 py-2 bg-slate-200 text-slate-800 text-xs font-semibold rounded-xs hover:bg-slate-300 transition cursor-pointer"
              >
                {lang === 'hi' ? 'मुख्य पृष्ठ पर वापस जाएं' : 'Return to Portal'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top Steps Progress Bar */}
            <div className="bg-white border border-[#D7DED8] p-4 rounded-xs shadow-gov-sm">
              <div className="flex items-center justify-between">
                {/* Step 1 Tab */}
                <div 
                  onClick={() => currentStep > 1 && setCurrentStep(1)}
                  className={`flex items-center space-x-2 cursor-pointer transition ${currentStep === 1 ? 'text-[#174A32] font-bold' : 'text-slate-500'}`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep >= 1 ? 'bg-[#174A32] text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    1
                  </span>
                  <span className="text-xs font-semibold">
                    {lang === 'hi' ? 'व्यक्तिगत व सेवा विवरण' : 'Personal & Service Info'}
                  </span>
                </div>

                <div className="w-12 h-0.5 bg-slate-300 hidden sm:block" />

                {/* Step 2 Tab */}
                <div 
                  onClick={() => currentStep > 2 && setCurrentStep(2)}
                  className={`flex items-center space-x-2 cursor-pointer transition ${currentStep === 2 ? 'text-[#174A32] font-bold' : 'text-slate-500'}`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep >= 2 ? 'bg-[#174A32] text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    2
                  </span>
                  <span className="text-xs font-semibold">
                    {lang === 'hi' ? 'पद चयन व शैक्षणिक अहर्ता' : 'Post & Qualification'}
                  </span>
                </div>

                <div className="w-12 h-0.5 bg-slate-300 hidden sm:block" />

                {/* Step 3 Tab - Real Payment Gateway */}
                <div className={`flex items-center space-x-2 ${currentStep === 3 ? 'text-[#174A32] font-bold' : 'text-slate-500'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep === 3 ? 'bg-[#174A32] text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    3
                  </span>
                  <span className="text-xs font-semibold flex items-center space-x-1">
                    <Receipt className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'hi' ? 'पेमेंट गेटवे (Payment Gateway)' : 'Payment Gateway'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* STEP 3: Real Payment Gateway Interface */}
            {currentStep === 3 ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center space-x-1 text-xs font-bold text-[#174A32] hover:underline cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? '← पद व योग्यता विवरण पर वापस जाएं' : '← Back to Post Selection'}</span>
                  </button>
                  <span className="text-xs text-slate-500">
                    {lang === 'hi' ? 'चरण 3/3: परीक्षा शुल्क भुगतान' : 'Step 3 of 3: Fee Remittance'}
                  </span>
                </div>

                {/* Real Payment Gateway UI component copied from paymentgateway.tsx */}
                <PaymentGateway
                  amount={currentFee.amount}
                  processName={getPostTitle(formData.appliedPost)}
                  customerName={formData.fullName || 'आवेदक'}
                  categoryName={currentFee.catName}
                  applicantRef={tempAppRef}
                  fullFormData={formData}
                  lang={lang}
                  onSuccess={handlePaymentSuccess}
                  onCancel={() => setCurrentStep(2)}
                />
              </div>
            ) : (
              /* Steps 1 & 2 Layout with Sidebar */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left 4 cols: Fees, Cadre mandate & Helpdesk */}
                <div className="lg:col-span-4 space-y-4">
                  {/* Category Fee Structure Card */}
                  <div className="bg-white border-2 border-[#B79A52] p-4 rounded-xs shadow-gov-sm">
                    <div className="border-b border-slate-200 pb-2 mb-3 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#174A32] flex items-center space-x-1.5">
                        <CreditCard className="w-4 h-4 text-[#B79A52]" />
                        <span>{lang === 'hi' ? 'निर्धारित परीक्षा / आवेदन शुल्क' : 'Application Fee Structure'}</span>
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center p-2 bg-[#F5F4EC] rounded-xs border border-slate-200">
                        <span className="font-semibold text-slate-800">General (सामान्य)</span>
                        <span className="font-mono font-extrabold text-[#174A32] text-sm">₹700/-</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-[#F5F4EC] rounded-xs border border-slate-200">
                        <span className="font-semibold text-slate-800">OBC (अन्य पिछड़ा वर्ग)</span>
                        <span className="font-mono font-extrabold text-[#174A32] text-sm">₹600/-</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-[#F5F4EC] rounded-xs border border-slate-200">
                        <span className="font-semibold text-slate-800">SC / ST (अनुसूचित जाति/जनजाति)</span>
                        <span className="font-mono font-extrabold text-[#174A32] text-sm">₹500/-</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                      {lang === 'hi'
                        ? '* शुल्क का भुगतान चरण 3 में UPI / नेट बैंकिंग गेटवे द्वारा किया जाएगा।'
                        : '* Fee remittance via UPI or State Cyber Treasury Net Banking.'}
                    </div>
                  </div>

                  {/* Official Candidate Helpdesk & Contact Card */}
                  <div className="bg-[#174A32] text-white p-4 rounded-xs border-2 border-[#B79A52] shadow-gov-sm space-y-3">
                    <div className="border-b border-[#24563B] pb-2 flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-[#E8DFB8]" />
                      <h4 className="font-bold text-[#E8DFB8] uppercase tracking-wider text-xs">
                        {lang === 'hi' ? 'भर्ती सहायता केंद्र (Candidate Helpdesk)' : 'Recruitment Support Cell'}
                      </h4>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-start space-x-2.5 bg-[#0F2038]/60 p-2 rounded-xs border border-slate-600">
                        <Phone className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] uppercase text-slate-300 block font-semibold">
                            {lang === 'hi' ? 'कॉलिंग हेल्पलाइन (Calling Phone)' : 'Calling Helpline'}
                          </span>
                          <a href="tel:8276866126" className="font-mono font-bold text-amber-200 text-sm hover:underline">
                            8276866126
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2.5 bg-[#0F2038]/60 p-2 rounded-xs border border-slate-600">
                        <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] uppercase text-slate-300 block font-semibold">
                            {lang === 'hi' ? 'व्हाट्सएप सहायता (WhatsApp Support)' : 'WhatsApp Desk'}
                          </span>
                          <a 
                            href="https://wa.me/918389948785" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="font-mono font-bold text-emerald-300 text-sm hover:underline"
                          >
                            8389948785
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2.5 bg-[#0F2038]/60 p-2 rounded-xs border border-slate-600">
                        <Mail className="w-4 h-4 text-blue-300 flex-shrink-0 mt-0.5" />
                        <div className="break-all">
                          <span className="text-[10px] uppercase text-slate-300 block font-semibold">
                            {lang === 'hi' ? 'आधिकारिक ईमेल (Email Support)' : 'Recruitment Email ID'}
                          </span>
                          <a href="mailto:Info.forest.gov@gmail.com" className="font-mono text-slate-100 hover:underline text-xs">
                            Info.forest.gov@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 8 cols: Interactive Application Form (Steps 1 & 2) */}
                <div className="lg:col-span-8">
                  <div className="bg-white border border-[#D7DED8] p-5 sm:p-6 rounded-xs shadow-gov-sm">
                    <form onSubmit={handleNextStep} className="space-y-5 text-xs">
                      {/* STEP 1: Personal, Mother Name & Present Employment Details */}
                      {currentStep === 1 && (
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-[#183153] border-b border-slate-200 pb-1.5 flex items-center space-x-1.5">
                            <User className="w-4 h-4 text-[#24563B]" />
                            <span>{lang === 'hi' ? 'चरण 1.1: व्यक्तिगत एवं पारिवारिक विवरण' : 'Step 1.1: Personal & Family Particulars'}</span>
                          </h3>

                          {/* Full Name */}
                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">
                              {lang === 'hi' ? 'अभ्यर्थी का पूरा नाम (10वीं प्रमाणपत्र अनुसार)' : 'Full Name of Candidate (As per Matriculation)'} <span className="text-red-600">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              placeholder={lang === 'hi' ? 'जैसे: राहुल कुमार शर्मा' : 'e.g. Rahul Kumar Sharma'}
                              className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                            />
                          </div>

                          {/* Father Name & Mother Name Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                {lang === 'hi' ? 'पिता / अभिभावक का नाम' : 'Father / Guardian Name'} <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.fatherName}
                                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                                placeholder={lang === 'hi' ? 'श्री ...' : 'Shri Suresh Kumar'}
                                className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                              />
                            </div>

                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                {lang === 'hi' ? 'माता का नाम (Mother\'s Name)' : 'Mother\'s Name'} <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.motherName}
                                onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                                placeholder={lang === 'hi' ? 'श्रीमती ...' : 'Smt. Shanti Devi'}
                                className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                              />
                            </div>
                          </div>

                          {/* DOB, Gender & Marital Status */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                {lang === 'hi' ? 'जन्म तिथि (DOB)' : 'Date of Birth'} <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="date"
                                required
                                value={formData.dob}
                                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                              />
                            </div>

                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                {lang === 'hi' ? 'लिंग (Gender)' : 'Gender'} <span className="text-red-600">*</span>
                              </label>
                              <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                              >
                                <option value="male">{lang === 'hi' ? 'पुरुष (Male)' : 'Male'}</option>
                                <option value="female">{lang === 'hi' ? 'महिला (Female)' : 'Female'}</option>
                                <option value="other">{lang === 'hi' ? 'अन्य (Other)' : 'Other'}</option>
                              </select>
                            </div>

                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                {lang === 'hi' ? 'वैवाहिक स्थिति (Marital Status)' : 'Marital Status'} <span className="text-red-600">*</span>
                              </label>
                              <select
                                value={formData.maritalStatus}
                                onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                                className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                              >
                                <option value="unmarried">{lang === 'hi' ? 'अविवाहित (Unmarried)' : 'Unmarried'}</option>
                                <option value="married">{lang === 'hi' ? 'विवाहित (Married)' : 'Married'}</option>
                                <option value="other">{lang === 'hi' ? 'अन्य (Other)' : 'Other'}</option>
                              </select>
                            </div>
                          </div>

                          {/* Category Selection with Dynamic Fee Alert */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                {lang === 'hi' ? 'आरक्षण श्रेणी (Reservation Category)' : 'Reservation Category'} <span className="text-red-600">*</span>
                              </label>
                              <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B] font-semibold"
                              >
                                <option value="gen">General (सामान्य/अनारक्षित) — ₹700</option>
                                <option value="obc">OBC (अन्य पिछड़ा वर्ग) — ₹600</option>
                                <option value="sc">SC (अनुसूचित जाति) — ₹500</option>
                                <option value="st">ST (अनुसूचित जनजाति) — ₹500</option>
                                <option value="ews">EWS (आर्थिक रूप से कमजोर वर्ग) — ₹700</option>
                              </select>
                            </div>

                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                {lang === 'hi' ? 'शारीरिक पहचान चिह्न (Identification Mark)' : 'Visible Identification Mark'} <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.identificationMark}
                                onChange={(e) => setFormData({ ...formData, identificationMark: e.target.value })}
                                placeholder={lang === 'hi' ? 'उदा. चेहरे/हाथ पर तिल या कट का निशान' : 'e.g. Mole on right side of neck'}
                                className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                              />
                            </div>
                          </div>

                          {/* Mobile & Email */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                {lang === 'hi' ? '10-अंकीय मोबाइल नंबर (SMS अलर्ट हेतु)' : '10-Digit Mobile Number (For Alerts)'} <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="tel"
                                required
                                value={formData.mobile}
                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                placeholder="9876543210"
                                className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                              />
                            </div>

                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                {lang === 'hi' ? 'ईमेल पता (Email ID)' : 'Email Address'}
                              </label>
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="applicant@example.com"
                                className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                              />
                            </div>
                          </div>

                          {/* Address Line & PIN Code */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-2">
                              <label className="block font-semibold text-slate-700 mb-1">
                                {lang === 'hi' ? 'पत्राचार का पूर्ण पता (Correspondence Address)' : 'Correspondence Address'} <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.addressLine}
                                onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                                placeholder={lang === 'hi' ? 'मकान नं., ग्राम/मोहल्ला, पोस्ट ऑफिस' : 'House/Plot No., Street/Village, Post'}
                                className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                              />
                            </div>

                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                {lang === 'hi' ? 'पिन कोड (PIN Code)' : 'PIN Code'} <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.pincode}
                                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                placeholder="110001"
                                maxLength={6}
                                className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                              />
                            </div>
                          </div>

                          {/* SUBSECTION: Present Employment & Relieving / Leaving Details */}
                          <div className="mt-5 pt-4 border-t-2 border-[#174A32]/20 bg-slate-50 p-4 rounded-xs border border-slate-200">
                            <div className="flex items-center space-x-2 mb-3">
                              <Briefcase className="w-4 h-4 text-[#174A32]" />
                              <h4 className="font-bold text-[#174A32] text-xs uppercase tracking-wider">
                                {lang === 'hi' 
                                  ? 'चरण 1.2: वर्तमान सेवा / नौकरी का विवरण (Current Employment Status)' 
                                  : 'Step 1.2: Current Employment & Relieving Particulars'}
                              </h4>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <label className="block font-bold text-slate-800 mb-1.5">
                                  {lang === 'hi' 
                                    ? 'क्या आप वर्तमान में किसी शासकीय / अर्ध-शासकीय / निजी संस्थान में कार्यरत हैं?' 
                                    : 'Are you currently employed in any Government / Semi-Govt / Private Organization?'}{' '}
                                  <span className="text-red-600">*</span>
                                </label>

                                <div className="flex items-center space-x-6">
                                  <label className="flex items-center space-x-2 cursor-pointer font-semibold text-slate-700">
                                    <input
                                      type="radio"
                                      name="isEmployed"
                                      value="no"
                                      checked={formData.isEmployed === 'no'}
                                      onChange={() => setFormData({ ...formData, isEmployed: 'no' })}
                                      className="w-3.5 h-3.5 text-[#174A32]"
                                    />
                                    <span>{lang === 'hi' ? 'नहीं (No — वर्तमान में बेरोजगार/फ्रेशर)' : 'No (Currently Unemployed / Fresher)'}</span>
                                  </label>

                                  <label className="flex items-center space-x-2 cursor-pointer font-semibold text-slate-700">
                                    <input
                                      type="radio"
                                      name="isEmployed"
                                      value="yes"
                                      checked={formData.isEmployed === 'yes'}
                                      onChange={() => setFormData({ ...formData, isEmployed: 'yes' })}
                                      className="w-3.5 h-3.5 text-[#174A32]"
                                    />
                                    <span>{lang === 'hi' ? 'हाँ (Yes — कार्यरत हूँ)' : 'Yes (Currently Employed)'}</span>
                                  </label>
                                </div>
                              </div>

                              {/* Dynamic Employment & Leaving Date Details if "yes" */}
                              {formData.isEmployed === 'yes' && (
                                <div className="p-3.5 bg-amber-50/70 border border-amber-300 rounded-xs space-y-3 animate-fadeIn">
                                  <div className="text-[11px] text-amber-900 font-semibold flex items-center space-x-1.5">
                                    <AlertCircle className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                                    <span>
                                      {lang === 'hi'
                                        ? 'यदि आप वर्तमान में कार्यरत हैं, तो कृपया नियोक्ता, पद तथा पद छोड़ने / कार्यमुक्त होने की तिथि का विवरण भरें:'
                                        : 'Please provide employer details, current post, and expected relieving / leaving date:'}
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                      <label className="block font-semibold text-slate-700 mb-1">
                                        {lang === 'hi' ? 'वर्तमान नियोक्ता / विभाग का नाम' : 'Current Employer / Department Name'} <span className="text-red-600">*</span>
                                      </label>
                                      <div className="relative">
                                        <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                                        <input
                                          type="text"
                                          required={formData.isEmployed === 'yes'}
                                          value={formData.employerName}
                                          onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                                          placeholder={lang === 'hi' ? 'उदा. राज्य पुलिस / वन निगम / निजी लिमिटेड' : 'e.g. State Corporation / Private Firm'}
                                          className="w-full pl-8 p-2 border border-[#D7DED8] rounded-xs bg-white focus:outline-none focus:border-[#24563B]"
                                        />
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block font-semibold text-slate-700 mb-1">
                                        {lang === 'hi' ? 'वर्तमान धारित पद (Current Post/Designation)' : 'Current Designation'} <span className="text-red-600">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        required={formData.isEmployed === 'yes'}
                                        value={formData.currentPost}
                                        onChange={(e) => setFormData({ ...formData, currentPost: e.target.value })}
                                        placeholder={lang === 'hi' ? 'उदा. सुरक्षा कर्मी / कनिष्ठ सहायक / ऑपरेटर' : 'e.g. Security Assistant / Junior Clerk'}
                                        className="w-full p-2 border border-[#D7DED8] rounded-xs bg-white focus:outline-none focus:border-[#24563B]"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                      <label className="block font-semibold text-slate-700 mb-1">
                                        {lang === 'hi' ? 'पद छोड़ने / कार्यमुक्त होने की संभावित तिथि' : 'Date of Leaving / Expected Relieving Date'} <span className="text-red-600">*</span>
                                      </label>
                                      <div className="relative">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                                        <input
                                          type="date"
                                          required={formData.isEmployed === 'yes'}
                                          value={formData.leavingDate}
                                          onChange={(e) => setFormData({ ...formData, leavingDate: e.target.value })}
                                          className="w-full pl-8 p-2 border border-[#D7DED8] rounded-xs bg-white focus:outline-none focus:border-[#24563B]"
                                        />
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block font-semibold text-slate-700 mb-1">
                                        {lang === 'hi' ? 'नियोजन की प्रकृति' : 'Nature of Employment'}
                                      </label>
                                      <select
                                        value={formData.employmentType}
                                        onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                                        className="w-full p-2 border border-[#D7DED8] rounded-xs bg-white focus:outline-none focus:border-[#24563B]"
                                      >
                                        <option value="regular">{lang === 'hi' ? 'नियमित (Regular)' : 'Regular'}</option>
                                        <option value="contractual">{lang === 'hi' ? 'संविदा (Contractual)' : 'Contractual'}</option>
                                        <option value="private">{lang === 'hi' ? 'निजी क्षेत्र (Private Sector)' : 'Private'}</option>
                                      </select>
                                    </div>

                                    <div>
                                      <label className="block font-semibold text-slate-700 mb-1">
                                        {lang === 'hi' ? 'अनापत्ति प्रमाण पत्र (NOC)' : 'No Objection Certificate (NOC)'}
                                      </label>
                                      <select
                                        value={formData.nocStatus}
                                        onChange={(e) => setFormData({ ...formData, nocStatus: e.target.value })}
                                        className="w-full p-2 border border-[#D7DED8] rounded-xs bg-white focus:outline-none focus:border-[#24563B]"
                                      >
                                        <option value="obtained">{lang === 'hi' ? 'NOC प्राप्त है (Obtained)' : 'Obtained'}</option>
                                        <option value="applied">{lang === 'hi' ? 'NOC हेतु आवेदन किया है (Applied)' : 'Applied'}</option>
                                        <option value="na">{lang === 'hi' ? 'लागू नहीं (Not Applicable)' : 'N/A'}</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* STEP 2: Cadre Posts Selection & Educational Criteria */}
                      {currentStep === 2 && (
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-[#183153] border-b border-slate-200 pb-1.5 flex items-center space-x-1.5">
                            <GraduationCap className="w-4 h-4 text-[#24563B]" />
                            <span>{lang === 'hi' ? 'चरण 2: पद का चयन एवं शैक्षणिक अहर्ता' : 'Step 2: Post Selection & Educational Qualification'}</span>
                          </h3>

                          {/* 3 Posts Radio Selection */}
                          <div className="space-y-2">
                            <label className="block font-bold text-[#174A32]">
                              {lang === 'hi' ? 'आवेदित पद का चयन करें (Select Applying Post)' : 'Select Post Applying For'}: <span className="text-red-600">*</span>
                            </label>

                            {/* Post 1: Forest Guard */}
                            <label className={`block p-3 border rounded-xs cursor-pointer transition ${
                              formData.appliedPost === 'forest_guard'
                                ? 'bg-emerald-50/70 border-[#174A32] shadow-xs'
                                : 'bg-white border-[#D7DED8] hover:bg-slate-50'
                            }`}>
                              <div className="flex items-start space-x-2.5">
                                <input
                                  type="radio"
                                  name="appliedPost"
                                  value="forest_guard"
                                  checked={formData.appliedPost === 'forest_guard'}
                                  onChange={() => setFormData({ ...formData, appliedPost: 'forest_guard' })}
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-slate-900 text-sm">वन रक्षक (Forest Guard)</span>
                                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Level-4 Pay</span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                                    {lang === 'hi'
                                      ? 'वन बीट गश्त, वन्यजीव सुरक्षा, अवैध कटाई एवं अतिक्रमण रोकथाम तथा मौसमी वनाग्नि रेखाओं (Fire Lines) का रख-रखाव।'
                                      : 'Ground beat patrolling, wildlife surveillance, prevention of illicit timber cutting & encroachment, and maintenance of seasonal fire lines.'}
                                  </p>
                                  <div className="text-[10px] text-slate-500 font-semibold mt-1">
                                    {lang === 'hi' ? 'अनिवार्य योग्यता: 10वीं पास (High School) + शारीरिक दक्षता' : 'Qualification: 10th Pass + Physical Endurance Test'}
                                  </div>
                                </div>
                              </div>
                            </label>

                            {/* Post 2: Forest Police */}
                            <label className={`block p-3 border rounded-xs cursor-pointer transition ${
                              formData.appliedPost === 'forest_police'
                                ? 'bg-blue-50/70 border-[#183153] shadow-xs'
                                : 'bg-white border-[#D7DED8] hover:bg-slate-50'
                            }`}>
                              <div className="flex items-start space-x-2.5">
                                <input
                                  type="radio"
                                  name="appliedPost"
                                  value="forest_police"
                                  checked={formData.appliedPost === 'forest_police'}
                                  onChange={() => setFormData({ ...formData, appliedPost: 'forest_police' })}
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-slate-900 text-sm">वन सुरक्षा पुलिस (Forest Police)</span>
                                    <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">Level-5 Pay</span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                                    {lang === 'hi'
                                      ? 'सशस्त्र वन सुरक्षा दस्ता, वन्यजीव तस्करों एवं अवैध शिकार रोधी अभियानों में त्वरित कार्रवाई, राजमार्ग वन नाका जांच, एवं वन अपराध नियंत्रण।'
                                      : 'Armed forest vigilance squad, anti-poaching operations, rapid action against timber smuggling syndicates, and transit checkpost enforcement.'}
                                  </p>
                                  <div className="text-[10px] text-slate-500 font-semibold mt-1">
                                    {lang === 'hi' ? 'अनिवार्य योग्यता: 12वीं पास (Intermediate) + पुलिस मानक शारीरिक स्वास्थ्य' : 'Qualification: 12th Pass + Police Standard Physical Fitness'}
                                  </div>
                                </div>
                              </div>
                            </label>

                            {/* Post 3: Forest Clerk */}
                            <label className={`block p-3 border rounded-xs cursor-pointer transition ${
                              formData.appliedPost === 'forest_clerk'
                                ? 'bg-amber-50/70 border-amber-700 shadow-xs'
                                : 'bg-white border-[#D7DED8] hover:bg-slate-50'
                            }`}>
                              <div className="flex items-start space-x-2.5">
                                <input
                                  type="radio"
                                  name="appliedPost"
                                  value="forest_clerk"
                                  checked={formData.appliedPost === 'forest_clerk'}
                                  onChange={() => setFormData({ ...formData, appliedPost: 'forest_clerk' })}
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-slate-900 text-sm">वन लिपिक (Forest Clerk)</span>
                                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Level-4 Pay</span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                                    {lang === 'hi'
                                      ? 'प्रभागीय एवं परिक्षेत्र कार्यालयीय प्रशासनिक कार्य, काष्ठ अभिवहन पास (Transit Pass) जारी करना, पौधशाला स्टॉक व वितरण लेखा, एवं जन सूचना (RTI) पत्राचार।'
                                      : 'Divisional and Range office administration, timber transit passes (TP), nursery sapling stock registers, departmental accounts, and citizen correspondence.'}
                                  </p>
                                  <div className="text-[10px] text-slate-500 font-semibold mt-1">
                                    {lang === 'hi' ? 'अनिवार्य योग्यता: 12वीं पास + बेसिक कंप्यूटर / टाइपिंग दक्षता' : 'Qualification: 12th Pass + Basic Computer / Typing Skill'}
                                  </div>
                                </div>
                              </div>
                            </label>
                          </div>

                          {/* Educational Details Table */}
                          <div className="pt-2">
                            <label className="block font-bold text-slate-800 mb-1.5">
                              {lang === 'hi' ? 'शैक्षणिक योग्यता विवरण (Educational Qualifications)' : 'Academic Credentials'}
                            </label>

                            <div className="space-y-3">
                              {/* 10th Standard Details */}
                              <div className="p-3 bg-[#FAFAF7] border border-slate-200 rounded-xs">
                                <span className="font-bold text-[#174A32] block mb-2">
                                  1. High School (10th / Matriculation) <span className="text-red-600">*</span>
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                                  <div className="sm:col-span-2">
                                    <label className="text-[11px] text-slate-600 block mb-0.5">Board / University</label>
                                    <input
                                      type="text"
                                      required
                                      value={formData.tenthBoard}
                                      onChange={(e) => setFormData({ ...formData, tenthBoard: e.target.value })}
                                      className="w-full p-1.5 border border-[#D7DED8] rounded-xs bg-white text-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[11px] text-slate-600 block mb-0.5">Passing Year</label>
                                    <input
                                      type="text"
                                      required
                                      value={formData.tenthYear}
                                      onChange={(e) => setFormData({ ...formData, tenthYear: e.target.value })}
                                      placeholder="2022"
                                      className="w-full p-1.5 border border-[#D7DED8] rounded-xs bg-white text-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[11px] text-slate-600 block mb-0.5">Marks %</label>
                                    <input
                                      type="text"
                                      required
                                      value={formData.tenthPercent}
                                      onChange={(e) => setFormData({ ...formData, tenthPercent: e.target.value })}
                                      placeholder="78.5"
                                      className="w-full p-1.5 border border-[#D7DED8] rounded-xs bg-white text-xs"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* 12th Standard Details */}
                              <div className="p-3 bg-[#FAFAF7] border border-slate-200 rounded-xs">
                                <span className="font-bold text-[#183153] block mb-2">
                                  2. Intermediate (10+2 / 12th) <span className="text-red-600">*</span>
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                                  <div className="sm:col-span-2">
                                    <label className="text-[11px] text-slate-600 block mb-0.5">Board / Council</label>
                                    <input
                                      type="text"
                                      required
                                      value={formData.twelfthBoard}
                                      onChange={(e) => setFormData({ ...formData, twelfthBoard: e.target.value })}
                                      className="w-full p-1.5 border border-[#D7DED8] rounded-xs bg-white text-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[11px] text-slate-600 block mb-0.5">Passing Year</label>
                                    <input
                                      type="text"
                                      required
                                      value={formData.twelfthYear}
                                      onChange={(e) => setFormData({ ...formData, twelfthYear: e.target.value })}
                                      placeholder="2024"
                                      className="w-full p-1.5 border border-[#D7DED8] rounded-xs bg-white text-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[11px] text-slate-600 block mb-0.5">Marks %</label>
                                    <input
                                      type="text"
                                      required
                                      value={formData.twelfthPercent}
                                      onChange={(e) => setFormData({ ...formData, twelfthPercent: e.target.value })}
                                      placeholder="81.2"
                                      className="w-full p-1.5 border border-[#D7DED8] rounded-xs bg-white text-xs"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Post-Specific Criteria */}
                          {formData.appliedPost === 'forest_clerk' && (
                            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xs text-xs space-y-1.5">
                              <span className="font-bold text-amber-900 block">
                                {lang === 'hi' ? 'वन लिपिक पद हेतु कंप्यूटर दक्षता:' : 'Computer & Typing Criteria for Forest Clerk:'}
                              </span>
                              <div className="flex items-center space-x-2">
                                <FileCheck className="w-4 h-4 text-amber-700" />
                                <span className="text-amber-800">
                                  {lang === 'hi' 
                                    ? 'कंप्यूटर पर न्यूनतम 30 wpm (हिंदी) / 35 wpm (अंग्रेज़ी) टाइपिंग दक्षता प्रमाण पत्र उपलब्ध है।' 
                                    : 'Candidate possesses Certificate in Hindi (30 wpm) / English (35 wpm) typing.'}
                                </span>
                              </div>
                            </div>
                          )}

                          {formData.appliedPost === 'forest_police' && (
                            <div className="p-3 bg-blue-50 border border-blue-300 rounded-xs text-xs space-y-1.5">
                              <span className="font-bold text-blue-900 block">
                                {lang === 'hi' ? 'वन पुलिस पद हेतु अधिमान्य अहर्ता (NCC / खेल कोटा):' : 'Preferential Criteria for Forest Police:'}
                              </span>
                              <div className="flex items-center space-x-3">
                                <label className="text-blue-800">NCC Certificate:</label>
                                <select
                                  value={formData.nccWing}
                                  onChange={(e) => setFormData({ ...formData, nccWing: e.target.value })}
                                  className="p-1 border border-blue-200 rounded-xs bg-white text-xs"
                                >
                                  <option value="none">None (लागू नहीं)</option>
                                  <option value="ncc_b">NCC 'B' Certificate</option>
                                  <option value="ncc_c">NCC 'C' Certificate (5 Bonus Marks)</option>
                                </select>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Action Buttons for Step 1 & 2 */}
                      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                        {currentStep > 1 ? (
                          <button
                            type="button"
                            onClick={() => setCurrentStep(currentStep - 1)}
                            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xs transition cursor-pointer"
                          >
                            {lang === 'hi' ? '← पिछला चरण' : '← Previous Step'}
                          </button>
                        ) : <div />}

                        <button
                          type="submit"
                          className="px-6 py-2 bg-[#174A32] hover:bg-[#24563B] text-white font-bold rounded-xs transition shadow-gov flex items-center space-x-1.5 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5 text-[#E8DFB8]" />
                          <span>
                            {currentStep === 1
                              ? (lang === 'hi' ? 'अगला: पद चयन व अहर्ता →' : 'Next: Post & Qualification →')
                              : (lang === 'hi' ? 'आगे बढ़ें: पेमेंट गेटवे पर जाएं →' : 'Proceed to Payment Gateway →')}
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        </>
      )}
      </main>
    </div>
  );
};
