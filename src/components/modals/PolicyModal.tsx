import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';

interface PolicyModalProps {
  data: any;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ data, onClose }) => {
  const { lang } = useLanguage();

  // If this modal is for grievance token confirmation
  if (data?.token) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white max-w-lg w-full border-2 border-[#174A32] rounded-xs shadow-2xl overflow-hidden">
          <div className="bg-[#174A32] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#B79A52]">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-[#E8DFB8]" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                {lang === 'hi' ? 'जन समाधान पावती (प्रारूप)' : 'Citizen Grievance Receipt (Demo)'}
              </span>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-[#24563B] rounded text-slate-200 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-4 text-xs text-slate-800">
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xs text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                {lang === 'hi' ? 'विशिष्ट ट्रैकिंग टोकन संख्या' : 'Unique Tracking Registration Token'}
              </span>
              <div className="text-xl font-mono font-extrabold text-[#174A32] tracking-wider">
                {data.token}
              </div>
              <p className="text-[11px] text-emerald-800 font-medium">
                {lang === 'hi'
                  ? 'आपकी याचिका प्रारूप डेटाबेस में दर्ज कर ली गई है।'
                  : 'Your grievance reference has been recorded in the prototype register.'}
              </p>
            </div>

            <div className="space-y-1.5 border border-[#D7DED8] p-3 bg-[#FAFAF7] rounded-xs">
              <div><strong>{lang === 'hi' ? 'आवेदक' : 'Complainant'}:</strong> {data.name}</div>
              <div><strong>{lang === 'hi' ? 'संबंधित प्रभाग' : 'Assigned Division'}:</strong> {data.division}</div>
              <div><strong>{lang === 'hi' ? 'विषय' : 'Subject'}:</strong> {data.subject}</div>
              <div><strong>{lang === 'hi' ? 'अनुमानित निस्तारण' : 'Standard SLA'}:</strong> 30 Working Days</div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-600 p-2.5 text-[11px] text-amber-900">
              {lang === 'hi'
                ? 'सूचना: यह एक प्रदर्शन इंटरफ़ेस है। वास्तविक शिकायत निवारण हेतु कृपया राज्य जन-समाधान पोर्टल अथवा निकटतम डीएफओ कार्यालय से संपर्क करें।'
                : 'Note: This portal is a demonstration interface. Official legal complaints should be lodged on the State Single Window Grievance Portal or at the local DFO Office.'}
            </div>

            <button
              onClick={onClose}
              className="w-full py-2 bg-[#174A32] text-white font-semibold rounded-xs hover:bg-[#24563B] transition text-xs"
            >
              {lang === 'hi' ? 'पुष्टि करें एवं बंद करें' : 'Acknowledge & Close'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Document download simulated viewer
  if (data?.title) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white max-w-lg w-full border-2 border-[#174A32] rounded-xs shadow-2xl overflow-hidden">
          <div className="bg-[#174A32] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#B79A52]">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-[#B79A52]" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                {lang === 'hi' ? 'राजपत्र आदेश / नियमावली' : 'Gazette Statute / Document Archive'}
              </span>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-[#24563B] rounded text-slate-200 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-3.5 text-xs text-slate-800">
            <h3 className="font-bold text-sm text-[#183153] leading-snug">
              {data.title}
            </h3>
            <div className="bg-[#FAFAF7] border border-[#D7DED8] p-3 rounded-xs space-y-1 font-mono text-[11px] text-slate-600">
              <div><strong>Document No:</strong> {data.docNumber}</div>
              <div><strong>Category:</strong> {data.category?.toUpperCase()}</div>
              <div><strong>Published:</strong> {data.publishedDate}</div>
              <div><strong>File Size:</strong> {data.fileSize} (Official Certified Copy)</div>
            </div>

            <p className="text-slate-600 leading-relaxed text-xs">
              {lang === 'hi'
                ? 'यह दस्तावेज आधिकारिक राजपत्र एवं वन विभाग के अभिलेखागार में संरक्षित वैधानिक प्रतिलिपि का प्रारूप प्रतिरूप है।'
                : 'This document represents an archival statutory reproduction under the Forest Department official publication series.'}
            </p>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  alert(lang === 'hi' ? 'दस्तावेज प्रतिलिपि डाउनलोड की जा रही है...' : 'Downloading archival copy...');
                  onClose();
                }}
                className="px-4 py-2 bg-[#24563B] text-white font-semibold rounded-xs hover:bg-[#174A32] transition"
              >
                {lang === 'hi' ? 'पीडीएफ डाउनलोड करें' : 'Download Document PDF'}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-xs hover:bg-slate-300 transition"
              >
                {lang === 'hi' ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard government policies
  const policyType = data?.policyType || 'privacy';

  const getPolicyContent = () => {
    switch (policyType) {
      case 'hyperlink':
        return {
          title: lang === 'hi' ? 'हाइपरलिंकिंग नीति (Hyperlinking Policy)' : 'Hyperlinking Policy',
          content: lang === 'hi'
            ? 'हम इस वेबसाइट पर उपलब्ध कराई गई जानकारी से सीधे लिंक करने पर आपत्ति नहीं करते हैं और इसके लिए किसी पूर्व अनुमति की आवश्यकता नहीं है। तथापि, हम चाहते हैं कि आप हमें इस पोर्टल को प्रदान किए गए किसी भी लिंक के बारे में सूचित करें ताकि आपको इसमें किए गए किसी भी परिवर्तन या अद्यतन के बारे में सूचित रखा जा सके। हम अपने पृष्ठों को आपकी साइट पर फ़्रेम में लोड करने की अनुमति नहीं देते हैं।'
            : 'We do not object to you linking directly to the information hosted on this portal and no prior permission is required. However, we request you to inform us about links provided to this website. Also, we do not permit our pages to be loaded into frames on your site. The pages belonging to this portal must load into a newly opened browser window of the user.'
        };
      case 'privacy':
        return {
          title: lang === 'hi' ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy',
          content: lang === 'hi'
            ? 'यह वेबसाइट स्वचालित रूप से आपसे कोई विशिष्ट व्यक्तिगत जानकारी (जैसे नाम, फोन नंबर या ई-मेल पता) कैप्चर नहीं करती है, जो हमें आपको व्यक्तिगत रूप से पहचानने की अनुमति देती है। यदि आप अपनी व्यक्तिगत जानकारी प्रदान करना चुनते हैं (जैसे फीडबैक फॉर्म भरते समय), तो इसका उपयोग केवल आपके संदेश का उत्तर देने के लिए किया जाएगा।'
            : 'This website does not automatically capture any specific personal information from you (like name, phone number or e-mail address), that allows us to identify you individually. If you choose to provide your personal information, such as when filling out a feedback or grievance form, we use it only to fulfill your request.'
        };
      case 'copyright':
        return {
          title: lang === 'hi' ? 'कॉपीराइट नीति (Copyright Policy)' : 'Copyright Policy',
          content: lang === 'hi'
            ? 'इस वेबसाइट पर प्रदर्शित सामग्री को निःशुल्क किसी भी प्रारूप या मीडिया में किसी विशिष्ट अनुमति की आवश्यकता के बिना पुनः प्रस्तुत किया जा सकता है। यह इस शर्त के अधीन है कि सामग्री को सही ढंग से पुनः प्रस्तुत किया जाए और इसका उपयोग अपमानजनक तरीके से या भ्रामक संदर्भ में न किया जाए।'
            : 'The material featured on this website may be reproduced free of charge in any format or media without requiring specific permission. This is subject to the material being reproduced accurately and not being used in a derogatory manner or in a misleading context. Where the material is being published, the source must be prominently acknowledged.'
        };
      case 'terms':
        return {
          title: lang === 'hi' ? 'नियम एवं शर्तें (Terms & Conditions)' : 'Terms & Conditions',
          content: lang === 'hi'
            ? 'यह पोर्टल केवल सूचनात्मक एवं प्रदर्शन प्रयोजनों के लिए विकसित किया गया है। यद्यपि सामग्री की सटीकता और प्रामाणिकता सुनिश्चित करने के लिए सभी प्रयास किए गए हैं, फिर भी इसे कानून के एक बयान के रूप में नहीं माना जाना चाहिए अथवा किसी कानूनी उद्देश्य के लिए उपयोग नहीं किया जाना चाहिए।'
            : 'This portal is designed for informational and administrative review purposes. Though all efforts have been made to ensure the accuracy and currency of the content on this website, the same should not be construed as a statement of law or used for any legal purposes.'
        };
      case 'accessibility':
        return {
          title: lang === 'hi' ? 'पहुंच क्षमता विवरण (Accessibility Statement)' : 'Accessibility Statement',
          content: lang === 'hi'
            ? 'हम यह सुनिश्चित करने के लिए प्रतिबद्ध हैं कि यह पोर्टल उपयोग की जाने वाली तकनीक अथवा क्षमता की परवाह किए बिना सभी उपयोगकर्ताओं के लिए सुलभ हो। यह पोर्टल भारत सरकार की वेबसाइटों के दिशानिर्देशों (GIGW 3.0) और WCAG 2.1 स्तर AA का अनुपालन करने के उद्देश्य से बनाया गया है।'
            : 'We are committed to ensuring that the Forest Department portal is accessible to all users irrespective of device or ability. It has been built with an aim to provide maximum accessibility and usability to its visitors, adhering to the Guidelines for Indian Government Websites (GIGW 3.0) and World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1 level AA.'
        };
      default:
        return {
          title: lang === 'hi' ? 'अस्वीकरण (Disclaimer)' : 'Disclaimer',
          content: lang === 'hi'
            ? 'यह वेबसाइट एक प्रारूप (Demonstration Prototype) है और किसी वास्तविक सरकारी कार्यालय की आधिकारिक वेबसाइट नहीं है। सभी आंकड़े, नाम और सूचनाएं उदाहरण के रूप में दी गई हैं।'
            : 'This website is a prototype demonstration portal. It is not an officially commissioned government portal. All statistics, names, and notices are sample mock data for evaluation and interface design review.'
        };
    }
  };

  const policy = getPolicyContent();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white max-w-lg w-full border-2 border-[#174A32] rounded-xs shadow-2xl overflow-hidden">
        <div className="bg-[#174A32] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#B79A52]">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#B79A52]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-200">
              {policy.title}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#24563B] rounded text-slate-200 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>{policy.content}</p>

          <div className="bg-[#F5F4EC] border border-[#D7DED8] p-3 rounded-xs text-[11px] text-slate-600">
            <strong>{lang === 'hi' ? 'मानक संदर्भ:' : 'Statutory Reference:'}</strong>{' '}
            {lang === 'hi'
              ? 'भारतीय सरकारी वेबसाइट दिशानिर्देश (GIGW), इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय'
              : 'Guidelines for Indian Government Websites (GIGW), Ministry of Electronics & IT (MeitY)'}
          </div>

          <button
            onClick={onClose}
            className="w-full py-2 bg-[#174A32] hover:bg-[#24563B] text-white font-semibold rounded-xs transition text-xs"
          >
            {lang === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
