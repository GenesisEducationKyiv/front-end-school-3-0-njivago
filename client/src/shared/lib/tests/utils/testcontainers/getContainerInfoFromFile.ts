import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONTAINER_INFO_FILE = path.join(__dirname, "container-info.json");

export type ContainerInfo = {
  host: string;
  port: number;
  baseUrl: string;
  graphqlUrl: string;
};

export async function getContainerInfoFromFile(): Promise<ContainerInfo> {
  try {
    const content = await fs.readFile(CONTAINER_INFO_FILE, "utf-8");
    return JSON.parse(content) as ContainerInfo;
  } catch (error) {
    throw new Error(
      `Failed to read container info file. Make sure global setup has run. Error: ${error}`
    );
  }
}
