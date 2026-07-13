/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        phoenix: {
          50: '#fff8ed',
          100: '#ffefd4',
          400: '#ff9c3b',
          500: '#f77b16',
          600: '#db5c0b'
        }
      },
      boxShadow: {
        glass: '0 24px 80px rgba(0,0,0,.28)'
      }
    },
  },
  plugins: [],
}
