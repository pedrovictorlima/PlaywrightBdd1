import { createBdd } from 'playwright-bdd';
import { ContactPage } from '../pages/ContactPage';

const { Given, When, Then } = createBdd();

Given('que eu acesso a página de contato', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.irParaContato();
});

When('eu preencho o formulário com {string} e {string}', async ({ page }, nome, email) => {
  const contactPage = new ContactPage(page);
  await contactPage.preencherFormulario(nome, email, 'Assunto', 'Mensagem');
});

When('clico no botão de enviar', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.enviarFormulario();
});

Then('devo ver a mensagem de sucesso', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.validarEnvioComSucesso();
});