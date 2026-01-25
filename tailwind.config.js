/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffdf0',
          100: '#fef9d7',
          200: '#fcef9e',
          300: '#f9e066',
          400: '#f6d02e',
          500: '#d4b021',
          600: '#b3911c',
          700: '#917216',
          800: '#705311',
          900: '#4e3a0c',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(15, 23, 42, 0.7)',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(246, 208, 46, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(246, 208, 46, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}