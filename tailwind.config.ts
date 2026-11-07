import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './content/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        abyss: {
          950: '#040711',
          900: '#070B19',
          800: '#0C1328',
          700: '#131E3D',
        },
        periwinkle: {
          50: '#F2F5FF',
          100: '#E4EBFF',
          200: '#C9D7FF',
          300: '#A5BDFF',
          400: '#7D9DFF',
          500: '#5A7EFF',
          600: '#3D5FEF',
          700: '#2A47D4',
        },
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.9' },
        },
        'progress-sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(350%)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 5s ease-in-out infinite',
        'progress-sweep': 'progress-sweep 6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
