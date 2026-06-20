// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
  extend: {
   animation: {
  'semi-cw':  'semi-cw  0.4s ease-out forwards',
  'semi-ccw': 'semi-ccw 0.4s ease-out forwards',
},
keyframes: {
  'semi-cw': {
    '0%':   { transform: 'rotate(0deg)'    },
    '100%': { transform: 'rotate(180deg)'  },
  },
  'semi-ccw': {
    '0%':   { transform: 'rotate(180deg)'  },
    '100%': { transform: 'rotate(0deg)'    },
  },
},
},
  },
  plugins: [],
}

