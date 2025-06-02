import { Modal } from "./modal.page";

export class FilterModal extends Modal {
  readonly applyButton = this.uniqueElement.getByRole("button", { name: "Apply" });
  readonly clearFiltersButton = this.uniqueElement.getByRole("button", { name: "Clear Filters" });

  readonly checkbox = (name: string) => this.uniqueElement.locator(`input[value="${name}"]`);

  async checkFilters(...value: string[]) {
    for (const v of value) {
      await this.checkbox(v).check();
    }
  }

  async clickApply() {
    await this.applyButton.click();
  }

  async clickClearFilters() {
    await this.clearFiltersButton.click();
  }
}