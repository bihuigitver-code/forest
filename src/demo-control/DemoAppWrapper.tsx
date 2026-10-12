import React, { useState, useEffect } from 'react';
import { DEMO_CONTROL_SLUG } from './constants';
import { getDemoState, subscribeDemoState, type DemoState } from './demoState';
import { DemoControlPanel } from './DemoControlPanel';
import { Demo404Screen } from './Demo404Screen';
import { DemoSslScreen } from './DemoSslScreen';

interface DemoAppWrapperProps {
  children: React.ReactNode;
}

export const DemoAppWrapper: React.FC<DemoAppWrapperProps> = ({ children }) => {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [demoState, setDemoState] = useState<DemoState>(() => getDemoState());

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeDemoState((newState) => {
      setDemoState(newState);
    });
    return unsubscribe;
  }, []);

  const isControlRoute = pathname === DEMO_CONTROL_SLUG;

  // 1. If accessing the secret control URL, render the control panel
  if (isControlRoute) {
    return <DemoControlPanel />;
  }

  // 2. If on normal routes, manage error screen display while preserving application state
  return (
    <>
      <div 
        style={{ display: demoState.activeDisplay === 'none' ? 'block' : 'none' }}
        aria-hidden={demoState.activeDisplay !== 'none'}
      >
        {children}
      </div>

      {demoState.activeDisplay === '404' && <Demo404Screen />}
      {demoState.activeDisplay === 'ssl' && <DemoSslScreen />}
    </>
  );
};
