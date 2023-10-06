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
  plugins: [],
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