import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

const { Given: Dado, When: Quando, Then: Entao } = createBdd();

Dado('que eu navego até a página de produtos', async ({ page }: { page: any }) => {
  await page.route('**/*googleadservices*', (route: any) => route.abort());
  await page.route('**/*doubleclick*', (route: any) => route.abort());
  await page.route('**/*ad-delivery*', (route: any) => route.abort());

  const productsPage = new ProductsPage(page);
  
  await page.goto('https://automationexercise.com/products');
  await page.waitForSelector('.features_items', { timeout: 10000 });
});

Quando('eu seleciono o primeiro produto para ver detalhes', async ({ page }: { page: any }) => {
  const primeiroProduto = page.locator('.choose a').first();
  await primeiroProduto.click({ force: true });
});

Entao('devo ver as informações de nome, categoria, preço e marca', async ({ page }: { page: any }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.validarDetalhesProduto();
});

Quando('eu busco pelo produto {string}', async ({ page }: { page: any }, nomeProduto: string) => {
  const productsPage = new ProductsPage(page);
  
  const campoBusca = page.locator('#search_product');
  await campoBusca.waitFor({ state: 'visible' });
  
  await productsPage.buscarProduto(nomeProduto);
});

Entao('o sistema deve exibir os produtos encontrados', async ({ page }: { page: any }) => {
  await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
});