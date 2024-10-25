import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import dynamicImport from "vite-plugin-dynamic-import";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
	const envDir = "env";
	const env = loadEnv(mode, envDir);

	return {
		base: "/",
		envDir,
		resolve: {
			extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
			alias: [{ find: "@", replacement: path.resolve("src") }],
		},
		server: {
			port: parseInt(env.VITE_PORT),
			watch: {
				usePolling: true,
			},
			strictPort: true,
			host: true,
			proxy: {
				"/ai-ws": {
					target: env.VITE_AI_TARGET_URL,
					ws: true,
				},
			},
		},
		preview: {
			port: parseInt(env.VITE_PORT),
			strictPort: true,
			host: true,
		},
		css: {
			devSourcemap: true,
			postcss: {
				plugins: [autoprefixer({})],
			},
		},
		plugins: [react(), tsconfigPaths(), svgr(), dynamicImport(), TanStackRouterVite(), nodePolyfills()],
	};
});
