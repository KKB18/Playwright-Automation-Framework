import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { pageNavigation } from "../pages/pageNavigation";
import { page, logger, browser, context, openTab } from '../browser/browser';
import * as lc from "../pages/letCode.page";

Given('user navigates to the Let Code - Practice and become pro in test automation', async () => {
    await pageNavigation.navigateToUrl();
    // await page.waitForLoadState();
    logger.info("Going to the target application")
});

When('user clicks on {string} link text', async function (linkText: string) {
    await lc.eleUsingLinkText(linkText).nth(0).click();
});

Then('assert that {string} text is visible', async function (text: string) {
    await expect(lc.eleUsingText(text)).toBeVisible({ timeout: 10000 });
});

When('user enters {string} into {string} text box', async function (value: string, fieldLabel: string) {
    lc.textBoxUsingLabel(fieldLabel).fill(value);
    lc.textBoxUsingLabel(fieldLabel).type(value);
});
