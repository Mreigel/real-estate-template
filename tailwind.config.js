module.exports = {
  content: [
    "./*.html",           // <- includes index.html, contact.html, about.html, etc.
    "./components/**/*.js", // <- for navbar.js, footer.js, etc.
    "./*.js",             // <- for injectLayout.js
    "./src/**/*.{html,js}" // <- keep this if you're using `src/` too
  ],
  theme: {
    extend: {
      colors: {
        aquamarine: "#3abff8",
      },
    },
  },
  plugins: [],
};
