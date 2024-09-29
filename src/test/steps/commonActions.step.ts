import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { PageObject } from "../pages/pageObject";
import { page, logger, browser, context } from '../pages/browser';
import * as user from '../helper/testData/Users.json'
import path from "path";
import * as ele from "../pages/orangeHrmElements";
setDefaultTimeout(60 * 1000 * 2);

Given('user navigates to the Orange Hrm application login page', async () => {
    await PageObject.navigateToUrl();
    await page.waitForLoadState('networkidle' ,{ timeout: 100000 });
    logger.info("Going to the target application")
});

When('user enters {string} into {string} field', async function (value: string, fieldLabel: string) {
    await expect(ele.inputEleUsingLabel(fieldLabel)).toBeVisible();
    ele.inputEleUsingLabel(fieldLabel).fill(value);
});

When('user enters {string} into {string} placeholder', async function (value: string, placeholderText: string) {
    await expect(ele.inputEleUsingPlaceholder(placeholderText)).toBeVisible();
    ele.inputEleUsingPlaceholder(placeholderText).fill(value);
});

When('user selects {string} from {string} dropdown', async function (dropdownValue: string, fieldLabel: string) {
    await ele.dropdownSelectByText(fieldLabel,dropdownValue);
});

When('user clicks on {string} button', async function (buttonText: string) {
    await expect(ele.buttonEleUsingText(buttonText)).toBeVisible();
    ele.buttonEleUsingText(buttonText);
});

When('user clicks on {string} text', async function (text: string) {
    await expect(ele.eleUsingText(text)).toBeVisible();
    ele.eleUsingText(text).click();
});

When('user clicks on user dropdown icon', async function () {
    await expect(ele.userDropdownIcon()).toBeVisible();
    ele.userDropdownIcon().click();
});

When('user press {string} key/keys on active field', async function (keyValue: string) {
    await page.keyboard.press(keyValue);
});

When('user {string} the side menu', async function (state: "expands" | "collapses") {
    await ele.sideMenuClick(state);
});