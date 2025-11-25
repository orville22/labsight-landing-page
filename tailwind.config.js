/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#080d1c",
        card: "#0f162b",
        panel: "#111a32",
        accent: "#6af0c9",
        "accent-2": "#7ab7ff",
        text: "#e8ecf5",
        muted: "#9aabc7",
        border: "rgba(255, 255, 255, 0.08)"
      },
      boxShadow: {
        glow: "0 15px 50px rgba(106, 240, 201, 0.2)"
      },
      borderRadius: {
        brand: "18px"
      },
      fontFamily: {
        space: "var(--font-space-grotesk), 'Space Grotesk', system-ui, -apple-system, sans-serif",
        manrope: "var(--font-manrope), 'Manrope', system-ui, -apple-system, sans-serif"
      }
    }
  },
  plugins: []
};
