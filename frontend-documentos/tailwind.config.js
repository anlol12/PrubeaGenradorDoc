/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4b3bff',        // --primary-blue
        'primary-dark': '#3a2ce0', // hover de botones azules
        'bg-light': '#f4f5f7',     // --bg-light
        card: '#d1d1d6',           // --card-grey
        'card-hover': '#b0b0b5',   // gris del hover
        main: '#111111',           // --text-main
        muted: '#888888',          // --text-muted
        'brand-red': '#e61e25',    // --red
      },
      fontFamily: { sans: ['Poppins', 'sans-serif'] },
    },
  },
  plugins: [],
}

