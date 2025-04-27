import React from "react";
import Link from "next/link";
import Img from "../../smallComp/image/Img";

interface ThisCantBeReachedProps {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  githubLink?: string;
  externalLink?: string;
}

export default function ThisCantBeReached({
  title,
  description,
  imageSrc,
  tags,
  githubLink,
  externalLink,
}: ThisCantBeReachedProps) {
  return (
    <div className="w-full h-[500px] md:h-[600px] flex flex-col md:flex-row items-center justify-center gap-8 p-4 md:p-8 bg-AAprimary rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="w-full md:w-2/3 h-full relative overflow-hidden rounded-lg">
        <Img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/4 h-full flex flex-col justify-center p-4 md:p-6 bg-black/70 backdrop-blur-sm rounded-lg">
        <div className="flex flex-col space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-AAsecondary">{title}</h3>
          </div>

          <p className="text-gray-300 text-sm md:text-base max-h-[300px] overflow-y-auto">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-AAsecondary transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            )}
            {externalLink && (
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-AAsecondary transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 