import { page } from "./browser";

export const hyperlinkTextEle = async (hyperlinkText: string) => await page.locator(`//a[normalize-space(text())="${hyperlinkText}"]`);
export const hyperlinkTitleEle = async (hyperlinkText: string) => await page.locator(`//a[normalize-space(@title)="${hyperlinkText}"]`);

export const textBoxLabelEle = async (labelText: string) => await page.locator(`//label[normalize-space(text())="${labelText}"]/ancestor::div[1]//input[@type="text"]`);