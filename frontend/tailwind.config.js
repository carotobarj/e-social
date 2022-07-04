/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors:{
        'gris':'#E5E7EB'
      }
    },
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
