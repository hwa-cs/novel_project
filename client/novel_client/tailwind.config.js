/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      }, 
      boxShadow: {
        'inner-corner': 'inset 0 0 25px rgba(0, 0, 0, 0.5)', // 모든 모서리에 그림자
      },                  
    },
  },
  plugins: [],
}

