import { test as baseTest } from '@playwright/test';
import { browserManager } from '../src/test/helper/browser/browserManager';
import * as resolveFunction from '../src/test/helper/parameters/resolveVariable';

type CustomFixtures = {
  bm: typeof browserManager,
  variables: typeof resolveFunction
};

export const test = baseTest.extend<CustomFixtures>({
  bm: async ({ }, use) => {
    await browserManager.launchBrowser();
    await browserManager.createContextAndPage();
    await use(browserManager);
    await browserManager.closeAll();
  },
  variables: async ({ }, use) => {
    await use(resolveFunction);
  }
});

export { expect } from '@playwright/test';