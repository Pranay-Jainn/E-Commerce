import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)"],
        inter: ["var(--font-inter)"],
      },
      colors: {
        cream: {
          50: "#fefdf8",
          100: "#fdf9f0",
        },
        gold: {
          200: "#f4e4a6",
          400: "#d4af37",
          500: "#b8941f",
          600: "#9c7c1a",
        },
        "rose-gold": {
          400: "#e8b4b8",
          500: "#d4969b",
          600: "#c0787e",
        },
      },
      backgroundImage: {
        "luxury-gradient": "linear-gradient(135deg, #fefdf8 0%, #fdf9f0 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
