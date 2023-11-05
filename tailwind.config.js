/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'main-bg': "url('src/assets/img/universe_bg.jpg')",
      },
      colors: {
        'accent_100': '#f4f493',
        'accent_80': '#f4f493cc',
        'accent_40': '#f4f49366',
        'blue_100': '#2F72A9',
        'blue_40': '#2F72A966',
        'blue_20': '#2F72A933',
        'blue_10': '#2f72a91a',
        'purple_100': '#5B5B9B',
        'purple_80': '#5B5B9Baa',
        'purple_60': '#5b5b9a99',
        'purple_40': '#5b5b9a66',
        'purple_20': '#5b5b9a33',
        'pink_100': '#B38EB9',
        'main_bg': '#e8e6e6',
      },
    },
  },
  plugins: [],
};
