/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      maxWidth: {
        '600': '800px',
      }
    },
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
      } , 
      '.rotateY180': {
        'transform':'rotateY(180deg)',
      }  
    })
  })
  ],
}
