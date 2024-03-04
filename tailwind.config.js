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
        blackish: '#1e2129',
        accent: {
          '50': '#fef2f2',
          '100': '#fee3e2',
          '200': '#fecbca',
          '300': '#fba8a6',
          '400': '#f77572',
          DEFAULT: '#ef5552',
          '600': '#db2a27',
          '700': '#b8201d',
          '800': '#981e1c',
          '900': '#7e201e',
          '950': '#450b0a',
        },
        'on-accent': {
          DEFAULT: '#ffffff',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};