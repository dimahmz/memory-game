/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({addUtilities}){
      addUtilities({
      '.backface-visible': {
        'backface-visibility': 'visible',
      },
      '.backface-hidden': {
        'backface-visibility': 'hidden',
      },
      '.transform-3d': {
        'transform-style':'preserve-3d',
      }  
    })
  })
  ],
}
