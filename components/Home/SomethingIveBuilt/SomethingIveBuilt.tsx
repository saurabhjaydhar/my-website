import React from "react";
import ProjectCard from "./ProjectCard";

export default function SomethingIveBuilt() {
  const projects = [
    {
      title: "Data Puller",
      subtitle: "A tool to collect and display user data",
      description: "A web application that collects and displays various user data including IP address, location, GPU information, and more. Built with Next.js and TypeScript.",
      imageSrc: "/images/projects/drisk.png",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      githubLink: "https://github.com/yourusername/data-puller",
      externalLink: "/userdatapuller",
      isInternalLink: true,
      status: "Completed"
    },
    {
      title: "Typing Test",
      subtitle: "A typing speed test application",
      description: "A web application that measures typing speed and accuracy. Features include real-time statistics, multiple difficulty levels, and a clean, distraction-free interface.",
      imageSrc: "/images/projects/CallCenter.png",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      githubLink: "https://github.com/yourusername/typing-test",
      externalLink: "/typing",
      isInternalLink: true,
      status: "Completed"
    },
    // {
    //   title: "Portfolio Website",
    //   subtitle: "My personal portfolio website",
    //   description: "A modern, responsive portfolio website showcasing my projects and skills. Built with Next.js, TypeScript, and Tailwind CSS.",
    //   imageSrc: "/images/projects/profile.jpeg",
    //   tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    //   githubLink: "https://github.com/yourusername/portfolio",
    //   externalLink: "https://yourportfolio.com",
    //   status: "Completed"
    // }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-AAsecondary mb-8">Something I've Built</h2>
      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            subtitle={project.subtitle}
            description={project.description}
            imageSrc={project.imageSrc}
            tags={project.tags}
            githubLink={project.githubLink}
            externalLink={project.externalLink}
            isInternalLink={project.isInternalLink}
            status={project.status}
            isReversed={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
