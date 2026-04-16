import { Page, expect, Locator } from "@playwright/test";

export class ContactPage {
    private readonly contactUsLink: Locator;
    private readonly getInTouchHeader: Locator;
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly subjectInput: Locator;
    private readonly messageInput: Locator;
    private readonly submitButton: Locator;
    private readonly successMessage: Locator;

    constructor(private readonly page: Page) {
        this.contactUsLink = this.page.getByRole('link', { name: ' Contact us' });
        this.getInTouchHeader = this.page.getByRole('heading', { name: 'Get In Touch' });
        this.nameInput = this.page.getByRole('textbox', { name: 'Name' });
        this.emailInput = this.page.getByRole('textbox', { name: 'Email', exact: true });
        this.subjectInput = this.page.getByRole('textbox', { name: 'Subject' });
        this.messageInput = this.page.getByRole('textbox', { name: 'Your Message Here' });
        this.submitButton = this.page.locator('input[data-qa="submit-button"]');
        this.successMessage = this.page.locator('.status.alert-success');
    }

    async irParaContato() {
        await this.page.goto("https://automationexercise.com");
        await this.page.locator('div').filter({ hasText: 'Home  Products Cart Signup' }).nth(2).click();
        await this.contactUsLink.click();
        await this.getInTouchHeader.click();
    }

    async preencherFormulario(nome: string, email: string, assunto: string, mensagem: string) {
        await this.nameInput.fill(nome);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(assunto);
        await this.messageInput.fill(mensagem);
    }

    async enviarFormulario() {
        this.page.once('dialog', async dialog => {
            console.log(`Pop-up detectado: ${dialog.message()}`);
            await dialog.accept();
        });

        await this.submitButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.submitButton.click({ force: true });
        await this.page.waitForTimeout(1000);
    }

    async validarEnvioComSucesso() {
        await this.successMessage.click(); 
        await expect(this.successMessage).toBeVisible({ timeout: 10000 });
        await expect(this.successMessage).toContainText('Success! Your details have been submitted successfully.');
    }
}