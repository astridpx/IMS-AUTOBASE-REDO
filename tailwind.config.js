/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "btn-shadow": "1px 1px 25px 7px rgba(249, 228, 169, .55)",
      },
    },
  },
  plugins: [],
};
