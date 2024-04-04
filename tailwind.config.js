/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        'real-screen': 'calc(var(--vh) * 100)',
      },
      minHeight: {
        'real-screen': 'calc(var(--vh) * 100)',
      },
      spacing: {
        'first': '2rem', // 원하는 값으로 설정 (1rem = 4px)
        'second': '14rem', // 원하는 값으로 설정 (1rem = 4px)
        'third': '22rem', // 원하는 값으로 설정 (1rem = 4px)
        'fourth': '30rem', // 원하는 값으로 설정 (1rem = 4px)

      },
    },
  },
  plugins: [require("daisyui")],
};
