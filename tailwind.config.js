/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#000000',
    }),
    extend: {},
  },
  plugins: [],
}
