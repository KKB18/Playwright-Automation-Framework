import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { PageObject } from "../pages/pageObject";
import { page, logger, browser, context } from '../pages/browser';
import * as user from '../helper/testData/Users.json'
import path from "path";
import * as ele from "../pages/orangeHrmElements";

Given('user navigates to the Orange Hrm application login page', async () => {
    await PageObject.navigateToUrl();
    await page.waitForLoadState('networkidle', { timeout: 100000 });
    logger.info("Going to the target application")
});

When('user enters {string} into {string} field', async function (value: string, fieldLabel: string) {
    ele.inputEleUsingLabel(fieldLabel).fill(value);
});

When('user enters {string} into {string} placeholder', async function (value: string, placeholderText: string) {
    ele.inputEleUsingPlaceholder(placeholderText).fill(value);
});

When('user enters {string} into {string} textarea', async function (value: string, placeholderText: string) {
    ele.textAreaEleUsingPlaceholder(placeholderText).fill(value);
});

When('user selects {string} from {string} dropdown', async function (dropdownValue: string, fieldLabel: string) {
    await ele.dropdownSelectByText(fieldLabel, dropdownValue);
});

When('user clicks on {string} button', async function (buttonText: string) {
    await page.getByRole('button').getByText(buttonText).last().click();
});

When('user clicks on {string} text', async function (text: string) {
    await page.getByText(text).click();
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

When('user clicks on the {string} toggle', async function (toggleText: string) {
    await ele.toggleEleUsingText(toggleText).click();
});

When('user clicks on {string} for {string} radio button', async function (option: string, radioButton: string) {
    await ele.radioButton(radioButton, option).click();
});

When('user selects {string} date from {string} field', async function (date: Date, dateField: string) {
    await ele.dateEleCalenderIcon(dateField).click();
    await ele.datePicker(date);
});

When('user uploads {string} file', async function (fileName: string) {
    const currentRepo = path.join(__dirname, '../');
    const infoFilePath = path.join(currentRepo, '/helper/attachments/');
    const filePath = path.join(infoFilePath, fileName);
    const fileInput = await page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);
});

When('user closes the notification banner', async function () {
    if(expect (ele.toastBannerCloseIcon().isVisible())){
        await ele.toastBannerCloseIcon().click();
    }
});