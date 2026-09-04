/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4fa',
          100: '#dce5f3',
          200: '#b9cce6',
          300: '#8ba6d4',
          400: '#5a7cbf',
          500: '#3a5ba0',
          600: '#2c4684',
          700: '#243a6e',
          800: '#1c2e58',
          900: '#152445',
          950: '#0d1830',
        },
        gold: {
          50: '#fdf9ed',
          100: '#faf0cc',
          200: '#f4df99',
          300: '#eec866',
          400: '#e8b543',
          500: '#d99e2e',
          600: '#bc7e23',
          700: '#97601e',
          800: '#7c4d1f',
          900: '#683f1d',
        },
        slatey: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae2',
          300: '#b0bac8',
          400: '#8593a8',
          500: '#64748b',
          600: '#4e5867',
          700: '#3f4754',
          800: '#2d333d',
          900: '#1e232b',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', '"Noto Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif SC"', '"Noto Serif"', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-down': 'fadeDown 0.7s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.7s ease-out forwards',
        'slide-in-right': 'slideInRight 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
