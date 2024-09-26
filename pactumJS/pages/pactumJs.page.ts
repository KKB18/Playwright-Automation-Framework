import * as pact from "pactum";
import { spawnSync } from "child_process";
import path from "path";

export let sasToken: string = "";
export let bearerToken: string = "";
export const homeDir = path.join(__dirname, '../..');
export const psFilePath = (fileName: string) => path.join(homeDir, `pactumJS/utils/${fileName}`);

export const sasTokenGeneration = async (fileName: string) => {
    const result = spawnSync('powershell', ['-File', psFilePath(fileName)]);
    if (result.error) {
        console.error(`Error: ${result.error.message}`);
    }
    const output = result.stdout.toString();
    const filteredOutput = output.substring(output.indexOf('sv='), output.length);
    sasToken = filteredOutput;
};

export const bearerTokenGeneration = async () => {
    const response = await pact.spec()
        .post('url')
        .withHeaders('Content-Type', 'application/x-www-form-urlencoded')
        .withBody({
            grant_type: "client_credentials",
            client_id: "",
            client_secret: "",
            scope: ""
        })
        .expectStatus(200)
        .toss();
    bearerToken = response.body;
};

export const apiRequest = async (productCode: string, filePath: string) => {
    pact.request.setDefaultTimeout(30000);
    let file = path.join(homeDir, filePath);
    let response = pact.spec()
        .withHeaders("Content-Type", "application/xml")
        .withHeaders("ProductCode", productCode)
        .withBody({
            file: file
        })
        .withBearerToken(bearerToken)
        .post(' ')
        .expectStatus(201)
    const responseJson = JSON.stringify(response);
    return responseJson
};