import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    private readonly page: Page;
    private readonly loginLink: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly loggedInText: Locator;
    private readonly logoutLink: Locator;
    private readonly deleteAccountLink: Locator;
    private readonly accountDeletedText: Locator;
    private readonly continueButton: Locator;
    private readonly signupName: Locator;
    private readonly signupEmail: Locator;
    private readonly signupButton: Locator;
    
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: ' Signup / Login' });
        this.emailInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loggedInText = page.getByText(/Logged in as/i);
        this.logoutLink = page.locator('a[href="/logout"]');
        this.deleteAccountLink = page.getByRole('link', { name: ' Delete Account' });
        this.accountDeletedText = page.getByText('Account Deleted!');
        this.continueButton = page.getByRole('link', { name: 'Continue' });
        this.signupName = page.getByRole('textbox', { name: 'Name' });
        this.signupEmail = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signupButton = page.getByRole('button', { name: 'Signup' });
        this.errorMessage = page.locator('p[style*="color: red"], .login-form p');
    }


    async irParaLogin() {
        await this.page.goto("https://automationexercise.com/");
        await this.page.waitForLoadState('domcontentloaded');
        await this.loginLink.click();
    }

    async realizarLogin(email: string, senha: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(senha);
        await this.loginButton.click();
    }

    async realizarLogout() {
   
    await this.loggedInText.waitFor({ state: 'visible', timeout: 10000 });

    await this.logoutLink.waitFor({ state: 'visible', timeout: 10000 });

    await this.logoutLink.scrollIntoViewIfNeeded();

    await this.logoutLink.click();

    await this.page.locator('text=Login to your account').waitFor({ timeout: 10000 });
}

    async deletarConta() {
    await this.page.locator('a[href="/delete_account"]').click();
}

    async preencherCadastroInicial(nome: string, email: string) {
        await this.signupName.fill(nome);
        await this.signupEmail.fill(email);
        await this.signupButton.click({ force: true }); // 'force' ajuda com anúncios na frente
    }


    async validarUsuarioLogado() {
        await this.loggedInText.waitFor({ state: 'visible', timeout: 7000 });
        await expect(this.loggedInText).toBeVisible();
    }

    async validarMensagemErro(mensagem: string) {
        const erro = this.page.getByText(mensagem);
        await erro.waitFor({ state: 'visible', timeout: 5000 });
        await expect(erro).toBeVisible();
    }

    async validarPaginaLoginVisivel() {
        await expect(this.page.locator('text=Login to your account')).toBeVisible();
    }
}