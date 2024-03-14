/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kufi: ["Noto Kufi Arabic", "sans-serif"],
        ibm: ['IBM Plex Sans Arabic', 'sans-serif']
      },


    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}