import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        border: "hsl(var(--border))"
      },
      boxShadow: {
        glow: "0 0 44px rgba(72, 153, 255, 0.32)",
        silver: "0 18px 70px rgba(218, 231, 255, 0.12)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" }
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.18" },
          "50%": { opacity: "0.78" }
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        pulseLine: "pulseLine 3s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
