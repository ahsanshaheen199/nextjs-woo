/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}','./src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif']
      },
      screens: {
        'xl': '1170px',
        '2xl': '1170px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
