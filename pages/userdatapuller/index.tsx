import React, { useState, useEffect, useRef } from "react";
import Timer from "../../components/DataPullerProject/TimerComp/Timer";
import About from "../../components/TypingProject/AboutComp/About";
import Footer from "../../components/Footer/Footer";

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
  error?: string;
}

interface UserData {
  ip: string;
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  hasZipCode: boolean;
}

export default function UserDataPuller() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [gpuTier, setGpuTier] = useState<GpuTier | null>(null);
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);
  const [windowSize, setWindowSize] = useState<[number, number]>([0, 0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBlackListed, setIsBlackListed] = useState(false);
  const secUnitsRef = useRef<HTMLSpanElement>(null);
  const secTensRef = useRef<HTMLSpanElement>(null);
  const minUnitsRef = useRef<HTMLSpanElement>(null);
  const minTensRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/userInfoByIP/userInfo");
        const data: ApiResponse = await response.json();
        
        if (data.error) {
          setIsBlackListed(true);
          return;
        }

        try {
          const gpuDetector = await import("detect-gpu");
          const gpu = await gpuDetector.getGPUTier();
          setGpuTier({
            tier: gpu.tier,
            isMobile: gpu.isMobile || false
          });
        } catch (error) {
          console.error("Failed to detect GPU:", error);
        }

        setUserData({
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country,
          latitude: data.latitude,
          longitude: data.longitude,
          hasZipCode: data.hasZipCode
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition([e.clientX, e.clientY]);
    };

    const handleResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }

      const elapsed = Date.now() - startTimeRef.current;
      const seconds = Math.floor(elapsed / 1000);
      const minutes = Math.floor(seconds / 60);

      const secUnits = seconds % 10;
      const secTens = Math.floor((seconds % 60) / 10);
      const minUnits = minutes % 10;
      const minTens = Math.floor(minutes / 10);

      if (secUnitsRef.current) secUnitsRef.current.textContent = secUnits.toString();
      if (secTensRef.current) secTensRef.current.textContent = secTens.toString();
      if (minUnitsRef.current) minUnitsRef.current.textContent = minUnits.toString();
      if (minTensRef.current) minTensRef.current.textContent = minTens.toString();
    };

    timerRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">User Data Puller</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Timer</h2>
            <Timer
              secUnits={secUnitsRef}
              secTens={secTensRef}
              minUnits={minUnitsRef}
              minTens={minTensRef}
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <About
              isBlackListed={isBlackListed}
              userData={userData}
              gpuTier={gpuTier}
              mousePosition={mousePosition}
              windowSize={windowSize}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      <Footer githubUrl="https://github.com/yourusername/my-website" hideSocialsInDesktop={false} />
    </div>
  );
}
