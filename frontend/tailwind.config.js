/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
     extend: {
      colors: {
        primary: '#0ABAB5',
        accent: '#56DFCF',
        bgLight: '#ADEED9',
        bgBase: '#FFEDF3',      
      },
    },
  },
  plugins: [],
}

