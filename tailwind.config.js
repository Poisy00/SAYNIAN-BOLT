/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#0A0A0A',
        gold: {
          400: '#FFD700',
          500: '#E6B422',
        },
        jade: {
          400: '#00C17C',
          500: '#00A86B',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        calligraphy: ['Ma Shan Zheng', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'ink-ripple': 'ink-ripple 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'ink-ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};