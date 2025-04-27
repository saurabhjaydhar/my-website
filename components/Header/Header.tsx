import React, { useRef, useState, useEffect, useContext, useCallback } from "react";
import Logo from "./Headercomp/Logo";
import DesktopMenu from "./Headercomp/DesktopMenu";
import IconMenu from "./Headercomp/IconMenu";
import MobileMenu from "./Headercomp/MobileMenu";
import { motion } from "framer-motion";
import AppContext from "../AppContextFolder/AppContext";

interface HeaderProps {
  finishedLoading: boolean;
  sectionsRef: React.RefObject<HTMLDivElement>;
}

const Header: React.FC<HeaderProps> = ({ finishedLoading, sectionsRef }) => {
  const RefNavBar = useRef<HTMLDivElement>(null);
  const [ShowElement, setShowElement] = useState(false);
  const [rotate, setRotate] = useState<boolean>(false);
  const context = useContext(AppContext);
  const scrollSizeY = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (scrollSizeY.current === 0) {
      scrollSizeY.current = window.scrollY;
    } else {
      if (window.scrollY > 50) {
        if (window.scrollY > scrollSizeY.current) {
          RefNavBar.current?.classList.remove("translate-y-0");
          RefNavBar.current?.classList.add("-translate-y-full");
        } else {
          RefNavBar.current?.classList.add("translate-y-0");
          RefNavBar.current?.classList.remove("-translate-y-full");
        }
        scrollSizeY.current = window.scrollY;
      }
    }
  }, []);

  // Initialize scroll event listener
  useEffect(() => {
    if (!context.sharedState.portfolio.NavBar.IntervalEvent) {
      context.sharedState.portfolio.NavBar.IntervalEvent = handleScroll;
    }
  }, [context.sharedState.portfolio.NavBar, handleScroll]);

  // Add scroll event listener
  useEffect(() => {
    if (context.sharedState.portfolio.NavBar.scrolling === null) {
      context.sharedState.portfolio.NavBar.scrolling = true;
      scrollSizeY.current = 0;
      window.addEventListener("scroll", handleScroll);
      
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [context.sharedState.portfolio.NavBar, handleScroll]);

  // Show element after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowElement(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle body overflow based on rotate state
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = rotate ? "hidden" : "auto";
    }
  }, [rotate]);

  return (
    <>
      <MobileMenu 
        rotate={rotate} 
        setRotate={setRotate} 
        setShowElement={setShowElement} 
        ShowElement={ShowElement}
        finishedLoading={finishedLoading}
      />
      
      <motion.div
        ref={RefNavBar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ opacity: { delay: finishedLoading ? 0 : 4.5, duration: 0 } }}
        className={`w-full fixed ${
          ShowElement ? "bg-opacity-70 shadow-xl" : "bg-opacity-0"
        } bg-AAprimary flex justify-between px-6 sm:px-12 py-2 sm:py-4 transition duration-4000 translate-y-0 z-20`}
      >
        <Logo finishedLoading={finishedLoading} />
        
        <IconMenu
          rotate={rotate}
          setRotate={setRotate}
          setShowElement={setShowElement}
          ShowElement={ShowElement}
          finishedLoading={finishedLoading}
        />
        
        <DesktopMenu finishedLoading={finishedLoading} />
      </motion.div>
    </>
  );
};

export default Header;
