import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface NavbarProps {
  onOpenCommission: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommission }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const active = audioEngine.toggle();
    setIsAudioOn(active);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'py-4 bg-[#030304]/80 backdrop-blur-md border-b border-white/[0.06]'
            : 'py-6 md:py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#"
            data-cursor="interactive"
            data-cursor-label="VANTA"
            className="group flex items-center space-x-3 text-white tracking-widestExtra uppercase text-xs md:text-sm font-display font-bold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform duration-300"></span>
            <span className="tracking-[0.3em]">VANTA</span>
            <span className="text-[10px] font-mono text-zinc-500 font-normal">/ VX-01</span>
          </a>

          {/* Minimal Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">
            <button
              onClick={() => scrollTo('hero')}
              data-cursor="interactive"
              data-cursor-label="HERO"
              className="hover:text-white transition-colors duration-300 text-left"
            >
              VX-01
            </button>
            <button
              onClick={() => scrollTo('machine')}
              data-cursor="interactive"
              data-cursor-label="SPECS"
              className="hover:text-white transition-colors duration-300 text-left"
            >
              ENGINEERING
            </button>
            <button
              onClick={() => scrollTo('aerodynamics')}
              data-cursor="interactive"
              data-cursor-label="AERO"
              className="hover:text-white transition-colors duration-300 text-left"
            >
              DESIGN
            </button>
            <button
              onClick={() => scrollTo('cockpit')}
              data-cursor="interactive"
              data-cursor-label="INTERIOR"
              className="hover:text-white transition-colors duration-300 text-left"
            >
              COCKPIT
            </button>
            <button
              onClick={onOpenCommission}
              data-cursor="cta"
              data-cursor-label="INQUIRE →"
              className="text-white border border-white/20 px-3.5 py-1.5 hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
            >
              INQUIRE
            </button>
          </nav>

          {/* Right Controls: Ambient Audio + Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAudioToggle}
              data-cursor="interactive"
              data-cursor-label={isAudioOn ? 'MUTE' : 'AUDIO'}
              className="group flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-all duration-300"
              title="Toggle cinematic ambient audio"
            >
              {isAudioOn ? (
                <>
                  <Volume2 size={12} className="text-white animate-pulse" />
                  <span className="hidden sm:inline">SOUND: ON</span>
                  <span className="flex space-x-0.5 items-end h-2.5">
                    <span className="w-0.5 bg-white animate-[pulse_0.8s_ease-in-out_infinite] h-2"></span>
                    <span className="w-0.5 bg-white animate-[pulse_1.2s_ease-in-out_infinite] h-3"></span>
                    <span className="w-0.5 bg-white animate-[pulse_0.6s_ease-in-out_infinite] h-1.5"></span>
                  </span>
                </>
              ) : (
                <>
                  <VolumeX size={12} className="text-zinc-500" />
                  <span className="hidden sm:inline">SOUND: OFF</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#030304]/95 backdrop-blur-xl flex flex-col justify-center px-8 md:hidden">
          <div className="flex flex-col space-y-8 text-sm font-display tracking-[0.3em] uppercase">
            <button
              onClick={() => scrollTo('hero')}
              className="text-left text-zinc-300 hover:text-white border-b border-white/10 pb-3"
            >
              01 // VX-01 HERO
            </button>
            <button
              onClick={() => scrollTo('machine')}
              className="text-left text-zinc-300 hover:text-white border-b border-white/10 pb-3"
            >
              02 // ENGINEERING
            </button>
            <button
              onClick={() => scrollTo('aerodynamics')}
              className="text-left text-zinc-300 hover:text-white border-b border-white/10 pb-3"
            >
              03 // DESIGN & AERO
            </button>
            <button
              onClick={() => scrollTo('cockpit')}
              className="text-left text-zinc-300 hover:text-white border-b border-white/10 pb-3"
            >
              04 // COCKPIT
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommission();
              }}
              className="text-left text-white bg-white/10 px-4 py-3 rounded border border-white/20"
            >
              05 // PRIVATE ALLOCATION
            </button>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 text-[10px] font-mono text-zinc-500 flex justify-between">
            <span>VANTA PERFORMANCE DIV.</span>
            <span>CONCEPT 2026</span>
          </div>
        </div>
      )}
    </>
  );
};
