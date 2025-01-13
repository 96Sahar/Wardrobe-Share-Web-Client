/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "surface-gradient": "linear-gradient(to br, #e9eceb, #e3e8db)",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        surface: "#e9eceb",
      },
    },
  },
  plugins: [],
};
