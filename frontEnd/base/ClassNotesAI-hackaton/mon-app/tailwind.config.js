/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        dela: ['"Dela Gothic One"', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
        quicksand: ['"Quicksand"', 'sans-serif'],
      },
      screens:{
        'watch': {'max': '400px'}, // pour Apple Watch et très petits écrans
      }
    },
  },
  plugins: [],
}

