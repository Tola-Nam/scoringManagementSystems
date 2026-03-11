// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{html,ts}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#0A3981",
//         warning: "#AB4459",
//         secondary: "#F000B8",
//         accent: "#41C9E2",
//         neutral: "#3D4451",
//         danger: "#F72C5B",
//         gold: "#FFB200",
//         textgreen600: "#16a34a",
//         textblue500: "#3b82f6",
//       },
//     },
//     screens: {
//       sm: "640px",
//       md: "600px",
//       lg: "1024px",
//       xl: "1280px",
//       "2xl": "1536px",
//     },
//   },
//   daisyui: {
//     themes: ["light", "dark", "cupcake"],
//   },
//   plugins: [
//     require("daisyui")
//   ],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}