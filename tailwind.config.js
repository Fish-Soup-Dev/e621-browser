const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'white': '#bfbdbd',
      'good-green': '#46b94b',
      'bad-red': '#d62828',
      'ok-yellow': '#eac41c',
      'mid-orange': '#da6720',
      'sus-purple': '#af32af',
      gray: colors.gray,
    },
    extend: {},
  },
  plugins: [],
}
