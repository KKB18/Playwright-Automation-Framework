import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";
import { getEnv } from "../helper/env/env";

function headlessStatus(): boolean {
    getEnv();
    let headless = typeof (process.env.npm_config_HEAD) === "string" ? process.env.npm_config_HEAD : process.env.HEAD;
    let hs = true;
    if (typeof (headless) === "string") {
        if (headless === "headless")
            hs = true;
        else if (headless === "headed")
            hs = false;
    }
    return hs;
}
const options: LaunchOptions = {
    headless: headlessStatus(),
    timeout: 100000,
    args: ['--start-fullscreen']
}
export const invokeBrowser = () => {
    let browserType = typeof (process.env.npm_config_BROWSER) === "string" ? process.env.npm_config_BROWSER : process.env.BROWSER;
    switch (browserType) {
        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error("Incorrect browser type ");
    }
}