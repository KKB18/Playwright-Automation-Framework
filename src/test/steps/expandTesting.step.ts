import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { pageNavigation } from "../pages/pageNavigation";
import { page, logger, browser, context, openTab } from '../browser/browser';
import path from "path";
import { ElementHandle } from 'playwright';


When('user clicks on shadow button', async function () {
    //Executes JavaScript in the browser context and returns a value directly (like a string, number, or a JSON-serializable object).
    let textContent = await page.evaluate(() => document.querySelector('#shadow-host')?.shadowRoot?.querySelector('#my-btn')?.textContent);
    console.log(textContent)

    // Get a handle to the shadow host element
    const shadowHostHandle = await page.$('#shadow-host');

    if (shadowHostHandle) {
        // Access the button within the shadow DOM
        const buttonHandle = await shadowHostHandle.evaluateHandle((host) => {
            return host.shadowRoot?.querySelector('#my-btn');
        });

        // Ensure the buttonHandle is not null and cast it to ElementHandle for DOM interaction
        if (buttonHandle) {
            // Cast to ElementHandle with 'as unknown as ElementHandle<Element>' to ensure compatibility
            await (buttonHandle as unknown as ElementHandle<Element>).click();
        } else {
            console.error("Button element not found in shadow DOM.");
        }
    } else {
        console.error("Shadow host element not found.");
    }
});