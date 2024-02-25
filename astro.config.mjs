import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://burgestrand.github.io',
  base: '/milo-web-preview',
});