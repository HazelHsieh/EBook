/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        cream: '#F0EEE9',
        creamWhite: '#FAF8F3',
        creamWhite2: '#FFFEFC',
        primary: '#8CA187',
        primary1: '#a2b39e',
        secondary: '#687e63',
        secondary1: '#CDD027',
        secondary2: '#A5A824',
        info: '#387B27',
        link: '#589EF0',
        brown: '#474B42',
      }
    },
    container: {
      center: true,
      padding: "12px",
    },
    // 啟用 motion-safe 
    variants: {
      extend: {
        animation: ['motion-safe'],
      }
    },
  },
  plugins: [
    require("daisyUi")
  ],
  // daisyUI config (optional)
  daisyui: {
    themes: [
      {
        mytheme: {
          "cream": '#F0EEE9',
          "creamWhite": '#FAF8F3',
          "creamWhite2": '#FFFEFC',
          "primary": '#8CA187',
          "primary1": '#a2b39e',
          "secondary": '#687e63',
          "secondary1": '#CDD027',
          "secondary2": '#A5A824',
          "info": '#387B27',
          "link": '#589EF0',
          "brown": '#474B42',
        },
      },
      // "dark",
      // "cupcake",
    ],
  },
}
