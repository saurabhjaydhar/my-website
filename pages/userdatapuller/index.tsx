import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import cookieCutter from "cookie-cutter";
import Footer from "../../components/Footer/Footer";
import About from "../../components/DataPullerProject/AboutComp/About";
import Timer from "../../components/DataPullerProject/TimerComp/Timer";
import { CookieTimeCounter } from "../../components/DataPullerProject/FuncVar/foo";

interface GpuTier {
  tier: number;
  isMobile: boolean;
}

interface ApiResponse {
  ip: string;
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  hasZipCode: boolean;
}

interface UserData {
  current?: ApiResponse;
}

export default function UserDataPuller() {
  const [isBlackListed, setIsBlackListed] = useState<boolean>(false);
  const [zipCode, setZipCode] = useState<string>("");
  const userData = useRef<ApiResponse | null>(null);
  const [gpuTier, setGpuTier] = useState<GpuTier | null>(null);
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);
  const [windowSize, setWindowSize] = useState<[number, number]>([0, 0]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const secUnits = useRef<HTMLSpanElement>(null);
  const secTens = useRef<HTMLSpanElement>(null);
  const minUnits = useRef<HTMLSpanElement>(null);
  const minTens = useRef<HTMLSpanElement>(null);

  const windowSizeTracker = useRef<((e: UIEvent) => void) | null>(null);
  const mousePositionTracker = useRef<((e: MouseEvent) => void) | null>(null);
  const keyboardEventTracker = useRef<((e: KeyboardEvent) => void) | null>(null);
  const timerCookieRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = (e: UIEvent) => {
      if (window) {
        setWindowSize([window.innerWidth, window.innerHeight]);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition([e.clientX, e.clientY]);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsBlackListed(true);
      }
    };

    windowSizeTracker.current = handleResize;
    mousePositionTracker.current = handleMouseMove;
    keyboardEventTracker.current = handleKeyDown;

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("keydown", handleKeyDown);

      setWindowSize([window.innerWidth, window.innerHeight]);

      const checkGpu = async () => {
        try {
          const gpuDetector = await import("detect-gpu");
          const gpu = await gpuDetector.getGPUTier();
          setGpuTier(gpu);
        } catch (error) {
          console.error("Failed to detect GPU:", error);
        }
      };

      checkGpu();

      if (secUnits.current && secTens.current && minUnits.current && minTens.current) {
        timerCookieRef.current = setInterval(() => {
          CookieTimeCounter(secUnits.current, secTens.current, minUnits.current, minTens.current);
        }, 1000);
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("keydown", handleKeyDown);
        if (timerCookieRef.current) {
          clearInterval(timerCookieRef.current);
        }
      }
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/userInfoByIP/info");
        const data = await response.json();
        userData.current = data;
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-AAprimary">
      <Head>
        <title>User Data Puller</title>
        <meta name="description" content="Pull user data and display it" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full flex flex-col items-center justify-center py-20">
        <Timer
          secUnits={secUnits}
          secTens={secTens}
          minUnits={minUnits}
          minTens={minTens}
        />
        <About
          isBlackListed={isBlackListed}
          userData={userData.current}
          gpuTier={gpuTier}
          mousePosition={mousePosition}
          windowSize={windowSize}
          isLoading={isLoading}
        />
      </main>

      <Footer />
    </div>
  );
}
