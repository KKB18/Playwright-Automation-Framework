import { test as baseTest } from '@playwright/test';
import { browserManager } from '../src/test/helper/browser/browserManager'; // update the path if needed

const manager = browserManager;

export const test = baseTest.extend<{
  browserManager: typeof browserManager;
}>({
  browserManager: async ({}, use) => {
    await manager.launchBrowser();
    await manager.createContextAndPage();
    await use(manager);
    await manager.closeAll();
  }
});

export { expect } from '@playwright/test';