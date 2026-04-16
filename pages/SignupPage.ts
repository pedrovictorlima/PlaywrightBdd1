import { Page, expect } from "@playwright/test";

export class SignupPage {
  constructor(private page: Page) {}


  private get loginLink() {
    return this.page.getByRole('link', { name: 'Signup / Login' });
  }

  private get signupName() {
    return this.page.locator('[data-qa="signup-name"]');
  }

  private get signupEmail() {
    return this.page.locator('[data-qa="signup-email"]');
  }

  private get signupButton() {
    return this.page.locator('[data-qa="signup-button"]');
  }

  private get emailExistError() {
    return this.page.getByText(/Email Address already exist!/i);
  }

  private get titleMr() { return this.page.locator('#id_gender1'); }
  private get password() { return this.page.locator('#password'); }
  private get days() { return this.page.locator('#days'); }
  private get months() { return this.page.locator('#months'); }
  private get years() { return this.page.locator('#years'); }

  private get firstName() { return this.page.locator('#first_name'); }
  private get lastName() { return this.page.locator('#last_name'); }
  private get address() { return this.page.locator('#address1'); }
  private get country() { return this.page.locator('#country'); }
  private get state() { return this.page.locator('#state'); }
  private get city() { return this.page.locator('#city'); }
  private get zipcode() { return this.page.locator('#zipcode'); }
  private get mobile() { return this.page.locator('#mobile_number'); }

  private get createAccountBtn() {
    return this.page.locator('[data-qa="create-account"]');
  }

  private get accountCreatedMsg() {
    return this.page.getByText('Account Created!');
  }

  private get continueBtn() {
    return this.page.locator('[data-qa="continue-button"]');
  }

  private get deleteAccountBtn() {
    return this.page.locator('a[href="/delete_account"]');
  }

  private get accountDeletedMsg() {
    return this.page.getByText('Account Deleted!');
  }


  async irParaSignup() {
    await this.page.goto("https://automationexercise.com/");
    await this.page.waitForLoadState('domcontentloaded');
    await this.loginLink.click();

    await expect(this.signupName).toBeVisible();
  }

  async preencherCadastroInicial(nome: string, email?: string) {
    const emailFinal = email ?? `teste_${Date.now()}@mail.com`;

    console.log('📧 Email usado:', emailFinal);

    await this.signupName.fill(nome);
    await this.signupEmail.fill(emailFinal);
    await this.signupButton.click();

    return emailFinal;
  }

  async preencherDadosConta(senha: string = '123456') {
    await this.titleMr.check();
    await this.password.fill(senha);

    await this.days.selectOption('1');
    await this.months.selectOption('1');
    await this.years.selectOption('1990');
  }

  async preencherEndereco() {
    await this.firstName.fill('Pedro');
    await this.lastName.fill('Teste');
    await this.address.fill('Rua QA 123');

    await this.country.selectOption('Australia');

    await this.state.fill('SP');
    await this.city.fill('Santo Andre');
    await this.zipcode.fill('09000');
    await this.mobile.fill('11999999999');
  }

  async criarContaCompleta() {
  await this.page.locator('#password').waitFor({ state: 'visible' });

  await this.preencherDadosConta();
  await this.preencherEndereco();

  await this.createAccountBtn.click();
}

  async validarContaCriada() {
  await this.accountCreatedMsg.waitFor({ state: 'visible' });

  await this.continueBtn.click();

  await this.page.locator('text=Logged in as').waitFor();
}


  async validarEmailDuplicado() {
    await expect(this.emailExistError).toBeVisible();
  }


  async excluirConta() {
  await this.deleteAccountBtn.click();

  await this.accountDeletedMsg.waitFor({ state: 'visible' });

  await this.continueBtn.click();
}
}