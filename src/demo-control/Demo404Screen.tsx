import React from 'react';
import { AlertCircle, ServerCrash, HelpCircle } from 'lucide-react';

export const Demo404Screen: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50 text-slate-900 px-4 select-none overflow-y-auto"
      role="alert"
      aria-label="404 Page Not Found"
    >
      <div className="max-w-xl w-full text-center py-12 px-6">
        {/* Subtle status tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold tracking-wide uppercase mb-6">
          <AlertCircle className="w-3.5 h-3.5 text-red-600" />
          <span>HTTP 404 · Resource Not Found</span>
        </div>

        {/* Large 404 Heading */}
        <h1 className="text-8xl sm:text-9xl font-black tracking-tight text-slate-800 mb-2 font-mono">
          404
        </h1>

        {/* Page Not Found Subheading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight mb-4">
          Page Not Found
        </h2>

        {/* Required Message */}
        <p className="text-base text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
          The requested resource could not be found.
        </p>

        {/* Realistic technical diagnosis panel */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-8 text-left shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-3">
            <ServerCrash className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
              Diagnostic Details
            </span>
          </div>

          <div className="text-xs font-mono text-slate-600 space-y-2">
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-400">Status Code:</span>
              <span className="font-semibold text-red-600">404 (Not Found)</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-400">Routing Status:</span>
              <span className="text-slate-700">No matching endpoint</span>
            </div>
          </div>
        </div>

        {/* Footer info note */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>If you entered the URL manually, please check the spelling and try again.</span>
        </div>
      </div>
    </div>
  );
};
