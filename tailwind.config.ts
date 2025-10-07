import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#64d9c1",
        "dim-primary": "#64d9c121",
        secondary: "#9456b7",
        "dim-secondary": "#c288e4",
        "light-secondary": "#e8d5f0",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        "gradient-secondary":
          "radial-gradient(ellipse at top right, #e8d5f0 0%, #c288e4 30%, transparent 60%), radial-gradient(ellipse at bottom left, #e8d5f0 0%, #c288e4 10%, transparent 60%), radial-gradient(ellipse at bottom right, #e8d5f0 0%, #c288e4 20%, transparent 60%), radial-gradient(ellipse at top left, #e8d5f0 0%, #c288e4 20%, transparent 60%), linear-gradient(to bottom, #9456b7, #9456b7)",
      },
      screens: {
        xxs: "320px", // iPhone SE / small phones
        xs: "400px", // iPhone X / Galaxy S10e
        sm: "480px", // general small phones
        md: "640px", // large phones / small tablets
        lg: "768px", // tablets / landscape phones
        xl: "1024px", // small laptops
        "2xl": "1280px", // desktops
        "3xl": "1536px", // large monitors
      },
    },
  },
  plugins: [],
};
export default config;
