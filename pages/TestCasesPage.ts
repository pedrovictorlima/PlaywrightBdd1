import { Page, expect, Locator } from "@playwright/test";

export class TestCasesPage {
    acessarTestCases() {
        throw new Error("Method not implemented.");
    }
    private readonly pageTitle: Locator;

    constructor(private readonly page: Page) {
        this.pageTitle = page.locator('b').filter({ hasText: 'Test Cases' });
    }

    async validarPaginaTestCases() {
        await expect(this.page).toHaveURL(/.*test_cases/, { timeout: 10000 });

        await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.pageTitle).toBeVisible();
    }
}