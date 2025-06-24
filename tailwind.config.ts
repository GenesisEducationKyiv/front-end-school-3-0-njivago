import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#3A5BFF",
        muted: "#F8F9FD",
        text: "#1C1E21",
        subtext: "#6B7280",
        tag: {
          blue: "#3A5BFF",
          yellow: "#FACC15",
          purple: "#6366F1",
          cyan: "#22D3EE",
          teal: "#2DD4BF",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        card: "0 2px 6px rgba(0,0,0,0.06)",
        modal: "0 12px 24px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
