/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '480px',
    },
    extend: {
      backgroundImage: {
        'main-bg': "url('src/assets/img/bg_main.jpg')",
      },
    },
  },
  plugins: [],
};
