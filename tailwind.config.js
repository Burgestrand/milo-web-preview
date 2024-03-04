/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'shark': {
          '50': '#f6f7f9',
          '100': '#eceef2',
          '200': '#d5dae2',
          '300': '#b0b9c9',
          '400': '#8593ab',
          '500': '#667691',
          '600': '#515e78',
          '700': '#434c61',
          '800': '#3a4252',
          '900': '#343a46',
          '950': '#1e2129',
        },
        accent: 'rgb(239, 85, 82)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};