/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "navy": {
          50: "#f8f9fa",
          100: "#f1f3f5",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#868e96",
          700: "#495057",
          800: "#343a40",
          900: "#1a1e26",
          950: "#0f1217",
        },
        "cream": {
          50: "#fefdfb",
          100: "#fdfbf7",
          200: "#faf7f0",
          300: "#f5f0e8",
          400: "#efe8da",
          500: "#e8dfc9",
          600: "#dcd3b8",
          700: "#c9bfa4",
          800: "#b0a28f",
          900: "#8a7968",
          950: "#5a5347",
        },
        "sage": {
          50: "#f6f9f7",
          100: "#ecf4ef",
          200: "#d9e9dd",
          300: "#c5dccb",
          400: "#a8cab1",
          500: "#8fb899",
          600: "#6fa17a",
          700: "#588863",
          800: "#476b50",
          900: "#364d3d",
          950: "#1f2d27",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        serif: ["ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "0",
        md: "2px",
        lg: "0",
        xl: "0",
        "2xl": "0",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in",
        slideUp: "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}
