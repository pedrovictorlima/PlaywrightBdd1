import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';

const { Given: Dado, When: Quando, Then: Entao } = createBdd();

let emailGerado: string;
const senhaPadrao = '123456';

async function bloquearAds(page: any) {
  // Bloqueia uma lista extensa de domínios de anúncios e rastreio
  const adsAndTrackers = [
    '**/googleads.g.doubleclick.net/**',
    '**/pagead2.googlesyndication.com/**',
    '**/tpl.googlesyndication.com/**',
    '**/www.googletagservices.com/**',
    '**/google-analytics.com/**',
    '**/connect.facebook.net/**',
    '**/adservice.google.com/**',
    '**/adservice.google.com.br/**',
  ];

  for (const pattern of adsAndTrackers) {
    await page.route(pattern, (route: any) => route.abort());
  }

  // Aborta qualquer requisição que contenha "ads" ou "static" de servidores de terceiros
  await page.route('**/*', (route: any) => {
    const url = route.request().url();
    if (url.includes('googleads') || url.includes('adsbygoogle') || url.includes('vignette')) {
      return route.abort();
    }
    return route.continue();
  });
}

// ----------------------
// ACESSO E LIMPEZA
// ----------------------

Dado('que eu acesso a página de login', async ({ page, context }) => {
  await context.clearCookies();
  await bloquearAds(page);
  // Injeta CSS para esconder qualquer container de anúncio remanescente
  await page.addStyleTag({
    content: `
      #google_esf, .adsbygoogle, #aswift_0_expand, #aswift_0_anchor, 
      iframe[id^="aswift"], ins.adsbygoogle, #dismiss-button, 
      .google-anno-skip, #ad_iframe, .vignette-ads { 
        display: none !important; 
        visibility: hidden !important; 
        pointer-events: none !important;
        height: 0 !important; 
        width: 0 !important;
      }
      body { overflow: auto !important; } /* Destrava o scroll se o anúncio congelar a tela */
    `
  });
  
  const loginPage = new LoginPage(page);
  await loginPage.irParaLogin();

  // 🔥 REMOÇÃO VISUAL: Esconde elementos de anúncios via CSS injetado
  await page.addStyleTag({
    content: `
      #google_esf, .adsbygoogle, #aswift_0_expand, #aswift_0_anchor, 
      iframe[id^="aswift"], ins.adsbygoogle, #dismiss-button { 
        display: none !important; 
        visibility: hidden !important; 
        height: 0 !important; 
      }
    `
  });

  const logoutBtn = page.locator('a[href="/logout"]');
  if (await logoutBtn.isVisible()) {
      await logoutBtn.click({ force: true });
  }
});

// ----------------------
// CADASTRO
// ----------------------

// AJUSTADO PARA O TC-01
Quando('eu realizo o cadastro completo de um novo usuário', async ({ page }) => {
  const signup = new SignupPage(page);
  emailGerado = `pedro_qa_${Date.now()}@teste.com`;
  await signup.preencherCadastroInicial('Pedro Victor', emailGerado);
  await signup.criarContaCompleta(); 

  // ADICIONADO AQUI: Força o clique no continue após o cadastro do TC-01
  const continueBtn = page.locator('[data-qa="continue-button"]');
  await continueBtn.waitFor({ state: 'visible' });
  await continueBtn.click({ force: true });
});

// AJUSTADO PARA O TC-05
Quando('eu cadastro um usuário válido', async ({ page }) => {
  const signup = new SignupPage(page);
  emailGerado = `pedro_qa_${Date.now()}@teste.com`;
  await signup.preencherCadastroInicial('Pedro Victor', emailGerado);
  await signup.criarContaCompleta();

  // ADICIONADO AQUI TAMBÉM:
  const continueBtn = page.locator('[data-qa="continue-button"]');
  await continueBtn.waitFor({ state: 'visible' });
  await continueBtn.click({ force: true });
});

Entao('a conta deve ser criada com sucesso', async ({ page }) => {
  // Como já clicamos no continue, validamos que estamos logados ou a URL mudou
  await expect(page.locator('text=Logged in as')).toBeVisible();
});

// ----------------------
// LOGIN E LOGOUT
// ----------------------

Quando('eu cadastro e faço login com um usuário válido', async ({ page }) => {
  const signup = new SignupPage(page);
  const login = new LoginPage(page);

  emailGerado = `pedro_qa_${Date.now()}@teste.com`;
  await signup.preencherCadastroInicial('Pedro Victor', emailGerado);
  await signup.criarContaCompleta();
  
  // CLIQUE NO CONTINUE (JÁ ESTAVA AQUI)
  const continueBtn = page.locator('[data-qa="continue-button"]');
  await continueBtn.waitFor({ state: 'visible' });
  await continueBtn.click({ force: true }); // Adicionei o force: true aqui também

  const logoutBtn = page.locator('a[href="/logout"]');
  await logoutBtn.waitFor({ state: 'visible' });
  await logoutBtn.click();

  await login.irParaLogin();
  await login.realizarLogin(emailGerado, senhaPadrao);
});

Quando('eu clico no botão de logout', async ({ page }) => {
  await page.locator('a[href="/logout"]').click({ force: true });
});

Entao('devo visualizar o usuário logado', async ({ page }) => {
  await expect(page.locator('text=Logged in as')).toBeVisible();
});

Entao('devo ser redirecionado para a página de login', async ({ page }) => {
  await expect(page).toHaveURL(/.*login/);
});

// ----------------------
// EXCLUSÃO E ERROS
// ----------------------

Quando('eu excluo a conta', async ({ page }) => {
  const login = new LoginPage(page);
  await login.deletarConta();
});

Entao('a conta deve ser excluída com sucesso', async ({ page }) => {
  // 1. Localiza a mensagem e o botão
  const msgDeletada = page.getByText('Account Deleted!', { exact: false });
  const continueBtn = page.locator('[data-qa="continue-button"]');

  // 2. Espera a mensagem de confirmação aparecer
  await expect(msgDeletada).toBeVisible({ timeout: 10000 });

  // 3. O PULO DO GATO: Espera a navegação acontecer ao mesmo tempo que clica
  // Isso evita que o teste feche antes do site processar o clique
  await Promise.all([
    page.waitForURL('https://automationexercise.com/', { timeout: 10000 }),
    continueBtn.click({ force: true })
  ]);

  // 4. Validação final de segurança
  await expect(page).toHaveURL('https://automationexercise.com/');
});

Quando('eu faço login com {string} e {string}', async ({ page }, email, senha) => {
  const login = new LoginPage(page);
  await login.realizarLogin(email, senha);
});

Entao('devo ver a mensagem de erro {string}', async ({ page }, mensagem) => {
  await expect(page.getByText(mensagem)).toBeVisible();
});

Quando('eu inicio o cadastro com {string} e {string}', async ({ page }, nome: string, email: string) => {
  const signup = new SignupPage(page);
  const emailParaUsar = (email === "email_repetido@teste.com") ? emailGerado : email;
  await signup.preencherCadastroInicial(nome, emailParaUsar);
});

Entao('devo ver o erro de e-mail duplicado {string}', async ({ page }, mensagem: string) => {
  const erroMensagem = page.locator('form[action="/signup"] p');
  await expect(erroMensagem).toContainText(mensagem);
});