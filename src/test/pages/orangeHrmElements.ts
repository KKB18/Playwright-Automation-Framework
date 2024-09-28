import { assert } from "console";
import { page } from "./browser";

// Below Elements is generic and can be used entire application
export const eleUsingText = (text: string) => page.locator(`//*[normalize-space(text())="${text}"]`).first();
export const inputEleUsingLabel = (fieldLabel: string) => page.locator(`//label[contains(normalize-space(text()),"${fieldLabel}")]/ancestor::div[contains(@class,"input-group")]//input`);
export const inputValueUsingLabel = (fieldLabel: string) => page.locator(`//label[contains(normalize-space(text()),"${fieldLabel}")]/ancestor::div[contains(@class,"input-group")]//input//div`);
export const dropdownValueUsingLabel = (fieldLabel: string) => page.locator(`//label[contains(normalize-space(text()),"${fieldLabel}")]/ancestor::div[contains(@class,"input-group")]//div[contains(@class,"select-text-input")]`);
export const inputEleUsingPlaceholder = (placeholderText: string) => page.locator(`//input[normalize-space(@placeholder)="${placeholderText}"]`);
export const buttonEleUsingText = (buttonText: string) => page.locator(`//button[text()=" ${buttonText} "]`);
const dropdownIconUsingLabel = (dropdownName: string) => page.locator(`//label[contains(normalize-space(text()),"${dropdownName}")]/ancestor::div[contains(@class,"input-group")]//i[contains(@class,"select-text--arrow"]`);
const dropdownOptionUsingLabel = (dropdownValue: string) => page.locator(`//div[@role="option"]//span[normalize-space(text())="${dropdownValue}"]`);

// below Elements handle specific elements in the application
export const mainMenuItemEle = (elements: string) => page.locator(`//*[text()="${elements}"]`);
export const sideMenuExpandCollapseButton = () => page.locator(`//button[contains(@class,"main-menu-button")]`);



export const dropdownSelectByText = async (dropdownName: string, dropdownValue: string) => {
    await dropdownIconUsingLabel(dropdownName).click();
    await dropdownOptionUsingLabel(dropdownValue).click();
    assert
}