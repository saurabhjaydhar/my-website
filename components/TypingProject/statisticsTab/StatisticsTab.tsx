import React from "react";
import { motion } from "framer-motion";
import { Statistics } from "../Types/types";

const getTopScore = (st: Statistics): number | null => {
  if (st.length > 1) {
    const statics = [...st.slice(0).reverse()];
    let topScore = statics[0].wpm;
    let topScoreIndex = 0;
    statics.forEach((item, index) => {
      if (item.wpm > topScore) {
        topScore = item.wpm;
        topScoreIndex = index;
      }
    });
    return topScoreIndex;
  } else {
    return null;
  }
};

const isTopScore = (index: number, statistics: Statistics): JSX.Element => {
  const result = getTopScore(statistics);
  return result == null ? (
    <></>
  ) : index === result ? (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="text-yellow-300"
    >
      TopScore
    </motion.span>
  ) : (
    <></>
  );
};

interface StatisticsTabProps {
  statistics: Statistics[0];
  round: number;
  finishedTime: string;
}

export default function StatisticsTab({
  statistics,
  round,
  finishedTime,
}: StatisticsTabProps) {
  console.log("score list : ", statistics);
  return (
    <>
      <div className="w-full flex flex-col space-y-4">
        <div className="w-full flex justify-center">
          <span className="sm:text-xl text-sm text-gray-400 underline ">Statistics</span>
        </div>
        <div className="w-full font-mono text-AAsecondary flex flex-row justify-between px-2">
          <div className="sm:text-base text-sm ">round {round.toString()} : </div>
          <div className="sm:text-base text-sm ">{finishedTime} sec</div>
        </div>
      </div>
      <div className="flex flex-col duration-400">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg border-gray-500">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-500 border border-gray-500">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-300 uppercase ">
                      ROUND
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-300 uppercase ">
                      Wpm
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-300 uppercase ">
                      Accuracy
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-AAsecondary">
                  <motion.tr
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      default: {
                        duration: 0.3,
                        ease: [0, 0.71, 0.2, 1.01],
                      },
                      scale: {
                        type: "spring",
                        damping: 5,
                        stiffness: 100,
                        restDelta: 0.001,
                      },
                    }}
                  >
                    <td className="px-6 py-4 text-sm whitespace-nowrap">{statistics.round}</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">{statistics.wpm}</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">{statistics.accuracy}%</td>
                  </motion.tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
