/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#181E30",
      },
    },
  },
  plugins: [require("daisyui")],
};

module.exports = config;
