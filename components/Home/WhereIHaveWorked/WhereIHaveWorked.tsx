import React, { useState } from "react";
import { motion } from "framer-motion";
import WorkDescription from "./WorkDescription";

interface WhereIHaveWorkedProps {
  finishedLoading: boolean;
}

const workData = {
  "Next Web Guru": {
    jobTitle: "Software Engineer",
    company: "@ Nextweb Guru",
    period: "Oct 2020 - Jan 2024",
    responsibilities: [
      "Leading the development of a mobile-first web application using React and TypeScript",
      "Implementing real-time features using WebSocket and Firebase",
      "Optimizing application performance and reducing load times by 40%"
    ]
  },
  "Koyal Technologies": {
    jobTitle: "Software Engineer",
    company: "@ Koyal Technologies",
    period: "Feb 2024 - Present",
    responsibilities: [
      "Developed enterprise-level applications using React, TypeScript, and Node.js",
      "Implemented automated testing strategies that reduced bug reports by 40%",
      "Collaborated with cross-functional teams to deliver high-quality software solutions"
    ]
  },
  // Fantasia: {
  //   jobTitle: "Frontend Developer",
  //   company: "@ Fantasia",
  //   period: "July 2021 - February 2022",
  //   responsibilities: [
  //     "Built interactive UI components using React and Styled Components",
  //     "Implemented state management using Redux Toolkit",
  //     "Optimized bundle size and improved application performance"
  //   ]
  // },
  // LaFarge: {
  //   jobTitle: "Software Engineer",
  //   company: "@ LaFarge",
  //   period: "January 2022 - December 2022",
  //   responsibilities: [
  //     "Developed enterprise-level applications using React, TypeScript, and Node.js",
  //     "Implemented automated testing strategies that reduced bug reports by 40%",
  //     "Collaborated with cross-functional teams to deliver high-quality software solutions"
  //   ]
  // },
  // ArtVenue: {
  //   jobTitle: "Frontend Developer",
  //   company: "@ ArtVenue",
  //   period: "June 2021 - December 2021",
  //   responsibilities: [
  //     "Built responsive and interactive user interfaces using React and Next.js",
  //     "Implemented state management solutions using Redux and Context API",
  //     "Optimized application performance through code splitting and lazy loading"
  //   ]
  // }
};

const WhereIHaveWorked: React.FC<WhereIHaveWorkedProps> = ({ finishedLoading }) => {
  const [DescriptionComponent, setDescriptionComponent] = useState("Next Web Guru");
  const [IsActive, setIsActive] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        delay: finishedLoading ? 0 : 6.2,
      }}
      className="flex flex-col items-center justify-center py-24 space-y-12"
    >
      <div className="flex flex-col space-y-8">
        <div className="flex flex-row items-center">
          <span className="text-AAsecondary font-mono text-lg">02.</span>
          <span className="text-gray-200 font-bold text-2xl ml-4">Where I've Worked</span>
          <div className="h-[0.5px] bg-gray-400 w-44 sm:w-80 ml-4"></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-5xl">
        <div className="flex md:flex-col flex-row overflow-x-auto md:overflow-x-visible md:w-1/4">
          {Object.keys(workData).map((company, index) => (
            <button
              key={company}
              onClick={() => {
                setDescriptionComponent(company);
                setIsActive(index + 1);
              }}
              className={`px-4 py-2 text-left border-l-2 ${
                IsActive === index + 1
                  ? "border-AAsecondary text-AAsecondary bg-AAprimary"
                  : "border-gray-600 text-gray-400 hover:bg-gray-800"
              }`}
            >
              {company}
            </button>
          ))}
        </div>

        <div className="p-2 text-gray-400 text-lg">
          <WorkDescription {...workData[DescriptionComponent as keyof typeof workData]} />
        </div>
      </div>
    </motion.div>
  );
};

export default WhereIHaveWorked;
