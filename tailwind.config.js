/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      bgcolor: '#FFFBEB',
      ttcolor: '#080707',
      stcolor: '#595454',
      tbcolor: '#ede8d3'
    },
    fontFamily: {
      custom: ['custom']
    }
  },
  daisyui: {
    themes: [
      {
        custom: {
          warning: '#FEE500',
          success: '#2DB400',
          error: '#FF9800'
        }
      }
    ]
  },
  plugins: [require('daisyui')]
};
