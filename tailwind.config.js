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
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
