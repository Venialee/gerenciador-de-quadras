import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        backgroundYellow: '#F2E74B',
        complementYellow: '#F2BE22',
        darkBlue: '#020659',
        middleBlue: '#022859',
        lightBlue: '#03588C',
        lightOrange: '#F54411',
        darkOrange: '#F41300',
      },
    },
    screens: {
      xsm: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "2210px",
      'low': { 'raw': '(max-height: 670px)' },
    }
  },
  plugins: [],
} satisfies Config;
