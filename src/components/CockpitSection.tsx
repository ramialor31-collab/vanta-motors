import React from 'react';
import { motion } from 'framer-motion';
import { Disc, Activity, EyeOff } from 'lucide-react';

const COCKPIT_DETAILS = [
  {
    icon: Disc,
    title: 'HAPTIC SWITCHGEAR',
    detail: 'Milled from aerospace-grade solid aluminum billet with positive micro-detents.',
  },
  {
    icon: Activity,
    title: 'DYNAMIC TELEMETRY',
    detail: 'OLED cockpit display calibrated for rapid peripheral comprehension under lateral G-forces.',
  },
  {
    icon: EyeOff,
    title: 'ACOUSTIC ISOLATION CELL',
    detail: 'Multi-layer composite bulkheads isolate mechanical resonance while amplifying pure electric surge.',
  },
];

export const CockpitSection: React.FC = () => {
  return (
    <section
      id="cockpit"
      className="relative w-full py-28 md:py-40 bg-[#060608] border-t border-white/[0.06] overflow-hidden"
    >
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Tag */}
        <div className="flex items-center space-x-3 text-xs font-mono tracking-[0.35em] text-zinc-500 uppercase mb-4">
          <span className="w-2 h-0.5 bg-zinc-500"></span>
          <span>03 / DRIVER ARCHITECTURE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Cockpit Image */}
          <div className="lg:col-span-7">
            <div
              data-cursor="car"
              data-cursor-label="COCKPIT"
              className="relative rounded-sm overflow-hidden border border-white/[0.08] group bg-black"
            >
              <motion.img
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                src="/assets/cockpit.jpg"
                alt="VANTA VX-01 Cockpit and Steering Interface"
                className="w-full h-auto aspect-[16/9] object-cover filter contrast-[1.08] brightness-[0.92] group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex flex-col space-y-1">
                <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-400 uppercase">
                  MONOCOQUE INTROSPECTION
                </span>
                <span className="text-sm md:text-base font-display tracking-[0.15em] text-white uppercase font-bold">
                  TACTILE TELEMETRY YOKE
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-[0.14em] text-white leading-tight">
              AN EXTENSION<br />
              OF INTENT.
            </h2>

            <p className="mt-6 text-xs md:text-sm font-sans text-zinc-400 font-light leading-relaxed">
              Inside the VX-01, analog clarity meets aerospace computational precision. The driver is seated at the exact polar moment of inertia, anchored in structural carbon bucket seats tailored to biometric dimensions.
            </p>

            <div className="mt-10 space-y-6">
              {COCKPIT_DETAILS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    data-cursor="interactive"
                    data-cursor-label="ERGONOMICS"
                    className="p-5 rounded-sm bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-colors duration-300 flex items-start space-x-4"
                  >
                    <div className="p-2 rounded bg-white/[0.04] text-white mt-0.5">
                      <Icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-medium tracking-[0.2em] text-white uppercase">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-xs font-sans text-zinc-400 leading-relaxed font-light">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
