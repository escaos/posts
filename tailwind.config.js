/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0F172A',
          light: '#F8FAFC',
        },
        foreground: {
          DEFAULT: '#020617',
          light: '#1E293B',
        },
        primary: {
          DEFAULT: '#2563EB',
          foreground: '#EFF6FF',
        },
        muted: {
          DEFAULT: '#1E293B',
          light: '#E2E8F0',
        },
      },
    },
  },
  plugins: [],
};

