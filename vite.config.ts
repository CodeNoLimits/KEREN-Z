import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor: React core
          "react-vendor": ["react", "react-dom"],
          // UI components library
          "radix-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-popover",
          ],
          // Payment (only on checkout)
          "stripe-vendor": ["@stripe/stripe-js", "@stripe/react-stripe-js"],
          // Query client
          "query-vendor": ["@tanstack/react-query"],
        },
      },
    },
  },
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
