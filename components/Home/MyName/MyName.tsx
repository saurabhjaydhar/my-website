'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

interface MyNameProps {
  finishedLoading: boolean;
}

const MyName: React.FC<MyNameProps> = ({ finishedLoading }) => {
  const router = useRouter();
  return (
    <div
      className="h-full flex flex-col justify-center
      px-8 2xl:px-72 xl:px-56 lg:px-32  md:px-28 sm:px-8 py-32 sm:py-52  "
    >
      <motion.span
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          opacity: {
            delay: finishedLoading ? 0 : 6.4,
            duration: finishedLoading ? 0 : 0.2,
          },
          y: {
            delay: finishedLoading ? 0 : 10.4,
            duration: finishedLoading ? 0 : 0.2,
          },
        }}
        className="text-AAsecondary font-mono"
      >
        Hi, my name is
      </motion.span>
      <motion.h1
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          opacity: {
            delay: finishedLoading ? 0 : 6.5,
            duration: finishedLoading ? 0 : 0.2,
          },
          y: {
            delay: finishedLoading ? 0 : 10.5,
            duration: finishedLoading ? 0 : 0.2,
          },
        }}
        className="text-gray-300 font-bold text-3xl lg:text-7xl sm:text-5xl md:text-6xl mt-4"
      >
        Saurabh Jaydhar.
      </motion.h1>
      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          opacity: {
            delay: finishedLoading ? 0 : 6.6,
            duration: finishedLoading ? 0 : 0.2,
          },
          y: {
            delay: finishedLoading ? 0 : 10.6,
            duration: finishedLoading ? 0 : 0.2,
          },
        }}
        className="text-gray-400 font-bold text-3xl lg:text-7xl sm:text-5xl md:text-6xl mt-4"
      >
        I make ideas & things alive.
      </motion.h2>

      <motion.h3
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          opacity: {
            delay: finishedLoading ? 0 : 6.7,
            duration: finishedLoading ? 0 : 0.2,
          },
          y: {
            delay: finishedLoading ? 0 : 6.7,
            duration: finishedLoading ? 0 : 0.2,
          },
        }}
        className="text-gray-400 font-Header text-sm md:text-lg sm:text-md mt-10 tracking-wider"
      >
        I&apos;m a <span className="text-AAsecondary">software engineer</span>,
        i possess strong problem-solving skills and specialize in crafting
        exceptional <br className="2xl:block hidden" />
        digital experiences. Passionate and results-driven professional with
        four years of hands-on experience in crafting 
        <span className="text-AAsecondary">high-performance,
        scalable, and visually appealing mobile applications using Flutter.</span>
        Proficient in a diverse range of technologies, including <br className="2xl:block hidden" />
       
        <span className="text-AAsecondary">React JS, VUe JS,
        Node JS, and Next JS.</span>.
        {/* <br className="2xl:block hidden" />creating and deploying them, as well as implementing the
        front-end components to enable seamless user interactions. */}
      </motion.h3>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          opacity: {
            delay: finishedLoading ? 0 : 6.8,
            duration: finishedLoading ? 0 : 0.2,
          },
          y: {
            delay: finishedLoading ? 0 : 6.8,
            duration: finishedLoading ? 0 : 0.2,
          },
        }}
        className="mt-12"
      >
        <a href={"/saurabh-resume.pdf.pdf"} target={"_blank"} rel="noreferrer" >
          <button onClick={()=>{

console.log('first')
}}
className=" bg-AAprimary text-AAsecondary border rounded px-4 sm:px-8 py-3 sm:py-4 border-AAsecondary">
            Check out my resume!
          </button>
        </a>
      </motion.div>
    </div>
  );
}

export default MyName;
