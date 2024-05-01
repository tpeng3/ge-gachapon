/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      silver: "#DBDBDB",
      grey: "#ccc",
      beige: "#FBF7E3",
      pink: "#F0AC97",
      red: "#D16863",
      redlink: "#CE5A59",
      olive: "#DBDBB6",
      rose: "#f3d7d7",
    },
    fontFamily: {
      display: ['"Amatic SC"'],
      body: ["Lato"],
    },
    extend: {},
  },
  plugins: [],
};
