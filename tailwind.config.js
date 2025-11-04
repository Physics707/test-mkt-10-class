/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f7ff',
        'neon-cyan': '#00ffff',
        'neon-turquoise': '#00e5ee',
      },
      boxShadow: {
        'neon': '0 0 15px rgba(0, 247, 255, 0.6)',
        'neon-strong': '0 0 25px rgba(0, 255, 255, 0.8)',
      }
    },
  },
  plugins: [],
}