import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MachineSpecs } from './components/MachineSpecs';
import { AeroDesign } from './components/AeroDesign';
import { CockpitSection } from './components/CockpitSection';
import { OpticsDetail } from './components/OpticsDetail';
import { Footer } from './components/Footer';
import { AllocationModal } from './components/AllocationModal';
import { CustomCursor } from './components/CustomCursor';

export const App: React.FC = () => {
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);

  const scrollToMachine = () => {
    const el = document.getElementById('machine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030304] text-[#f0f2f5] overflow-x-hidden selection:bg-white selection:text-black">
      {/* Precision Automotive Custom Cursor */}
      <CustomCursor />

      {/* Top Navbar */}
      <Navbar onOpenCommission={() => setIsCommissionOpen(true)} />

      {/* Main Experience */}
      <main>
        {/* Fullscreen Hero Centerpiece */}
        <Hero onExploreClick={scrollToMachine} />

        {/* Section 01: The Machine & Restrained Specs */}
        <MachineSpecs onInquire={() => setIsCommissionOpen(true)} />

        {/* Section 02: Monolith Silhouette & Aerodynamics */}
        <AeroDesign />

        {/* Section 03: The Monocoque & Cockpit Introspection */}
        <CockpitSection />

        {/* Section 04: Optic Architecture & Sapphire Laser Precision */}
        <OpticsDetail />
      </main>

      {/* Footer */}
      <Footer onOpenCommission={() => setIsCommissionOpen(true)} />

      {/* Private Allocation Modal */}
      <AllocationModal
        isOpen={isCommissionOpen}
        onClose={() => setIsCommissionOpen(false)}
      />
    </div>
  );
};

export default App;
