import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/assets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      skew: {
        '7': '7deg',
        '9': '9deg',
        '11': '11deg',
        '13': '13deg',
        '15': '15deg',
        '17': '17deg',
        '19': '19deg',
        '21': '21deg',
        '23': '23deg',
        '25': '25deg',
        '27': '27deg',
        '29': '29deg',
        '31': '31deg'

      },
      colors: {
        'main-landing-color': '#232323',
        'secondary-landing-color': '#656565',
        'action-color': '#F1A94B',
        'text-color': '#FFFFFF',
        'link-color': '#5B64FD'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
  variants: {},
  corePlugins: {
    transform: true,
    transitionProperty: true,
    transitionDuration: true,
    transitionTimingFunction: true,
  },
}
export default config

/*
KinoXp Color
 Pallete:

Main Landing Color
: #232323

Secondary Landing Color
: #656565

Action Color
: #F1A94B

Text Color
: #FFFFFF

Link color
: #5B64FD
*/