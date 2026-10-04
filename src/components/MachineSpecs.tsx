import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Zap, Wind, ArrowRight } from 'lucide-react';

interface MachineSpecsProps {
  onInquire: () => void;
}

const SPECS = [
  {
    number: '01',
    value: '680',
    unit: 'HP',
    label: 'PEAK OUTPUT',
    desc: 'Dual-axial flux electric powertrain with instant vectoring torque across both axles.',
    icon: Zap,
  },
  {
    number: '02',
    value: '2.9',
    unit: 'SEC',
    subvalue: '0—100 KM/H',
    label: 'ACCELERATION',
    desc: 'Sub-3 second sprint achieved through active downforce deployment and launch calibration.',
    icon: Gauge,
  },
  {
    number: '03',
    value: '320',
    unit: 'KM/H',
    subvalue: 'TOP SPEED',
    label: 'TERMINAL VELOCITY',
    desc: 'Electronically regulated terminal speed with zero aerodynamic lift at peak velocity.',
    icon: Wind,
  },
];

export const MachineSpecs: React.FC<MachineSpecsProps> = ({ onInquire }) => {
  return (
    <section
      id="machine"
      className="relative w-full py-28 md:py-40 bg-[#070709] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Subtle Gradient & Light Slice */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-10">
          <div>
            <div className="flex items-center space-x-3 text-xs font-mono tracking-[0.35em] text-zinc-500 uppercase mb-4">
              <span className="w-2 h-0.5 bg-zinc-500"></span>
              <span>01 / THE MACHINE</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold uppercase tracking-[0.14em] text-white leading-tight">
              ENGINEERED<br />
              WITHOUT<br />
              COMPROMISE.
            </h2>
          </div>

          <div className="mt-8 md:mt-0 max-w-sm">
            <p className="text-zinc-400 text-xs md:text-sm font-sans font-light leading-relaxed">
              Forged around a high-modulus carbon-fiber tub. Every surface of the VX-01 balances ruthless thermodynamic efficiency with sculptural purity.
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
                <span className="text-white/40">CALIBRATION</span>
                <span>•</span>
                <span>TRACK & CIRCUIT FOCUS</span>
              </div>
              <button
                onClick={onInquire}
                data-cursor="cta"
                data-cursor-label="DOSSIER →"
                className="group flex items-center space-x-1.5 text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors"
              >
                <span>DOSSIER</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Imagery Showcase: Rear Lightblade & Aerodynamic Diffuser */}
        <div
          data-cursor="car"
          data-cursor-label="DIFFUSER"
          className="mt-16 relative rounded-sm overflow-hidden border border-white/[0.08] group"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-black">
            <motion.img
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              src="/assets/rear-aero.jpg"
              alt="VANTA VX-01 Rear Diffuser and Lightblade"
              className="w-full h-full object-cover object-center filter contrast-[1.1] brightness-[0.95] group-hover:scale-105 transition-transform duration-1000"
            />
            {/* Chiaroscuro Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/80 via-transparent to-[#070709]/80" />

            {/* In-Image Architectural Badge */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col space-y-1">
              <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-400 uppercase">
                AERO ARCHITECTURE
              </span>
              <span className="text-sm md:text-lg font-display tracking-[0.15em] text-white uppercase font-bold">
                LIGHTBLADE & DUAL DIFFUSER
              </span>
            </div>

            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 hidden sm:flex items-center space-x-2 text-[10px] font-mono tracking-[0.2em] text-zinc-500">
              <span>DRAG COEFFICIENT // 0.24 Cd</span>
            </div>
          </div>
        </div>

        {/* 3 Restrained Technical Specs */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {SPECS.map((spec) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={spec.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 * Number(spec.number), ease: [0.16, 1, 0.3, 1] }}
                data-cursor="interactive"
                data-cursor-label="TELEMETRY"
                className="relative p-8 rounded-sm bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Header of card */}
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                  <span className="text-xs font-mono tracking-[0.25em] text-zinc-500">
                    {spec.number} // {spec.label}
                  </span>
                  <Icon size={14} className="text-zinc-600" />
                </div>

                {/* Big Metric Display */}
                <div className="py-8">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-5xl sm:text-6xl font-display font-bold tracking-[0.08em] text-white">
                      {spec.value}
                    </span>
                    <span className="text-xl sm:text-2xl font-display font-medium text-zinc-400 tracking-wider">
                      {spec.unit}
                    </span>
                  </div>
                  {spec.subvalue && (
                    <div className="mt-1 text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase">
                      {spec.subvalue}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs font-sans text-zinc-400 leading-relaxed pt-4 border-t border-white/[0.04]">
                  {spec.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Concept Vehicle Disclaimer */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span>
            <span>CONCEPT VEHICLE / FICTIONAL SPECIFICATION</span>
          </div>

          <div className="mt-3 sm:mt-0 flex items-center space-x-6 text-zinc-500">
            <span>CHASSIS: CARBON COMPOSITE</span>
            <span>KERB WEIGHT: 1,380 KG</span>
          </div>
        </div>
      </div>
    </section>
  );
};
