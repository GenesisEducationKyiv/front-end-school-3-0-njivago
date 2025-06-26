interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_MODE: "development" | "production";
  readonly VITE_API_URL: string;
  readonly VITE_API_MEDIA_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
