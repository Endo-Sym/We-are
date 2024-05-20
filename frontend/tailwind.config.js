/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    variants: {
      fill: ['hover', 'focus']
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        baloo: ['Baloo 2', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif']
      },
      colors: {
        'primary-pink': '#EB5AE9'
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
      },
      screens: {
        "wide": "1440px"
      }
    },
  },
  plugins: []
}