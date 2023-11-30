/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        main_bg: '#2d2c2c',
        accent: '#ebe8e8',
        accent_yellow: '#e8e808',
      },
    },
  },
  plugins: [],
};
