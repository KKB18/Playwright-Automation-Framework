import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { pageNavigation } from "../pages/pageNavigation";
import { page, logger, browser, context, openTab } from '../browser/browser';
import * as lc from "../pages/letCode.page";
import path from "path";

Given('user navigates to the Let Code - Practice and become pro in test automation', async () => {
    await pageNavigation.navigateToUrl();
    logger.info("Going to the target application")
});

When('user clicks on {string} link text', async function (linkText: string) {
    await lc.eleUsingLinkText(linkText).nth(0).click();
});

When('user clicks on button {string}', async function (text: string) {
    await page.getByRole("button", { name: text }).click();
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
    expect(await lc.textBoxUsingLabel(fieldLabel).getAttribute("readonly")).toBeDefined();
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

When('user gets x y coordinates of {string} button', async function (text: string) {
    console.log(await page.getByRole("button").getByText(text).boundingBox());
});

Then('user gets the css properties of button {string}', async function (text: string) {
    const cssProperties = await page.getByRole("button").getByText(text).evaluate((element) => {
        const styles = window.getComputedStyle(element);
        return {
            color: styles.color,
            backgroundColor: styles.backgroundColor,
            fontSize: styles.fontSize,
            // Add other CSS properties you need
        };
    });
    console.log(cssProperties);
});

Then('user asserts that button {string} is disabled', async function (text: string) {
    expect(await page.getByRole("button").getByText(text).isDisabled()).toBeTruthy();
});

When('user clicks and hold {string} button for {int} seconds', async function (text: string, time: number) {
    const button = await page.locator(`//button//*[text()="${text}"]`);
    button.click({
        button: "left",
        delay: time * 1000
    })
});

When('user selects {string} value/values from the dropdown {string}', async function (option: string, dropdown: string) {
    let op = option.split(',').map(option => option.trim());
    const o = op.map(option => ({ label: option }));
    const dd = await lc.dropdownUsingLabel(dropdown);
    await dd?.selectOption(o);
});

When('user gets the length of options and prints all of them from the dropdown {string}', async function (dropdown: string) {
    const dd = await lc.dropdownUsingLabel(dropdown).locator(`//option`);
    const attributeValues = await dd.evaluateAll((options) =>
        options.map(option => (option as HTMLOptionElement).innerText)
    );
    console.log("------List of values in dd - " + attributeValues + '------- Length of the dd - ' + await dd.count());
});
