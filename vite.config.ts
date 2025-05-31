import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    root: ".",
    base: env.VITE_BASE_URL || "/",
    publicDir: "public",
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler", { target: "19" }]],
        },
      }),
    ],
    resolve: {
      alias: {
        shared: resolve(__dirname, "src/shared"),
        entities: resolve(__dirname, "src/entities"),
        widgets: resolve(__dirname, "src/widgets"),
        features: resolve(__dirname, "src/features"),
        pages: resolve(__dirname, "src/pages"),
        utils: resolve(__dirname, "src/utils"),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: "dist",
      sourcemap: true,
    },
    define: {
      "process.env.VITE_BASE_URL": JSON.stringify(env.VITE_BASE_URL),
      "process.env.VITE_MODE": JSON.stringify(env.VITE_MODE),
    },
  };
});
