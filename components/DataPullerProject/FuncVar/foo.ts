import { AppContextType } from "../../AppContextFolder/AppContext";
import { MouseEvent as ReactMouseEvent, Dispatch, SetStateAction } from "react";
import { MutableRefObject } from "react";
import { detect, BrowserInfo } from "detect-browser";
import { getGPUTier, TierResult, TierType } from "detect-gpu";

interface TimerElements {
  secUnits: HTMLElement | null;
  secTens: HTMLElement | null;
  minUnits: HTMLElement | null;
  minTens: HTMLElement | null;
}

interface WindowEventHandler {
  (this: Window, ev: UIEvent): void;
}

interface DOMMouseEventHandler {
  (this: Window, ev: MouseEvent): void;
}

interface UserData {
  current?: ApiResponse;
  [key: string]: any;
}

interface GpuTier extends Omit<TierResult, 'type'> {
  tier: number;
  isMobile: boolean;
  type: TierType;
  fps: number;
}

interface UserInfoProps {
  setLocation: Dispatch<SetStateAction<[number, number]>>;
  setZipCode: Dispatch<SetStateAction<string>>;
  setGpuTier: Dispatch<SetStateAction<GpuTier>>;
  userData: UserData;
  cookieCutter: any;
  lastVisit_Ref: MutableRefObject<HTMLElement | null>;
  firstVisit_Ref: MutableRefObject<HTMLElement | null>;
}

interface LocationUpdateProps {
  setUpdatingLocatinResult: Dispatch<SetStateAction<string>>;
  setUpdatingLocation: Dispatch<SetStateAction<boolean>>;
  setLocation: Dispatch<SetStateAction<[number, number]>>;
  setZipCode: Dispatch<SetStateAction<string>>;
}

interface ApiResponse {
  lat: number;
  lon: number;
  ip: string;
  zip?: string;
  datetime?: string;
  browser?: string;
  browserVersion?: string;
  browserOS?: string;
  screenWidth?: number;
  screenHeight?: number;
  screenOrientationType?: string;
  screenColorDepth?: string;
  NavigatorLanguages?: readonly string[];
  NavigatorLogicalCores?: string;
  batteryLevel?: string;
  [key: string]: any; // Allow additional properties
}

// ? this will update secUnits each second, secTens, minUnits, minTens cookies then update the span from cookies values
export const CookieTimeCounter = ({
  context,
  secUnits,
  secTens,
  minUnits,
  minTens,
  cookieCutter,
}: {
  context: AppContextType;
  secUnits: HTMLElement | null;
  secTens: HTMLElement | null;
  minUnits: HTMLElement | null;
  minTens: HTMLElement | null;
  cookieCutter: any;
}) => {
  if (typeof window !== "undefined") {
    const elements: TimerElements = {
      secUnits,
      secTens,
      minUnits,
      minTens,
    };

    // Cookie existence verification
    if (cookieCutter.get("timer-sec-units")) {
      console.log(
        "current cookie timer-sec-units value in useEffect: ",
        cookieCutter.get("timer-sec-units")
      );
      if (elements.secUnits && elements.secTens && elements.minUnits && elements.minTens) {
        elements.secUnits.innerText = cookieCutter.get("timer-sec-units");
        elements.secTens.innerText = cookieCutter.get("timer-sec-tens");
        elements.minUnits.innerText = cookieCutter.get("timer-min-units");
        elements.minTens.innerText = cookieCutter.get("timer-min-tens");
      }
    } else {
      console.log("timer cookie not exist");
      cookieCutter.set("timer-sec-units", String("0"));
      cookieCutter.set("timer-sec-tens", String("0"));
      cookieCutter.set("timer-min-units", String("0"));
      cookieCutter.set("timer-min-tens", String("0"));
    }

    const timerInterval = setInterval(
      () => {
        const countSec = Number(cookieCutter.get("timer-sec-units")) + 1;
        cookieCutter.set("timer-sec-units", String(countSec));

        if (countSec > 9) {
          cookieCutter.set("timer-sec-units", String("0"));
          cookieCutter.set(
            "timer-sec-tens",
            String(Number(cookieCutter.get("timer-sec-tens")) + 1)
          );
          const countSecTens = Number(cookieCutter.get("timer-sec-tens"));
          if (countSecTens > 5) {
            cookieCutter.set("timer-sec-tens", String("0"));
            cookieCutter.set(
              "timer-min-units",
              String(Number(cookieCutter.get("timer-min-units")) + 1)
            );
            const countMinUnits = Number(cookieCutter.get("timer-min-units"));
            if (countMinUnits > 9) {
              cookieCutter.set("timer-min-units", String("0"));
              cookieCutter.set(
                "timer-min-tens",
                String(Number(cookieCutter.get("timer-min-tens")) + 1)
              );
            }
          }
        }

        if (elements.secUnits && elements.secTens && elements.minUnits && elements.minTens) {
          elements.secUnits.innerText = cookieCutter.get("timer-sec-units");
          elements.secTens.innerText = cookieCutter.get("timer-sec-tens");
          elements.minUnits.innerText = cookieCutter.get("timer-min-units");
          elements.minTens.innerText = cookieCutter.get("timer-min-tens");
        }

        console.log("Cookie Timer Setter...");
      },
      1000
    );

    if (context.sharedState.userdata.timerCookieRef) {
      const ref = context.sharedState.userdata.timerCookieRef;
      Object.assign(ref, { current: timerInterval });
    }
  }
};

interface MouseWindowEventProps {
  context: AppContextType;
  windowWidth: MutableRefObject<HTMLElement | null>;
  windowHeight: MutableRefObject<HTMLElement | null>;
  mouseX: MutableRefObject<HTMLElement | null>;
  mouseY: MutableRefObject<HTMLElement | null>;
}

// ? Declare Mouse Event and Window size tracker event
export const MouseWindowEventListners = ({
  context,
  windowWidth,
  windowHeight,
  mouseX,
  mouseY,
}: MouseWindowEventProps) => {
  const handleWindowResize: WindowEventHandler = function(this: Window, ev: UIEvent) {
    if (windowWidth.current && windowHeight.current) {
      windowWidth.current.innerText = String(window.innerWidth);
      windowHeight.current.innerText = String(window.innerHeight);
    }
    console.log("Window Size Tracker...");
  };

  const handleMouseMove: DOMMouseEventHandler = function(this: Window, ev: MouseEvent) {
    if (mouseX.current && mouseY.current) {
      mouseX.current.innerText = String(ev.pageX);
      mouseY.current.innerText = String(ev.pageY);
    }
    console.log("Mouse Position Tracker...");
  };

  if (context.sharedState.userdata.windowSizeTracker) {
    const ref = context.sharedState.userdata.windowSizeTracker;
    Object.assign(ref, { current: handleWindowResize });
  }

  if (context.sharedState.userdata.mousePositionTracker) {
    const ref = context.sharedState.userdata.mousePositionTracker;
    Object.assign(ref, { current: handleMouseMove });
  }

  // Apply this event Listener on Client
  if (typeof window !== "undefined") {
    // window size tracker
    window.addEventListener("resize", handleWindowResize);
    // mouse position tracker
    window.addEventListener("mousemove", handleMouseMove, false);
  }
};

// ? async function for getting user information. IP, location, zip code, browser, OS, GPU, etc.
export const userInfo = async ({
  setLocation,
  setZipCode,
  setGpuTier,
  userData,
  cookieCutter,
  lastVisit_Ref,
  firstVisit_Ref,
}: UserInfoProps) => {
  // this api will return current ip address of the requester
  const IP_Address = async () => {
    return fetch("https://api.ipify.org/?format=json")
      .then(res => res.json())
      .then(data => data.ip);
  };

  // call api by passing the IP address of the requester & store in api_data
  const api_data = async () => {
    return fetch("/api/userInfoByIP/" + (await IP_Address()))
      .then(res => res.json())
      .then(data => data as ApiResponse);
  };

  const result = await api_data();
  const locationArray: [number, number] = [result.lat, result.lon];
  setLocation(locationArray);

  //to determine the browser info
  const browser = detect();
  if (browser) {
    result.browser = browser.name || undefined;
    result.browserVersion = browser.version || undefined;
    result.browserOS = browser.os || undefined;
  }

  if (screen) {
    result.screenWidth = screen.width;
    result.screenHeight = screen.height;
    result.screenOrientationType = screen.orientation.type;
    result.screenColorDepth = screen.colorDepth + " bits";
  }

  if (navigator) {
    result.NavigatorLanguages = navigator.languages;
    result.NavigatorLogicalCores = navigator.hardwareConcurrency + " cores";
  }

  // ? this will add battery level if it's supported on the browser
  if (navigator) {
    if (navigator.hasOwnProperty("getBattery")) {
      //@ts-ignore
      navigator.getBattery().then(battery => {
        result["batteryLevel"] = battery.level + " %";
        console.log("battery level : ", battery.level + " %");
      });
    } else {
      result["batteryLevel"] = "Not supported";
    }
  }

  if (lastVisit_Ref.current && firstVisit_Ref.current) {
    const currentTime = new Date().toLocaleString();
    lastVisit_Ref.current.innerText = currentTime;
    firstVisit_Ref.current.innerText = currentTime;
  }

  console.log("useEffect run, data :", result);
  setZipCode(result.zip || "Unknown");
  userData.current = result;

  // set up gpuTier state value
  const gpuTier_data = await getGPUTier();
  setGpuTier({
    ...gpuTier_data,
    tier: gpuTier_data.tier || 0,
    isMobile: gpuTier_data.isMobile || false,
    type: gpuTier_data.type || "BENCHMARK",
    fps: gpuTier_data.fps || 0,
  });
};

// ? update Location on click event callback function
export const onClickUpdateLocation = async ({
  setUpdatingLocatinResult,
  setUpdatingLocation,
  setLocation,
  setZipCode,
}: LocationUpdateProps) => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  function success(position: GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation([latitude, longitude]);
    setUpdatingLocatinResult("Location updated successfully!");
    setUpdatingLocation(false);

    // Get zip code from coordinates
    const api_get_zip = async (lat: number, lon: number) => {
      return fetch(`/api/getZipFromCoords/${lat}/${lon}`)
        .then(res => res.json())
        .then(data => data.zip as string);
    };

    const setNewZip = async () => {
      const zip = await api_get_zip(latitude, longitude);
      setZipCode(zip);
    };

    setNewZip();
  }

  function error() {
    setUpdatingLocatinResult("Unable to retrieve your location");
    setUpdatingLocation(false);
  }

  navigator.geolocation.getCurrentPosition(success, error);
};

// data for Additional Information Section 1
export const Additional_data = (userData: UserData, gpuTier: GpuTier) => {
  return [
    {
      title: "Browser",
      value: userData.current?.browser || "Unknown",
    },
    {
      title: "Browser Version",
      value: userData.current?.browserVersion || "Unknown",
    },
    {
      title: "Operating System",
      value: userData.current?.browserOS || "Unknown",
    },
    {
      title: "GPU Tier",
      value: gpuTier.tier || "Unknown",
    },
    {
      title: "GPU Type",
      value: gpuTier.type || "Unknown",
    },
    {
      title: "GPU FPS",
      value: gpuTier.fps || "Unknown",
    },
    {
      title: "Mobile GPU",
      value: gpuTier.isMobile ? "Yes" : "No",
    },
  ];
};

// data for the table
export const tableData = (userData: UserData, zipCode: string) => {
  return [
    {
      title: "IP Address",
      value: userData.current?.ip || "Unknown",
    },
    {
      title: "Zip Code",
      value: zipCode || "Unknown",
    },
    {
      title: "Screen Resolution",
      value: `${userData.current?.screenWidth || 0} x ${userData.current?.screenHeight || 0}`,
    },
    {
      title: "Screen Orientation",
      value: userData.current?.screenOrientationType || "Unknown",
    },
    {
      title: "Color Depth",
      value: userData.current?.screenColorDepth || "Unknown",
    },
    {
      title: "Languages",
      value: userData.current?.NavigatorLanguages?.join(", ") || "Unknown",
    },
    {
      title: "Logical Cores",
      value: userData.current?.NavigatorLogicalCores || "Unknown",
    },
    {
      title: "Battery Level",
      value: userData.current?.batteryLevel || "Unknown",
    },
  ];
};

export const handleMouseMove = ({
  context,
  windowWidth,
  windowHeight,
  mouseX,
  mouseY,
}: {
  context: AppContextType;
  windowWidth: number;
  windowHeight: number;
  mouseX: number;
  mouseY: number;
}) => {
  // ... existing code ...
};

export const handleMouseEvent = (event: ReactMouseEvent<HTMLDivElement>) => {
  // ... existing code ...
};
