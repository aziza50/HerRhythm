import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
<<<<<<< HEAD
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
=======
    port: 5175,
    strictPort: true, // This prevents Vite from trying other ports
  },
})
>>>>>>> fd7da51f89b83e69fe602e0133a14e1a9089c174
