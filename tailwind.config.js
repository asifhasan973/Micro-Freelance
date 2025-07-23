/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        'light-bg': '#F2FBFC',
        'light-surface': '#D9F2F2',
        'light-primary': '#00B8C6',
        'light-text': '#222831',
        'light-secondary': '#555555',
        
        // Dark mode colors
        'dark-bg': '#1F1F1F',
        'dark-surface': '#2E2E2E',
        'dark-primary': '#00ADB5',
        'dark-text': '#E0E0E0',
        'dark-secondary': '#A3A3A3',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          'primary': '#00B8C6',
          'secondary': '#555555',
          'accent': '#00B8C6',
          'neutral': '#222831',
          'base-100': '#F2FBFC',
          'base-200': '#D9F2F2',
          'base-300': '#C1E8E8',
          'info': '#00B8C6',
          'success': '#10B981',
          'warning': '#F59E0B',
          'error': '#EF4444',
        },
        dark: {
          'primary': '#00ADB5',
          'secondary': '#A3A3A3',
          'accent': '#00ADB5',
          'neutral': '#E0E0E0',
          'base-100': '#1F1F1F',
          'base-200': '#2E2E2E',
          'base-300': '#3A3A3A',
          'info': '#00ADB5',
          'success': '#10B981',
          'warning': '#F59E0B',
          'error': '#EF4444',
        },
      },
    ],
  },
};