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

export function isValidContainerInfo(data: unknown): data is ContainerInfo {
  if (typeof data !== "object" || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.host === "string" &&
    typeof obj.port === "number" &&
    typeof obj.baseUrl === "string" &&
    typeof obj.graphqlUrl === "string"
  );
}

export async function getContainerInfoFromFile(): Promise<ContainerInfo> {
  try {
    const fileContents = await fs.readFile(CONTAINER_INFO_FILE, "utf-8");
    const parsedFileContents: unknown = JSON.parse(fileContents);
    if (isValidContainerInfo(parsedFileContents)) {
      return parsedFileContents;
    } else {
      throw new Error(".container-info.json contains invalid data");
    }
  } catch (error) {
    throw new Error(
      `Failed to read container info file. Make sure global setup has run. Error: ${error}`
    );
  }
}

export async function writeContainerInfoToFile(
  info: ContainerInfo
): Promise<void> {
  await fs.writeFile(CONTAINER_INFO_FILE, JSON.stringify(info, null, 2));
}
