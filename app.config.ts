import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    routeRules: {
      "/**": { proxy: "https://smaller-items-983374.framer.app/**" },
    },
  },
});
