/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'gaga': '#FFCA22',
        'gaga1': '#FFE292',
        'gaga2': '#FF008C',
        'gaga3': '#F2BBD7',
      },
      fontFamily: {
        fira: ['"Fira Sans"', 'sans-serif'],
      },
      'xs': '480px',   // Extra small devices
      'sm': '640px',   // Small devices
      'md': '768px',   // Medium devices (tablets)
      'lg': '1024px',  // Large devices (laptops)
      'xl': '1440px',  // Extra large devices (desktops)
      '2xl': '1920px', // Bigger screens
    },
  },
  plugins: [],
};