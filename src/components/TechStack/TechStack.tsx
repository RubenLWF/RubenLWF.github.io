import {
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiVercel,
  SiDotnet,
  SiJavascript,
  SiHtml5,
  SiPython,
  SiPhp,
  SiDocker,
  SiGit,
  SiCss3,
  SiRuby,
} from "react-icons/si";
import { IoLogoReact, IoLogoVue } from "react-icons/io5";
import csharpIcon from "../../assets/csharp_icon.svg";
import { FaJava, FaNpm, FaGithub } from "react-icons/fa6";
import { TbSql } from "react-icons/tb";

import "./TechStack.css";

export default function TechStack() {
  const techIcons: Record<string, any> = {
    React: <IoLogoReact className="mb-1 fill-secondary h-14 w-14" />,
    TypeScript: <SiTypescript className="mb-1 fill-secondary h-11 w-11" />,
    "Tailwind CSS": <SiTailwindcss className="mb-1 fill-secondary h-14 w-14" />,
    "Node Package Manager": <FaNpm className="mb-1 fill-secondary h-15 w-15" />,
    Ruby: <SiRuby className="mb-1 fill-secondary h-10 w-10" />,
    "Vue.js": <IoLogoVue className="mb-1 fill-secondary h-14 w-14 mt-4" />,
    PostgreSQL: <SiPostgresql className="mb-1 fill-secondary h-14 w-14 mt-4" />,
    Vercel: <SiVercel className="mb-1 fill-secondary h-12 w-12 mb-2" />,
    "C#": <img src={csharpIcon} alt="C#" className="mb-1 h-15 w-15" />,
    "ASP.NET Core": <SiDotnet className="mb-1 fill-secondary h-14 w-14" />,
    Java: <FaJava className="mb-1 fill-secondary h-14 w-14 mb-2" />,
    JavaScript: <SiJavascript className="mb-1 fill-secondary h-11 w-11" />,
    HTML: <SiHtml5 className="mb-1 fill-secondary h-12 w-12 mt-2" />,
    CSS: <SiCss3 className="mb-1 fill-secondary h-12 w-12 mt-2" />,
    Python: <SiPython className="mb-1 fill-secondary h-14 w-14" />,
    SQL: <TbSql className="mb-1 stroke-secondary h-15 w-15" />,
    PHP: <SiPhp className="mb-1 fill-secondary h-14 w-14" />,
    Docker: <SiDocker className="mb-1 fill-secondary h-12 w-12" />,
    Git: <SiGit className="mb-1 fill-secondary h-14 w-14" />,
    GitHub: <FaGithub className="mb-1 fill-secondary h-14 w-14" />,
  };

  const rows = [
    [
      "TypeScript",
      "React",
      "Vue.js",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
    ["C#", "ASP.NET Core", "Python", "Ruby", "Java", "PHP"],
    [
      "SQL",
      "PostgreSQL",
      "Git",
      "GitHub",
      "Node Package Manager",
      "Docker",
      "Vercel",
    ],
  ];

  return (
    <div className="tech-stack w-full flex flex-col items-center pt-20">
      <div className="flex flex-col gap-8 items-center">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className={"flex flex-row gap-7.5 -mt-10"}>
            {row.map((tech) => {
              const Icon = techIcons[tech];
              let textSize = "text-lg";
              if (tech.length > 12) textSize = "text-xs";
              else if (tech.length > 8) textSize = "text-sm";

              // Calculate a delay for each tile
              const colIdx = row.indexOf(tech);
              const delay = (rowIdx * rows[0].length + colIdx) * 80;

              return (
                <div
                  className="w-20 h-20 flip-card animate-techstack-in"
                  key={tech}
                  style={{ animationDelay: `${delay}ms` }}
                >
                  <div className="flip-card-inner">
                    {/* Front Side */}
                    <div className="flip-card-front bg-primary flex flex-col items-center justify-center rounded-2xl shadow-lg transform rotate-45">
                      <span className="block transform -rotate-45 select-none flex flex-col items-center justify-center color-secondary">
                        {Icon}
                      </span>
                    </div>
                    {/* Back Side */}
                    <div className="flip-card-back bg-primary flex items-center justify-center rounded-2xl shadow-lg transform rotate-45">
                      <span
                        className={`block transform rotate-45 text-secondary font-bold ${textSize} text-center px-2 select-none`}
                      >
                        {tech}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
