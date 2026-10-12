import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AcademicDisclaimerBanner: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="bg-amber-600 text-white px-4 py-2 text-xs font-semibold shadow-inner border-b border-amber-700 flex items-center justify-center text-center gap-2 sticky top-0 z-50">
      <AlertTriangle size={16} className="shrink-0 text-amber-200" />
      <span>
        {lang === 'hi' ? (
          <>
            <strong>शैक्षणिक परियोजना डिस्क्लेमर:</strong> यह वेबसाइट केवल एक कॉलेज प्रोजेक्ट (UI Prototype) है। इसका किसी भी वास्तविक सरकारी विभाग से कोई संबंध नहीं है। यहाँ किसी भी प्रकार का वास्तविक लेन-देन या भुगतान न करें।
          </>
        ) : (
          <>
            <strong>ACADEMIC PROJECT DISCLAIMER:</strong> This website is an educational college prototype. It is NOT affiliated with any official government authority. Do not make any real payments.
          </>
        )}
      </span>
    </div>
  );
};
