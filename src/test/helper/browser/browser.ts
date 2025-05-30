import { Browser, BrowserContext, Page } from "playwright/test";
import { invokeBrowser } from "./browserManager";
import { logger } from "../hooks/hooks";

let page: Page;
let context: BrowserContext;
let browser: Browser;


export const launchBrowser = async (): Promise<Browser> => {
    browser = await invokeBrowser();
    return browser;
}

export const setBrowserPageContext = async (): Promise<[BrowserContext, Page]> => {
    browser = await launchBrowser();
    context = await browser.newContext({
        acceptDownloads: true,
        recordVideo: {
            dir: "test-results/videos"
        },
        // Add back the below when dealing with http authentication pop ups
        // httpCredentials: {
        //     username: 'admin',
        //     password: 'admin'
        // }
    });
    page = await context.newPage();
    return [context, page]
}

export const getPage = async (): Promise<Page> => {
    return page;
}

export const openTab = async (index: number) => {

    const pagesBefore = context.pages().length;
    if (pagesBefore < index) {
        // Perform the action that opens the new tab
        const newPage = await context.waitForEvent('page'); // Wait for the new tab to open
        // Wait for the new page to load completely
        await newPage.waitForLoadState();3
    }

    // Get all open pages (tabs) in the context
    const allTabs = context.pages();
    let targetTab = allTabs[index - 1] !== undefined ? allTabs[index - 1] : context.pages()[0];
    await targetTab.bringToFront();
    return page = targetTab;
}

export {
    page,
    context,
    browser,
    logger
};