import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Shield } from 'lucide-react';

interface AllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AllocationModal: React.FC<AllocationModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    region: 'North America / EU',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            data-cursor="interactive"
            data-cursor-label="DISMISS"
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#0a0a0d] border border-white/10 rounded-sm p-8 md:p-10 shadow-2xl z-10 overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              data-cursor="interactive"
              data-cursor-label="CLOSE"
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <>
                <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase">
                  <Shield size={12} className="text-zinc-400" />
                  <span>CONFIDENTIAL DOSSIER</span>
                </div>

                <h3 className="mt-3 text-xl md:text-2xl font-display font-bold uppercase tracking-[0.15em] text-white">
                  ALLOCATION INQUIRY
                </h3>
                <p className="mt-2 text-xs font-sans text-zinc-400 font-light leading-relaxed">
                  VANTA VX-01 is limited to 24 bespoke build slots globally. Submissions are reviewed directly by the executive design studio.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label className="block text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase mb-2">
                      LEGAL NAME
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Marcus Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      data-cursor="interactive"
                      data-cursor-label="ENTER NAME"
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-white/40 focus:outline-none px-4 py-3 text-xs font-sans text-white placeholder-zinc-600 rounded-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase mb-2">
                      CONFIDENTIAL EMAIL / CONCIERGE
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="contact@private-office.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      data-cursor="interactive"
                      data-cursor-label="ENTER EMAIL"
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-white/40 focus:outline-none px-4 py-3 text-xs font-sans text-white placeholder-zinc-600 rounded-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase mb-2">
                      COMMISSION REGION
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      data-cursor="interactive"
                      data-cursor-label="SELECT"
                      className="w-full bg-[#0a0a0d] border border-white/10 focus:border-white/40 focus:outline-none px-4 py-3 text-xs font-sans text-white rounded-sm transition-colors"
                    >
                      <option value="North America">North America (Monaco / NY Spec)</option>
                      <option value="Europe">Europe / United Kingdom</option>
                      <option value="Middle East">Middle East (Dubai / Riyadh)</option>
                      <option value="Asia Pacific">Asia Pacific (Tokyo / Singapore)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase mb-2">
                      BESPOKE REQUESTS (OPTIONAL)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify track-pack options or bespoke interior weave..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      data-cursor="interactive"
                      data-cursor-label="MESSAGE"
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-white/40 focus:outline-none px-4 py-2.5 text-xs font-sans text-white placeholder-zinc-600 rounded-sm resize-none transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      data-cursor="cta"
                      data-cursor-label="TRANSMIT →"
                      className="w-full bg-white hover:bg-zinc-200 text-black py-3.5 text-xs font-mono font-medium tracking-[0.25em] uppercase rounded-sm transition-all duration-300"
                    >
                      TRANSMIT DOSSIER REQUEST
                    </button>
                  </div>
                </form>

                <div className="mt-6 text-center text-[9px] font-mono text-zinc-600 tracking-widest uppercase">
                  CONCEPT DEMO // NO ACTUAL TRANSACTION PROCESSED
                </div>
              </>
            ) : (
              <div className="py-8 flex flex-col items-center text-center">
                <CheckCircle size={44} className="text-white mb-4 animate-bounce" />
                <h4 className="text-lg font-display font-bold uppercase tracking-[0.15em] text-white">
                  TRANSMISSION CONFIRMED
                </h4>
                <p className="mt-3 text-xs font-sans text-zinc-400 font-light leading-relaxed max-w-sm">
                  Your confidential allocation inquiry has been encrypted and recorded under reference token:
                </p>
                <div className="mt-4 px-4 py-2 bg-white/5 border border-white/10 text-white font-mono text-xs tracking-widest rounded">
                  VNTA-2026-VX01-{Math.floor(1000 + Math.random() * 9000)}
                </div>
                <button
                  onClick={handleReset}
                  data-cursor="interactive"
                  data-cursor-label="RETURN"
                  className="mt-8 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono tracking-[0.2em] uppercase rounded-sm transition-colors"
                >
                  RETURN TO SHOWCASE
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
