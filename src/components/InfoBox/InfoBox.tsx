import { useEffect, useRef, useState } from "react";

import { CiLocationOn } from "react-icons/ci";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

import Ruben from "../../assets/images/Ruben.png";

import Underline from "./Svg/Underline";
import RubenText from "./Svg/RubenText";
import NowPlaying from "../NowPlaying";

const words = [
  "Developer",
  "Student",
  "Tech Enthusiast",
  "Critical Thinker",
  "Software Engineer",
  "Tinkerer",
  "Perfectionist",
  "Problem Solver",
];

export default function InfoBox() {
  const extendedWords = [...words, words[0]];
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, 1800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (index === words.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(0);
      }, 500);
    }
  }, [index, words.length]);

  return (
    <div className="info-box bg-[#151f39] bg-opacity-25 shadow-lg rounded-4xl max-w-220 w-2/3 h-128">
      <div className="w-full h-full flex flex-col text-white rounded-lg p-4">
        {/* Title */}
        <h1 className="text-5xl align-middle text-center">
          Hi, I am{" "}
          <span className="relative inline-block font-bold">
            Ruben Lagerwerf
            <Underline />
          </span>
        </h1>
        <div className="flex flex-row items-end justify-center flex-1 w-full mt-2">
          {/* Image and SVG text */}
          <div className="w-1/2 flex flex-col justify-end h-full m-2 relative">
            <img
              src={Ruben}
              alt="Profile image"
              className="w-full object-scale-down rounded-4xl"
            />
            <div className="absolute left-3 -bottom-3 w-2/3 flex justify-center pointer-events-none">
              <RubenText />
            </div>
          </div>
          {/* Text */}
          <div className="w-1/2 text-white flex flex-col h-full m-2">
            <div className="justify-between flex flex-col h-full p-4">
              {/* Scrolling text */}
              <div className="flex items-center">
                <span className="text-3xl mr-2 whitespace-nowrap">I am a</span>
                <div
                  className="overflow-hidden h-12 relative"
                  style={{ height: "3rem" }}
                >
                  <div
                    className={
                      isTransitioning ? "transition-transform duration-500" : ""
                    }
                    style={{
                      transform: `translateY(-${index * 3}rem)`,
                    }}
                    onTransitionEnd={() => {
                      if (!isTransitioning && index === 0) {
                        setIsTransitioning(true);
                      }
                    }}
                  >
                    {extendedWords.map((word, i) => (
                      <h2
                        key={i}
                        className="text-3xl font-bold h-12 flex items-center text-secondary whitespace-nowrap"
                        style={{ height: "3rem" }}
                      >
                        {word}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
              {/* Description */}
              <p>
                Currently pursuing a Bachelor's in Computer Science and
                Engineering at{" "}
                <a
                  className="text-secondary"
                  href="https://www.tue.nl/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Eindhoven University of Technology
                </a>
              </p>
              {/* Location */}
              <div className="flex items-center">
                <CiLocationOn className="text-accent w-6 h-6 mr-2" />
                <h2 className="text-lg">Based in Eindhoven</h2>
              </div>
              {/* Links */}
              <div className="items-center w-full">
                <div className="w-2/3 mx-auto flex justify-between">
                  <a
                    href="https://www.linkedin.com/in/ruben-lagerwerf/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex-1 flex justify-center"
                  >
                    <FaLinkedin className="w-7 h-7 text-secondary hover:text-[#0a66c2] transition-colors" />
                  </a>
                  <a
                    href="https://github.com/RubenLWF"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex-1 flex justify-center"
                  >
                    <FaGithub className="w-7 h-7 text-secondary hover:text-[#0a66c2] transition-colors" />
                  </a>
                  <a
                    href="mailto:ruben.lagerwerf@gmail.com"
                    target="_blank"
                    aria-label="Email"
                    className="flex-1 flex justify-center"
                  >
                    <FaEnvelope className="w-7 h-7 text-secondary hover:text-[#0a66c2] transition-colors" />
                  </a>
                </div>
              </div>
            </div>
            {/* Now Playing Component */}
            <div className="mt-auto">
              <NowPlaying />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
