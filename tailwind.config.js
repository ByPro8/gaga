/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["MyCustomFont", "sans-serif"],
        fira: ['"Fira Sans"', "sans-serif"],
      },
      colors: {
        gaga: "#FFCA22",
        gaga1: "#FFE292",
        gaga2: "#FF008C",
        gaga3: "#F2BBD7",
        gaga4: "#FFd97f",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        md2: "820px",
        lg: "1024px",
        lg2: "1280px",
        xl: "1440px",
        xl_1500: "1500px",
        xl2: "1920px",
      },
      textShadow: {
        sm: "1px 1px 1px rgba(121, 121, 121, 0.5)",
        smgaga1: "-3px -0.5px 2px rgb(236, 217, 164) ",
        DEFAULT: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.9)",
      },
      boxShadow: {
        custom: "20px 20px 20px rgba(0, 0, 0, 0.5)",
        gaga1: "10px 10px 15px #FFE292",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-textshadow"), // Add this plugin
  ],
};
