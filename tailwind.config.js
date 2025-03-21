/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'gaga': '#FFCA22', // Replace with your desired hex code
        'gaga1': '#FFE292', // Replace with your desired hex code
        'gaga2': '#FF008C', // Replace with your desired hex code
        'gaga3': '#F2BBD7', // Replace with your desired hex code
      },
      fontFamily: {
        fira: ['"Fira Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};