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
    
    // 1. ADICIONE A DECLARAÇÃO AQUI
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
        
        // 2. ADICIONE O MAPEAMENTO AQUI
        this.signupName = page.getByRole('textbox', { name: 'Name' });
        this.signupEmail = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signupButton = page.getByRole('button', { name: 'Signup' });
        
        // Mapeia qualquer parágrafo ou texto que contenha mensagens de erro comuns no site
        this.errorMessage = page.locator('p[style*="color: red"], .login-form p');
    }

    // --- AÇÕES ---

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
    // 🔥 garante que está logado
    await this.loggedInText.waitFor({ state: 'visible', timeout: 10000 });

    // 🔥 espera o botão aparecer de verdade
    await this.logoutLink.waitFor({ state: 'visible', timeout: 10000 });

    // 🔥 garante que está clicável
    await this.logoutLink.scrollIntoViewIfNeeded();

    // 🔥 clique confiável
    await this.logoutLink.click();

    // 🔥 valida que voltou pra tela de login
    await this.page.locator('text=Login to your account').waitFor({ timeout: 10000 });
}

    async deletarConta() {
    // Clica no link de excluir conta no menu superior
    await this.page.locator('a[href="/delete_account"]').click();
}

    async preencherCadastroInicial(nome: string, email: string) {
        await this.signupName.fill(nome);
        await this.signupEmail.fill(email);
        await this.signupButton.click({ force: true }); // 'force' ajuda com anúncios na frente
    }

    // --- VALIDAÇÕES ---

    async validarUsuarioLogado() {
        // Espera o texto aparecer. O "timeout" ajuda se o site estiver lento.
        await this.loggedInText.waitFor({ state: 'visible', timeout: 7000 });
        await expect(this.loggedInText).toBeVisible();
    }

    async validarMensagemErro(mensagem: string) {
        // Busca o texto da mensagem dinamicamente para garantir que o TC-03 e TC-05 passem
        const erro = this.page.getByText(mensagem);
        await erro.waitFor({ state: 'visible', timeout: 5000 });
        await expect(erro).toBeVisible();
    }

    async validarPaginaLoginVisivel() {
        // Verifica se o título "Login to your account" está na tela
        await expect(this.page.locator('text=Login to your account')).toBeVisible();
    }
}