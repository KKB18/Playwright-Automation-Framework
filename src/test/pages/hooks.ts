import { BeforeAll, AfterAll, Before, After, AfterStep, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { getPage, launchBrowser, setBrowserPageContext } from '../helper/browsers/browser';
import { getEnv } from "../helper/env/env";
import { Logger, createLogger } from 'winston';
import { options } from "../helper/logger/logger";
import fs from "fs-extra";
import * as os from "os"
import path from "path";
import { Browser, BrowserContext, Page } from "playwright/test";

let page: Page;
let context: BrowserContext;
let browser: Browser;
import { Browser, BrowserContext, Page } from "playwright/test";

let page: Page;
let context: BrowserContext;
let browser: Browser;
export let logger: Logger;
export let browserVersion: string;

setDefaultTimeout(60 * 1000 * 4);


/* this overrides the environment variables and fetches it from env/.env.preProd file
invokeBrowser function launches the specific browser as per the value from env/.env.preProd */
BeforeAll(async function () {

    getEnv();
    browser = await launchBrowser();
    browser = await launchBrowser();
    // Get the browser and platform details for the html report
    const browserInfo = { name: browser.browserType().name(), version: browser.version() };
    const platformInfo = { name: os.platform(), version: os.release() };
    const info = { browser: browserInfo, platform: platformInfo };

    // Access the systemInfo.json file and update the values for the html report
    const currentRepo = path.join(__dirname, '../');
    const infoFilePath = path.join(currentRepo, '/helper/testData/systemInfo.json');
    await fs.writeJson(infoFilePath, info);

});


/* starts the recording of the video before the start of the scenario in the specified path 'dir' */
Before(async function ({ pickle }) {

    [context, page] = await setBrowserPageContext();
    [context, page] = await setBrowserPageContext();
    // Get the running device screen size and 
    const screenSize = await page.evaluate(() => {
        return {
            width: window.screen.width,
            height: window.screen.height,
        };
    });

    // Set the browser viewport to the screen size
    await page.setViewportSize({ width: screenSize.width, height: screenSize.height });
    await page.setViewportSize({ width: screenSize.width, height: screenSize.height });
    let scenarioName = pickle.name + pickle.id;
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true,
        snapshots: true
    });

    logger = createLogger(options(scenarioName));

});

AfterStep(async function ({ pickle }) {



    let scenarioName = pickle.name + pickle.id;
    // to take SS after each step and save it the specified path
    page = await getPage();
    page = await getPage();
    const img = await page.screenshot({ path: "./ScreenShots/" + scenarioName + ".png", type: "png" });
    // attach the SS to html report
    this.attach(img, "image/png");
    await page.waitForLoadState('networkidle', { timeout: 100000 });

});

After(async function ({ pickle, result }) {

    let temp = await page.video()?.path();
    let videoPath = typeof (temp) === "string" ? temp : "null";

    const tracePath = `./test-results/trace/${pickle.id}.zip`;
    await context.tracing.stop({ path: tracePath });

    // attach the video to the html report and trace if the scenario is failed 
    if (result?.status === Status.FAILED) {
        this.attach(fs.readFileSync(videoPath), "video/webm");
        const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${tracePath}</a>`
        this.attach(`Trace file: ${traceFileLink}`, 'text/html');
    }
    await page.close();
    await context.close();
});

AfterAll(async function () {

    await browser.close();
    logger.close();

});