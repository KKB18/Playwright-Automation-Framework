import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { PageObject } from "../pages/pageObject";
import { page, logger, browser, context } from '../pages/browser';
import * as user from '../helper/testData/Users.json'
import path from "path";
setDefaultTimeout(60 * 1000 * 2);

Given('user navigates to the application', async () => {
    await PageObject.navigateToUrl();
    await page.waitForLoadState('networkidle');
    logger.info("Going to the target application")
});

Then('assert that {string} message is displayed on the Login Screen', async function (textMessage: string) {
    const appMessage = await page.locator(`//div[@id="app-message"]`);
    await expect(await appMessage).toHaveText(textMessage);
});

When('user enters {string} into UserName', async function (userName: string) {
    await page.locator(`//input[@id="usernamefield"]`).fill(user.defaultUser);
});

When('user enters {string} into Password', async function (password: string) {
    await page.locator(`//input[@id="passwordfield"]`).fill(user.password);
});

When('user clicks on {string} button', async function (buttonText: string) {
    const button = await page.locator(`//button[normalize-space(text())="${buttonText}"]`);
    await button.isEnabled();
    await button.click();
    let url = typeof (process.env.npm_config_BASEURL) === "string" ? process.env.npm_config_BASEURL : "null";
    await page.waitForURL(url + "/Home_Dashboard?InitialLoad=true", { timeout: 100000, waitUntil: "networkidle" });
});

Then('assert that {string} text is displayed', async function (text: string) {
    const message = await page.locator(`//*[normalize-space(text())="${text}"]`).first();
    await expect(await message).toBeVisible();
});

When('user clicks on {string} title', async function (title: string) {
    const ele = await page.locator(`//*[@title="${title}"]`).first();
    await ele.isVisible();
    await ele.click();
});

When("user opens the loan {string}", async function (loanId: string) {
    const searchIcon = await page.locator('//button[@aria-label="Search"]');
    await searchIcon.waitFor({ state: "visible", timeout: 20000 });
    await searchIcon.click();
    const searchBar = await page.locator('//input[@title="Search by Borrower Name, Loan ID, Address"]');
    await searchBar.waitFor({ state: "visible", timeout: 20000 });
    await searchBar.click();
    await page.keyboard.type(loanId);
    await page.locator('//*[@id="loan-search-submit-button"]').click();
    await page.locator('//*[@titleinput="All Loans"]//div[@class="loan-row"]').click();
    await page.waitForTimeout(20000);
    const activeLoanTab = await page.locator('//span[@id="activeLoanIdText"][contains(text(),"5000059585")]');
    await searchIcon.waitFor({ state: "visible", timeout: 100000 });
});

When('user clicks on checkbox for the the document {string}', async function (docName: string) {
    const ele = (docName: string) => page.locator(`//div[contains(@class,"dx-datagrid-content ")]//a[@title="${docName}"]/ancestor::tr//td[1]//div[@role="checkbox"]`).first();
    await ele(docName).isVisible();
    await ele(docName).click();
});

When('user opens the document in document viewer', async function () {
    await page.locator(`//button[@id="quickActionsMenu"]`).click();
    await page.locator(`//button[contains(text(),"View & Manage")]`).click();
    await page.waitForTimeout(20000);
    const pages = await context.pages();
    await pages[1].bringToFront();
    await page.waitForTimeout(20000);
    await pages[1].locator(`//viewer[1]//button[@title="Zoom In"]`).click();
    await pages[1].locator(`//viewer[1]//button[@aria-label="Advanced options"]//i`).isVisible();
    await pages[1].locator(`//viewer[1]//button[@aria-label="Advanced options"]//i`).click();
    await pages[1].waitForTimeout(10000);
    const download = await Promise.all([
        pages[1].waitForEvent("download"),
        pages[1].click(`//viewer[1]//a[@title="Save As"]`)
    ]);
    const fileName = await download[0].suggestedFilename();
    console.log(fileName);
    const currentRepo = path.join(__dirname,'../../..');
    console.log(currentRepo);
    const filepath = path.join(currentRepo,'test-results');
    console.log(filepath);
    await download[0].saveAs(filepath + "/" + fileName);
});
