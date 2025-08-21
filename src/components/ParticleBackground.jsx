import React, { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ParticleBackground = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create particles
    const particleCount = 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(245, 158, 11, 0.6);
        border-radius: 50%;
        pointer-events: none;
      `;
      
      // Random position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles
    particles.forEach((particle, index) => {
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random() * 0.8 + 0.2,
        scale: Math.random() * 1.5 + 0.5
      });

      gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: Math.random() * 10 + 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });

      gsap.to(particle, {
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    });

    // Cleanup function
    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ 
        background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.1) 0%, transparent 50%)',
        opacity: 0.6
      }}
    />
  );
};

export default ParticleBackground;
