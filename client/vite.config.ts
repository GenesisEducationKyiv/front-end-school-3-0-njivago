import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgReactPlugin from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";
import { resolve } from "path";

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    root: ".",
    base: env.VITE_BASE_URL || "/",
    publicDir: resolve(__dirname, "public"),
    plugins: [
      svgReactPlugin(),
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler", { target: "19" }]],
        },
      }),
      visualizer({ open: false }),
      compression({
        algorithm: "gzip",
        ext: ".gz",
        threshold: 1024,
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
      outDir: resolve(__dirname, "dist"),
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: [
              "react",
              "react-dom",
              "graphql",
              "graphql-ws",
              "urql",
              "react-hook-form",
              "i18next",
            ],
          },
        },
      },
    },
    define: {
      "process.env.VITE_BASE_URL": JSON.stringify(env.VITE_BASE_URL),
      "process.env.VITE_MODE": JSON.stringify(env.VITE_MODE),
    },
    test: {
      environment: "happy-dom",
      globals: true,
    },
  };
});
