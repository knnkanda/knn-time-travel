import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        knn: {
          primary: "#FF69B4",    // Hot Pink
          secondary: "#FFB6D9",  // Light Pink
          accent: "#E91E63",     // Deep Pink
          dark: "#333333",
          light: "#F5F5F5",
        },
      },
      fontSize: {
        "base": "16px",
        "lg": "18px",
        "xl": "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
    },
  },
  plugins: [],
};
export default config;
