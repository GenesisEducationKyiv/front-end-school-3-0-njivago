// oxlint-disable no-console typescript-eslint/no-explicit-any

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONTAINER_INFO_FILE = path.join(__dirname, "container-info.json");

export default async function globalTeardown() {
  const container = (global as any).__TESTCONTAINER__;
  if (container) {
    await container.stop();
  }

  try {
    await fs.unlink(CONTAINER_INFO_FILE);
  } catch (_error) {
    // File might not exist, ignore
  }
}
