import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Img from "../../smallComp/image/Img";
import GithubIcon from "../../Icons/GithubIcon";
import ExternalLink from "../../Icons/ExternalLink";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  tags: string[];
  githubLink?: string;
  externalLink?: string;
  isInternalLink?: boolean;
  status?: string;
  isReversed?: boolean;
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  imageSrc,
  tags,
  githubLink,
  externalLink,
  isInternalLink = false,
  status,
  isReversed = false,
}: ProjectCardProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (isInternalLink) {
      e.preventDefault();
      router.push(externalLink || "");
    }
  };

  return (
    <div className={`w-full h-[500px] md:h-[600px] flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-center gap-8 p-4 md:p-8 bg-AAprimary rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300`}>
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
            <p className="text-gray-400 text-sm">{subtitle}</p>
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
                <GithubIcon className="w-6 h-6" />
              </a>
            )}
            {externalLink && (
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                className="text-gray-400 hover:text-AAsecondary transition-colors duration-300"
              >
                <ExternalLink url={externalLink} router={router} />
              </a>
            )}
          </div>

          {status && (
            <div className="text-sm text-AAsecondary">
              Status: {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 