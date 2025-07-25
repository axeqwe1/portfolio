import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode === "production" ? "/PMD/" : "/", // ✅,
    // base: "/PMD/",
    plugins: [
      tailwindcss(),
      vue(),
      vueJsx(),
      vueDevTools(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.svg", "robots.txt"],
        manifest: {
          name: "Production Monitoring Downstream",
          short_name: "PMD",
          start_url: "/PMD/",
          description: "Monitoring Downstream",
          display: "fullscreen",
          theme_color: "#ffffff",
          icons: [
            {
              src: "pwa-128x128.png",
              sizes: "128x128",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    esbuild: {
      drop: mode === "production" ? ["console", "debugger"] : undefined,
    },
  };
});
