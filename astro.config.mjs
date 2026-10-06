// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  i18n: {
    defaultLocale: "th",
    locales: ["th", "en"],
    routing: {
        prefixDefaultLocale: true
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
