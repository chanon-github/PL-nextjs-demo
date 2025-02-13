/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  ['./src/**/*.{html,js,ts,jsx,tsx}', './public/**/*.html'],
  theme: {
    
    extend: {
      colors: {
        'pl-primary': '#6DC067 ', //==> R0 G101 B73
        'pl-red': '#ED1A3B', // R237 G26 B59
        'pl-yellow':'#eab308',
        'pl-primay-hover': '#027555',
        'pl-red-hover':'#f71d3f',
         'pl-black' : '#313332'
        // 'pl-secondary-hover':'#d6d8d9'
      },
    },
   
  },
  plugins: [],
}

