/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#14150F",
          soft: "#1C1E15",
        },
        paper: {
          DEFAULT: "#F3F4EC",
          dim: "#EAEBDF",
          line: "#DEDDCC",
        },
        kandle: {
          green: "#39B54A",
          "green-deep": "#1F6B31",
          "green-tint": "#E4F3E6",
        },
        stone: "#6E6D60",
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
        serif: ["Lora", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      transitionTimingFunction: {
        kandle: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
