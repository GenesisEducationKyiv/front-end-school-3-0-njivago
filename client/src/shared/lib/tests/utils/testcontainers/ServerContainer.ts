// oxlint-disable no-console

import { GenericContainer } from "testcontainers";
import type { StartedTestContainer } from "testcontainers";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class ServerContainer {
  private container: StartedTestContainer | null = null;
  private readonly serverPort = 8000;
  private readonly graphqlPath = "/graphql";

  async start(): Promise<StartedTestContainer> {
    if (this.container) {
      return this.container;
    }

    console.log("Building Docker image from server/Dockerfile...");

    const projectRoot = path.resolve(__dirname, "../../../../../../..");

    const builtContainer = await GenericContainer.fromDockerfile(
      projectRoot,
      "server/Dockerfile"
    ).build();

    const container = await builtContainer
      .withExposedPorts(this.serverPort)
      .withEnvironment({
        NODE_ENV: "test",
        HOST: "0.0.0.0",
        PORT: this.serverPort.toString(),
        CORS_ORIGIN: "*",
        LOG_LEVEL: "error",
      })
      .withReuse()
      .start();

    console.log(
      `Container started! Host: ${container.getHost()}, Port: ${container.getMappedPort(
        this.serverPort
      )}`
    );

    this.container = container;
    return container;
  }

  async stop(): Promise<void> {
    if (this.container) {
      await this.container.stop();
      this.container = null;
    }
  }

  get baseUrl(): string {
    if (!this.container) {
      throw new Error("Container not started. Call start() first.");
    }

    const host = this.container.getHost();
    const port = this.container.getMappedPort(this.serverPort);
    return `http://${host}:${port}`;
  }

  get graphQLUrl(): string {
    return `${this.baseUrl}${this.graphqlPath}`;
  }

  get startedContainer(): StartedTestContainer | null {
    return this.container;
  }

  async healthCheck(): Promise<boolean> {
    try {
      const url = this.graphQLUrl;
      console.log(`Health checking GraphQL endpoint: ${url}`);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: "{ __schema { queryType { name } } }",
        }),
      });

      console.log(
        `Health check response: ${response.status} ${response.statusText}`
      );

      if (response.ok) {
        const data = await response.text();
        console.log(
          `Health check successful, response length: ${data.length} chars`
        );
        return true;
      } else {
        console.log(`❌ Health check failed with status: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.log(`❌ Health check error:`, error);
      return false;
    }
  }
}
