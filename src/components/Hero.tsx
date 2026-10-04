import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

const HERO_ANGLES = [
  { id: 'front', label: 'PERSPECTIVE 01', title: 'FRONT 3/4', src: '/assets/hero-car.jpg' },
  { id: 'profile', label: 'PERSPECTIVE 02', title: 'AERO PROFILE', src: '/assets/profile-aero.jpg' },
  { id: 'rear', label: 'PERSPECTIVE 03', title: 'LIGHTBLADE', src: '/assets/rear-aero.jpg' },
];

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 800], [1, 0.94]);
  const heroOpacity = useTransform(scrollY, [0, 700], [1, 0.15]);
  const textTranslateY = useTransform(scrollY, [0, 600], [0, 80]);

  // Subtle mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      style={{ scale: heroScale, opacity: heroOpacity }}
      className="relative w-full h-[100svh] min-h-[680px] flex flex-col justify-between overflow-hidden bg-[#030304] select-none"
    >
      {/* ==============================================
          LAYER 0: CINEMATIC CAR VISUAL WITH PARALLAX & CURSOR HOVER
          ============================================== */}
      <div
        data-cursor="car"
        data-cursor-label="INSPECT"
        className="absolute inset-0 z-0 overflow-hidden cursor-none"
      >
        {/* Subtle Overhead Architectural Lighting Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[85vw] max-w-4xl h-80 rounded-full blur-[140px] bg-gradient-to-b from-white/15 to-transparent pointer-events-none"
        />

        {/* Dynamic Car Imagery with Smooth Fade & Slow Ken Burns Push-in */}
        {HERO_ANGLES.map((angle, idx) => (
          <motion.div
            key={angle.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeAngleIndex === idx ? 1 : 0,
              scale: activeAngleIndex === idx ? 1.03 : 1.0,
              x: mousePos.x * 12,
              y: mousePos.y * 8,
            }}
            transition={{
              opacity: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 14, ease: 'easeOut' },
              x: { duration: 1.2, ease: 'easeOut' },
              y: { duration: 1.2, ease: 'easeOut' },
            }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <img
              src={angle.src}
              alt={`Vanta VX-01 ${angle.title}`}
              className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.92]"
            />
          </motion.div>
        ))}

        {/* Atmospheric Vignette & Chiaroscuro Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-transparent to-[#030304]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030304]/40 to-[#030304]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-noise pointer-events-none" />
      </div>

      {/* ==============================================
          INITIAL CINEMATIC BLACKOUT CURTAIN
          ============================================== */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-50 bg-[#030304] pointer-events-none"
      />

      {/* ==============================================
          LAYER 1: TOP SECONDARY METADATA BAR
          ============================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-28 flex items-start justify-between pointer-events-none">
        {/* Subtle brand kicker */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col space-y-1 pointer-events-auto"
          data-cursor="interactive"
          data-cursor-label="SERIES"
        >
          <span className="text-[10px] md:text-[11px] font-mono tracking-[0.35em] text-white/90 uppercase font-medium">
            VANTA MOTORS
          </span>
          <span className="text-[9px] md:text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
            / PERFORMANCE DIVISION
          </span>
        </motion.div>

        {/* Fictional Spec Kicker & Angle Selector */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden sm:flex items-center space-x-3 pointer-events-auto"
        >
          {HERO_ANGLES.map((angle, idx) => (
            <button
              key={angle.id}
              onClick={() => setActiveAngleIndex(idx)}
              data-cursor="interactive"
              data-cursor-label={angle.title}
              className={`px-3 py-1 text-[9px] font-mono tracking-[0.2em] uppercase transition-all duration-300 rounded-sm border ${
                activeAngleIndex === idx
                  ? 'border-white text-white bg-white/10'
                  : 'border-white/10 text-zinc-500 hover:border-white/30 hover:text-zinc-300'
              }`}
            >
              0{idx + 1} // {angle.title}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ==============================================
          LAYER 2: CENTERPIECE CINEMATIC TYPOGRAPHY
          ============================================== */}
      <motion.div
        style={{ y: textTranslateY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-12 my-auto flex flex-col items-center text-center justify-center pointer-events-none"
      >
        {/* Line 1: BUILT TO BE */}
        <div className="w-full max-w-full overflow-hidden px-4 sm:px-8 py-2 -my-2 flex justify-center leading-tight">
          <motion.h1
            initial={{ opacity: 0, y: '100%', filter: 'blur(16px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 1.6,
              delay: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block px-2 text-[clamp(1.5rem,6.6vw,7rem)] font-display font-bold tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.16em] uppercase text-[#f5f7fa] drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)] select-none whitespace-nowrap will-change-transform"
          >
            BUILT TO BE
          </motion.h1>
        </div>

        {/* Line 2: REMEMBERED. */}
        <div className="w-full max-w-full overflow-hidden px-4 sm:px-8 py-2 -my-2 flex justify-center leading-tight mt-1 md:mt-2">
          <motion.h1
            initial={{ opacity: 0, y: '100%', filter: 'blur(16px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 1.8,
              delay: 1.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block px-3 text-[clamp(1.35rem,6.2vw,6.5rem)] font-display font-bold tracking-[0.07em] sm:tracking-[0.11em] md:tracking-[0.16em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] select-none whitespace-nowrap will-change-transform pb-1"
          >
            REMEMBERED.
          </motion.h1>
        </div>

        {/* Sub-headline & Concept Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-10 flex flex-col items-center space-y-2 pointer-events-auto"
        >
          <div className="flex items-center space-x-3 text-xs md:text-sm font-mono tracking-[0.35em] text-zinc-300 uppercase">
            <span>VANTA / VX-01</span>
            <span className="text-zinc-600">—</span>
            <span className="text-zinc-400">01 — 04 — 2026</span>
          </div>

          <button
            onClick={onExploreClick}
            data-cursor="cta"
            data-cursor-label="EXPLORE →"
            className="mt-4 group flex items-center space-x-2 text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-400 hover:text-white transition-colors duration-300 pt-2"
          >
            <span className="border-b border-zinc-600 group-hover:border-white pb-0.5 transition-colors">
              EXPLORE ARCHITECTURE
            </span>
            <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </motion.div>

      {/* ==============================================
          LAYER 3: BOTTOM CORNER METADATA
          ============================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-8 md:pb-10 flex items-end justify-between text-[10px] md:text-[11px] font-mono tracking-[0.25em] text-zinc-500 uppercase pointer-events-none">
        {/* Bottom Left */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-2.5 pointer-events-auto"
          data-cursor="interactive"
          data-cursor-label="SERIES"
        >
          <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span>
          <span>VX-01 / PERFORMANCE SERIES</span>
        </motion.div>

        {/* Subtle Center Concept Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 3.0 }}
          className="hidden lg:block text-[9px] tracking-[0.3em] text-zinc-600"
        >
          CONCEPT VEHICLE / FICTIONAL SPECIFICATION
        </motion.div>

        {/* Bottom Right: Scroll to explore */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto"
        >
          <button
            onClick={onExploreClick}
            data-cursor="cta"
            data-cursor-label="EXPLORE ↓"
            className="flex items-center space-x-2 hover:text-white transition-colors duration-300 group"
          >
            <span className="hidden sm:inline">SCROLL TO EXPLORE</span>
            <span className="sm:hidden">EXPLORE</span>
            <span className="inline-block group-hover:translate-y-0.5 transition-transform duration-300">
              ↓
            </span>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};
