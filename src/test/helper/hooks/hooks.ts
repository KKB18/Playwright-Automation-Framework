import { BeforeAll, AfterAll, Before, After, AfterStep, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { browserManager } from '../browser/browserManager';

import fs from "fs-extra";
import { initBrowserRefs } from "../browser/browser";
import { createTestLogger } from "../logger/loggerManager";
import { startTracing, stopTracing } from "../config/tracingUtils";
import { writeSystemInfo } from "../config/systemInfo";
import { Logger } from "winston";

export let logger: Logger;

setDefaultTimeout(60 * 1000 * 4);

BeforeAll(async function () {
    await browserManager.launchBrowser();
    await writeSystemInfo(
        browserManager.browser.browserType().name(),
        browserManager.browser.version()
    );
});

Before(async function ({ pickle }) {
    await browserManager.createContextAndPage();
    logger = createTestLogger(pickle.name + pickle.id);
    await browserManager.page.setViewportSize({ width: 1420, height: 741 });
    await startTracing(browserManager.context, pickle.name + pickle.id, pickle.name);
    initBrowserRefs();
});

AfterStep(async function ({ pickle }) {
    const img = await browserManager.page.screenshot({ path: "./ScreenShots/" + pickle.name + pickle.id + ".png", type: "png" });
    this.attach(img, "image/png");
    await browserManager.page.waitForLoadState('domcontentloaded', { timeout: 100000 });
});

After(async function ({ pickle, result }) {
    let temp = await browserManager.page.video()?.path();
    let videoPath = typeof (temp) === "string" ? temp : "null";
    const tracePath = `./test-results/trace/${pickle.id}.zip`;
    await stopTracing(browserManager.context, tracePath);
    if (result?.status === Status.FAILED) {
        this.attach(fs.readFileSync(videoPath), "video/webm");
        const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${tracePath}</a>`;
        this.attach(`Trace file: ${traceFileLink}`, 'text/html');
    }
    await browserManager.page.close();
    await browserManager.context.close();
});

AfterAll(async function () {
    await browserManager.browser.close();
    logger.close();
});