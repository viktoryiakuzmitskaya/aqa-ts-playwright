import { Modal } from "./modal.page";

export class DeleteModal extends Modal {
  readonly deleteButton = this.uniqueElement.getByRole("button", { name: "Yes, Delete" });

  async clickDelete() {
    await this.deleteButton.click();
  }
}