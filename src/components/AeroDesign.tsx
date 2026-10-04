import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HIGHLIGHTS = [
  {
    id: 'aero',
    title: 'AERODYNAMIC PROFILE',
    metric: '0.24 Cd',
    desc: 'The silhouette guides high-speed airflow through underfloor venturi tunnels, eliminating the need for oversized drag-inducing rear spoilers.',
  },
  {
    id: 'skin',
    title: 'OBSIDIAN CARBON SKIN',
    metric: '99.4% LIGHT ABSORPTION',
    desc: 'Bespoke dry-weave matte carbon body panels treated with microscopic anti-reflective polymers that swallow harsh reflections.',
  },
  {
    id: 'ground',
    title: 'RIDE VELOCITY CALIBRATION',
    metric: '85 MM TRACK CLEARANCE',
    desc: 'Active magneto-rheological dampers that adapt at 1,000 Hertz, lowering the stance dynamically as velocity increases.',
  },
];

export const AeroDesign: React.FC = () => {
  const [selectedHighlight, setSelectedHighlight] = useState(0);

  return (
    <section
      id="aerodynamics"
      className="relative w-full py-28 md:py-40 bg-[#040405] border-t border-white/[0.06] overflow-hidden"
    >
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Tag */}
        <div className="flex items-center space-x-3 text-xs font-mono tracking-[0.35em] text-zinc-500 uppercase mb-4">
          <span className="w-2 h-0.5 bg-zinc-500"></span>
          <span>02 / MONOLITH SILHOUETTE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold uppercase tracking-[0.14em] text-white leading-tight">
              SCULPTED BY VELOCITY.<br />
              DEFINED BY SILENCE.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-xs md:text-sm font-sans text-zinc-400 font-light leading-relaxed">
              Every millimeter of the VX-01 contour is dictated by computational fluid dynamics. No decorative vents. No superfluous contours.
            </p>
          </div>
        </div>

        {/* Side Profile Main Showcase */}
        <div
          data-cursor="car"
          data-cursor-label="PROFILE"
          className="relative rounded-sm overflow-hidden border border-white/[0.08] bg-[#020202] group"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <motion.img
              initial={{ scale: 1.04, opacity: 0.8 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              src="/assets/profile-aero.jpg"
              alt="VANTA VX-01 Aerodynamic Profile"
              className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.96] group-hover:scale-[1.02] transition-transform duration-1000"
            />
            {/* Edge Shadow Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040405] via-transparent to-transparent opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040405]/80 via-transparent to-[#040405]/80" />

            {/* Interactive Callout Markers */}
            <div className="absolute top-1/4 left-1/4 hidden md:flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-white -ml-3"></span>
              <span className="text-[9px] font-mono tracking-[0.2em] bg-black/80 px-2 py-0.5 border border-white/20 text-zinc-300">
                ACTIVE S-DUCT INTAKE
              </span>
            </div>

            <div className="absolute bottom-1/3 right-1/4 hidden md:flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-white -ml-3"></span>
              <span className="text-[9px] font-mono tracking-[0.2em] bg-black/80 px-2 py-0.5 border border-white/20 text-zinc-300">
                VENTURI EXIT CHANNEL
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Feature Pills */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((h, idx) => (
            <button
              key={h.id}
              onClick={() => setSelectedHighlight(idx)}
              data-cursor="interactive"
              data-cursor-label={`ATTRIB 0${idx + 1}`}
              className={`p-6 text-left rounded-sm border transition-all duration-300 flex flex-col justify-between ${
                selectedHighlight === idx
                  ? 'bg-white/[0.04] border-white/30 text-white'
                  : 'bg-white/[0.01] border-white/[0.06] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase">
                    ATTRIBUTE 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono tracking-wider font-semibold text-white">
                    {h.metric}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-display font-bold uppercase tracking-[0.15em] text-white">
                  {h.title}
                </h3>
              </div>
              <p className="mt-3 text-xs font-sans text-zinc-400 leading-relaxed font-light">
                {h.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
