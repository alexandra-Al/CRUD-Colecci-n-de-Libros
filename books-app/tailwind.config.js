/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
 theme: {
    extend: {
  colors: {
    primary:   '#9733D3',   // Morado principal
    secondary: '#EAC3FF',   // Fondo rosado claro
    voice:     '#8BC540',   // Verde
    call:      '#3C99D4',   // Azul
    neutral: {
      50:  '#F8F8F8',       // Fondo gris claro
      900: '#1A1A1A',       // Texto negro
      600: '#666666',       // Texto gris medio
    },
  },
}
  },
  plugins: [],
}