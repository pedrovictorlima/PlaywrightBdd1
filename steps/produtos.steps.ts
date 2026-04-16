import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

const { Given: Dado, When: Quando, Then: Entao } = createBdd();

// 1. Navegar até produtos com bloqueio de anúncios para evitar tela em branco
Dado('que eu navego até a página de produtos', async ({ page }: { page: any }) => {
  // Intercepta e aborta chamadas de anúncios antes que elas travem o navegador
  await page.route('**/*googleadservices*', (route: any) => route.abort());
  await page.route('**/*doubleclick*', (route: any) => route.abort());
  await page.route('**/*ad-delivery*', (route: any) => route.abort());

  const productsPage = new ProductsPage(page);
  
  // Usar o goto direto para a URL de produtos é mais estável que o clique no menu nesse site
  await page.goto('https://automationexercise.com/products');
  
  // Garante que a lista de produtos carregou antes de prosseguir
  await page.waitForSelector('.features_items', { timeout: 10000 });
});

// 2. Selecionar o primeiro produto com precisão
Quando('eu seleciono o primeiro produto para ver detalhes', async ({ page }: { page: any }) => {
  // O site tem vários links "View Product", o .first() resolve a ambiguidade (strict mode)
  const primeiroProduto = page.locator('.choose a').first();
  
  // force: true para clicar mesmo se houver algum banner invisível por cima
  await primeiroProduto.click({ force: true });
});

// 3. Validar detalhes dentro da página do produto
Entao('devo ver as informações de nome, categoria, preço e marca', async ({ page }: { page: any }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.validarDetalhesProduto();
});

// 4. Busca de produto com espera de segurança
Quando('eu busco pelo produto {string}', async ({ page }: { page: any }, nomeProduto: string) => {
  const productsPage = new ProductsPage(page);
  
  // Garante que o campo está pronto para receber texto
  const campoBusca = page.locator('#search_product');
  await campoBusca.waitFor({ state: 'visible' });
  
  await productsPage.buscarProduto(nomeProduto);
});

// 5. Validar o resultado da busca na listagem
Entao('o sistema deve exibir os produtos encontrados', async ({ page }: { page: any }) => {
  // Validando o título "SEARCHED PRODUCTS"
  await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
});