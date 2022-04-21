module.exports = {
  content: [
      "./public/index.html",
      "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '400px': '400px',
      }
    },
  },
  plugins: [require('@tailwindcss/typography'),],
}
