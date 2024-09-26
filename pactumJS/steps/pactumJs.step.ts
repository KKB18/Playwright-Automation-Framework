import { Given, Then, When, After, setWorldConstructor } from "@cucumber/cucumber";
import * as page from "../pages/pactumJs.page";
import fs from "fs-extra";

Given('user generates SAS Token using the powershell script {string}', async (fileName: string) => {
    await page.sasTokenGeneration(fileName);
});

Given('user generates access token', async () => {
    await page.bearerTokenGeneration;
});

Given('user makes a request for the product code {string} with body in filepath {string}', async (productCode: string, filepath: string) => {
    let res = await page.apiRequest(productCode, filepath);
    let jsonContent = fs.writeFileSync("./test-results/response.json", res);
}); 