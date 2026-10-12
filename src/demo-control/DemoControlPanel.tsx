/* oxlint-disable react/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { 
  getDemoState, 
  set404Enabled, 
  setSslEnabled, 
  subscribeDemoState, 
  type DemoState 
} from './demoState';
import { Demo404Screen } from './Demo404Screen';
import { DemoSslScreen } from './DemoSslScreen';
import { STORAGE_KEY_AUTH, CAUSES_ADMIN_TOKEN } from './constants';
import { Shield, ShieldAlert, Lock, AlertCircle, CheckCircle2, Layers } from 'lucide-react';

export const DemoControlPanel: React.FC = () => {
  const [demoState, setDemoState] = useState<DemoState>(() => getDemoState());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return Boolean(
      sessionStorage.getItem(CAUSES_ADMIN_TOKEN) ||
      sessionStorage.getItem(STORAGE_KEY_AUTH)
    );
  });

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeDemoState((newState) => {
      setDemoState(newState);
    });
    return unsubscribe;
  }, []);

  const handleToggle404 = () => {
    set404Enabled(!demoState.is404Enabled);
  };

  const handleToggleSsl = () => {
    setSslEnabled(!demoState.isSslEnabled);
  };

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsSubmitting(true);

    try {
      // 1. First attempt verification against existing admin backend API
      let authenticated = false;
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (data.success) {
          authenticated = true;
          sessionStorage.setItem(CAUSES_ADMIN_TOKEN, data.token || 'causes_admin_authenticated');
        }
      } catch {
        // Backend API might not be active in static preview; proceed to env fallback
      }

      // 2. Check environment-configured admin passcode if backend API is offline
      if (!authenticated) {
        const envPass = (import.meta as any).env?.VITE_ADMIN_PASS || (import.meta as any).env?.VITE_CONTROL_PASS;
        if (envPass && password === envPass) {
          authenticated = true;
        }
      }

      if (authenticated) {
        sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
        setIsAuthenticated(true);
      } else {
        setLoginError('Invalid administrator credentials. Access denied.');
      }
    } catch {
      setLoginError('Authentication verification failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If unauthenticated, show administrator authentication gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Admin Authorization Required</h1>
              <p className="text-xs text-slate-400">Restricted Demonstration Control Interface</p>
            </div>
          </div>

          <div className="mb-6 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Security Policy:</strong> An unpredictable URL is obscurity, not authentication. Please enter administrator credentials to unlock the error control switches.
            </span>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAuthenticate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-red-500 transition font-mono"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-red-500 transition font-mono"
                placeholder="••••••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm shadow-lg shadow-red-900/30 transition duration-150 disabled:opacity-50"
            >
              {isSubmitting ? 'Verifying...' : 'Unlock Control Panel'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Once authenticated: Render the control panel with ONLY the two main control buttons
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Sticky Top Control Dock containing ONLY the Two Primary Control Buttons */}
      <header className="sticky top-0 z-[60] bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl px-4 py-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight">System Demo Control Panel</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  SECURE SESSION
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Independent demo error injection controls for client-side demonstration
              </p>
            </div>
          </div>

          {/* THE TWO MAIN CONTROL BUTTONS */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Button One: Toggle 404 Not Found Screen */}
            <button
              type="button"
              onClick={handleToggle404}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border shadow-md flex items-center justify-center gap-2 ${
                demoState.is404Enabled
                  ? 'bg-red-600 hover:bg-red-700 text-white border-red-400 shadow-red-600/30 ring-2 ring-red-500/50'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              aria-pressed={demoState.is404Enabled}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${demoState.is404Enabled ? 'bg-white animate-ping' : 'bg-slate-500'}`} />
              <span>{demoState.is404Enabled ? 'Disable 404 Not Found' : 'Enable 404 Not Found'}</span>
            </button>

            {/* Button Two: Toggle SSL Certificate Warning Screen */}
            <button
              type="button"
              onClick={handleToggleSsl}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border shadow-md flex items-center justify-center gap-2 ${
                demoState.isSslEnabled
                  ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-400 shadow-amber-600/30 ring-2 ring-amber-500/50'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              aria-pressed={demoState.isSslEnabled}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${demoState.isSslEnabled ? 'bg-white animate-ping' : 'bg-slate-500'}`} />
              <span>{demoState.isSslEnabled ? 'Disable SSL Certificate Warning' : 'Enable SSL Certificate Warning'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body: Status Board & Active Live Demonstration */}
      <main className="flex-1 flex flex-col relative">
        {/* Status indicator banner */}
        <section className="bg-slate-900 border-b border-slate-800/80 px-4 py-3 sm:px-8">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-400">Active Mode:</span>
              {demoState.activeDisplay === 'none' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Normal Application UI (No errors active)
                </span>
              )}
              {demoState.activeDisplay === '404' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/40 font-bold font-mono">
                  <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                  404 Not Found Screen Active
                </span>
              )}
              {demoState.activeDisplay === 'ssl' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold font-mono">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  SSL Certificate Warning Active
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${demoState.is404Enabled ? 'bg-red-400' : 'bg-slate-600'}`} />
                <span>404: <strong>{demoState.is404Enabled ? 'ON' : 'OFF'}</strong></span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${demoState.isSslEnabled ? 'bg-amber-400' : 'bg-slate-600'}`} />
                <span>SSL Warning: <strong>{demoState.isSslEnabled ? 'ON' : 'OFF'}</strong></span>
              </span>
              {demoState.is404Enabled && demoState.isSslEnabled && (
                <span className="text-amber-400 font-semibold flex items-center gap-1" title="404 takes precedence over SSL Warning">
                  <Layers className="w-3.5 h-3.5" />
                  Priority 1: 404 (SSL Queued)
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Live Canvas Area */}
        <section className="flex-1 relative min-h-[550px] flex items-center justify-center p-4">
          {demoState.activeDisplay === '404' && (
            <div className="absolute inset-0">
              <Demo404Screen />
            </div>
          )}

          {demoState.activeDisplay === 'ssl' && (
            <div className="absolute inset-0">
              <DemoSslScreen />
            </div>
          )}

          {demoState.activeDisplay === 'none' && (
            <div className="max-w-xl text-center py-12 px-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl my-8">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Production Standby Mode</h2>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Both demonstration error modes are currently <strong>OFF</strong>. The application is serving normal production pages across all visitor routes.
              </p>
              <div className="text-left text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-400 space-y-2">
                <div className="text-slate-300 font-semibold mb-1">Operational Instructions:</div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">1.</span>
                  <span>Click <strong>Enable 404 Not Found</strong> above to simulate a full-page 404 error across the application without altering the browser URL.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">2.</span>
                  <span>Click <strong>Enable SSL Certificate Warning</strong> above to simulate a full-page browser security warning.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 font-bold">3.</span>
                  <span>When both are enabled, <strong>404 Not Found</strong> takes Priority 1. Disabling 404 will reveal the SSL warning; disabling both restores normal mode.</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
