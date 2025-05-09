'use client';

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StartupProps {
  // Add any props that are used in the component
}

const Startup: React.FC<StartupProps> = (props) => {
  const [dimensions, setDimensions] = useState({ 
    widthBy2: 0, 
    heightBy2: 0, 
    greaterThanSmall: false 
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateDimensions = () => {
        if (window.innerWidth > 768) {
          setDimensions({
            widthBy2: window.innerWidth / 2 - 48 - 20,
            heightBy2: window.innerHeight / 2 - 44,
            greaterThanSmall: true
          });
        } else {
          setDimensions({
            widthBy2: window.innerWidth / 2 - 28,
            heightBy2: window.innerHeight / 2 - 40,
            greaterThanSmall: false
          });
        }
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);

      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{opacity:1}}
        animate={{opacity:0}}
        transition={{opacity:{delay:4.9,duration:0}}}
        className="absolute h-full w-full flex justify-center items-center bg-StartupBackground">
        <motion.div
          initial={{ opacity: 0, x: 0, y: 0, scale: "100%" }}
          animate={{ 
            opacity: [1, 0, 1], 
            x: -dimensions.widthBy2, 
            y: -dimensions.heightBy2,
            scale: dimensions.greaterThanSmall ? "57%" : "50%" 
          }}
          transition={{
            opacity: { delay: 3, duration: 1.5 },
            x: { duration: 0.5, delay: 4.5 },
            y:{ duration: 0.5, delay: 4.5 },
            scale: { duration: 0.5, delay: 4.5 },
          }}
          className="relative h-24 w-24 flex justify-center items-center"
        >
          <motion.div
            initial={{ scale: 0, x: 0 }}
            animate={{ scale: 1, rotate: 90, x: 38 }}
            transition={{
              scale: { duration: 1.5 },
              rotate: { delay: 0.5, duration: 0.5 },
              x: { delay: 0.8, duration: 1 },
            }}
            className="absolute h-2 w-12 bg-AAsecondary rounded "
          ></motion.div>
          <motion.div
            initial={{ scale: 0, x: 0 }}
            animate={{ scale: 1, rotate: 90, x: -39 }}
            transition={{
              scale: { duration: 1.5 },
              rotate: { delay: 0.5, duration: 0.5 },
              x: { delay: 0.8, duration: 1 },
            }}
            className="absolute h-2 w-12 bg-AAsecondary rounded "
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1.05, rotate: 35, x: 18, y: -34 }}
            transition={{
              opacity: { delay: 2, duration: 0 },
              scale: { duration: 2.5 },
              rotate: { delay: 0.5, duration: 0.5 },
              y: { delay: 1.2, duration: 2 },
              x: { delay: 1.5, duration: 0.5 },
            }}
            className="absolute h-2 w-12 bg-AAsecondary rounded "
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1.05, rotate: -35, x: -18, y: -34 }}
            transition={{
              opacity: { delay: 2, duration: 0 },
              scale: { duration: 2.5 },
              rotate: { delay: 0.5, duration: 0.5 },
              y: { delay: 1.2, duration: 2 },
              x: { delay: 1.5, duration: 0.5 },
            }}
            className="absolute h-2 w-12 bg-AAsecondary rounded "
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1.05, rotate: -35, x: 18, y: 34 }}
            transition={{
              opacity: { delay: 2, duration: 0 },
              scale: { duration: 2.5 },
              rotate: { delay: 0.5, duration: 0.5 },
              y: { delay: 1.2, duration: 2 },
              x: { delay: 1.5, duration: 0.5 },
            }}
            className="absolute h-2 w-12 bg-AAsecondary rounded "
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1.05, rotate: 35, x: -18, y: 34 }}
            transition={{
              opacity: { delay: 2, duration: 0 },
              scale: { duration: 2.5 },
              rotate: { delay: 0.5, duration: 0.5 },
              y: { delay: 1.2, duration: 2 },
              x: { delay: 1.5, duration: 0.5 },
            }}
            className="absolute h-2 w-12 bg-AAsecondary rounded "
          ></motion.div>
          <motion.span
            initial={{ scale: 0, y: -4 ,x:-1}}
            animate={{ scale: 1 }}
            transition={{ scale: { delay: 1.5, duration: 1.5 } }}
            className="text-AAsecondary font-Text2 text-xl tracking-tighter"
          >
            Jaydhar
          </motion.span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default Startup;
