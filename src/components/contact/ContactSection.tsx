import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { divisionalOfficesData } from '../../data/department';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ShieldAlert, 
  AlertTriangle,
  MessageSquare
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { lang, t, openModal } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    division: 'central',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.message) {
      alert(lang === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill all mandatory fields.');
      return;
    }

    // Generate prototype tracking token
    const randomToken = `GRV-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;

    openModal('grievanceSuccess', {
      token: randomToken,
      name: formData.name,
      division: formData.division,
      subject: formData.subject || 'Forest Grievance / Inquiry'
    });
  };

  return (
    <section id="contact-section" className="py-12 bg-[#FAFAF7] border-b border-[#D7DED8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#174A32] pb-3 mb-8">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#B79A52] uppercase tracking-wider">
            <Building className="w-3.5 h-3.5 text-[#24563B]" />
            <span>{lang === 'hi' ? 'संपर्क एवं क्षेत्रीय निर्देशिका' : 'Field Directory & Public Grievance'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-[#174A32] mt-0.5">
            {t('contactHeading')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            {t('contactSubheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Headquarters & Emergency Helplines (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Aranya Bhavan Card */}
            <div className="bg-white border border-[#D7DED8] p-5 rounded-xs shadow-gov-sm">
              <div className="border-b border-slate-200 pb-2 mb-3">
                <span className="text-[11px] font-bold text-[#B79A52] uppercase tracking-wider">
                  {lang === 'hi' ? 'राज्य मुख्यालय' : 'State Headquarters'}
                </span>
                <h3 className="text-base font-bold text-[#174A32] mt-0.5 font-devanagari">
                  {t('headquartersTitle')}
                </h3>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-[#24563B] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">{t('addressLabel')}:</span>
                    <span>
                      {lang === 'hi'
                        ? 'अरण्य भवन, सेक्टर 19, वन परिसर, राजधानी नगर - 110001 (प्रारूप)'
                        : 'Aranya Bhavan, Sector 19, Forest Complex, Capital City - 110001 (Demo Placeholder)'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Phone className="w-4 h-4 text-[#24563B] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">{t('phoneLabel')}:</span>
                    <span>+91-11-2338-9000 / 2338-9001 (EPABX)</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Mail className="w-4 h-4 text-[#24563B] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">{t('emailLabel')}:</span>
                    <span>pccf-hoff@forestdept.demo.gov.in</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Clock className="w-4 h-4 text-[#24563B] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">
                      {lang === 'hi' ? 'कार्यालय समय' : 'Office Working Hours'}:
                    </span>
                    <span>{t('workingHours')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 24x7 Emergency Box */}
            <div className="bg-[#174A32] text-white p-4 rounded-xs border-2 border-[#B79A52] shadow-gov-sm">
              <div className="flex items-center space-x-2 text-[#E8DFB8] text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldAlert className="w-4 h-4 text-[#B79A52]" />
                <span>{lang === 'hi' ? '24 घंटे आपातकालीन हेल्पलाइन' : '24x7 Emergency Helplines'}</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-[#24563B]">
                  <span>{lang === 'hi' ? 'वनाग्नि व वन्यजीव हेल्पलाइन' : 'Forest Fire & Wildlife Emergency'}:</span>
                  <a href="tel:1926" className="font-mono font-bold text-amber-200 text-sm hover:underline">
                    1926 (Toll-Free)
                  </a>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#24563B]">
                  <span>{lang === 'hi' ? 'वन अपराध सूचना प्रकोष्ठ' : 'Forest Crime Control Cell'}:</span>
                  <span className="font-mono font-bold text-slate-200">1800-11-9988</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>{lang === 'hi' ? 'लोक सूचना अधिकारी (RTI Cell)' : 'Nodal RTI Officer'}:</span>
                  <span className="font-mono text-slate-300">011-2338-9014</span>
                </div>
              </div>
            </div>

            {/* Recruitment Helpdesk Box */}
            <div className="bg-white border-2 border-[#174A32] p-4 rounded-xs shadow-gov-sm">
              <div className="border-b border-slate-200 pb-2 mb-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#174A32] flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#24563B]" />
                  <span>{lang === 'hi' ? 'भर्ती एवं अभ्यर्थी सहायता प्रकोष्ठ' : 'Recruitment & Candidate Helpdesk'}</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {lang === 'hi' ? 'सक्रिय' : 'Active'}
                </span>
              </div>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="font-semibold">{lang === 'hi' ? 'कॉलिंग हेल्पलाइन:' : 'Calling Helpline:'}</span>
                  <a href="tel:8276866126" className="font-mono font-bold text-[#174A32] text-sm hover:underline">
                    8276866126
                  </a>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="font-semibold flex items-center space-x-1">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'hi' ? 'व्हाट्सएप सपोर्ट:' : 'WhatsApp Support:'}</span>
                  </span>
                  <a 
                    href="https://wa.me/918389948785" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-mono font-bold text-emerald-700 hover:underline"
                  >
                    8389948785
                  </a>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="font-semibold">{lang === 'hi' ? 'आधिकारिक ईमेल:' : 'Official Email:'}</span>
                  <a href="mailto:Info.forest.gov@gmail.com" className="font-mono text-blue-700 hover:underline text-[11px]">
                    Info.forest.gov@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* DFO Directory Preview */}
            <div className="bg-white border border-[#D7DED8] p-4 rounded-xs shadow-gov-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#183153] mb-2.5 border-b border-slate-200 pb-1.5">
                {t('divisionalOfficesTitle')}
              </h4>
              <div className="space-y-2 text-xs text-slate-700">
                {divisionalOfficesData.map((off, idx) => (
                  <div key={idx} className="p-2 bg-[#F5F4EC] rounded-xs border border-[#D7DED8] space-y-0.5">
                    <div className="font-bold text-[#174A32]">
                      {lang === 'hi' ? off.divisionHi : off.divisionEn}
                    </div>
                    <div className="text-[11px] text-slate-600 flex justify-between">
                      <span>{off.phone}</span>
                      <span className="text-slate-500 font-mono text-[10px]">{off.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Public Grievance / Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#D7DED8] p-5 sm:p-6 rounded-xs shadow-gov-sm">
              <div className="border-b border-slate-200 pb-3 mb-4">
                <span className="text-xs font-bold text-[#B79A52] uppercase tracking-wider">
                  {lang === 'hi' ? 'जन समाधान खिड़की' : 'Citizen Samadhan Window'}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#183153] mt-0.5 font-devanagari">
                  {t('inquiryFormTitle')}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {lang === 'hi'
                    ? 'वन्यजीव क्षति, अवैध कटाई, अथवा विभागीय सेवाओं से संबंधित सुझाव व शिकायत दर्ज करें।'
                    : 'Submit citizen inquiries, feedback, or grievance petitions regarding forest administrative matters.'}
                </p>
              </div>

              {/* Prototype Disclaimer Banner */}
              <div className="bg-amber-50 border-l-4 border-amber-600 p-3 mb-4 text-xs text-amber-900 rounded-r-xs flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{lang === 'hi' ? 'प्रारूप नोटिस: ' : 'Prototype Notice: '}</span>
                  {t('formNotice')}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {t('formName')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === 'hi' ? 'जैसे: राजेश कुमार' : 'e.g., Rajesh Kumar'}
                      className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {t('formMobile')} <span className="text-red-600">*</span>
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {t('formEmail')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="citizen@example.com"
                      className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {t('formDivision')} <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.division}
                      onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                      className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                    >
                      <option value="central">{lang === 'hi' ? 'केंद्रीय प्रादेशिक प्रभाग' : 'Central Territorial Division'}</option>
                      <option value="valley">{lang === 'hi' ? 'घाटी वन्यजीव प्रभाग' : 'Valley Wildlife Division'}</option>
                      <option value="south">{lang === 'hi' ? 'दक्षिण वन प्रभाग' : 'South Forest Division'}</option>
                      <option value="east">{lang === 'hi' ? 'पूर्वी वनीकरण प्रभाग' : 'Eastern Afforestation Division'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {t('formSubject')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={lang === 'hi' ? 'विषय लिखें...' : 'Subject of grievance or query...'}
                    className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {t('formMessage')} <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={lang === 'hi' ? 'विस्तारपूर्वक विवरण दर्ज करें...' : 'Please describe your petition or inquiry with relevant details...'}
                    className="w-full p-2 border border-[#D7DED8] rounded-xs bg-[#FAFAF7] focus:bg-white focus:outline-none focus:border-[#24563B]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#174A32] hover:bg-[#24563B] text-white font-bold text-xs uppercase tracking-wider rounded-xs transition shadow-gov flex items-center justify-center space-x-2"
                  >
                    <Send className="w-3.5 h-3.5 text-[#E8DFB8]" />
                    <span>{t('formSubmit')}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
