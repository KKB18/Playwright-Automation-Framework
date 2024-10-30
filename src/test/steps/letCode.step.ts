import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { pageNavigation } from "../pages/pageNavigation";
import { page, logger, browser, context, openTab } from '../browser/browser';
import * as lc from "../pages/letCode.page";
import path from "path";

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
    await lc.textBoxUsingLabel(fieldLabel).fill(value);
});

When('user appends {string} into {string} text box', async function (value: string, fieldLabel: string) {
    await lc.textBoxUsingLabel(fieldLabel).focus();
    await lc.textBoxUsingLabel(fieldLabel).press("End");
    await lc.textBoxUsingLabel(fieldLabel).type(value);
    await lc.textBoxUsingLabel(fieldLabel).press("Escape");
});

Then('user asserts that {string} field is equal to {string} text', async function (fieldLabel: string, value: string) {
    expect(await lc.textBoxUsingLabel(fieldLabel).getAttribute("value")).toEqual(value);
});

Then('user asserts that {string} field is disabled', async function (fieldLabel: string) {
    expect(await lc.textBoxUsingLabel(fieldLabel).isDisabled()).toBeTruthy();
});

Then('user asserts that {string} field is readonly', async function (fieldLabel: string) {
    expect(await lc.textBoxUsingLabel(fieldLabel).isEnabled()).toBeFalsy();
});

When('user downloads by clicking on {string}', async function (text: string) {
    const download = await Promise.all([
        page.waitForEvent("download"),
        lc.eleUsingLinkText(text).click()
    ]);
    const fileName = await download[0].suggestedFilename();
    const currentRepo = path.join(__dirname, '../../..');
    const filepath = path.join(currentRepo, 'test-results');
    await download[0].saveAs(filepath + "/" + fileName);
});