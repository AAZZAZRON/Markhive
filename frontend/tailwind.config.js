/** @type {import('tailwindcss').Config} */
module.exports = {content: [
  './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      yellow: {
        100: '#F7DBA7',
        80: '#EEC77E',
        60: '#F1D092',
        40: '#FCEED5',
        20: '#FFF9EE',
      },
      blue: {
        80: '#002A48',
      },
    },
    fontFamily: {
      sans: ['Ek Mukta', 'sans-serif'],
      serif: ['Ek Mukta', 'serif'],
    },
    plugins: [],
  }
}

