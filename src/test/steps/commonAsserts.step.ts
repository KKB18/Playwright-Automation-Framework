import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { PageObject } from "../pages/pageObject";
import { page, logger, browser, context } from '../pages/browser';
import * as user from '../helper/testData/Users.json'
import path from "path";
import * as ele from "../pages/orangeHrmElements";
setDefaultTimeout(60 * 1000 * 2);

Then('assert that {string} field has {string} value', async function (fieldLabel: string, expectedValue: string) {
    let actualValue = ele.inputValueUsingLabel(fieldLabel).textContent();
    await expect(actualValue).toEqual(expectedValue);
});

Then('assert that {string} dropdown has {string} value', async function (fieldLabel: string, expectedValue: string) {
    let actualValue = ele.dropdownValueUsingLabel(fieldLabel).textContent();
    await expect(actualValue).toEqual(expectedValue);
});

Then('assert that {string} text is displayed', async function (text: string) {
    await expect(ele.eleUsingText(text)).toBeVisible( {timeout: 10000});
});

Then('assert that {string} text is not displayed', async function (text: string) {
    await expect(ele.eleUsingText(text)).toBeHidden();
});

Then('wait for {int} seconds', async function (waitTime: number) {
    await page.waitForTimeout(waitTime*1000);
});