import { BeforeAll, AfterAll, Before, After, AfterStep, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { Logger, createLogger } from 'winston';
import { options } from "../helper/logger/logger";
import fs from "fs-extra";
import * as os from "os"
import path from "path";

export let page: Page;
export let context: BrowserContext;
export let browser: Browser;
export let logger: Logger;
export let browserVersion: string;

/* this overrides the environment variables and fetches it from env/.env.preProd file
invokeBrowser function launches the specific browser as per the value from env/.env.preProd */
BeforeAll(async function () {

    getEnv();
    browser = await invokeBrowser();
    const browserInfo = { name: browser.browserType().name(), version: browser.version() };
    const platformInfo = { name: os.platform(), version: os.release() };
    const info = { browser: browserInfo, platform: platformInfo };
    const currentRepo = path.join(__dirname,'../');
    const infoFilePath = path.join(currentRepo,'/helper/testData/systemInfo.json');
    console.log(infoFilePath);
    await fs.writeJson(infoFilePath, info);
});


/* starts the recording of the video before the start of the scenario in the specified path 'dir' */
Before(async function ({ pickle }) {

    let scenarioName = pickle.name + pickle.id;
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos"
        }
    });

    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true,
        snapshots: true
    })

    page = await context.newPage();
    logger = createLogger(options(scenarioName));

});

AfterStep(async function ({ pickle }) {

    let scenarioName = pickle.name + pickle.id;
    // to take SS after each step and save it the specified path
    const img = await page.screenshot({ path: "./ScreenShots/" + scenarioName + ".png", type: "png" });
    // attach the SS to html report
    await this.attach(img, "image/png");

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