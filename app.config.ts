import { defineConfig } from "@solidjs/start/config";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  server: {
    routeRules: {
      "/thank-you": {
        proxy: "https://smaller-items-983374.framer.app/thank-you",
      },
      "/privacy-policy": {
        proxy: "https://smaller-items-983374.framer.app/privacy-policy",
      },
      "/about": {
        proxy: "https://smaller-items-983374.framer.app/about",
      },
      "/": { proxy: "https://smaller-items-983374.framer.app/" },
    },
  },
  vite: {
    plugins: [topLevelAwait()],
  },
});
