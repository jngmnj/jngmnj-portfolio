import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '0',
      },
      screens: {
        sm: '100%', // sm(640px) 이하
        md: '768px', // md(768px) 이하
        lg: '1024px', // lg(1024px) 이하
        xl: '1200px', // xl(1280px) 이하
        '2xl': '1200px', // 2xl(1536px) 이하
      },
    },
  },
  plugins: [],
};
export default config;
