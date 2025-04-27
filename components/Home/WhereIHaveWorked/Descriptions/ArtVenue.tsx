import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";

const ArtVenue: React.FC = () => {
  return (
    <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
      <div className="flex flex-col space-y-2">
        <span className="text-gray-100 text-xl font-bold">Frontend Developer</span>
        <span className="text-AAsecondary">@ ArtVenue</span>
        <span className="font-mono text-xs text-gray-500">June 2021 - December 2021</span>
      </div>
      <div className="flex flex-col space-y-4 text-sm text-gray-400">
        <div className="flex flex-row space-x-2">
          <ArrowIcon className="h-5 w-4 text-AAsecondary flex-none" />
          <span>
            Built responsive and interactive user interfaces using React and Next.js
          </span>
        </div>
        <div className="flex flex-row space-x-2">
          <ArrowIcon className="h-5 w-4 text-AAsecondary flex-none" />
          <span>
            Implemented state management solutions using Redux and Context API
          </span>
        </div>
        <div className="flex flex-row space-x-2">
          <ArrowIcon className="h-5 w-4 text-AAsecondary flex-none" />
          <span>
            Optimized application performance through code splitting and lazy loading
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArtVenue; 