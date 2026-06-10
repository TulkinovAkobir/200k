import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#4361ff",
          600: "#1238FF",
          700: "#102fd6",
          800: "#1129a8",
          900: "#152a85",
        },
        violet: {
          500: "#7C3AED",
          600: "#6d28d9",
        },
        accent: {
          400: "#FF9233",
          500: "#FF7A00",
          600: "#ea6c00",
        },
        ink: "#111827",
        muted: "#6B7280",
        surface: "#FFFFFF",
        canvas: "#F7F8FC",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "28px",
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(17, 24, 39, 0.12)",
        card: "0 2px 16px -6px rgba(17, 24, 39, 0.10)",
        lift: "0 18px 40px -14px rgba(18, 56, 255, 0.28)",
        glow: "0 0 0 1px rgba(18,56,255,0.08), 0 12px 30px -10px rgba(124,58,237,0.3)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.5s ease both",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
        "scale-in": "scale-in 0.25s cubic-bezier(0.16,1,0.3,1) both",
        "slide-up": "slide-up 0.3s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
