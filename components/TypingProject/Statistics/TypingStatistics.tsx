import React from 'react';
import { motion } from "framer-motion";
import StatisticsTab from "../statisticsTab/StatisticsTab";
import RestartIcon from "../Icons/RestartIcon";
import About from "../AboutComp/About";
import { Statistics } from "../Types/types";

interface TypingStatisticsProps {
  restart: () => void;
  statistics: Statistics;
  roundCounter: number;
  timeToType: number;
  seconds: React.MutableRefObject<number>;
}

export default function TypingStatistics({
  restart,
  statistics,
  roundCounter,
  timeToType,
  seconds,
}: TypingStatisticsProps) {
  // Get the latest statistics entry
  const latestStats = statistics[statistics.length - 1];

  return (
    <>
      <section className="w-full h-full flex flex-row sm:space-x-12 space-x-4 justify-center items-center pb-16">
        {/* Shortcuts mention */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-gray-400 hover:text-AAsecondary duration-300"
        >
          <span className="sm:text-base text-xs">Windows : Ctrl + /</span>
          <span className="sm:text-base text-xs">Or</span>
          <span className="sm:text-base text-xs">Mac : Cmd + /</span>
        </motion.div>
        {/**Separator */}
        <div className="h-8 w-[2px] bg-gray-400 rounded"></div>
        {/* Restart part */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => {
            console.log("Restarted By a click!!!!");
            restart();
          }}
          className="group flex flex-row space-x-3 items-center hover:cursor-pointer"
        >
          <div className="sm:h-8 sm:w-8 h-5 w-5">
            <RestartIcon />
          </div>
          <span className="sm:text-lg text-sm font-mono text-gray-400 group-hover:text-AAsecondary duration-200 group-hover:translate-x-2">
            Restart
          </span>
        </motion.div>
      </section>
      {/* Round Statistics I caDetails */}
      <section className="w-full 2xl:px-96 xl:px-80 lg:px-64 md:px-28 sm:px-12 flex flex-col space-y-2">
        <StatisticsTab
          statistics={latestStats}
          round={roundCounter}
          finishedTime={(timeToType - seconds.current).toString()}
        />
      </section>
      <About />
    </>
  );
}
