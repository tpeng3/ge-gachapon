/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'silver': "#DBDBDB",
      'grey': "#ccc",
      'beige': "#FBF7E3",
      'pink': "#F0AC97",
      'red': "#D16863",
      'redlink': "#CE5A59"
    },
    fontFamily: {
      'display': ['"Amatic SC"'],
      'body': ['Lato']
    },
    extend: {
    },
  },
  plugins: [],
}
