import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showContent, setShowContent] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Toggle navigation menu
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Toggle skills view
  const toggleSkillsView = () => {
    setShowAllSkills(!showAllSkills);
    
    // Force grid recalculation
    setTimeout(() => {
      const skillsGrid = document.querySelector('.skills-grid');
      if (skillsGrid) {
        skillsGrid.style.display = 'none';
        skillsGrid.offsetHeight; // Trigger reflow
        skillsGrid.style.display = 'grid';
      }
    }, 10);
  };

  // Close nav when clicking on a link
  const closeNav = () => {
    setIsNavOpen(false);
  };

  // Download resume function
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Ankit_Ranjan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle body scroll lock for mobile navigation
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.classList.add('mobile-nav-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.classList.remove('mobile-nav-open');
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.classList.remove('mobile-nav-open');
    };
  }, [isNavOpen]);

  // Navigation scroll functions
  const scrollToSection = (sectionClass) => {
    // First close the navigation and reset body styles
    closeNav();
    
    // Wait a bit for the navigation to close, then scroll
    setTimeout(() => {
      const element = document.querySelector(sectionClass);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 300); // Wait for nav animation to complete
  };

  // Home navigation function
  const scrollToTop = () => {
    closeNav();
    setTimeout(() => {
      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
      });
    }, 300);
  };

  // Portfolio data
  const experiences = [
  {
    title: "Software Engineer Intern",
    company: "Lumen IT Services LLC",
    period: "Jul 2025 - Present",
    description:
      "Working on backend and cloud development projects using Java Spring Boot, AWS, and DevOps tools. Contributing to scalable REST API development, CI/CD pipelines, and deployment automation.",
    technologies: ["Java", "Spring Boot", "AWS", "Docker", "Kubernetes", "CI/CD"]
  },
  {
    title: "Game Development Intern",
    company: "CipherSchools",
    period: "Jun 2024 - Aug 2024",
    description:
      "Completed a game development internship focusing on Unity and C# scripting. Built playable games, applied game physics, and explored 3D modeling and animation with Blender.",
    technologies: ["Unity", "C#", "Game Physics", "Blender 3D"]
  }
];


  const skills = [
  // Languages
  { name: "Java", level: 93, icon: "ri-code-s-slash-line" },
  { name: "JavaScript", level: 95, icon: "ri-javascript-line" },
  { name: "TypeScript", level: 85, icon: "ri-code-s-slash-line" },
  { name: "Python", level: 82, icon: "ri-code-line" },
  { name: "C#", level: 80, icon: "ri-code-s-slash-line" },

  // Backend
  { name: "Spring Boot", level: 90, icon: "ri-leaf-line" },
  { name: "Node.js", level: 88, icon: "ri-nodejs-line" },
  { name: "Express.js", level: 85, icon: "ri-server-line" },
  { name: "RESTful APIs", level: 90, icon: "ri-links-line" },

  // Frontend
  { name: "React", level: 92, icon: "ri-reactjs-line" },
  { name: "Next.js", level: 85, icon: "ri-nextjs-line" },
  { name: "HTML5", level: 90, icon: "ri-html5-line" },
  { name: "CSS3", level: 88, icon: "ri-css3-line" },
  { name: "Responsive Design", level: 87, icon: "ri-layout-line" },

  // Cloud
  { name: "AWS", level: 78, icon: "ri-cloud-line" },
  { name: "Azure", level: 72, icon: "ri-cloud-fill" },
  { name: "Terraform", level: 70, icon: "ri-tools-line" },
  { name: "Infrastructure as Code", level: 75, icon: "ri-settings-3-line" },

  // DevOps
  { name: "Docker", level: 75, icon: "ri-container-line" },
  { name: "Kubernetes", level: 73, icon: "ri-apps-line" },
  { name: "CI/CD", level: 80, icon: "ri-git-commit-line" },
  { name: "Microservices", level: 82, icon: "ri-stack-line" },

  // Game Dev
  { name: "Unity 3D", level: 78, icon: "ri-gamepad-line" },
  { name: "Game Physics", level: 74, icon: "ri-shapes-line" },
  { name: "Blender 3D", level: 70, icon: "ri-cube-3-line" },

  // Database & Tools
  { name: "MongoDB", level: 80, icon: "ri-database-2-line" },
  { name: "Git", level: 90, icon: "ri-git-branch-line" },
  { name: "GSAP", level: 85, icon: "ri-magic-line" }
];


  // Preload images
  useEffect(() => {
    const imagesToPreload = [
      './bg.png',
      './sky.png',
      './ank.png',
      './ank2.png'
    ];

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    const preloadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setTimeout(() => setIsLoaded(true), 500); // Small delay to ensure smooth transition
          }
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setTimeout(() => setIsLoaded(true), 500);
          }
          resolve();
        };
        img.src = src;
      });
    };

    Promise.all(imagesToPreload.map(preloadImage));
    
    // Fallback - show content after 3 seconds regardless
    setTimeout(() => {
      if (!isLoaded) {
        setIsLoaded(true);
      }
    }, 3000);
    
    // Secondary fallback - show content after 5 seconds regardless
    setTimeout(() => {
      setShowContent(true);
    }, 5000);
  }, [isLoaded]);
  useGSAP(() => {
    if (!isLoaded) return;
    
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 1.5,
      ease: "power4.inOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 8,
      duration: 1.5,
      delay: -1.2,
      ease: "expo.inOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.8) {
          setShowContent(true);
          this.kill();
        }
      },
      onComplete: () => {
        const svgElement = document.querySelector(".svg");
        if (svgElement) {
          svgElement.style.display = 'none';
        }
        setShowContent(true);
      }
    });
  }, [isLoaded]);

  // Portfolio animations
  useGSAP(() => {
    if (!showContent) return;

    // Experience cards animation
    gsap.set(".experience-card", { y: 100, opacity: 0 });
    gsap.set(".skill-bar", { scaleX: 0 });
    gsap.set(".skill-item", { x: -50, opacity: 0 });
    gsap.set(".profile-image", { scale: 0.8, opacity: 0 });
    gsap.set(".profile-overlay", { y: 50, opacity: 0 });

    // Profile section animation
    ScrollTrigger.create({
      trigger: ".cntnr",
      start: "top 80%",
      onEnter: () => {
        gsap.to(".profile-image", {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out"
        });
        gsap.to(".profile-overlay", {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power3.out"
        });
      }
    });

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
        // Only animate initially visible skills to avoid conflicts with expand animation
        const initialSkills = document.querySelectorAll('.skill-item');
        const visibleSkills = showAllSkills ? initialSkills : Array.from(initialSkills).slice(0, 8);
        
        gsap.to(visibleSkills, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity" // Clear properties after animation
        });
        
        const visibleBars = visibleSkills.map(item => item.querySelector('.skill-bar')).filter(Boolean);
        gsap.to(visibleBars, {
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

  // Background animations for sections
  useGSAP(() => {
    if (!showContent) return;

    // Create floating particles for background
    const createFloatingParticles = (container, count = 20) => {
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 4 + 2}px;
          height: ${Math.random() * 4 + 2}px;
          background: rgba(245, 158, 11, ${Math.random() * 0.5 + 0.2});
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
        `;
        container.appendChild(particle);

        // Animate particles
        gsap.to(particle, {
          x: `+=${Math.random() * 200 - 100}`,
          y: `+=${Math.random() * 200 - 100}`,
          rotation: 360,
          duration: Math.random() * 10 + 10,
          repeat: -1,
          yoyo: true,
          ease: "none"
        });

        gsap.to(particle, {
          opacity: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
    };

    // Add background animations for each section
    const portfolioSection = document.querySelector('.portfolio-section');
    const skillsContainer = document.querySelector('.skills-container');
    const contactSection = document.querySelector('.contact-section');

    if (portfolioSection) {
      createFloatingParticles(portfolioSection, 15);
      
      // Background gradient animation
      gsap.to(portfolioSection, {
        backgroundPosition: "200% 200%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });
    }

    if (skillsContainer) {
      createFloatingParticles(skillsContainer, 12);
    }

    if (contactSection) {
      createFloatingParticles(contactSection, 10);
    }

    // Animated background waves
    const sections = ['.portfolio-section', '.skills-container', '.contact-section'];
    sections.forEach((selector) => {
      const section = document.querySelector(selector);
      if (section) {
        // Create wave elements
        for (let i = 0; i < 3; i++) {
          const wave = document.createElement('div');
          wave.className = 'background-wave';
          wave.style.cssText = `
            position: absolute;
            top: ${i * 30}%;
            left: -50%;
            width: 200%;
            height: ${Math.random() * 20 + 10}px;
            background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.1), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            opacity: 0;
          `;
          section.appendChild(wave);

          // Animate waves
          gsap.to(wave, {
            x: "50%",
            rotation: Math.random() * 360,
            duration: Math.random() * 15 + 10,
            repeat: -1,
            ease: "none",
            delay: i * 2
          });

          gsap.to(wave, {
            opacity: 0.6,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: i * 1.5
          });
        }
      }
    });

    // Pulsing background effect for experience cards
    ScrollTrigger.create({
      trigger: ".experience-container",
      start: "top 80%",
      onEnter: () => {
        const cards = document.querySelectorAll('.experience-card');
        cards.forEach((card, index) => {
          gsap.to(card, {
            boxShadow: "0 0 30px rgba(245, 158, 11, 0.3)",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.5
          });

          // Animate card background particles
          const particles = card.querySelectorAll('.bg-particle');
          particles.forEach((particle, pIndex) => {
            gsap.to(particle, {
              opacity: Math.random() * 0.7 + 0.3,
              scale: Math.random() * 0.5 + 0.8,
              duration: Math.random() * 3 + 2,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              delay: pIndex * 0.5
            });
          });

          // Animate card glow
          const glow = card.querySelector('.card-glow');
          if (glow) {
            gsap.to(glow, {
              opacity: 0.8,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              delay: index * 0.3
            });
          }
        });
      }
    });

    // Enhanced skill items animations
    ScrollTrigger.create({
      trigger: ".skills-container",
      start: "top 80%",
      onEnter: () => {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
          // Animate skill background glow
          const bgGlow = item.querySelector('.skill-bg-glow');
          if (bgGlow) {
            gsap.to(bgGlow, {
              opacity: 0.6,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              delay: index * 0.2
            });
          }

          // Animate skill particles
          const particles = item.querySelectorAll('.skill-particles');
          particles.forEach((particle, pIndex) => {
            gsap.to(particle, {
              opacity: Math.random() * 0.8 + 0.2,
              scale: Math.random() * 0.5 + 0.8,
              rotation: 360,
              duration: Math.random() * 4 + 3,
              repeat: -1,
              ease: "power2.inOut",
              delay: pIndex * 0.3
            });
          });
        });
      }
    });

    // Background grid animation
    const addBackgroundGrid = (container) => {
      const grid = document.createElement('div');
      grid.className = 'background-grid';
      grid.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
          linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px);
        background-size: 50px 50px;
        pointer-events: none;
        z-index: 0;
        opacity: 0;
      `;
      container.appendChild(grid);

      gsap.to(grid, {
        opacity: 0.3,
        duration: 2,
        ease: "power2.inOut"
      });

      gsap.to(grid, {
        backgroundPosition: "50px 50px",
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    };

    // Add grid to sections
    if (portfolioSection) addBackgroundGrid(portfolioSection);
    if (skillsContainer) addBackgroundGrid(skillsContainer);

  }, [showContent]);

  // Mobile navigation animations
  useGSAP(() => {
    if (isNavOpen) {
      // Animate menu buttons with stagger
      gsap.fromTo(".mobile-nav-btn", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
      // Animate social links
      gsap.fromTo(".mobile-nav .flex a", 
        { y: 30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: "power3.out", delay: 0.4 }
      );
    }
  }, [isNavOpen]);

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
      x: "0%",
      right: "0%",
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
        x: `${xMove * (isMobile ? 0.2 : 0.4)}%`,
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
        x: `${xMove * (isMobile ? 0.2 : 0.5)}px`,
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
        x: `${xMove * (isMobile ? 0.1 : 0.3)}%`,
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
        x: `${xMove * 0.3}px`,
        duration: 0.5,
        ease: "power2.out",
      });
    }, { passive: true });
  }, [showContent]);

  // Handle skills toggle animation
  useEffect(() => {
    if (showContent && showAllSkills) {
      // Animate new skills when showing all
      setTimeout(() => {
        const allSkillItems = document.querySelectorAll('.skill-item');
        const newSkillItems = Array.from(allSkillItems).slice(8); // Get items after the first 8
        
        if (newSkillItems.length > 0) {
          // Reset any previous transforms on all items to ensure grid alignment
          allSkillItems.forEach(item => {
            item.style.transform = '';
            item.style.opacity = '1';
          });
          
          // Animate only the new skills
          gsap.fromTo(newSkillItems, 
            { y: 30, opacity: 0, scale: 0.95 },
            { 
              y: 0, 
              opacity: 1, 
              scale: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: "power2.out",
              clearProps: "all" // Clear GSAP properties after animation
            }
          );
          
          // Animate skill bars for new items
          const newSkillBars = newSkillItems.map(item => item.querySelector('.skill-bar')).filter(Boolean);
          gsap.fromTo(newSkillBars,
            { scaleX: 0 },
            { 
              scaleX: 1, 
              duration: 0.8,
              stagger: 0.08,
              ease: "power2.out",
              delay: 0.2
            }
          );
        }
      }, 50); // Small delay to ensure DOM is updated
    } else if (showContent && !showAllSkills) {
      // When collapsing, ensure remaining items are properly aligned
      setTimeout(() => {
        const allSkillItems = document.querySelectorAll('.skill-item');
        allSkillItems.forEach(item => {
          item.style.transform = '';
          item.style.opacity = '1';
        });
      }, 50);
    }
  }, [showAllSkills, showContent]);

  return (
    <>
      {!showContent && (
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
                    AR
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
      )}
      {showContent && (
        <div className="main w-full rotate-0 scale-100">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[20] w-full py-2 md:py-4 px-4 md:px-8">
              <div className="flex justify-between items-center">
                <div className="logo flex gap-3 md:gap-5 items-center">
                  {/* Hamburger Menu - Only visible on mobile */}
                  <div className="lines flex flex-col gap-[3px] cursor-pointer md:hidden" onClick={toggleNav}>
                    <div className={`line w-8 h-1 bg-white transition-all duration-300 ${isNavOpen ? 'rotate-45 translate-y-2 bg-yellow-500' : ''}`}></div>
                    <div className={`line w-6 h-1 bg-white transition-all duration-300 ${isNavOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`line w-4 h-1 bg-white transition-all duration-300 ${isNavOpen ? '-rotate-45 -translate-y-2 bg-yellow-500 w-8' : ''}`}></div>
                  </div>
                  <h3 className="text-xl md:text-2xl -mt-[2px] md:-mt-[4px] leading-none text-white font-bold">
                    Ankit Ranjan
                  </h3>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                  <button 
                    className="text-white hover:text-yellow-500 transition-colors duration-300 text-sm font-semibold"
                    onClick={scrollToTop}
                  >
                    Home
                  </button>
                  <button 
                    className="text-white hover:text-yellow-500 transition-colors duration-300 text-sm font-semibold"
                    onClick={() => scrollToSection('.portfolio-section')}
                  >
                    Experience
                  </button>
                  <button 
                    className="text-white hover:text-yellow-500 transition-colors duration-300 text-sm font-semibold"
                    onClick={() => scrollToSection('.skills-container')}
                  >
                    Skills
                  </button>
                  <button 
                    className="text-white hover:text-yellow-500 transition-colors duration-300 text-sm font-semibold"
                    onClick={() => scrollToSection('.contact-section')}
                  >
                    Contact
                  </button>
                </nav>
              </div>

              {/* Mobile Navigation Menu - Only shows on mobile */}
              <div className={`mobile-nav md:hidden fixed inset-0 w-full h-full bg-black/98 backdrop-blur-xl z-[50] flex flex-col items-center justify-center transition-all duration-300 ${isNavOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
                
                {/* Logo/Brand */}
                <div className="absolute top-8 left-8 text-white">
                  <h3 className="text-2xl font-bold">Ankit Ranjan</h3>
                </div>
                
                <div className="flex flex-col items-center justify-center h-full w-full px-8 py-16">
                  {/* Navigation Menu Items */}
                  <div className="flex flex-col items-center gap-8 mb-12">
                    <button 
                      className="mobile-nav-btn text-white hover:text-yellow-500 transition-all duration-300 text-4xl font-bold flex items-center gap-6 w-full max-w-xs justify-center py-6 px-8 rounded-2xl hover:bg-yellow-500/10 border border-gray-600/30 hover:border-yellow-500/50"
                      onClick={scrollToTop}
                    >
                      <i className="ri-home-line text-yellow-500 text-5xl"></i>
                      <span className="text-3xl">Home</span>
                    </button>
                    
                    <button 
                      className="mobile-nav-btn text-white hover:text-yellow-500 transition-all duration-300 text-4xl font-bold flex items-center gap-6 w-full max-w-xs justify-center py-6 px-8 rounded-2xl hover:bg-yellow-500/10 border border-gray-600/30 hover:border-yellow-500/50"
                      onClick={() => scrollToSection('.portfolio-section')}
                    >
                      <i className="ri-briefcase-line text-yellow-500 text-5xl"></i>
                      <span className="text-3xl">Experience</span>
                    </button>
                    
                    <button 
                      className="mobile-nav-btn text-white hover:text-yellow-500 transition-all duration-300 text-4xl font-bold flex items-center gap-6 w-full max-w-xs justify-center py-6 px-8 rounded-2xl hover:bg-yellow-500/10 border border-gray-600/30 hover:border-yellow-500/50"
                      onClick={() => scrollToSection('.skills-container')}
                    >
                      <i className="ri-code-line text-yellow-500 text-5xl"></i>
                      <span className="text-3xl">Skills</span>
                    </button>
                    
                    <button 
                      className="mobile-nav-btn text-white hover:text-yellow-500 transition-all duration-300 text-4xl font-bold flex items-center gap-6 w-full max-w-xs justify-center py-6 px-8 rounded-2xl hover:bg-yellow-500/10 border border-gray-600/30 hover:border-yellow-500/50"
                      onClick={() => scrollToSection('.contact-section')}
                    >
                      <i className="ri-mail-line text-yellow-500 text-5xl"></i>
                      <span className="text-3xl">Contact</span>
                    </button>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex gap-8 mt-8">
                    <a href="https://linkedin.com/in/ankitrj3" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-500 transition-all duration-300 p-4 bg-gray-800/50 rounded-full hover:bg-yellow-500/20 border border-gray-600/30 hover:border-yellow-500/50">
                      <i className="ri-linkedin-line text-4xl"></i>
                    </a>
                    <a href="https://github.com/ankitrj3" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-500 transition-all duration-300 p-4 bg-gray-800/50 rounded-full hover:bg-yellow-500/20 border border-gray-600/30 hover:border-yellow-500/50">
                      <i className="ri-github-line text-4xl"></i>
                    </a>
                    <a href="mailto:ankitrobinranjan@gmail.com" className="text-white hover:text-yellow-500 transition-all duration-300 p-4 bg-gray-800/50 rounded-full hover:bg-yellow-500/20 border border-gray-600/30 hover:border-yellow-500/50">
                      <i className="ri-mail-line text-4xl"></i>
                    </a>
                  </div>
                  
                  {/* Bottom decoration */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400">
                    <div className="flex items-center gap-2 text-lg">
                      <div className="w-8 h-px bg-yellow-500"></div>
                      <span>Ankit Portfolio</span>
                      <div className="w-8 h-px bg-yellow-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.1] rotate-0 top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt="Sky Background"
                loading="eager"
              />
              <img
                className="absolute scale-[1.1] rotate-0 bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt="City Background"
                loading="eager"
              />
              <div className="text text-white flex flex-col gap-1 md:gap-3 absolute top-[15%] md:top-[25%] left-1/2 md:left-[10%] -translate-x-1/2 md:translate-x-0 scale-[0.4] md:scale-[1.0] rotate-0 z-[5]">
                <h1 className="text-[5rem] md:text-[8rem] leading-[0.8] text-center md:text-left font-bold">software</h1>
                <h1 className="text-[5rem] md:text-[8rem] leading-[0.8] text-center md:text-left font-bold">engineer</h1>
                {/* <h1 className="text-[6rem] md:text-[8rem] leading-[0.8] text-left font-bold">portfolio</h1> */}
              </div>
              <img
                className="absolute character bottom-0 right-0 md:right-20 scale-[1.0] rotate-0 h-[75%] md:h-[85%] w-auto object-contain object-bottom z-[2]"
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
              
              {/* Left side - Image */}
              <div className="lf w-full lg:w-[50%] xl:w-[70%] py-8 md:py-16 lg:py-30 order-2 lg:order-1 flex items-center justify-center">
                <div className="relative w-full max-w-lg lg:max-w-2xl">
                  <img
                    className="profile-image w-full h-auto object-contain rounded-lg shadow-2xl"
                    src="./ank2.png"
                    alt="Ankit Ranjan Profile"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                  <div className="profile-overlay absolute bottom-6 left-6 right-6">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/30">
                      <h3 className="text-xl md:text-2xl font-bold text-yellow-500 mb-2">Portfolio Highlights</h3>
                      <p className="text-sm md:text-base text-gray-300">Cloud DevOps Enthusiast and Backend Developer with expertise in Java Spring Boot, AWS, Docker, Kubernetes, and REST APIs, passionate about building scalable and efficient systems.</p>
                    </div>
                  </div>
                </div>
              </div>
            
              <div className="rg w-full lg:w-[50%] xl:w-[30%] py-8 md:py-16 lg:py-30 order-1 lg:order-2">
                <h1 className="text-4xl md:text-6xl lg:text-8xl">Ankit Ranjan</h1>
                <h1 className="text-4xl md:text-6xl lg:text-8xl">Backend Developer</h1>
                <h1 className="text-4xl md:text-6xl lg:text-8xl">& DevOps Engineer</h1>
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
                  <div key={index} className="experience-card relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 hover:border-yellow-500 transition-all duration-300 overflow-hidden">
                    {/* Background animated elements for each card */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="card-bg-effect absolute top-0 left-0 w-full h-full opacity-20">
                        <div className="bg-particle bg-particle-1"></div>
                        <div className="bg-particle bg-particle-2"></div>
                        <div className="bg-particle bg-particle-3"></div>
                      </div>
                      <div className="card-glow absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-500/5 rounded-lg"></div>
                    </div>
                    
                    <div className="relative z-10">
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
                  </div>
                ))}
              </div>

              {/* Skills Section */}
              <div className="skills-container max-w-7xl mx-auto px-5 md:px-10">
                <h2 className="text-6xl md:text-8xl font-bold text-white text-center mb-16 glow-text">SKILLS</h2>
                <div className="skills-grid w-full" data-expanded={showAllSkills.toString()}>
                  {(showAllSkills ? skills : skills.slice(0, 8)).map((skill, index) => (
                    <div key={index} className="skill-item relative bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-4 md:p-6 hover:border-yellow-500 transition-all duration-300 overflow-hidden">
                      {/* Background animation for skill items */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="skill-bg-glow absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/10 rounded-lg"></div>
                        <div className="skill-particles absolute top-2 right-2 w-2 h-2 bg-yellow-500/30 rounded-full animate-pulse"></div>
                        <div className="skill-particles absolute bottom-4 left-4 w-1 h-1 bg-yellow-400/40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <i className={`${skill.icon} text-xl md:text-2xl text-yellow-500 flex-shrink-0`}></i>
                            <span className="text-base md:text-lg font-semibold text-white truncate flex-1">{skill.name}</span>
                          </div>
                          <span className="text-sm md:text-base text-yellow-400 font-bold flex-shrink-0 ml-3">{skill.level}%</span>
                        </div>
                        <div className="skill-bar-container relative bg-gray-700 rounded-full h-2 md:h-3 overflow-hidden">
                          <div 
                            className="skill-bar bg-gradient-to-r from-yellow-500 to-yellow-400 h-full rounded-full origin-left relative"
                            style={{width: `${skill.level}%`}}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* View All / Show Less Button */}
                {skills.length > 8 && (
                  <div className="text-center mt-8 md:mt-12">
                    <button 
                      onClick={toggleSkillsView}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold px-6 md:px-8 py-3 md:py-4 rounded-full hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 flex items-center gap-2 md:gap-3 mx-auto"
                    >
                      <i className={`${showAllSkills ? 'ri-eye-off-line' : 'ri-eye-line'} text-lg md:text-xl`}></i>
                      <span className="text-sm md:text-lg">
                        {showAllSkills ? 'Show Less Skills' : `View All Skills (${skills.length})`}
                      </span>
                      <i className={`${showAllSkills ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} text-lg md:text-xl`}></i>
                    </button>
                  </div>
                )}
              </div>

              {/* Contact Section */}
              <div className="contact-section mt-32 text-center">
                <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 glow-text">CONTACT</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                  <a 
                    href="mailto:ankitrobinranjan@gmail.com" 
                    className="contact-item bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-yellow-500 transition-all duration-300 block cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20"
                  >
                    <i className="ri-mail-line text-4xl text-yellow-500 mb-4"></i>
                    <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                    <p className="text-gray-300">ankitrobinranjan@gmail.com</p>
                  </a>
                  <div className="contact-item bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-yellow-500 transition-all duration-300">
                    <i className="ri-phone-line text-4xl text-yellow-500 mb-4"></i>
                    <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
                    <p className="text-gray-300">+91 - 8603995362</p>
                  </div>
                  <a 
                    href="https://linkedin.com/in/ankitrj3" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-item bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-yellow-500 transition-all duration-300 block cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20"
                  >
                    <i className="ri-linkedin-line text-4xl text-yellow-500 mb-4"></i>
                    <h3 className="text-xl font-semibold text-white mb-2">LinkedIn</h3>
                    <p className="text-gray-300">linkedin.com/in/ankitrj3</p>
                  </a>
                  <a 
                    href="https://github.com/ankitrj3" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-item bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-yellow-500 transition-all duration-300 block cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20"
                  >
                    <i className="ri-github-line text-4xl text-yellow-500 mb-4"></i>
                    <h3 className="text-xl font-semibold text-white mb-2">GitHub</h3>
                    <p className="text-gray-300">github.com/ankitrj3</p>
                  </a>
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

                <button 
                  onClick={downloadResume}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 px-12 py-6 text-black text-2xl font-bold rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/30"
                >
                  <i className="ri-download-line mr-3"></i>
                  Download Resume
                </button>
              </div>

              {/* Footer Section */}
              <footer className="footer-section mt-20 pt-8 border-t border-gray-700">
                <div className="text-center">
                  <p className="text-gray-400 text-lg mb-4">
                    © 2025 All rights reserved to{" "}
                    <a 
                      href="https://github.com/ankitrj3" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-yellow-500 hover:text-yellow-400 transition-colors duration-300 font-semibold"
                    >
                      GitHub @ankitrj3
                    </a>
                  </p>
                  <div className="flex justify-center items-center gap-2 text-gray-500 text-sm">
                    <i className="ri-code-line text-yellow-500"></i>
                    <span>Built with React & GSAP</span>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
