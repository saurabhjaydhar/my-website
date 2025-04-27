import React from "react";
import { motion } from "framer-motion";
import GithubIcon from "../../Icons/GithubIcon";
import LinkedinIcon from "../../Icons/LinkedinIcon";
import InstagramIcon from "../../Icons/InstagramIcon";
import YoutubeIcon from "../../Icons/YoutubeIcon";

interface SocialMediaArroundProps {
  finishedLoading: boolean;
}

const SocialMediaArround: React.FC<SocialMediaArroundProps> = ({ finishedLoading }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { delay: finishedLoading ? 0 : 6, duration: 0.2 },
        }}
        className="w-full fixed bottom-0 hidden lg:flex flex-row items-center justify-between"
      >
        <div className="w-32 h-full flex flex-col items-center justify-center space-y-8 ml-8">
          <div className="flex flex-col space-y-8">
            <a href="https://github.com/saurabhjaydhar" target={"_blank"} rel="noreferrer">
              <GithubIcon className={"w-5 h-5 text-gray-400 hover:text-AAsecondary fill-current hover:cursor-pointer"} />
            </a>
            <a href="https://www.linkedin.com/in/saurabh-jaydhar-044b76233/" target={"_blank"} rel="noreferrer">
              <LinkedinIcon className={"w-5 h-5 text-gray-400 hover:text-AAsecondary fill-current hover:cursor-pointer"} />
            </a>
            <a href="https://www.instagram.com/saurabh_jaydhar/" target={"_blank"} rel="noreferrer">
              <InstagramIcon className={"w-5 h-5 text-gray-400 hover:text-AAsecondary fill-current hover:cursor-pointer"} />
            </a>
            <a href="https://www.youtube.com/@saurabhjaydhar" target={"_blank"} rel="noreferrer">
              <YoutubeIcon className={"w-5 h-5 text-gray-400 hover:text-AAsecondary fill-current hover:cursor-pointer"} />
            </a>
          </div>
          <div className="h-28 w-0.5 bg-gray-400"></div>
        </div>

        <div className="w-32 h-full flex flex-col items-center justify-center space-y-8 mr-8">
          <div className="flex flex-col space-y-8">
            <a href="mailto:saurabhjaydhar@gmail.com" className="text-gray-400 hover:text-AAsecondary hover:cursor-pointer tracking-wider text-sm font-mono">
              saurabhjaydhar@gmail.com
            </a>
          </div>
          <div className="h-28 w-0.5 bg-gray-400"></div>
        </div>
      </motion.div>
    </>
  );
};

export default SocialMediaArround;
