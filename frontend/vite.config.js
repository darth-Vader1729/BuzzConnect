// https://vitejs.dev/config/
// Vite's development server now runs on port 3000, while your backend
//  remains on port 5000. This avoids the port conflict.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:5000",
				// changeOrigin: true,  // Ensures the correct origin header is sent
				// secure: false,       // Allows non-HTTPS connection
			},
		},
	},
});
