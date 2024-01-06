/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#2F5296",
      secondary: "#ffad2b",
      white: "#FFFFFF",
      black: "#000000",
      grey: "#D9D9D9",
      red: "#FF0000",
      purple: "#800080",
      green: "#008000",
    },
    extend: {
      fontFamily: {
        open: ["Open Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        xs: "480px",
      },
    },
    listStyleType: {
      none: "none",
      decimal: "decimal",
      disc: "disc",
      square: "square",
      roman: "upper-roman",
      "upper-latin": "upper-latin",
      "lower-latin": "lower-latin",
    },
  },
  variants: {
    display: ["responsive", "group-hover", "group-focus"],
  },
  plugins: [],
};
