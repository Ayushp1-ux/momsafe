import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const isProduction = process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1";

export default defineConfig(async () => {
  let port = 5173;
  let basePath = "/";

  if (!isVercel) {
    const env = loadEnv(process.env.NODE_ENV || "development", path.resolve(import.meta.dirname), "");
    const rawPort = process.env.PORT || env.PORT;
    if (rawPort) {
      port = Number(rawPort);
      if (Number.isNaN(port) || port <= 0) {
        throw new Error(`Invalid PORT value: "${rawPort}"`);
      }
    }
    const envBasePath = process.env.BASE_PATH || env.BASE_PATH;
    if (envBasePath) {
      basePath = envBasePath;
    }
  }

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      runtimeErrorOverlay(),
      ...(!isProduction && process.env.REPL_ID !== undefined
        ? [
            (await import("@replit/vite-plugin-cartographer")).cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
            (await import("@replit/vite-plugin-dev-banner")).devBanner(),
          ]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
        "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
    },
    server: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
