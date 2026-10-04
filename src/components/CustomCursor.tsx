import React, { useEffect, useRef, useState } from 'react';

interface CursorState {
  type: 'default' | 'interactive' | 'car' | 'cta' | 'drag';
  label: string;
}

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>({ type: 'default', label: '' });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);

  // Position references for 60fps rAF loop without React re-render lag
  const mousePos = useRef({ x: -100, y: -100 });
  const corePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const ghostPos = useRef({ x: -100, y: -100 });

  // DOM node references
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  // Velocity tracking for subtle dynamic stretch
  const prevMousePos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0, speed: 0 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!mediaQuery.matches) {
      return; // Mobile / touch device
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Inspect target element for cursor states
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      const interactiveTarget = target.closest('a, button, input, select, textarea, [role="button"]') as HTMLElement | null;

      if (cursorTarget) {
        const customType = cursorTarget.getAttribute('data-cursor') || 'interactive';
        const customLabel = cursorTarget.getAttribute('data-cursor-label') || '';

        if (customType === 'car') {
          setCursorState({ type: 'car', label: customLabel || 'INSPECT' });
        } else if (customType === 'cta' || customType === 'explore') {
          setCursorState({ type: 'cta', label: customLabel || 'EXPLORE →' });
        } else {
          setCursorState({ type: 'interactive', label: customLabel });
        }
      } else if (interactiveTarget) {
        // Standard interactive link/button
        const text = interactiveTarget.getAttribute('data-cursor-label') || '';
        setCursorState({ type: 'interactive', label: text });
      } else {
        setCursorState({ type: 'default', label: '' });
      }
    };

    const onMouseDown = () => {
      setIsClicking(true);
      setRippleActive(true);
      setTimeout(() => setRippleActive(false), 450);
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // High performance rAF interpolation loop
    let animId: number;

    const render = () => {
      const { x: targetX, y: targetY } = mousePos.current;

      // Compute velocity
      const vx = targetX - prevMousePos.current.x;
      const vy = targetY - prevMousePos.current.y;
      prevMousePos.current.x = targetX;
      prevMousePos.current.y = targetY;
      const currentSpeed = Math.sqrt(vx * vx + vy * vy);
      velocity.current = { x: vx, y: vy, speed: currentSpeed };

      const isReduced = prefersReducedMotion.matches;
      const coreLerp = isReduced ? 1 : 0.45;
      const ringLerp = isReduced ? 1 : 0.14;
      const ghostLerp = isReduced ? 1 : 0.07;

      // Interpolate positions
      corePos.current.x += (targetX - corePos.current.x) * coreLerp;
      corePos.current.y += (targetY - corePos.current.y) * coreLerp;

      ringPos.current.x += (targetX - ringPos.current.x) * ringLerp;
      ringPos.current.y += (targetY - ringPos.current.y) * ringLerp;

      ghostPos.current.x += (targetX - ghostPos.current.x) * ghostLerp;
      ghostPos.current.y += (targetY - ghostPos.current.y) * ghostLerp;

      // Dynamic stretch based on velocity angle
      const angle = Math.atan2(vy, vx);
      const stretch = Math.min(currentSpeed * 0.003, 0.22);

      // Update Core Dot
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${corePos.current.x}px, ${corePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Update Ring
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${1 + stretch}, ${1 - stretch * 0.5})`;
      }

      // Update Ghost Ring
      if (ghostRef.current) {
        ghostRef.current.style.transform = `translate3d(${ghostPos.current.x}px, ${ghostPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Update Label
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Update Click Ripple
      if (rippleRef.current) {
        rippleRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!enabled) return null;

  // Determine dimensional styles based on state (scaled down 40–50%)
  const isCta = cursorState.type === 'cta';
  const isCar = cursorState.type === 'car';
  const isInteractive = cursorState.type === 'interactive' || isCta || isCar;

  let ringSize = 'w-5 h-5'; // 20px (down from 36px, ~45% smaller)
  let ringBorder = 'border-white/35';
  let ringBg = 'bg-transparent';

  if (isCta) {
    ringSize = 'w-[50px] h-[50px]'; // 50px (down from 84px, ~40% smaller)
    ringBorder = 'border-white/80';
    ringBg = 'bg-black/50 backdrop-blur-[2px]';
  } else if (isCar) {
    ringSize = 'w-[42px] h-[42px]'; // 42px (down from 72px, ~42% smaller)
    ringBorder = 'border-white/60';
    ringBg = 'bg-white/[0.03] backdrop-blur-[1px]';
  } else if (isInteractive) {
    ringSize = 'w-8 h-8'; // 32px (down from 56px, ~43% smaller)
    ringBorder = 'border-white/70';
    ringBg = 'bg-white/[0.04]';
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Subtle Trailing Ghost / Afterimage Ring (scaled down 50%) */}
      <div
        ref={ghostRef}
        className="fixed top-0 left-0 w-4 h-4 -ml-2 -mt-2 rounded-full border border-white/[0.08] pointer-events-none transition-opacity duration-500 will-change-transform"
      />

      {/* 2. Main Outer Architectural Ring with Precision Crosshair Ticks */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border ${ringBorder} ${ringBg} pointer-events-none flex items-center justify-center transition-all duration-300 ease-out will-change-transform ${ringSize} ${
          isClicking ? 'scale-[0.82] border-white' : 'scale-100'
        }`}
        style={{
          boxShadow: isCar || isCta ? '0 0 16px rgba(255, 255, 255, 0.12)' : 'none',
        }}
      >
        {/* Subtle Architectural Reticle Marks at 0, 90, 180, 270 degrees (scaled down) */}
        <span
          className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-1 bg-white/60 transition-opacity duration-300 ${
            isInteractive ? 'opacity-90' : 'opacity-30'
          }`}
        />
        <span
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[1px] h-1 bg-white/60 transition-opacity duration-300 ${
            isInteractive ? 'opacity-90' : 'opacity-30'
          }`}
        />
        <span
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-[1px] w-1 bg-white/60 transition-opacity duration-300 ${
            isInteractive ? 'opacity-90' : 'opacity-30'
          }`}
        />
        <span
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-[1px] w-1 bg-white/60 transition-opacity duration-300 ${
            isInteractive ? 'opacity-90' : 'opacity-30'
          }`}
        />
      </div>

      {/* 3. Central Core Point Dot (scaled down slightly for razor precision) */}
      <div
        ref={coreRef}
        className={`fixed top-0 left-0 rounded-full bg-white pointer-events-none transition-all duration-200 will-change-transform shadow-[0_0_6px_rgba(255,255,255,0.9)] ${
          isCta
            ? 'w-0.5 h-0.5 opacity-20'
            : isClicking
            ? 'w-1.5 h-1.5 scale-110'
            : 'w-1 h-1 opacity-95'
        }`}
      />

      {/* 4. Sleek Monospace Label (when hovering CTA or Car) */}
      {cursorState.label && (
        <div
          ref={labelRef}
          className="fixed top-0 left-0 pointer-events-none flex items-center justify-center will-change-transform animate-fadeIn"
        >
          <span className="text-[7.5px] font-mono tracking-[0.2em] text-white uppercase font-medium select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {cursorState.label}
          </span>
        </div>
      )}

      {/* 5. Click Shockwave / Compression Ripple */}
      {rippleActive && (
        <div
          ref={rippleRef}
          className="fixed top-0 left-0 rounded-full border border-white/60 pointer-events-none animate-cursorRipple will-change-transform"
        />
      )}
    </div>
  );
};
