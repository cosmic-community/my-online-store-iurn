/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef7ee',
          100: '#fdeed7',
          200: '#f9d9ae',
          300: '#f5bd7a',
          400: '#f09844',
          500: '#ec7d1f',
          600: '#dd6315',
          700: '#b74b13',
          800: '#923c18',
          900: '#763316'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      }
    }
  },
  plugins: []
}