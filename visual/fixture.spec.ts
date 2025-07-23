import { test, expect } from '../visual/browserManagerFixture';

test('can open page using custom browser manager', async ({ bm, variables }) => {
    console.log(bm.browser.browserType().name());
    console.log(variables.resolveFunction('<<today-date-time>>'));
    console.log(variables.getRandomUser());
    const context = bm.context;
    let page = bm.page;
    await page.goto('https://letcode.in/');
    await expect(page).toHaveTitle(/LetCode/);
    await Promise.all([
        context.waitForEvent('page'),
        page.locator(`//*[text()="Koushik Chatterjee"]`).click()
    ]);
    page = await bm.openTab(2);
    await expect(page).toHaveURL(`https://www.linkedin.com/in/ortoni/`);
});