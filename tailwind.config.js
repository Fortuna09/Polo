// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'smooth-pulse': {
          '0%, 100%': { opacity: 1 },    // No início e no fim, a opacidade é total
          '50%': { opacity: 0.6 }, // Na metade, a opacidade é 60%
        }
      },
      animation: {
        'smooth-pulse': 'smooth-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        serif: ['"Times New Roman"', 'Times', 'serif'],
      },
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
        },
      },
    },
  },
  plugins: [],
}