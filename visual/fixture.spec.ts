import { test, expect } from '../visual/browserManagerFixture';

test('can open page using custom browser manager', async ({ browserManager }) => {
    const context = browserManager.context;
    let page = browserManager.page;
    await page.goto('https://letcode.in/');
    await expect(page).toHaveTitle(/LetCode/);
    await Promise.all([
        context.waitForEvent('page'),
        page.locator(`//*[text()="Koushik Chatterjee"]`).click()
    ]);
    page = await browserManager.openTab(2);
    await expect(page).toHaveURL(`https://www.linkedin.com/in/ortoni/`);
});