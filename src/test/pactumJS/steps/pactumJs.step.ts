import { Given, Then, When, After, setWorldConstructor } from "@cucumber/cucumber";
import * as page from "../pages/pactumJs.page";

Given('user generates OAuth Token', async () => {
    await page.oAuthToken();
});

Given('user generates access token', async () => {
    await page.accessToken();
});

Given('user makes a get request to audio', async () => {
    await page.apiRequest();
}); 