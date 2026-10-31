/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { ivory:'#f4f3ed', pine:'#17372e', deep:'#10251f', lime:'#d3f079', sun:'#f0ca6b', ink:'#242923' },
      fontFamily: { sans:['Manrope','sans-serif'], editorial:['Playfair Display','Georgia','serif'] }
    }
  },
  plugins: []
}
