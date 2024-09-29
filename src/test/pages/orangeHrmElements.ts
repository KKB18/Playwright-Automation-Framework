import { assert } from "console";
import { page } from "./browser";
import { expect } from "playwright/test";

// Below Elements is generic and can be used entire application
export const eleUsingText = (text: string) => page.locator(`//*[text()="${text}"]`).first();
export const inputEleUsingLabel = (fieldLabel: string) => page.locator(`//label[contains(normalize-space(text()),"${fieldLabel}")]/ancestor::div[contains(@class,"input-group")]//input`);
export const inputValueUsingLabel = (fieldLabel: string) => page.locator(`//label[contains(normalize-space(text()),"${fieldLabel}")]/ancestor::div[contains(@class,"input-group")]//input//div`);
export const dropdownValueUsingLabel = (fieldLabel: string) => page.locator(`//label[contains(normalize-space(text()),"${fieldLabel}")]/ancestor::div[contains(@class,"input-group")]//div[contains(@class,"select-text-input")]`);
export const inputEleUsingPlaceholder = (placeholderText: string) => page.locator(`//input[normalize-space(@placeholder)="${placeholderText}"]`);
export const buttonEleUsingText = (buttonText: string) => page.locator(`//button[contains(text(),"${buttonText}")]`);
const dropdownIconUsingLabel = (dropdownName: string) => page.locator(`//label[contains(normalize-space(text()),"${dropdownName}")]/ancestor::div[contains(@class,"input-group")]//i[contains(@class,"select-text--arrow"]`);
const dropdownOptionUsingLabel = (dropdownValue: string) => page.locator(`//div[@role="option"]//span[normalize-space(text())="${dropdownValue}"]`);
export const dateEleUsingLabel = (fieldLabel: string) => page.locator(`//label[contains(normalize-space(text()),"${fieldLabel}")]/ancestor::div[contains(@class,"input-group")]//input`);
const dateEleCalenderIcon = (fieldLabel: string) => page.locator(`//label[contains(normalize-space(text()),"${fieldLabel}")]/ancestor::div[contains(@class,"input-group")]//input`);

// below Elements handle specific elements in the application
export const sideMenuExpandCollapseButton = () => page.locator(`//button[contains(@class,"main-menu-button")]//i`);
export const userDropdownIcon = () => page.locator(`//*[contains(@class,"userdropdown-icon")]`);

export const dropdownSelectByText = async (dropdownName: string, dropdownValue: string) => {
    await dropdownIconUsingLabel(dropdownName).click();
    await dropdownOptionUsingLabel(dropdownValue).click();
}

export const sideMenuClick = async (state: string) => {
    let classValue = await sideMenuExpandCollapseButton().getAttribute("class");
    let currentState = typeof (classValue) === "string" ? classValue : "NA";
    if (state == "collapses" && currentState.indexOf("left") !== -1) {
        await sideMenuExpandCollapseButton().click();
    } else if (state == "expands" && currentState.indexOf("right") !== -1) {
        await sideMenuExpandCollapseButton().click();
    } else if (currentState === "NA") {
        new Error("Not able to interact with side menu button");
    }
}