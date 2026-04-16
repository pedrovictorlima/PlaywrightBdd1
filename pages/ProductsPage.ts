import { Page, expect, Locator } from "@playwright/test";

export class ProductsPage {
    verDetalhesPrimeiroProduto() {
        throw new Error("Method not implemented.");
    }
    private readonly menuContainer: Locator;
    private readonly productsLink: Locator;
    private readonly allProductsHeader: Locator;

    constructor(private readonly page: Page) {
        this.menuContainer = page.locator('div').filter({ hasText: 'Home  Products Cart Signup' }).nth(2);
        this.productsLink = page.getByRole('link', { name: ' Products' });
        this.allProductsHeader = page.getByRole('heading', { name: 'All Products' });
    }

    async acessarProdutos() {
        await this.page.goto('https://automationexercise.com/');
        await this.menuContainer.click();
        await this.productsLink.click();
        await expect(this.allProductsHeader).toBeVisible();
    }

    // ✅ CORRIGIDO: validação genérica — não depende do produto "Blue Top" especificamente
    async validarDetalhesProduto() {
        // Garante que chegou na página de detalhes
        await expect(this.page).toHaveURL(/.*product_details/);

        // Valida campos que existem em QUALQUER produto do site
        await expect(this.page.locator('.product-information h2')).toBeVisible();           // Nome
        await expect(this.page.locator('.product-information p').filter({ hasText: 'Category' })).toBeVisible();
        await expect(this.page.locator('.product-information span span')).toBeVisible();    // Preço
        await expect(this.page.locator('.product-information p').filter({ hasText: 'Availability' })).toBeVisible();
        await expect(this.page.locator('.product-information p').filter({ hasText: 'Condition' })).toBeVisible();
        await expect(this.page.locator('.product-information p').filter({ hasText: 'Brand' })).toBeVisible();
    }

    async buscarProduto(nome: string) {
        await this.page.fill('#search_product', nome);
        await this.page.click('#submit_search');
        await this.page.waitForSelector('text=Searched Products');
    }
}