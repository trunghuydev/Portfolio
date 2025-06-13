/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
     extend: {
      colors: {
        'primary': '#7b61ff',
        'gradient-start': '#a78bfa',
        'gradient-end': '#22d3ee',
      },
    },
  },
  plugins: [],
};
