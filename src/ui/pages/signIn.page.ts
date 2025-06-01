import { SalesPortalPage } from "./salesPortal.page";

export class SignInPage extends SalesPortalPage {
  title = this.page.getByText('Sign in with');
  emailInput = this.page.locator("#emailinput");
  passwordInput = this.page.locator("#passwordinput");
  loginButton = this.page.getByRole('button', { name: 'Login' });

  uniqueElement = this.title;

  async fillCredentials(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}