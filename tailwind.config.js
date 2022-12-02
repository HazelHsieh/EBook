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
        primary2: '#8fbc8f',
        secondary: '#687e63',
        secondary1: '#CDD027',
        secondary2: '#A5A824',
        primaryBlue: '#82a699',
        red: '#ef3939',
        info: '#387B27',
        link: '#589EF0',
        brown: '#474B42',
      },
      // 啟用背景圖片
      backgroundImage: {
        'hero-pattern': "url('/img/hero-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
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
        display: ["group-hover"],
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
          "red": '#ef3939',
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
