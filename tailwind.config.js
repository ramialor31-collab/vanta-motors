/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vanta: {
          pitch: "#030304",
          black: "#070708",
          dark: "#0d0d0f",
          surface: "#121215",
          muted: "#222226",
          border: "rgba(255, 255, 255, 0.08)",
          borderGlow: "rgba(255, 255, 255, 0.2)",
          silver: "#9ba1a6",
          silverLight: "#cfd3d6",
          white: "#f0f2f5",
        }
      },
      fontFamily: {
        display: ['Syncopate', 'Space Grotesk', 'sans-serif'],
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        widestExtra: '0.35em',
        epic: '0.5em',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'beam-sweep': 'beamSweep 8s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
        beamSweep: {
          '0%, 100%': { transform: 'translateX(-5%) scaleX(1)' },
          '50%': { transform: 'translateX(5%) scaleX(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
