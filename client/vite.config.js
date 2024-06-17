import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
    build: {
      chunkSizeWarningLimit: 2000, // Adjust the limit as needed (in KB)
    },
  },
  plugins: [react()],
});
