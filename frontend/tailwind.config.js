/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
        extend: {
            fontFamily: {
                sans: ['poppins'],
            },
        },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}