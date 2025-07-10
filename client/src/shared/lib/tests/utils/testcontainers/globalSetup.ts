// oxlint-disable no-console typescript-eslint/no-explicit-any

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { ServerContainer } from "./ServerContainer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONTAINER_INFO_FILE = path.join(__dirname, "container-info.json");

export default async function globalSetup() {
  console.log("🐳 Starting testcontainer for e2e tests...");

  const container = new ServerContainer();

  await container.start();

  let retries = 30;
  while (retries > 0) {
    try {
      const isHealthy = await container.healthCheck();

      if (isHealthy) {
        console.log("✅ Health check passed!");

        break;
      }
      console.log("❌ Health check failed, server not ready yet");
    } catch (error) {
      console.log(error);
    }
    retries--;
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  if (retries === 0) {
    console.error("❌ Container failed to become healthy after 30 attempts");

    throw new Error("Container failed to become healthy");
  }

  const containerInfo = {
    host: container.getContainer()?.getHost(),
    port: container.getContainer()?.getMappedPort(8000),
    baseUrl: container.getBaseUrl(),
    graphqlUrl: container.getGraphQLUrl(),
  };

  await fs.writeFile(
    CONTAINER_INFO_FILE,
    JSON.stringify(containerInfo, null, 2)
  );

  console.log(
    `Setup complete! Container available at ${containerInfo.baseUrl}`
  );

  (global as any).__TESTCONTAINER__ = container;
}
