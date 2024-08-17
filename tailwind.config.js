/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGreen: '#004d00', // Replace with your preferred dark green color
        blue900: '#1a237e',   // Example of another custom color
        gray600: '#757575',   // Example of another custom color
      },
    },
  },
  plugins: [],
}

