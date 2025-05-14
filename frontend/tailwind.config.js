/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#219ebc',
        secondary: '#8ecae6',
        dark: '#023047',
        highlight: '#ffb703',
        accent: '#fb8500',
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-pulse': 'scalePulse 1.5s infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'underline-slide': 'underlineSlide 0.3s ease-in-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scalePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(33, 158, 188, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(33, 158, 188, 0.6)' },
        },
        underlineSlide: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
};