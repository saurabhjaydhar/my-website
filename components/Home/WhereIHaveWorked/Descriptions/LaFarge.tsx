import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";

const LaFarge: React.FC = () => {
  return (
    <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
      <div className="flex flex-col space-y-2">
        <span className="text-gray-100 text-xl font-bold">Software Engineer</span>
        <span className="text-AAsecondary">@ LaFarge</span>
        <span className="font-mono text-xs text-gray-500">January 2022 - December 2022</span>
      </div>
      <div className="flex flex-col space-y-4 text-sm text-gray-400">
        <div className="flex flex-row space-x-2">
          <ArrowIcon className="h-5 w-4 text-AAsecondary flex-none" />
          <span>
            Developed and maintained enterprise-level applications using React, TypeScript, and Node.js
          </span>
        </div>
        <div className="flex flex-row space-x-2">
          <ArrowIcon className="h-5 w-4 text-AAsecondary flex-none" />
          <span>
            Implemented automated testing strategies resulting in 40% reduction in bug reports
          </span>
        </div>
        <div className="flex flex-row space-x-2">
          <ArrowIcon className="h-5 w-4 text-AAsecondary flex-none" />
          <span>
            Collaborated with cross-functional teams to deliver high-quality software solutions
          </span>
        </div>
      </div>
    </div>
  );
};

export default LaFarge; 