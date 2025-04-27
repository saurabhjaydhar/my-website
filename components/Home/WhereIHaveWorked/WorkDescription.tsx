import React from "react";
import ArrowIcon from "../../Icons/ArrowIcon";

interface WorkDescriptionProps {
  jobTitle: string;
  company: string;
  period: string;
  responsibilities: string[];
}

const WorkDescription: React.FC<WorkDescriptionProps> = ({
  jobTitle,
  company,
  period,
  responsibilities,
}) => {
  return (
    <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
      <div className="flex flex-col space-y-2">
        <span className="text-gray-100 text-xl font-bold">{jobTitle}</span>
        <span className="text-AAsecondary">{company}</span>
        <span className="font-mono text-xs text-gray-500">{period}</span>
      </div>
      <div className="flex flex-col space-y-4 text-sm text-gray-400">
        {responsibilities.map((responsibility, index) => (
          <div key={index} className="flex flex-row space-x-2">
            <ArrowIcon className="h-5 w-4 text-AAsecondary flex-none" />
            <span>{responsibility}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkDescription; 