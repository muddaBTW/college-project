/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        safeLight: "#0F3F46",
        safeBlue: "#28D4C5",
        safeTeal: "#14B8A6",
        safeDarkTeal: "#0B7285",
        safeNavy: "#F7FFFF",
      },
      boxShadow: {
        glow: "0 0 42px rgba(20, 184, 166, 0.24)",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      keyframes: {
        pulseRing: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        },
      },
      animation: {
        pulseRing: "pulseRing 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

