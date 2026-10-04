import React from 'react';
import { motion } from 'framer-motion';

export const OpticsDetail: React.FC = () => {
  return (
    <section
      id="optics"
      className="relative w-full py-28 md:py-40 bg-[#030304] border-t border-white/[0.06] overflow-hidden"
    >
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-center space-x-3 text-xs font-mono tracking-[0.35em] text-zinc-500 uppercase mb-4">
          <span className="w-2 h-0.5 bg-zinc-500"></span>
          <span>04 / OPTIC ARCHITECTURE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Macro Headlight Image */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-[0.14em] text-white leading-tight">
              RAZOR PRECISION.<br />
              PIERCING MIDNIGHT.
            </h2>

            <p className="mt-6 text-xs md:text-sm font-sans text-zinc-400 font-light leading-relaxed">
              The front lighting elements are micro-machined sapphire crystals housing ultra-dense laser projectors. Operating at 6,500 Kelvin, the beam slices through midnight atmospheric fog up to 650 meters ahead while adaptive matrix masks shadow oncoming traffic with surgical accuracy.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div
                data-cursor="interactive"
                data-cursor-label="BEAM"
                className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.01]"
              >
                <div className="text-2xl font-display font-bold text-white tracking-wider">
                  650 M
                </div>
                <div className="mt-1 text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
                  BEAM THROW DISTANCE
                </div>
              </div>

              <div
                data-cursor="interactive"
                data-cursor-label="KELVIN"
                className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.01]"
              >
                <div className="text-2xl font-display font-bold text-white tracking-wider">
                  6,500 K
                </div>
                <div className="mt-1 text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
                  COLOR TEMPERATURE
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Macro Visual */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div
              data-cursor="car"
              data-cursor-label="MACRO"
              className="relative rounded-sm overflow-hidden border border-white/[0.08] group bg-black"
            >
              <motion.img
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                src="/assets/headlight-macro.jpg"
                alt="VANTA VX-01 Crystalline Optic Housing"
                className="w-full h-auto aspect-[16/9] object-cover filter contrast-[1.1] brightness-[0.95] group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-transparent to-transparent opacity-70" />

              <div className="absolute bottom-6 left-6 flex flex-col space-y-1">
                <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-400 uppercase">
                  SAPPHIRE CRYSTAL OPTIC
                </span>
                <span className="text-xs md:text-sm font-display tracking-[0.15em] text-white uppercase font-bold">
                  INTEGRATED LASER MATRIX
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
