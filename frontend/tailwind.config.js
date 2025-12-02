/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Calming, therapeutic color palette
        'cyber-blue': {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a5b9fc',
          400: '#8bb1ff',
          500: '#7c9ef7',
          600: '#6b7fe6',
          700: '#5a63c9',
          800: '#4a52a3',
          900: '#3a4282',
        },
        'neon-purple': {
          500: '#a78bfa',
          600: '#9b7df5',
          700: '#8b6fe0',
        },
        'neon-pink': {
          500: '#d8b4fe',
          600: '#c4b5fd',
        },
        'neon-cyan': {
          500: '#7dd3fc',
          600: '#67c7f7',
        },
        'warm': {
          50: '#fef7ee',
          100: '#fdecd5',
          200: '#fbd5aa',
          300: '#f8b774',
          400: '#f4903c',
          500: '#f1751b',
        },
        'calm': {
          50: '#f5f8ff',
          100: '#ebf1ff',
          200: '#d6e3ff',
          300: '#b8ccff',
          400: '#8bb1ff',
          500: '#6b92ed',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cyber': 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)',
        'gradient-blue': 'linear-gradient(135deg, #8bb1ff 0%, #a78bfa 100%)',
        'gradient-purple': 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)',
        'gradient-warm': 'linear-gradient(135deg, #f8b774 0%, #f4903c 100%)',
        'gradient-calm': 'linear-gradient(135deg, #b8ccff 0%, #d6e3ff 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px rgba(167, 139, 250, 0.3), 0 0 20px rgba(167, 139, 250, 0.15)' },
          'to': { boxShadow: '0 0 20px rgba(167, 139, 250, 0.4), 0 0 30px rgba(167, 139, 250, 0.2)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}

