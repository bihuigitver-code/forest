import React, { useState, useRef } from 'react';
import { 
  Lock, 
  CheckCircle2, 
  X, 
  Smartphone, 
  Copy, 
  Check, 
  Mail, 
  PhoneCall, 
  AlertCircle, 
  FileText,
  Upload,
  Send,
  Loader2
} from 'lucide-react';
import { sendApplicationEmail, type ApplicationSubmissionData } from '../../services/emailService';
import { GovernmentCaptcha } from '../common/GovernmentCaptcha';

export interface PaymentGatewayProps {
  amount: number | string;
  processName: string;
  customerName: string;
  categoryName?: string;
  applicantRef?: string;
  fullFormData?: any;
  onSuccess: (utr: string, screenshot?: string | null) => void;
  onCancel?: () => void;
  lang?: 'en' | 'hi';
}

const formatCurrency = (num: number) => {
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// WhatsApp Icon SVG Component
const WhatsAppIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 6.84C8.94 6.84 8.78 6.84 8.64 6.85C8.44 6.86 8.28 6.94 8.16 7.07C7.99 7.24 7.47 7.74 7.47 8.79C7.47 9.84 8.24 10.85 8.34 11C8.45 11.14 9.85 13.3 12 14.23C13.8 15 14.16 14.84 14.55 14.8C15.04 14.75 16.14 14.15 16.37 13.5C16.6 12.85 16.6 12.29 16.53 12.18C16.46 12.07 16.3 12.01 16.07 11.89C15.84 11.77 14.71 11.22 14.5 11.14C14.29 11.06 14.14 11.02 13.99 11.25C13.84 11.48 13.41 11.99 13.28 12.14C13.15 12.29 13.02 12.31 12.79 12.19C12.56 12.07 11.63 11.77 10.52 10.78C9.66 10.01 9.07 9.06 8.94 8.83C8.81 8.6 8.93 8.48 9.04 8.36C9.15 8.26 9.28 8.08 9.4 7.95C9.52 7.82 9.56 7.72 9.64 7.56C9.72 7.4 9.68 7.25 9.62 7.14C9.56 7.03 9.11 5.92 8.92 5.46" />
  </svg>
);

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  amount,
  processName,
  customerName,
  categoryName = 'General',
  applicantRef = 'FD-APP-2026',
  fullFormData = {},
  onSuccess,
  onCancel,
  lang = 'hi'
}) => {
  const [utrNumber, setUtrNumber] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasClickedWhatsapp, setHasClickedWhatsapp] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [captchaInput, setCaptchaInput] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Official State Forest Department Bank & Support details
  const support = {
    phone: '8276866126',
    whatsapp: '8389948785',
    mail: 'Info.forest.gov@gmail.com',
    upiId: 'info.forest.gov-4@okhdfcbank'
  };

  // Fee calculation breakdown
  const rawAmountStr = (amount !== undefined ? amount : "700").toString();
  const cleanAmountStr = rawAmountStr.replace(/,/g, "").replace(/[^0-9.]/g, "");
  const totalVal = parseFloat(cleanAmountStr) || 700;
  const baseRate = totalVal / 1.18;
  const adjustedBaseRate = Math.round(baseRate * 100) / 100;
  const cgstVal = Math.round(adjustedBaseRate * 0.09 * 100) / 100;
  const sgstVal = cgstVal;
  const totalGst = cgstVal + sgstVal;

  const handleCopy = (text: string, fieldName: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshotFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim()) {
      alert(lang === 'hi' ? 'कृपया 12-अंकीय यूटीआर (UTR) या UPI संदर्भ संख्या दर्ज करना अनिवार्य है।' : 'Please enter 12-digit UTR or UPI Reference Number (Mandatory).');
      return;
    }

    if (!captchaInput.trim() || captchaInput.trim().toUpperCase() !== generatedCaptcha.toUpperCase()) {
      setCaptchaError(lang === 'hi' 
        ? 'अमान्य सुरक्षा कोड (कैप्चा)। कृपया चित्र में दिख रहा सही कोड दर्ज करें।' 
        : 'Invalid Captcha code. Please enter the correct code shown.');
      return;
    }

    setIsSubmitting(true);
    setHasClickedWhatsapp(false);

    // Prepare complete application payload
    const finalAppRef = (applicantRef && applicantRef !== 'FD-APP-2026')
      ? applicantRef
      : `FD-REC-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const submissionData: ApplicationSubmissionData = {
      applicationRef: finalAppRef,
      fullName: fullFormData.fullName || customerName,
      fatherName: fullFormData.fatherName || '',
      motherName: fullFormData.motherName || '',
      dob: fullFormData.dob || '',
      gender: fullFormData.gender || '',
      maritalStatus: fullFormData.maritalStatus || '',
      category: categoryName,
      amount: totalVal,
      mobile: fullFormData.mobile || '',
      email: fullFormData.email || '',
      identificationMark: fullFormData.identificationMark || '',
      addressLine: fullFormData.addressLine || '',
      pincode: fullFormData.pincode || '',
      homeDistrict: fullFormData.homeDistrict || '',
      preferredDivision: fullFormData.preferredDivision1 || '',
      isEmployed: fullFormData.isEmployed || 'no',
      employerName: fullFormData.employerName || '',
      currentPost: fullFormData.currentPost || '',
      leavingDate: fullFormData.leavingDate || '',
      employmentType: fullFormData.employmentType || '',
      nocStatus: fullFormData.nocStatus || '',
      appliedPost: processName,
      tenthBoard: fullFormData.tenthBoard || '',
      tenthYear: fullFormData.tenthYear || '',
      tenthPercent: fullFormData.tenthPercent || '',
      twelfthBoard: fullFormData.twelfthBoard || '',
      twelfthYear: fullFormData.twelfthYear || '',
      twelfthPercent: fullFormData.twelfthPercent || '',
      typingCertificate: fullFormData.typingCertificate || '',
      nccWing: fullFormData.nccWing || '',
      utrNumber: utrNumber.trim(),
      screenshotBase64: screenshotPreview,
      screenshotFileName: screenshotFile?.name || null
    };

    // Dispatch to both Gmail addresses (beensirjee@gmail.com, Info.forest.gov@gmail.com)
    await sendApplicationEmail(submissionData);

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleFinalFinish = () => {
    onSuccess(utrNumber, screenshotPreview);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-200 relative text-slate-800">
      {/* Top Close Button if onCancel provided */}
      {onCancel && (!isSubmitted || hasClickedWhatsapp) && (
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          title="Close Payment Window"
        >
          <X size={18} />
        </button>
      )}

      {/* Left Column - Order Summary & Helpdesk (Slate-900 Dark Govt Treasury) */}
      <div className="md:col-span-5 bg-slate-900 text-white p-5 sm:p-6 md:p-7 flex flex-col justify-between relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
        
        <div>
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="h-8 w-8 sm:h-9 sm:w-9 bg-[#174A32] border border-[#B79A52] rounded-xl flex items-center justify-center font-bold text-white shadow-lg text-sm sm:text-base">
              ₹
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base tracking-wide text-white block">
                {lang === 'hi' ? 'राजकोष ई-ग्रास पेमेंट गेटवे' : 'e-Grass State Cyber Treasury'}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Department of Forest, EF&CC</span>
            </div>
          </div>

          <p className="text-slate-400 text-[11px] sm:text-xs font-medium uppercase tracking-wider mb-1">
            {lang === 'hi' ? 'कुल देय परीक्षा शुल्क (Payable Fee)' : 'Prescribed Application Fee'}
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            ₹{formatCurrency(totalVal)}
          </h1>

          {/* Candidate & Post Meta */}
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 mb-4 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">आवेदित पद (Cadre):</span>
              <span className="font-semibold text-emerald-300 truncate max-w-[170px]">{processName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">अभ्यर्थी (Candidate):</span>
              <span className="font-semibold text-white">{customerName || 'आवेदक'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">श्रेणी (Category):</span>
              <span className="font-semibold text-amber-300">{categoryName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">संदर्भ संख्या:</span>
              <span className="font-mono text-[11px] text-slate-300">{applicantRef}</span>
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
            <div className="flex justify-between items-start gap-2 text-slate-300">
              <span className="text-slate-400 font-medium">परीक्षा व स्क्रूटनी मूल शुल्क</span>
              <span className="font-semibold text-white shrink-0">₹{formatCurrency(adjustedBaseRate)}</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>केंद्रीय जीएसटी (CGST 9%)</span>
              <span className="font-medium text-slate-300">₹{formatCurrency(cgstVal)}</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>राज्य जीएसटी (SGST 9%)</span>
              <span className="font-medium text-slate-300">₹{formatCurrency(sgstVal)}</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>कुल अप्रत्यक्ष कर (GST 18%)</span>
              <span className="font-medium text-slate-300">₹{formatCurrency(totalGst)}</span>
            </div>
            <div className="border-t border-slate-800/80 pt-2 flex justify-between text-xs font-semibold text-emerald-400">
              <span>कुल निर्धारित शुल्क (Total Payable)</span>
              <span>₹{formatCurrency(totalVal)}</span>
            </div>
          </div>
        </div>

        {/* Support Contact Info Panel */}
        <div className="mt-5 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
          <div className="font-semibold text-emerald-400 mb-1.5 uppercase tracking-wider text-[10px] sm:text-[11px]">
            {lang === 'hi' ? 'भर्ती एवं भुगतान सहायता प्रकोष्ठ' : 'Payment Helpdesk & Support'}
          </div>
          <div className="flex items-center gap-2">
            <PhoneCall className="text-amber-400 shrink-0" size={13} />
            <span>कॉलिंग: <strong>{support.phone}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <WhatsAppIcon className="text-emerald-400 shrink-0" size={14} />
            <span>व्हाट्सएप: <strong>+{support.whatsapp}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="text-blue-400 shrink-0" size={13} />
            <span className="truncate break-all">{support.mail}</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/60 text-[10px] text-slate-400 flex items-center gap-1.5">
            <Lock className="text-emerald-400 shrink-0" size={13} />
            <span>256-Bit SSL Encrypted National Cyber Treasury</span>
          </div>
        </div>
      </div>

      {/* Right Column - UPI Payment (Direct QR + UTR Must + Screenshot Optional) */}
      <div className="md:col-span-7 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 text-[#174A32] font-bold text-sm sm:text-base border-b border-slate-200 pb-2 mb-4">
            <Smartphone className="w-5 h-5 text-emerald-600" />
            <span>{lang === 'hi' ? 'UPI भुगतान — QR कोड स्कैन करें' : 'UPI Payment — Scan QR Code'}</span>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 sm:p-6 text-center space-y-4 my-2 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={26} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-emerald-950">
                {lang === 'hi' ? 'आवेदन व शुल्क भुगतान सफलतापूर्वक जमा हुआ!' : 'Application & Payment Recorded!'}
              </h3>

              {/* Transaction & Acknowledgment Slip */}
              <div className="bg-white border border-emerald-300 p-3 rounded-lg text-xs space-y-1.5 text-slate-700 font-mono text-left">
                <div className="text-[11px] font-bold text-[#174A32] uppercase border-b pb-1 flex justify-between items-center">
                  <span>{lang === 'hi' ? 'लेन-देन एवं पावती विवरण' : 'Transaction & Acknowledgment Details'}</span>
                  <span className="text-emerald-700 font-bold">{lang === 'hi' ? 'सफलतापूर्वक दर्ज' : 'RECORDED'}</span>
                </div>
                <div><strong>{lang === 'hi' ? 'आवेदक संदर्भ संख्या:' : 'Applicant Ref No:'}</strong> <span className="text-slate-900 font-bold">{applicantRef}</span></div>
                <div><strong>{lang === 'hi' ? 'दर्ज UTR / Transaction No:' : 'Recorded UTR No:'}</strong> <span className="text-emerald-700 font-bold">{utrNumber}</span></div>
                <div><strong>{lang === 'hi' ? 'सत्यापन स्थिति:' : 'Verification Status:'}</strong> <span className="text-emerald-700 font-bold">{lang === 'hi' ? 'सत्यापन प्रक्रियाधीन (Under Verification)' : 'Under Verification'}</span></div>
                <div><strong>{lang === 'hi' ? 'भुगतान स्क्रीनशॉट:' : 'Payment Slip:'}</strong> {screenshotFile ? screenshotFile.name : (lang === 'hi' ? 'लागू नहीं (वैकल्पिक)' : 'Not Uploaded (Optional)')}</div>
              </div>

              {/* Action Required Alert Banner */}
              {!hasClickedWhatsapp && (
                <div className="bg-amber-100/90 border border-amber-300 rounded-xl p-2.5 text-[11px] sm:text-xs text-amber-900 font-semibold flex items-center justify-center gap-1.5 animate-pulse">
                  <AlertCircle className="shrink-0 text-amber-700" size={16} />
                  <span>
                    {lang === 'hi' 
                      ? 'आवश्यक कदम: पावती पर्ची अनलॉक करने हेतु व्हाट्सएप पर स्क्रीनशॉट भेजें।' 
                      : 'Action Required: Send your payment screenshot on WhatsApp to proceed.'}
                  </span>
                </div>
              )}

              {/* Action Buttons Container */}
              <div className="space-y-2.5 pt-1">
                {/* 1. WhatsApp Button */}
                <a
                  href={`https://wa.me/91${support.whatsapp}?text=${encodeURIComponent(`Hello, I have submitted the application fee of ₹${formatCurrency(totalVal)} for ${processName} (Applicant Ref: ${applicantRef}, UTR: ${utrNumber}). Please verify my transaction.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setHasClickedWhatsapp(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer no-underline"
                >
                  <WhatsAppIcon size={18} />
                  <span>
                    {lang === 'hi' ? 'व्हाट्सएप पर स्क्रीनशॉट साझा करें' : 'Share Screenshot on WhatsApp'}
                  </span>
                </a>

                {/* 2. Complete & View Slip Button */}
                <button
                  type="button"
                  disabled={!hasClickedWhatsapp}
                  onClick={handleFinalFinish}
                  className={`w-full font-bold py-3 px-4 rounded-xl transition duration-200 text-xs sm:text-sm flex items-center justify-center gap-2 ${
                    hasClickedWhatsapp
                      ? 'bg-[#174A32] hover:bg-[#24563B] text-white shadow-md cursor-pointer'
                      : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed opacity-75'
                  }`}
                >
                  {!hasClickedWhatsapp && <Lock size={15} className="shrink-0 text-slate-400" />}
                  <span>
                    {hasClickedWhatsapp
                      ? (lang === 'hi' ? 'आवेदन पावती पर्ची देखें एवं प्रिंट करें' : 'Proceed & Print Application Slip')
                      : (lang === 'hi' ? 'आवेदन पावती पर्ची (व्हाट्सएप भेजने के बाद अनलॉक होगा)' : 'Proceed (Send WhatsApp Screenshot First)')}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* College Project Disclaimer Banner */}

              {/* QR Code Card - Real crisp QR added by user without bank clutter */}
              <div className="bg-[#FAFAF7] border-2 border-emerald-600/60 rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
                <p className="text-xs font-bold text-slate-800 mb-2">
                  {lang === 'hi' 
                    ? 'PhonePe / Google Pay / Paytm / BHIM ऐप से QR कोड स्कैन करें' 
                    : 'Scan QR Code with PhonePe, Google Pay, Paytm or any UPI App'}
                </p>
                
                {/* Crisp User-Added QR Code */}
                <div className="w-52 h-52 rounded-xl bg-white p-2 border-2 border-slate-300 shadow-md flex items-center justify-center">
                  <img
                    src="/QR/forest_qr_center_logo.png"
                    alt="Official Forest Department UPI QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="mt-2.5 flex items-center space-x-2 text-[11px] text-slate-600">
                  <span>UPI ID: <strong>{support.upiId}</strong></span>
                  <button
                    type="button"
                    onClick={() => handleCopy(support.upiId, 'upiId')}
                    className="p-1 text-emerald-700 hover:bg-emerald-100 rounded transition cursor-pointer"
                    title="Copy UPI ID"
                  >
                    {copiedField === 'upiId' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  </button>
                </div>

                <p className="text-[10px] text-slate-500 mt-1">
                  {lang === 'hi'
                    ? `निर्धारित राशि ₹${formatCurrency(totalVal)} का भुगतान करें एवं नीचे यूटीआर दर्ज करें।`
                    : `Remit the prescribed fee ₹${formatCurrency(totalVal)} and enter UTR below.`}
                </p>
              </div>

              {/* UTR (Must) and Screenshot (Optional) Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* 1. UTR Number (MUST / REQUIRED) */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    {lang === 'hi' 
                      ? '12-अंकीय UTR / UPI संदर्भ संख्या (UTR / Transaction ID)' 
                      : '12-Digit UTR / UPI Reference ID'} <span className="text-red-600">* (अनिवार्य / Must)</span>
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      required
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      placeholder={lang === 'hi' ? 'उदा. 428190765432 (12-अंक)' : 'e.g. 428190765432'}
                      className="w-full pl-8 p-2 border-2 border-slate-300 focus:border-[#174A32] rounded-lg text-xs font-mono font-bold bg-white focus:outline-none"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {lang === 'hi' ? 'भुगतान के बाद प्राप्त 12-अंकीय UTR नंबर यहां भरें।' : 'Enter the 12-digit UTR generated after successful payment.'}
                  </span>
                </div>

                {/* 2. Payment Screenshot (OPTIONAL / वैकल्पिक) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'hi' 
                      ? 'भुगतान रसीद / स्क्रीनशॉट अपलोड (Payment Screenshot)' 
                      : 'Payment Screenshot Upload'} <span className="text-slate-400 font-normal">(वैकल्पिक / Optional)</span>
                  </label>
                  
                  {screenshotPreview ? (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-2.5 overflow-hidden">
                        <img 
                          src={screenshotPreview} 
                          alt="Screenshot Preview" 
                          className="w-10 h-10 object-cover rounded border border-emerald-400 flex-shrink-0" 
                        />
                        <div className="truncate">
                          <span className="text-xs font-bold text-emerald-900 block truncate">{screenshotFile?.name}</span>
                          <span className="text-[10px] text-emerald-700">स्क्रीनशॉट संलग्न (Ready to send)</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveScreenshot}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition cursor-pointer flex-shrink-0"
                        title="Remove Screenshot"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-lg p-3 text-center cursor-pointer bg-[#FAFAF7] hover:bg-white transition"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center space-y-1">
                        <Upload className="w-5 h-5 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-700">
                          {lang === 'hi' ? 'स्क्रीनशॉट चुनें या यहां क्लिक करें' : 'Click to Upload Payment Screenshot'}
                        </span>
                        <span className="text-[10px] text-slate-400">JPG, PNG, WEBP (अधिकतम 5 MB)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Important Payment Notice */}
                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-900 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">{lang === 'hi' ? 'महत्वपूर्ण सूचना (Payment Notice):' : 'Important Notice:'}</span>{' '}
                    {lang === 'hi'
                      ? 'आपका भुगतान कन्फर्म होने में 2 से 3 घंटे का समय लग सकता है। यदि आपके बैंक खाते से पैसे कट चुके हैं, तो कृपया दोबारा भुगतान न करें। भुगतान की पुष्टि होने तक प्रतीक्षा करें।'
                      : 'Your payment may take 2–3 hours to be confirmed. If the amount has already been deducted from your bank account, please do not make the payment again. Kindly wait until your payment is confirmed.'}
                  </div>
                </div>

                {/* Security Verification Captcha */}
                <div className="pt-2 border-t border-slate-200">
                  <GovernmentCaptcha
                    onCaptchaChange={setGeneratedCaptcha}
                    userInput={captchaInput}
                    onUserInputChange={(val) => {
                      setCaptchaInput(val);
                      if (captchaError) setCaptchaError(null);
                    }}
                    error={captchaError}
                    lang={lang}
                  />
                </div>

                {/* Confirm & Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#174A32] hover:bg-[#24563B] text-white font-bold py-3 px-4 rounded-xl shadow-md transition duration-200 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#E8DFB8]" />
                      <span>{lang === 'hi' ? 'आवेदन व भुगतान दर्ज हो रहा है...' : 'Recording Application & Payment...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#E8DFB8]" />
                      <span>
                        {lang === 'hi' 
                          ? `आवेदन एवं शुल्क भुगतान जमा करें (₹${formatCurrency(totalVal)})` 
                          : `Submit Application & Payment (₹${formatCurrency(totalVal)})`}
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
