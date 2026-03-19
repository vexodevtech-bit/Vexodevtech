/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        foreground: "#f8fafc",
        primary: {
          DEFAULT: "#00f3ff",
          foreground: "#020617",
        },
        brand: {
          blue: "#00f3ff",
          purple: "#9d00ff",
          pink: "#ff0080",
          cyan: "#00ffff",
          dark: "#0a0a0f",
        },
        glass: {
          light: "rgba(255, 255, 255, 0.03)",
          dark: "rgba(0, 0, 0, 0.5)",
          border: "rgba(255, 255, 255, 0.1)",
        }
      },
      fontFamily: {
        brand: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.5, filter: 'brightness(1) blur(10px)' },
          '50%': { opacity: 1, filter: 'brightness(1.5) blur(15px)' },
        },
        scan: {
          '0%': { top: '-10%' },
          '100%': { top: '110%' },
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #00f3ff 0%, #9d00ff 100%)',
        'dark-mesh': 'radial-gradient(circle at 50% 50%, #1e1e2e 0%, #0a0a0f 100%)',
      }
    },
  },
  plugins: [],
}
