import { test as base } from "@playwright/test";
import { getContainerInfoFromFile } from "../../utils/testcontainers";

const API_URL = process.env.VITE_API_URL || "http://0.0.0.0:8000";

export const test = base.extend({
  // eslint-disable-next-line react-hooks/rules-of-hooks
  page: async ({ page }, use) => {
    const { host, port } = await getContainerInfoFromFile();

    await page.route(`${API_URL}/**`, async (route) => {
      const url = route.request().url();
      const newUrl = url.replace(API_URL, `http://${host}:${String(port)}`);

      await route.continue({ url: newUrl });
    });

    await page.goto("/");

    await use(page);
  },
});
