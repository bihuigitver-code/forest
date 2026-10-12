import React from 'react';
import { ShieldAlert, AlertTriangle, Lock, RefreshCw, KeyRound, Calendar, Globe, Info } from 'lucide-react';

export const DemoSslScreen: React.FC = () => {
  const currentHost = typeof window !== 'undefined' ? window.location.host : 'localhost';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F19] text-slate-100 px-4 select-none overflow-y-auto font-sans"
      role="alert"
      aria-label="Update Your SSL Certificate"
    >
      <div className="max-w-2xl w-full py-12 px-6">
        {/* Security Warning Icon Badge */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <ShieldAlert className="w-10 h-10 text-amber-400 animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-red-600 border-2 border-[#0B0F19] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Header Tag & Main Heading */}
        <div className="text-center mb-4">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider mb-3">
            Security Warning · TLS/SSL Status Alert
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Update Your SSL Certificate
          </h1>
        </div>

        {/* Required Message */}
        <p className="text-center text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
          Your SSL certificate requires attention. Please review the certificate status and renewal requirements.
        </p>

        {/* Certificate Status Area & Simulated Expiry Warning */}
        <div className="bg-[#131926] border border-slate-700/80 rounded-xl p-6 mb-6 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-slate-200">Certificate Status Overview</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/40">
              Simulated Expiry Warning
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-[#0B0F19] p-3 rounded-lg border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Protected Domain</span>
              </div>
              <div className="text-slate-200 font-bold truncate">{currentHost}</div>
            </div>

            <div className="bg-[#0B0F19] p-3 rounded-lg border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Certificate Status</span>
              </div>
              <div className="text-amber-400 font-bold">Renewal Required · Expired</div>
            </div>

            <div className="bg-[#0B0F19] p-3 rounded-lg border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                <span>Encryption Standard</span>
              </div>
              <div className="text-slate-300">TLS 1.3 · RSA 2048-bit</div>
            </div>

            <div className="bg-[#0B0F19] p-3 rounded-lg border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                <span>Next Action</span>
              </div>
              <div className="text-red-400 font-semibold">Certificate Reissuance Required</div>
            </div>
          </div>

          {/* Expiry Warning Callout */}
          <div className="mt-4 p-3 rounded-lg bg-amber-950/30 border border-amber-600/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-relaxed font-sans">
              <strong>Simulated Alert:</strong> Public TLS certificate validity for this domain has reached its expiration threshold. Traffic encryption requires an updated certificate with an active authority signature.
            </div>
          </div>
        </div>

        {/* Clear Notice: Meets safety constraint of not claiming real SSL failure */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 max-w-lg mx-auto text-center">
          <Info className="w-3.5 h-3.5 shrink-0 text-slate-600" />
          <span>Demonstration Mode Active · This screen is a safe front-end simulation and does not reflect actual server TLS transport status.</span>
        </div>
      </div>
    </div>
  );
};
