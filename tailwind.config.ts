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
        'bg-login': 'url(/images/bg/img_bg_login.png)',
      },
      colors: {
        'waikawa-gray': {
          '50': '#f2f7fb',
          '100': '#e7f0f8',
          '200': '#d3e2f2',
          '300': '#b9cfe8',
          '400': '#9cb6dd',
          '500': '#839dd1',
          '600': '#6a7fc1',
          '700': '#6374ae',
          '800': '#4a5989',
          '900': '#414e6e',
          '950': '#262c40',
        },
        seagull: {
          '50': '#effaff',
          '100': '#dff4ff',
          '200': '#b8ecff',
          '300': '#78deff',
          '400': '#4bd4ff',
          '500': '#06b8f1',
          '600': '#0094ce',
          '700': '#0076a7',
          '800': '#02638a',
          '900': '#085272',
          '950': '#06344b',
        },
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
