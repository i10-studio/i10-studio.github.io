// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://i10-studio.github.io",
  base: "/",

  vite: {
    plugins: [tailwindcss()],
  },
});
