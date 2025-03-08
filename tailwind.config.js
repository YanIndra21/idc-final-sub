/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', 'create.html'],
  theme: {
    container: {
      center: true,
      padding: '16px',
    },
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%": {backgroundPosition: "0% 50%"},
          "100%": {backgroundPosition: "100% 50%"},
        },
      },
      animation: {
        gradient: "gradient 6s linear infinite"
      }
    },
  },
};

