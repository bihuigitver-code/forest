import React, { useState, useEffect, useCallback } from 'react';
import { RotateCw, ShieldCheck } from 'lucide-react';

interface GovernmentCaptchaProps {
  onCaptchaChange: (code: string) => void;
  userInput: string;
  onUserInputChange: (value: string) => void;
  error?: string | null;
  lang?: 'en' | 'hi';
}

const CHARACTERS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

const generateCaptchaCode = (length = 5): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }
  return result;
};

export const GovernmentCaptcha: React.FC<GovernmentCaptchaProps> = ({
  onCaptchaChange,
  userInput,
  onUserInputChange,
  error,
  lang = 'hi'
}) => {
  const [captchaCode, setCaptchaCode] = useState<string>(() => generateCaptchaCode(5));

  useEffect(() => {
    onCaptchaChange(captchaCode);
  }, [captchaCode, onCaptchaChange]);

  const refreshCaptcha = useCallback(() => {
    const newCode = generateCaptchaCode(5);
    setCaptchaCode(newCode);
  }, []);

  return (
    <div className="space-y-1.5 w-full">
      <label className="block text-xs font-bold text-slate-800">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>
            {lang === 'hi' 
              ? 'सुरक्षा कोड (कैप्चा) दर्ज करें' 
              : 'Security Verification Code (Captcha)'}
          </span>
          <span className="text-red-600">*</span>
        </span>
      </label>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {/* Government Stylized Captcha Canvas Box */}
        <div 
          className="relative select-none h-11 px-4 rounded-lg bg-gradient-to-r from-slate-100 via-amber-50 to-slate-200 border-2 border-slate-300 flex items-center justify-between gap-3 shadow-inner overflow-hidden shrink-0"
          title="Security Verification Code"
        >
          {/* Background Noise Decorative SVG Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="10" x2="100%" y2="35" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="10" y1="38" x2="95%" y2="8" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="25" cy="18" r="1.5" fill="#334155" />
            <circle cx="65" cy="28" r="2" fill="#334155" />
            <circle cx="95" cy="12" r="1.5" fill="#334155" />
          </svg>

          {/* Captcha Characters with individual skew and font variations */}
          <div className="flex items-center gap-2 tracking-[0.35em] font-mono font-black text-xl text-slate-900 drop-shadow-sm z-10 pl-1">
            {captchaCode.split('').map((char, idx) => {
              const rotation = (idx % 2 === 0 ? 1 : -1) * ((idx * 5) % 15);
              return (
                <span
                  key={idx}
                  style={{
                    display: 'inline-block',
                    transform: `rotate(${rotation}deg)`,
                    color: idx % 2 === 0 ? '#0f172a' : '#1e3a8a'
                  }}
                  className="font-extrabold select-none"
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={refreshCaptcha}
            className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer z-10"
            title={lang === 'hi' ? 'नया कैप्चा कोड प्राप्त करें' : 'Get New Captcha Code'}
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Captcha User Input Box */}
        <div className="flex-1">
          <input
            type="text"
            maxLength={6}
            value={userInput}
            onChange={(e) => onUserInputChange(e.target.value.toUpperCase().trim())}
            placeholder={lang === 'hi' ? 'कोड यहाँ लिखें' : 'Enter Captcha'}
            className="w-full h-11 px-3 text-sm font-mono uppercase font-bold tracking-widest rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition bg-white text-slate-900 placeholder:normal-case placeholder:tracking-normal placeholder:font-normal placeholder:text-slate-400"
          />
        </div>
      </div>

      {error && (
        <p className="text-[11px] font-semibold text-red-600 mt-1 animate-in fade-in-50">
          {error}
        </p>
      )}
    </div>
  );
};
