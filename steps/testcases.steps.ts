import { createBdd } from 'playwright-bdd';
import { TestCasesPage } from '../pages/TestCasesPage';

const { Given: Dado, When: Quando, Then: Entao } = createBdd();

Dado('que eu acesso a home do site', async ({ page }: { page: any }) => {
  await page.route('**/*googleadservices*', (route: any) => route.abort());
  await page.route('**/*doubleclick*', (route: any) => route.abort());
  await page.route('**/*ad-delivery*', (route: any) => route.abort());

  await page.goto('https://automationexercise.com');
  await page.waitForSelector('.navbar-nav', { timeout: 10000 });
});

Quando('eu clico no botão {string}', async ({ page }: { page: any }, nomeBotao: string) => {
  const botaoMenu = page.locator('.navbar-nav').getByRole('link', { name: nomeBotao });
  await botaoMenu.first().waitFor({ state: 'visible', timeout: 5000 });
  await botaoMenu.first().click({ force: true });
});

Entao('devo ser redirecionado para a página com a lista de casos de teste', async ({ page }: { page: any }) => {
  const testCasesPage = new TestCasesPage(page);
  await testCasesPage.validarPaginaTestCases();
});