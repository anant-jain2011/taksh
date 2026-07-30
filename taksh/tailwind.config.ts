/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Adds support for toggling dark mode via the "dark" class
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
