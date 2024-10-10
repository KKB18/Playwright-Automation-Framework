import { DataTable, Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { PageObject } from "../pages/pageObject";
import { page, logger, browser, context } from '../pages/browser';
import * as user from '../helper/testData/Users.json'
import path from "path";
import * as ele from "../pages/orangeHrmElements";

Then('assert that {string} field has {string} value', async function (fieldLabel: string, expectedValue: string) {
    let actualValue = ele.inputValueUsingLabel(fieldLabel).textContent();
    await expect(actualValue).toEqual(expectedValue);
});

Then('assert that {string} dropdown has {string} value', async function (fieldLabel: string, expectedValue: string) {
    let actualValue = ele.dropdownValueUsingLabel(fieldLabel).textContent();
    await expect(actualValue).toEqual(expectedValue);
});

Then('assert that {string} text is displayed', async function (text: string) {
    await expect(ele.eleUsingText(text)).toBeVisible({ timeout: 10000 });
});

Then('assert that {string} text is not displayed', async function (text: string) {
    await expect(ele.eleUsingText(text)).toBeHidden();
});

Then('wait for {int} seconds', async function (waitTime: number) {
    await page.waitForTimeout(waitTime * 1000);
});

Then('assert that {string} status banner with {string} message is displayed', async function (status: string, message: string) {
    await expect(ele.toastMessage(status, message)).toBeVisible();
});

Then('wait for the spinner to close', async function () {
    if (ele.loadingSpinner() != undefined) {
        await ele.loadingSpinner().waitFor({ state: 'hidden', timeout: 5000 });
    }
});

Then('assert that below table is displayed', async function (table: DataTable) {
    let flag = false;
    const rows = table.rows();
    let dataFromGrid: string[][] = await ele.getGridData();

    for (let i = 0; i < rows.length; i++) {
        const columnsToValidate = rows[i];

        for (let j = 0; j < rows.length; j++) {
            let columnsFromGrid = dataFromGrid[j];
            try {
                for (let k = 0; k < columnsToValidate.length; k++) {

                    switch (columnsToValidate[k]) {
                        case "<<ignore>>": {
                            break;
                        }
                        case "<<not-empty>>": {
                            expect(columnsToValidate[k]).not.toBe("");
                            break;
                        }
                        default: {
                            expect(columnsToValidate[k]).toBe(columnsFromGrid[k]);
                        }
                    }
                    if (k == (columnsToValidate.length - 1)) {
                        flag = true;
                    }
                }
            }
            catch (e) {
                flag = false;
            }
            if (flag == true) {
                break;
            }
            if ((j === (dataFromGrid.length - 1)) && flag === false) {
                throw new Error("Could not find a match for row - " + (i + 1));
            }

        }
    }
});