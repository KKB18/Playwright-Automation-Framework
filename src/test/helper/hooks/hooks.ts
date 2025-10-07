import { BeforeAll, AfterAll, Before, After, AfterStep, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { browserManager } from '../browser/browserManager';
import fs from "fs-extra";
import { initBrowserRefs } from "../browser/browser";
import { createTestLogger } from "../logger/loggerManager";
import { startTracing, stopTracing } from "../config/tracingUtils";
import { writeSystemInfo } from "../config/systemInfo";
import { Logger } from "winston";

export let logger: Logger;
let hasPreviousFailure = false;

function isApiFeature(gherkinDocument: any): boolean {
    const uri = gherkinDocument?.uri?.replace(/\\/g, '/').toLowerCase();
    return uri?.includes('pactumjs/features');
}

setDefaultTimeout(60 * 1000 * 4);

BeforeAll(async function () {
    await browserManager.launchBrowser();
    await writeSystemInfo(
        browserManager.browser.browserType().name(),
        browserManager.browser.version()
    );
});

Before(async function ({ pickle, gherkinDocument }) {
    if (hasPreviousFailure && pickle.tags.some(tag => tag.name === '@SkipOnFailure')) {
        return 'skipped';
    }
    if (!isApiFeature(gherkinDocument)) {
        await browserManager.createContextAndPage();
        initBrowserRefs();
        await startTracing(browserManager.context, pickle.name + pickle.id, pickle.name);
    }
    logger = createTestLogger(pickle.name + pickle.id);
    
    const scenarioTags = pickle.tags.map(tag => tag.name).join(' ');
    if (scenarioTags) console.log(`${scenarioTags}`);
    console.log(`${pickle.name}`);
});

AfterStep(async function ({ pickle, gherkinDocument }) {
    if (!isApiFeature(gherkinDocument) && browserManager.page) {
        const img = await browserManager.page.screenshot({ path: "./ScreenShots/" + pickle.name + pickle.id + ".png", type: "png" });
        this.attach(img, "image/png");
        await browserManager.page.waitForLoadState('domcontentloaded', { timeout: 100000 });
    }
});

After(async function ({ pickle, result, gherkinDocument }) {
    try {
        if (!isApiFeature(gherkinDocument)) {
            const tracePath = `./test-results/trace/${pickle.id}.zip`;
            await stopTracing(browserManager.context, tracePath);

            if (browserManager.page) {
                let videoPath: string | null = null;
                try {
                    const temp = await browserManager.page.video()?.path();
                    videoPath = typeof temp === "string" ? temp : null;
                } catch (e) {
                    console.log("Error getting video path:", e);
                }

                if (result?.status === Status.FAILED && videoPath && fs.existsSync(videoPath)) {
                    this.attach(fs.readFileSync(videoPath), "video/webm");
                    const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${tracePath}</a>`;
                    this.attach(`Trace file: ${traceFileLink}`, 'text/html');
                }

                await browserManager.closePage();
            }

            if (browserManager.context) {
                await browserManager.closeContext();
            }
        }

        if (result?.status === Status.FAILED) {
            hasPreviousFailure = true;
        }
    } catch (error) {
        console.error("Error in After hook:", error);
    }
});

AfterAll(async function () {
    try {
        if (browserManager.browser) {
            await browserManager.closeBrowser();
        }
        if (logger) {
            logger.close();
        }
    } catch (error) {
        console.error("Error in AfterAll hook:", error);
    }
});