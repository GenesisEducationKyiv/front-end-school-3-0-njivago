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
        algorithm: "brotliCompress",
        ext: ".br",
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
      sourcemap: mode !== "production",
      target: "esnext",
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "graphql-vendor": [
              "graphql",
              "graphql-ws",
              "urql",
              "@urql/core",
              "@urql/exchange-graphcache",
            ],
            "form-vendor": [
              "react-hook-form",
              "@hookform/resolvers",
              "valibot",
            ],
            "i18n-vendor": ["i18next", "react-i18next"],
            "ui-vendor": [
              "react-dropzone",
              "react-toastify",
              "clsx",
              "tailwind-merge",
            ],
          },
          chunkFileNames: (chunkInfo) => {
            if (chunkInfo.name === "vendor") {
              return "vendor-[hash].js";
            }
            return "[name]-[hash].js";
          },
          entryFileNames: "entry-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
        },
      },
      chunkSizeWarningLimit: 1000,
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
