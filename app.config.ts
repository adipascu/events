import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    routeRules: {
      "/thank-you": {
        proxy: "https://smaller-items-983374.framer.app/thank-you",
      },
      "/privacy-policy": {
        proxy: "https://smaller-items-983374.framer.app/privacy-policy",
      },
      "/": { proxy: "https://smaller-items-983374.framer.app/" },
    },
  },
});
