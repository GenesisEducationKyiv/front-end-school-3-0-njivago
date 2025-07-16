// oxlint-disable no-console typescript-eslint/no-explicit-any

import { ServerContainer } from "./ServerContainer";
import { writeContainerInfoToFile } from "./getContainerInfoFromFile";

const RETRY_TIMEOUT = 2000;
const MAX_RETRIES = 30;

export default async function globalSetup() {
  console.log("🐳 Starting testcontainer for e2e tests...");

  const container = new ServerContainer();

  await container.start();

  let retries = MAX_RETRIES;
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
      await new Promise((resolve) => setTimeout(resolve, RETRY_TIMEOUT));
    }
  }

  if (retries === 0) {
    console.error("❌ Container failed to become healthy after 30 attempts");

    throw new Error("Container failed to become healthy");
  }

  const containerInfo = {
    host: container.startedContainer?.getHost() ?? "localhost",
    port: container.startedContainer?.getMappedPort(8000) ?? 8000,
    baseUrl: container.baseUrl,
    graphqlUrl: container.graphQLUrl,
  };

  await writeContainerInfoToFile(containerInfo);

  console.log(
    `Setup complete! Container available at ${containerInfo.baseUrl}`
  );

  (global as any).__TESTCONTAINER__ = container;
}
