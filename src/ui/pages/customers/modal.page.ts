import { expect } from "@playwright/test";
import { SalesPortalPage } from "ui/pages/salesPortal.page";

export abstract class Modal extends SalesPortalPage {
  readonly uniqueElement = this.page.locator('div[role="dialog"]');

  readonly title = this.uniqueElement.locator('.modal-title');
  readonly closeButton = this.uniqueElement.locator('button[aria-label="Close"]');

  async close() {
    await this.closeButton.click();
    await this.waitForClosed();
  }

  async waitForClosed() {
    await expect(this.uniqueElement).not.toBeVisible();
  }
}