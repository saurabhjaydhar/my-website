import React from "react";
import Img from "../../../components/smallComp/image/Img";
import ArrowIcon from "../../../components/Icons/ArrowIcon";

interface AboutMeProps {
  ref?: React.RefObject<HTMLDivElement>;
}

export default function AboutMe(props: AboutMeProps) {
  const technologies = [
    ["React JS","Vue JS","Next JS", "Node.js","Mongo DB",],
    ["JavaScript (ES6+)", "TypeScript", "Firebase", "Tailwind CSS","Framer Motion", ],
  ];
  return (
    <div
      id="aboutSection"
      data-aos="fade-up"
      className="snap-start flex flex-col  items-center py-20 bg-AAprimary"
    >
      {/* // ? 0.1 About Me */}
      <div
        className="flex flex-col space-y-8 px-4 sm:px-0 w-full sm:w-[500px] 
        md:w-[700px] lg:w-[900px] "
      >
        <div className="flex flex-row items-center ">
          <div className="flex flex-row  items-center mr-4">
            <ArrowIcon
              className={
                "flex-none h-4 md:h-6 w-4 md:w-5 translate-y-[0.5px] text-AAsecondary"
              }
            />
            <span className="text-AAsecondary font-Header text-sm  sm:text-xl">
              {" "}
              01.
            </span>
            <span className="flex-none text-gray-200 opacity-85 font-bold tracking-wider text-lg sm:text-2xl pl-4">
              About Me
            </span>
          </div>
          <div className="bg-gray-400 h-[0.2px] w-full sm:w-72 ml-4"></div>
        </div>
        {/* // ? Paragraphs */}

        <div className="w-full flex flex-col md:flex-row space-y-8 md:space-y-0  md:space-x-8 sm:space-x-2 ">
          <div className="w-full md:w-7/12 space-y-4 sm:text-base text-sm ">
            <div className="font-Header ">
              <span className="text-gray-400 ">
                Hello! My name is Saurabh Jaydhar, and I am a passionate
                software engineer and problem solver, dedicated to creating
                impactful codes that thrive on the internet.
              </span>
            </div>
            <div className="font-Header ">
              <span className="text-gray-400 ">
                I am a highly skilled and passionate mobile app developer with
                expertise in Android, Flutter, and React.js. With a strong
                foundation in software development and a keen eye for detail, I
                am dedicated to creating innovative and user-friendly mobile
                applications that deliver exceptional user experiences.
                <br />  <br /> <span className="text-AAsecondary"> Key Skills:   <br /> </span>
                As a seasoned full stack developer, I bring extensive experience in building and deploying scalable web and mobile applications using the MERN (MongoDB, Express.js, React.js, Node.js) and MEVN (MongoDB, Express.js, Vue.js, Node.js) stacks. My proficiency encompasses front-end technologies like HTML5, CSS3, JavaScript (ES6+), React.js, and Vue.js, coupled with back-end expertise in Node.js and Express.js. I have a strong command of database management with both NoSQL (MongoDB) and SQL databases, ensuring efficient data storage and retrieval.​
futuristiccodingacademy.com
+1
Huntr
+1

In the mobile development arena, I have successfully developed cross-platform applications using Flutter, delivering seamless user experiences across Android and iOS platforms. My portfolio includes diverse projects such as e-commerce platforms, newspaper applications, fleet management systems, and taxpaying solutions, each tailored to meet specific client requirements and industry standards.​

I am adept at integrating RESTful APIs, implementing state management solutions like Redux and Vuex, and utilizing version control systems such as Git for collaborative development. My experience extends to deploying applications on cloud platforms, ensuring high availability and scalability. I prioritize writing clean, maintainable code and adhere to best practices in software development, including test-driven development and continuous integration/continuous deployment (CI/CD) pipelines.​

Beyond technical skills, I possess strong problem-solving abilities, effective communication, and a collaborative mindset, enabling me to work efficiently in team environments and adapt to evolving project needs. My commitment to continuous learning keeps me abreast of emerging technologies and industry trends, ensuring that I deliver innovative and effective solutions.​


              </span>
            </div>
            {/* <div className="font-Header tracking-wide">
              <span className="text-gray-400  ">
                Fast-forward to today, I&apos;ve had the privilege of working at
                <span className="text-AAsecondary"> a huge manufacturing company</span>,
                <span className="text-AAsecondary"> a start-up</span>,{" "}
                <span className="text-AAsecondary">export-import companies</span>, also
                <span className="text-AAsecondary"> freelancing</span> and recently as Lead for the{" "}
                <span className="text-AAsecondary">Google Developer Student club</span>. Experienced in Desktop & Web
                Development, lately with Arduino Development. My main focus these days is creating and testing{" "}
                <span className="text-AAsecondary">Smart Contracts</span> with Hardhat.
              </span>
            </div> */}

            <div className="font-Header tracking-wide">
              <span className="text-gray-400  ">
                Here are a few technologies I&apos;ve been working with recently
                :
              </span>
            </div>
            <div className="font-Header tracking-wide flex flex-row space-x-16">
              <div className="flex flex-row space-x-2 items-center">
                <div className="flex flex-col space-y-4 sm:text-base text-sm">
                  {technologies[0].map((tech, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row items-center space-x-2"
                      >
                        <ArrowIcon className={"h-3 w-3 text-AAsecondary"} />
                        <span className="text-gray-400 sm:text-sm text-xs">
                          {tech}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-row space-x-2 items-center">
                <div className="flex flex-col space-y-4 sm:text-base text-sm">
                  {technologies[1].map((tech, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row items-center space-x-2"
                      >
                        <ArrowIcon className={"h-3 w-3 text-AAsecondary"} />
                        <span className="text-gray-400 sm:text-sm text-xs">
                          {tech}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* // ? Image in Desktop and Tablet */}
          <div className="group relative lg:w-96 lg:h-96 md:w-72 md:h-72 md:block hidden ">
            <div
              className="group-hover:translate-x-3 group-hover:translate-y-3
               duration-300 absolute w-5/6 h-5/6 border-2 border-AAsecondary translate-x-5 
               translate-y-5 rounded"
            ></div>

            <div className="absolute w-5/6 h-5/6  rounded overflow-hidden">
              <div className="absolute w-full h-full group-hover:opacity-0 bg-AAsecondary opacity-10 duration-300 rounded overflow-hidden"></div>
              <Img
                src={"/profile.jpeg"}
                className={"object-contain rounded-lg"}
                alt="My Image Not Found"
              />
            </div>
          </div>
          {/* // ?Image in Mobile */}
          <div className=" relative w-full h-48 md:hidden  flex justify-center items-center">
            <div className="absolute w-48 h-full  rounded  translate-x-5 translate-y-5 border-2 border-AAsecondary"></div>
            <div className="absolute w-48 h-full rounded overflow-hidden">
              <Img
                src={"/profile.jpeg"}
                className={"object-contain rounded-lg"}
                alt="My Image Not Found"
              />
            </div>
            <div className="absolute w-48 h-full  bg-AAsecondary opacity-10 md:opacity-60  rounded overflow-hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
