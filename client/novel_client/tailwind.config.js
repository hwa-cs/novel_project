/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "books-img": "url('/src/assets/books.jpg')",
        "books_2-img": "url('/src/assets/books_2.jpg')",
        "books_3-img": "url('/src/assets/books_3.jpg')",
        "paper-img": "url('/src/assets/paper.jpg')",
        "paper_2-img": "url('/src/assets/paper_2.jpg')",
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 35s linear infinite',
        // home 페이지의 자동 슬라이스 속도 조절
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

