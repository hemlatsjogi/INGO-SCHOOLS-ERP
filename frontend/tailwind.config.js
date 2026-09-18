/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A1128',
          'navy-dark': '#060B1C',
          'navy-light': '#16234B',
          royal: '#1E40AF',
          blue: '#2563EB',
          'blue-light': '#3B82F6',
          sky: '#60A5FA',
          purple: '#7C3AED',
          violet: '#8B5CF6',
          indigo: '#4F46E5',
          teal: '#0D9488',
          cyan: '#06B6D4',
          pink: '#EC4899',
          yellow: '#F59E0B',
          amber: '#D97706',
          emerald: '#10B981',
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(59, 130, 246, 0.25)',
        'glow-purple': '0 0 40px -10px rgba(124, 58, 237, 0.25)',
        'subtle': '0 4px 24px -2px rgba(15, 23, 42, 0.06)',
        'card': '0 10px 30px -5px rgba(15, 23, 42, 0.07)',
        'card-hover': '0 20px 40px -8px rgba(15, 23, 42, 0.12)',
        'float': '0 25px 50px -12px rgba(15, 23, 42, 0.18)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob': 'blob 10s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.08)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
