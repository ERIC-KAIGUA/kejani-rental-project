/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
        screens: {
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
          }  ,
         extend: {
                   fontFamily:{
                          roboto:["Roboto"],
                          quicksand:["Quicksand"],
                          arimo:["Arimo"],
                          bitter:["Bitter"]
                      },
                      colors:{
                              "main-brown":"#e5e0d0",
                              "main-grey":"#aaa7a0",
                              "main-dark":"#0B192C",
                              "main-white":"#fffefa",
                              "dark-blue":"#090030",
                              "black":"#000000",
                              "gold":"#FFE100"
                            },      
                   },
   },
  plugins: [],
}

