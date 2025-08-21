import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";
import ParticleBackground from "./components/ParticleBackground";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showContent, setShowContent] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const portfolioRef = useRef(null);
  const skillsRef = useRef(null);

  // Portfolio data
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovation Labs",
      period: "2023 - Present",
      description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting microservices solutions.",
      technologies: ["React", "Node.js", "AWS", "TypeScript", "MongoDB"]
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions Inc",
      period: "2022 - 2023",
      description: "Developed responsive web applications with modern JavaScript frameworks. Collaborated with UX/UI teams to deliver pixel-perfect designs.",
      technologies: ["React", "Vue.js", "SCSS", "Webpack", "Jest"]
    },
    {
      title: "Software Engineer",
      company: "StartupTech",
      period: "2021 - 2022",
      description: "Built full-stack applications from concept to deployment. Worked in agile environment with focus on rapid prototyping and iteration.",
      technologies: ["JavaScript", "Python", "Express", "PostgreSQL", "Docker"]
    }
  ];

  const skills = [
    { name: "JavaScript", level: 95, icon: "ri-javascript-line" },
    { name: "React", level: 92, icon: "ri-reactjs-line" },
    { name: "Node.js", level: 88, icon: "ri-nodejs-line" },
    { name: "TypeScript", level: 85, icon: "ri-code-s-slash-line" },
    { name: "Python", level: 82, icon: "ri-code-line" },
    { name: "AWS", level: 78, icon: "ri-cloud-line" },
    { name: "MongoDB", level: 80, icon: "ri-database-2-line" },
    { name: "Docker", level: 75, icon: "ri-container-line" },
    { name: "Git", level: 90, icon: "ri-git-branch-line" },
    { name: "GSAP", level: 85, icon: "ri-magic-line" }
  ];

  // Preload images
  useEffect(() => {
    const imagesToPreload = [
      './bg.png',
      './sky.png',
      './main.png',
      './imag.png',
      './ps5.png'
    ];

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    const preloadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoaded(true);
          }
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoaded(true);
          }
          resolve();
        };
        img.src = src;
      });
    };

    Promise.all(imagesToPreload.map(preloadImage));
  }, []);
  useGSAP(() => {
    if (!isLoaded) return;
    
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "power4.inOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "expo.inOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          const svgElement = document.querySelector(".svg");
          if (svgElement) {
            svgElement.remove();
          }
          setShowContent(true);
          this.kill();
        }
      },
    });
  }, [isLoaded]);

  // Portfolio animations
  useGSAP(() => {
    if (!showContent) return;

    // Experience cards animation
    gsap.set(".experience-card", { y: 100, opacity: 0 });
    gsap.set(".skill-bar", { scaleX: 0 });
    gsap.set(".skill-item", { x: -50, opacity: 0 });

    ScrollTrigger.create({
      trigger: ".portfolio-section",
      start: "top 80%",
      onEnter: () => {
        gsap.to(".portfolio-title", {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out"
        });
      }
    });

    ScrollTrigger.create({
      trigger: ".experience-container",
      start: "top 80%",
      onEnter: () => {
        gsap.to(".experience-card", {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        });
      }
    });

    ScrollTrigger.create({
      trigger: ".skills-container",
      start: "top 80%",
      onEnter: () => {
        gsap.to(".skill-item", {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        });
        
        gsap.to(".skill-bar", {
          scaleX: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3
        });
      }
    });

    // Floating navigation
    ScrollTrigger.create({
      trigger: ".portfolio-section",
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => {
        gsap.to(".floating-nav", {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out"
        });
      },
      onLeave: () => {
        gsap.to(".floating-nav", {
          y: 100,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in"
        });
      },
      onEnterBack: () => {
        gsap.to(".floating-nav", {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(".floating-nav", {
          y: 100,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in"
        });
      }
    });

  }, [showContent]);

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.2,
      x: "-50%",
      bottom: "0%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      const isMobile = window.innerWidth < 768;
      
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(".sky", {
        x: xMove,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(".character", {
        x: `calc(-50% + ${xMove * (isMobile ? 0.2 : 0.5)}px)`,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    // Add touch support for mobile
    main?.addEventListener("touchmove", function (e) {
      const touch = e.touches[0];
      const xMove = (touch.clientX / window.innerWidth - 0.5) * 30;
      const isMobile = window.innerWidth < 768;
      
      gsap.to(".main .text", {
        x: `${xMove * 0.3}%`,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(".sky", {
        x: xMove * 0.8,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(".bg", {
        x: xMove * 1.2,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(".character", {
        x: `calc(-50% + ${xMove * 0.3}px)`,
        duration: 0.5,
        ease: "power2.out",
      });
    }, { passive: true });
  }, [showContent]);

  return (
    <>
      <ParticleBackground />
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="150"
                  className="md:text-[250px]"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  ANK
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full md:rotate-[-10deg] md:scale-[1.7] rotate-0 scale-100">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-4 md:py-10 px-4 md:px-10">
              <div className="logo flex gap-3 md:gap-7">
                <div className="lines flex flex-col gap-[3px] md:gap-[5px]">
                  <div className="line w-8 md:w-15 h-1 md:h-2 bg-white"></div>
                  <div className="line w-6 md:w-8 h-1 md:h-2 bg-white"></div>
                  <div className="line w-4 md:w-5 h-1 md:h-2 bg-white"></div>
                </div>
                <h3 className="text-2xl md:text-4xl -mt-[4px] md:-mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <div className="text text-white flex flex-col gap-1 md:gap-3 absolute top-10 md:top-20 left-1/2 -translate-x-1/2 scale-[0.6] md:scale-[1.4] rotate-0 md:rotate-[-10deg]">
                <h1 className="text-[6rem] md:text-[12rem] leading-none -ml-20 md:-ml-40">ankit</h1>
                <h1 className="text-[6rem] md:text-[12rem] leading-none ml-10 md:ml-20">ranjan</h1>
                <h1 className="text-[6rem] md:text-[12rem] leading-none -ml-20 md:-ml-40">portfolio</h1>
              </div>
              <img
                className="absolute character bottom-0 left-1/2 -translate-x-1/2 scale-[1.0] md:scale-[1.0] rotate-0 h-[80%] md:h-[90%] w-auto object-contain object-bottom z-[2]"
                src="./ank.png"
                alt="Ankit Ranjan Portfolio"
                loading="eager"
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-6 md:py-15 px-4 md:px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-2 md:gap-4 items-center">
                <i className="text-2xl md:text-4xl ri-arrow-down-line"></i>
                <h3 className="text-lg md:text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute h-[35px] md:h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>
          <div className="w-full min-h-screen flex items-center justify-center bg-black px-4 md:px-0">
            <div className="cntnr flex flex-col lg:flex-row text-white w-full h-auto lg:h-[80%] gap-8 lg:gap-0">
            
              <div className="rg w-full lg:w-[50%] xl:w-[30%] py-8 md:py-16 lg:py-30 order-1 lg:order-2">
                <h1 className="text-4xl md:text-6xl lg:text-8xl">Ankit Ranjan</h1>
                <h1 className="text-4xl md:text-6xl lg:text-8xl">Full Stack Developer</h1>
                <div className="mt-6 md:mt-10 text-base md:text-lg lg:text-xl font-[Helvetica_Now_Display]">
                  <p className="mb-2">📧 ankitrobinranjan@gmail.com</p>
                  <p className="mb-2">📱 +91 - 8603995362</p>
                  <p className="mb-2">💼 linkedin.com/in/ankitrj3</p>
                  <p className="mb-4">🔗 github.com/ankitrj3</p>
                </div>
                <div className="mt-4 md:mt-6 text-sm md:text-base lg:text-lg font-[Helvetica_Now_Display]">
                  <h3 className="text-xl md:text-2xl text-yellow-500 mb-3">Skills</h3>
                  <p className="mb-2"><strong>Languages:</strong> C++, Java, JavaScript, C, PHP</p>
                  <p className="mb-2"><strong>Frameworks:</strong> HTML/CSS, Tailwind CSS, ReactJS, SpringBoot</p>
                  <p className="mb-2"><strong>Tools:</strong> MySQL, MongoDB, AWS, Docker, Kubernetes, Unity, Git</p>
                </div>
                <div className="mt-4 md:mt-6 text-sm md:text-base lg:text-lg font-[Helvetica_Now_Display]">
                  <h3 className="text-xl md:text-2xl text-yellow-500 mb-3">Education</h3>
                  <p className="mb-2"><strong>BTech CSE</strong> - Lovely Professional University (CGPA: 8.10)</p>
                  <p className="mb-2"><strong>Diploma CSE</strong> - LPU (CGPA: 9.20)</p>
                </div>
                <button className="bg-yellow-500 hover:bg-yellow-400 px-6 md:px-8 lg:px-10 py-6 md:py-8 lg:py-10 text-black mt-6 md:mt-10 text-2xl md:text-3xl lg:text-4xl font-bold rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/30">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
          
          {/* Enhanced Portfolio Section */}
          <div className="portfolio-section w-full min-h-screen animated-bg relative z-[2] py-20">
            <div className="max-w-7xl mx-auto px-5 md:px-10">
              <div className="portfolio-title text-center mb-20" style={{opacity: 0, transform: 'translateY(50px)'}}>
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 glow-text">EXPERIENCE</h2>
                <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 mx-auto"></div>
              </div>

              {/* Experience Cards */}
              <div className="experience-container grid gap-8 mb-32">
                {experiences.map((exp, index) => (
                  <div key={index} className="experience-card bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 hover:border-yellow-500 transition-all duration-300">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{exp.title}</h3>
                        <h4 className="text-xl md:text-2xl text-yellow-500 mb-2">{exp.company}</h4>
                      </div>
                      <span className="text-lg text-gray-400 bg-gray-700 px-4 py-2 rounded-full">{exp.period}</span>
                    </div>
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-500/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills Section */}
              <div className="skills-container">
                <h2 className="text-6xl md:text-8xl font-bold text-white text-center mb-16 glow-text">SKILLS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-item bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-yellow-500 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <i className={`${skill.icon} text-2xl text-yellow-500`}></i>
                          <span className="text-xl font-semibold text-white">{skill.name}</span>
                        </div>
                        <span className="text-lg text-yellow-400 font-bold">{skill.level}%</span>
                      </div>
                      <div className="skill-bar-container bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div 
                          className="skill-bar bg-gradient-to-r from-yellow-500 to-yellow-400 h-full rounded-full origin-left"
                          style={{width: `${skill.level}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div className="contact-section mt-32 text-center">
                <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 glow-text">CONTACT</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                  <div className="contact-item bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-yellow-500 transition-all duration-300">
                    <i className="ri-mail-line text-4xl text-yellow-500 mb-4"></i>
                    <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                    <p className="text-gray-300">ankitrobinranjan@gmail.com</p>
                  </div>
                  <div className="contact-item bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-yellow-500 transition-all duration-300">
                    <i className="ri-phone-line text-4xl text-yellow-500 mb-4"></i>
                    <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
                    <p className="text-gray-300">+91 - 8603995362</p>
                  </div>
                  <div className="contact-item bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-yellow-500 transition-all duration-300">
                    <i className="ri-linkedin-line text-4xl text-yellow-500 mb-4"></i>
                    <h3 className="text-xl font-semibold text-white mb-2">LinkedIn</h3>
                    <p className="text-gray-300">linkedin.com/in/ankitrj3</p>
                  </div>
                  <div className="contact-item bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-yellow-500 transition-all duration-300">
                    <i className="ri-github-line text-4xl text-yellow-500 mb-4"></i>
                    <h3 className="text-xl font-semibold text-white mb-2">GitHub</h3>
                    <p className="text-gray-300">github.com/ankitrj3</p>
                  </div>
                </div>
                
                <div className="education-section bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-12">
                  <h3 className="text-4xl font-bold text-yellow-500 mb-6">Education</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="education-item">
                      <h4 className="text-2xl font-semibold text-white mb-2">BTech Computer Science</h4>
                      <p className="text-xl text-gray-300 mb-2">Lovely Professional University</p>
                      <p className="text-lg text-yellow-400">CGPA: 8.10</p>
                    </div>
                    <div className="education-item">
                      <h4 className="text-2xl font-semibold text-white mb-2">Diploma Computer Science</h4>
                      <p className="text-xl text-gray-300 mb-2">Lovely Professional University</p>
                      <p className="text-lg text-yellow-400">CGPA: 9.20</p>
                    </div>
                  </div>
                </div>

                <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 px-12 py-6 text-black text-2xl font-bold rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/30">
                  <i className="ri-download-line mr-3"></i>
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
