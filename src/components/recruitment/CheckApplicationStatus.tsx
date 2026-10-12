import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  FileText, 
  Printer, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  User, 
  Briefcase, 
  Phone, 
  Mail, 
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { GovernmentCaptcha } from '../common/GovernmentCaptcha';

interface ApplicationRecord {
  id: number;
  application_ref: string;
  full_name: string;
  father_name: string;
  mother_name?: string;
  dob: string;
  gender: string;
  marital_status: string;
  category: string;
  amount: string | number;
  mobile: string;
  email?: string;
  identification_mark?: string;
  address_line?: string;
  pincode?: string;
  home_district?: string;
  preferred_division?: string;
  is_employed?: string;
  employer_name?: string;
  current_post?: string;
  leaving_date?: string;
  employment_type?: string;
  noc_status?: string;
  applied_post: string;
  tenth_board?: string;
  tenth_year?: string;
  tenth_percent?: string;
  twelfth_board?: string;
  twelfth_year?: string;
  twelfth_percent?: string;
  typing_certificate?: string;
  ncc_wing?: string;
  utr_number: string;
  payment_status?: string;
  created_at: string;
}

interface CheckApplicationStatusProps {
  onBack?: () => void;
  lang?: 'en' | 'hi';
}

export const CheckApplicationStatus: React.FC<CheckApplicationStatusProps> = ({
  onBack,
  lang = 'hi'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [record, setRecord] = useState<ApplicationRecord | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);

    const query = searchQuery.trim();
    if (!query) {
      setSearchError(lang === 'hi' 
        ? 'कृपया अपना पंजीकृत मोबाइल नंबर, ईमेल आईडी या आवेदन संख्या दर्ज करें।' 
        : 'Please enter your registered mobile number, email, or application reference.');
      return;
    }

    // Captcha Validation
    if (!captchaInput.trim() || captchaInput.trim().toUpperCase() !== generatedCaptcha.toUpperCase()) {
      setCaptchaError(lang === 'hi' 
        ? 'अमान्य सुरक्षा कोड (कैप्चा)। कृपया चित्र में दिख रहा सही कोड दर्ज करें।' 
        : 'Invalid Captcha code. Please enter the correct verification code.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/applications/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const data = await response.json();

      if (data.success && data.application) {
        setRecord(data.application);
      } else {
        setRecord(null);
        setSearchError(data.message || (lang === 'hi'
          ? 'कोई आवेदन रिकॉर्ड नहीं मिला। कृपया अपने मोबाइल नंबर, ईमेल या संदर्भ संख्या की जांच करें।'
          : 'No application record found. Please verify your mobile number, email, or reference number.'));
      }
    } catch (err) {
      console.error('Status fetch error:', err);
      // Fallback: check localStorage in case server is offline
      try {
        const localRecords: any[] = JSON.parse(localStorage.getItem('forest_recruitment_records') || '[]');
        const found = localRecords.find(r => 
          r.mobile?.includes(query) || 
          r.email?.toLowerCase() === query.toLowerCase() || 
          r.applicationRef?.toUpperCase() === query.toUpperCase() ||
          r.utrNumber === query
        );
        if (found) {
          setRecord({
            id: 1,
            application_ref: found.applicationRef,
            full_name: found.fullName,
            father_name: found.fatherName,
            mother_name: found.motherName,
            dob: found.dob,
            gender: found.gender,
            marital_status: found.maritalStatus,
            category: found.category,
            amount: found.amount,
            mobile: found.mobile,
            email: found.email,
            identification_mark: found.identificationMark,
            address_line: found.addressLine,
            pincode: found.pincode,
            home_district: found.homeDistrict,
            preferred_division: found.preferredDivision,
            is_employed: found.isEmployed,
            employer_name: found.employerName,
            current_post: found.currentPost,
            leaving_date: found.leavingDate,
            employment_type: found.employmentType,
            noc_status: found.nocStatus,
            applied_post: found.appliedPost,
            tenth_board: found.tenthBoard,
            tenth_year: found.tenthYear,
            tenth_percent: found.tenthPercent,
            twelfth_board: found.twelfthBoard,
            twelfth_year: found.twelfthYear,
            twelfth_percent: found.twelfthPercent,
            typing_certificate: found.typingCertificate,
            ncc_wing: found.nccWing,
            utr_number: found.utrNumber,
            payment_status: found.payment_status || 'pending',
            created_at: found.timestamp || new Date().toISOString()
          });
        } else {
          setSearchError(lang === 'hi'
            ? 'सर्वर से संपर्क नहीं हो सका और स्थानीय रिकॉर्ड में भी यह डेटा नहीं मिला।'
            : 'Unable to reach database and no local record found.');
        }
      } catch {
        setSearchError(lang === 'hi' ? 'डेटाबेस से संपर्क करने में त्रुटि हुई।' : 'Error connecting to database.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSearch = () => {
    setRecord(null);
    setSearchQuery('');
    setCaptchaInput('');
    setCaptchaError(null);
    setSearchError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      {/* Top Breadcrumb & Back */}
      <div className="mb-4 flex items-center justify-between">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>{lang === 'hi' ? 'आवेदन पोर्टल पर वापस जाएं' : 'Back to Application Portal'}</span>
          </button>
        )}
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-slate-800">
        {/* Official Header Strip */}
        <div className="bg-gradient-to-r from-[#174A32] via-[#24563B] to-[#0F2038] text-white p-5 sm:p-6 text-center border-b-4 border-[#B79A52] relative">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <ShieldCheck className="w-6 h-6 text-[#E8DFB8]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#E8DFB8]">
              {lang === 'hi' ? 'राज्य वन विभाग भर्ती एवं चयन प्रकोष्ठ' : 'State Forest Department Recruitment Cell'}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight">
            {lang === 'hi' ? 'आवेदन एवं शुल्क भुगतान स्थिति जांचें' : 'Check Application & Payment Status'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            {lang === 'hi' 
              ? 'पंजीकृत मोबाइल नंबर, ईमेल अथवा आवेदन संख्या दर्ज कर अपनी वर्तमान स्थिति देखें' 
              : 'Track current status using your registered Mobile Number, Email ID, or Application Ref'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7">
          {!record ? (
            /* Search Form */
            <form onSubmit={handleSearch} className="max-w-xl mx-auto space-y-5">
              {/* Search Identifier Input */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-700" />
                    <span>
                      {lang === 'hi' 
                        ? 'पंजीकृत मोबाइल नंबर / ईमेल आईडी / आवेदन संख्या' 
                        : 'Registered Mobile No. / Email ID / Application Ref No.'}
                    </span>
                    <span className="text-red-600">*</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={lang === 'hi' ? 'उदा. 09876543210 या youremail@domain.com या FD-REC-2026-...' : 'e.g. 09876543210 or email@domain.com'}
                    className="w-full h-11 pl-10 pr-3 text-sm rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition bg-white text-slate-900"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {lang === 'hi'
                    ? 'आपने फॉर्म भरते समय जो मोबाइल नंबर या ईमेल दिया था, उसे यहाँ लिखें।'
                    : 'Enter the mobile number or email address provided during application.'}
                </p>
              </div>

              {/* Security Captcha Input */}
              <div className="pt-2 border-t border-slate-100">
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

              {/* Search Error Alert */}
              {searchError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-800 animate-in fade-in-50">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{searchError}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#174A32] hover:bg-[#24563B] text-white font-bold py-3 px-4 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#E8DFB8]" />
                    <span>{lang === 'hi' ? ' आवेदन में खोजा जा रहा है...' : 'Searching Candidate...'}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 text-[#E8DFB8]" />
                    <span>{lang === 'hi' ? 'आवेदन स्थिति देखें (Check Status)' : 'Search Status'}</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Results Dossier Card */
            <div className="space-y-5 animate-in zoom-in-95 duration-200">
              {/* Dynamic Status Header Badge */}
              {record.payment_status === 'verified' ? (
                <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      <CheckCircle2 size={28} />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase font-bold text-emerald-800 tracking-wider">
                        {lang === 'hi' ? 'आवेदन एवं शुल्क सत्यापन स्थिति' : 'Application & Fee Verification Status'}
                      </div>
                      <div className="text-base sm:text-lg font-bold text-emerald-950 flex items-center gap-2 justify-center sm:justify-start">
                        <span>{lang === 'hi' ? 'परीक्षा शुल्क: पूर्णतः सत्यापित व स्वीकृत' : 'Application Fee: Confirmed & Paid'}</span>
                        <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          PAID
                        </span>
                      </div>
                      <p className="text-xs text-emerald-800 mt-0.5">
                        {lang === 'hi' 
                          ? `आपका परीक्षा शुल्क (₹${record.amount}) विभागीय नियंत्रण कक्ष द्वारा सत्यापित कर लिया गया है।` 
                          : `Your exam fee (₹${record.amount}) has been successfully verified by the recruitment cell.`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs shrink-0">
                    <div className="text-slate-500">{lang === 'hi' ? 'आवेदन संदर्भ संख्या:' : 'Application Ref:'}</div>
                    <div className="text-sm font-bold text-[#174A32]">{record.application_ref}</div>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      <Clock size={28} />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase font-bold text-amber-800 tracking-wider">
                        {lang === 'hi' ? 'आवेदन एवं शुल्क सत्यापन स्थिति' : 'Application & Fee Verification Status'}
                      </div>
                      <div className="text-base sm:text-lg font-bold text-amber-950 flex items-center gap-2 justify-center sm:justify-start">
                        <span>{lang === 'hi' ? 'परीक्षा शुल्क: सत्यापन प्रक्रियाधीन' : 'Application Fee: Pending Verification'}</span>
                        <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          PENDING
                        </span>
                      </div>
                      <p className="text-xs text-amber-800 mt-0.5">
                        {lang === 'hi' 
                          ? 'आवेदन व UTR प्रविष्टि दर्ज हो चुकी है। विभागीय बैंक समाधान प्रक्रियाधीन है (2 से 3 घंटे)।' 
                          : 'UTR recorded. Bank reconciliation under review by recruitment desk (2-3 hours).'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs shrink-0">
                    <div className="text-slate-500">{lang === 'hi' ? 'आवेदन संदर्भ संख्या:' : 'Application Ref:'}</div>
                    <div className="text-sm font-bold text-[#174A32]">{record.application_ref}</div>
                  </div>
                </div>
              )}

              {/* Comprehensive Details Grid */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs font-mono space-y-4">
                <div className="border-b border-slate-200 pb-2 flex items-center justify-between text-[11px] font-bold text-[#174A32]">
                  <span className="flex items-center gap-1.5">
                    <FileText size={14} />
                    <span>FOREST RECRUITMENT CELL — OFFICIAL CANDIDATE RECORD</span>
                  </span>
                  {record.payment_status === 'verified' ? (
                    <span className="text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded font-bold">
                      FEE VERIFIED (PAID)
                    </span>
                  ) : (
                    <span className="text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded font-bold">
                      VERIFICATION PENDING
                    </span>
                  )}
                </div>

                {/* Candidate Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800">
                  <div><strong>Applied Cadre / Post:</strong> <span className="text-[#174A32] font-bold">{record.applied_post}</span></div>
                  <div><strong>Candidate Full Name:</strong> {record.full_name}</div>
                  <div><strong>Father / Guardian:</strong> {record.father_name || 'N/A'}</div>
                  <div><strong>Mother Name:</strong> {record.mother_name || 'N/A'}</div>
                  <div><strong>Date of Birth / Gender:</strong> {record.dob} ({record.gender?.toUpperCase()})</div>
                  <div><strong>Category & Fee:</strong> {record.category} — <strong className="text-emerald-700">₹{record.amount}</strong></div>
                  
                  {/* UTR Number */}
                  <div className={`sm:col-span-2 p-2.5 rounded-lg border ${
                    record.payment_status === 'verified' ? 'bg-emerald-50/60 border-emerald-400' : 'bg-white border-amber-300'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <strong>12-Digit UTR / Transaction No:</strong>{' '}
                        <span className="text-emerald-900 font-bold text-sm tracking-wider font-mono">{record.utr_number}</span>
                      </div>
                      {record.payment_status === 'verified' ? (
                        <div className="flex items-center gap-1.5 text-emerald-800 text-[11px] font-bold bg-emerald-100 px-2.5 py-1 rounded border border-emerald-300">
                          <CheckCircle2 size={13} className="text-emerald-700" />
                          <span>{lang === 'hi' ? 'शुल्क स्वीकृत (PAID / VERIFIED)' : 'Fee Confirmed (PAID / VERIFIED)'}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-800 text-[11px] font-semibold bg-amber-100 px-2.5 py-1 rounded border border-amber-300">
                          <Clock size={13} className="text-amber-700" />
                          <span>{lang === 'hi' ? 'सत्यापन प्रक्रियाधीन (PENDING)' : 'Verification Under Process (PENDING)'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div><strong>Contact Mobile:</strong> {record.mobile}</div>
                  <div><strong>Email Address:</strong> {record.email || 'N/A'}</div>
                  <div><strong>Address & PIN:</strong> {record.address_line}, PIN: {record.pincode}</div>
                  <div><strong>Preferred Division:</strong> {record.preferred_division || 'State Level'}</div>
                  <div><strong>Identification Mark:</strong> {record.identification_mark || 'Recorded'}</div>
                  <div><strong>Submission Timestamp:</strong> {new Date(record.created_at).toLocaleString('en-IN')}</div>
                </div>

                {/* Education Record */}
                <div className="pt-2 border-t border-slate-200">
                  <div className="font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Briefcase size={13} />
                    <span>Academic & Qualification Details:</span>
                  </div>
                  <div className="text-slate-600 space-y-0.5">
                    <div>10th / Secondary: {record.tenth_board} ({record.tenth_year}) — {record.tenth_percent}%</div>
                    <div>12th / Intermediate: {record.twelfth_board} ({record.twelfth_year}) — {record.twelfth_percent}%</div>
                    {record.typing_certificate && <div>Computer Typing Certificate: {record.typing_certificate.toUpperCase()}</div>}
                  </div>
                </div>

                {/* Employment Status */}
                <div className="pt-2 border-t border-slate-200">
                  <strong>Current Employment Status: </strong>
                  {record.is_employed === 'yes' ? (
                    <span className="text-amber-800 font-semibold">
                      Employed at {record.employer_name || 'Organization'} as {record.current_post || 'Post'} (Relieving: {record.leaving_date || 'N/A'})
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-semibold">Fresher / Not Currently Employed</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetSearch}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center gap-1.5"
                >
                  <Search size={14} />
                  <span>{lang === 'hi' ? 'अन्य आवेदन खोजें (Search Another)' : 'Search Another Application'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-[#174A32] hover:bg-[#24563B] text-white text-xs font-bold rounded-lg shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <Printer size={15} />
                  <span>{lang === 'hi' ? 'आवेदन स्थिति पर्ची प्रिंट करें (Print)' : 'Print Application Slip'}</span>
                </button>
              </div>

              {/* Official Helpline Box */}
              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs text-emerald-950 flex flex-wrap items-center justify-between gap-2">
                <div className="font-semibold text-emerald-900">
                  {lang === 'hi' ? 'भर्ती प्रकोष्ठ सहायता डेस्क (Helpdesk):' : 'Candidate Helpline Desk:'}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
                  <span className="flex items-center gap-1"><Phone size={12} /> Calling: <strong>8276866126</strong></span>
                  <span className="flex items-center gap-1">WhatsApp: <strong>8389948785</strong></span>
                  <span className="flex items-center gap-1"><Mail size={12} /> Info.forest.gov@gmail.com</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
