import "../styles/globals.css";
import { Analytics } from '@vercel/analytics/react';
import AppContext, { AppState, defaultState } from "../components/AppContextFolder/AppContext";
import { useRef, useState } from "react";
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const timerCookie = useRef<number | null>(null);
  const windowSizeTrackerRef = useRef<((this: Window, ev: UIEvent) => void) | null>(null);
  const mousePositionRef = useRef<((this: Window, ev: MouseEvent) => void) | null>(null);
  
  const [sharedState, setSharedState] = useState<AppState>({
    ...defaultState,
    userdata: {
      timerCookieRef: timerCookie,
      windowSizeTracker: windowSizeTrackerRef,
      mousePositionTracker: mousePositionRef,
    },
  });

  return (
    <AppContext.Provider value={{ sharedState, setSharedState }}>
      <Component {...pageProps} />
      <Analytics />
    </AppContext.Provider>
  );
}

export default MyApp;
