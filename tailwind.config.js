/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}','./src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'herr': ['Herr Von Muellerhoff', 'cursive']
      },
      screens: {
        'xl': '1170px',
        '2xl': '1170px'
      },
      colors: {
        'primary': '#ee4e23',
        'primary-hover': '#d2340a'
      },
      boxShadow: {
        'review': '0 0 20px 0 rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
