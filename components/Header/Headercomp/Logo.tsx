import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  finishedLoading: boolean;
}

const Logo: React.FC<LogoProps> = ({ finishedLoading }) => {
  return (
    <>
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          y: { duration: 0.5, ease: "easeOut" },
          opacity: { duration: 0.5, ease: "easeOut" },
          delay: finishedLoading ? 0 : 7,
        }}
        className="text-AAsecondary font-mono text-sm"
      >
        Saurabh Jaydhar
      </motion.div>
    </>
  );
};

export default Logo;
