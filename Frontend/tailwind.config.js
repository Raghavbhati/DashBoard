/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'Poppins': ['Poppins', 'sans-serif']
    },
    extend: {
      colors : {
        'dark' : '#192040',
        'light' : '#E0E1F7',
        'grey' : '#8090A1',
        'primary' : '#573BCC',
        'secondry' : '#D53AC4',
        'text-green' : '#3ED090',
        'text-red' : '#E74D5F',
        'text-orange' :'#FF9128'
      } 
    },
  },
  plugins: [],
}

