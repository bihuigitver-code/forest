import { STORAGE_KEY_404, STORAGE_KEY_SSL, DEMO_STATE_EVENT } from './constants';

export interface DemoState {
  is404Enabled: boolean;
  isSslEnabled: boolean;
  activeDisplay: 'none' | '404' | 'ssl';
}

function safeGetItem(key: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(key) === 'true';
  } catch {
    return false;
  }
}

function safeSetItem(key: string, value: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (value) {
      localStorage.setItem(key, 'true');
    } else {
      localStorage.removeItem(key);
    }
  } catch (err) {
    console.error('Storage access error:', err);
  }
}

export function getDemoState(): DemoState {
  const is404Enabled = safeGetItem(STORAGE_KEY_404);
  const isSslEnabled = safeGetItem(STORAGE_KEY_SSL);

  // Predictable Priority Rule:
  // If both are enabled, 404 takes precedence (Priority 1).
  // If 404 is disabled, SSL Certificate Warning is displayed (Priority 2).
  let activeDisplay: 'none' | '404' | 'ssl' = 'none';
  if (is404Enabled) {
    activeDisplay = '404';
  } else if (isSslEnabled) {
    activeDisplay = 'ssl';
  }

  return {
    is404Enabled,
    isSslEnabled,
    activeDisplay,
  };
}

export function set404Enabled(enabled: boolean): void {
  safeSetItem(STORAGE_KEY_404, enabled);
  notifyStateChange();
}

export function setSslEnabled(enabled: boolean): void {
  safeSetItem(STORAGE_KEY_SSL, enabled);
  notifyStateChange();
}

function notifyStateChange(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(DEMO_STATE_EVENT));
  }
}

export function subscribeDemoState(callback: (state: DemoState) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleUpdate = () => {
    callback(getDemoState());
  };

  window.addEventListener(DEMO_STATE_EVENT, handleUpdate);
  window.addEventListener('storage', handleUpdate);

  return () => {
    window.removeEventListener(DEMO_STATE_EVENT, handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  };
}
