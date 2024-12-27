/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        graffiti: ["Sedgwick Ave Display", "sans-serif"],
        syne: ["Syne", "sans-serif"],
        whisper: ["Whisper", "sans-serif"],
      },
      animation: {
        spin: "spin 20s linear infinite",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
