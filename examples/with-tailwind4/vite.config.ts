import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-oxc";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    port: 4002,
    open: true,
  },
});
