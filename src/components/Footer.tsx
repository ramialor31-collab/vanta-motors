import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenCommission: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCommission }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#020203] border-t border-white/[0.08] text-zinc-400 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Col 1: Brand & Manifesto */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <div
                data-cursor="interactive"
                data-cursor-label="VANTA"
                className="flex items-center space-x-3 text-white tracking-[0.35em] uppercase text-sm font-display font-bold"
              >
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span>VANTA MOTORS</span>
              </div>
              <p className="mt-4 text-xs font-sans text-zinc-400 font-light leading-relaxed max-w-md">
                Architectural brutalism forged with aerodynamic extremity. VX-01 represents the theoretical limit of carbon monocoque design and electric propulsion.
              </p>
            </div>

            <div className="mt-8 flex items-center space-x-6 text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
              <span>DESIGNED FOR BRANDWEB REEL</span>
              <span>•</span>
              <span>PORTFOLIO CONCEPT</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col space-y-3 text-xs font-mono tracking-[0.25em] uppercase">
            <span className="text-[10px] text-zinc-600 mb-2">DIRECTORY</span>
            <a href="#hero" data-cursor="interactive" data-cursor-label="HERO" className="hover:text-white transition-colors">01 / HERO VIEW</a>
            <a href="#machine" data-cursor="interactive" data-cursor-label="SPECS" className="hover:text-white transition-colors">02 / ENGINEERING</a>
            <a href="#aerodynamics" data-cursor="interactive" data-cursor-label="AERO" className="hover:text-white transition-colors">03 / AERODYNAMICS</a>
            <a href="#cockpit" data-cursor="interactive" data-cursor-label="INTERIOR" className="hover:text-white transition-colors">04 / MONOCOQUE</a>
            <a href="#optics" data-cursor="interactive" data-cursor-label="OPTICS" className="hover:text-white transition-colors">05 / OPTICS</a>
          </div>

          {/* Col 3: Commission CTA */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-600 mb-2 block">
                ALLOCATIONS
              </span>
              <p className="text-xs font-sans text-zinc-400 mb-4 font-light">
                Private previews available by personal invitation only.
              </p>
              <button
                onClick={onOpenCommission}
                data-cursor="cta"
                data-cursor-label="INQUIRE →"
                className="w-full text-center py-2.5 px-4 bg-white/5 hover:bg-white text-zinc-300 hover:text-black border border-white/20 transition-all duration-300 text-xs font-mono tracking-[0.25em] uppercase rounded-sm"
              >
                REQUEST DOSSIER
              </button>
            </div>

            <button
              onClick={scrollToTop}
              data-cursor="interactive"
              data-cursor-label="TOP ↑"
              className="mt-8 flex items-center space-x-2 text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-colors group"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Legal Disclaimer & Concept Declaration */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between text-[10px] font-mono text-zinc-600 tracking-[0.2em] uppercase space-y-4 md:space-y-0">
          <div className="max-w-xl normal-case font-sans text-zinc-500 leading-relaxed text-[11px]">
            <span className="uppercase font-mono text-zinc-400 font-semibold tracking-wider">Concept Vehicle Disclaimer: </span>
            VANTA MOTORS and the VX-01 are fictional design concepts created exclusively for creative portfolio and web development demonstration. All specifications, telemetry figures, and materials are fictional.
          </div>

          <div className="flex items-center space-x-4">
            <span>© 2026 VANTA MOTORS CONCEPT</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
