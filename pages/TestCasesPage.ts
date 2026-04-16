import { Page, expect, Locator } from "@playwright/test";

export class TestCasesPage {
    acessarTestCases() {
        throw new Error("Method not implemented.");
    }
    private readonly pageTitle: Locator;

    constructor(private readonly page: Page) {
        // ✅ CORRIGIDO: seletor mais confiável para o título da página
        this.pageTitle = page.locator('b').filter({ hasText: 'Test Cases' });
    }

    async validarPaginaTestCases() {
        // Aguarda a URL mudar para test_cases
        await expect(this.page).toHaveURL(/.*test_cases/, { timeout: 10000 });

        // Valida que o conteúdo da página carregou
        await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.pageTitle).toBeVisible();
    }
}