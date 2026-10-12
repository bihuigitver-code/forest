/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          deep: '#174A32',     // Deep forest green
          dark: '#24563B',     // Government-style dark green
          light: '#2E6F4C',    // Mid forest green
          cream: '#F5F4EC',    // Light cream background
          navy: '#183153',     // Official-style navy
          gold: '#B79A52',     // Muted gold accent
          goldLight: '#E8DFB8',
          border: '#D7DED8',   // Light grey borders
          surface: '#FAFAF7',  // Clean subtle surface
          darkSurface: '#12241A'
        }
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Noto Sans Devanagari', 'system-ui', '-apple-system', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'Yantramanav', 'Hind', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'gov-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'gov': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'gov-md': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
