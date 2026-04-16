// Generated from: features\autenticacao.feature
import { test } from "playwright-bdd";

test.describe('Autenticação de Usuário', () => {

  test.beforeEach('Contexto', async ({ Given, context, page }, testInfo) => { if (testInfo.error) return;
    await Given('que eu acesso a página de login', null, { context, page }); 
  });
  
  test('Registrar usuário com sucesso (TC-01)', async ({ When, Then, And, page }) => { 
    await When('eu realizo o cadastro completo de um novo usuário', null, { page }); 
    await Then('a conta deve ser criada com sucesso', null, { page }); 
    await And('eu excluo a conta', null, { page }); 
    await Then('a conta deve ser excluída com sucesso', null, { page }); 
  });

  test('Login com usuário correto (TC-02)', async ({ When, Then, page }) => { 
    await When('eu cadastro e faço login com um usuário válido', null, { page }); 
    await Then('devo visualizar o usuário logado', null, { page }); 
    await When('eu excluo a conta', null, { page }); 
    await Then('a conta deve ser excluída com sucesso', null, { page }); 
  });

  test('Login com usuário incorreto (TC-03)', async ({ When, Then, page }) => { 
    await When('eu faço login com "email_invalido@teste.com" e "senha123"', null, { page }); 
    await Then('devo ver a mensagem de erro "Your email or password is incorrect!"', null, { page }); 
  });

  test('Logout de usuário (TC-04)', async ({ When, Then, And, page }) => { 
    await When('eu cadastro e faço login com um usuário válido', null, { page }); 
    await And('eu clico no botão de logout', null, { page }); 
    await Then('devo ser redirecionado para a página de login', null, { page }); 
  });

  test('Registrar usuário com e-mail já existente (TC-05)', async ({ Given, When, Then, And, context, page }) => { 
    await Given('que eu acesso a página de login', null, { context, page }); 
    await When('eu realizo o cadastro completo de um novo usuário', null, { page }); 
    await And('eu clico no botão de logout', null, { page }); 
    await And('eu inicio o cadastro com "Pedro" e "email_repetido@teste.com"', null, { page }); 
    await Then('devo ver o erro de e-mail duplicado "Email Address already exist!"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\autenticacao.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":7,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Dado que eu acesso a página de login","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"Quando eu realizo o cadastro completo de um novo usuário","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Então a conta deve ser criada com sucesso","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"E eu excluo a conta","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Então a conta deve ser excluída com sucesso","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":13,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Dado que eu acesso a página de login","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"Quando eu cadastro e faço login com um usuário válido","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Então devo visualizar o usuário logado","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"Quando eu excluo a conta","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Então a conta deve ser excluída com sucesso","stepMatchArguments":[]}]},
  {"pwTestLine":24,"pickleLine":19,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Dado que eu acesso a página de login","isBg":true,"stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"Quando eu faço login com \"email_invalido@teste.com\" e \"senha123\"","stepMatchArguments":[{"group":{"start":18,"value":"\"email_invalido@teste.com\"","children":[{"start":19,"value":"email_invalido@teste.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":47,"value":"\"senha123\"","children":[{"start":48,"value":"senha123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Então devo ver a mensagem de erro \"Your email or password is incorrect!\"","stepMatchArguments":[{"group":{"start":28,"value":"\"Your email or password is incorrect!\"","children":[{"start":29,"value":"Your email or password is incorrect!","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":29,"pickleLine":23,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Dado que eu acesso a página de login","isBg":true,"stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"Quando eu cadastro e faço login com um usuário válido","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"E eu clico no botão de logout","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Então devo ser redirecionado para a página de login","stepMatchArguments":[]}]},
  {"pwTestLine":35,"pickleLine":28,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Dado que eu acesso a página de login","isBg":true,"stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Dado que eu acesso a página de login","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"Quando eu realizo o cadastro completo de um novo usuário","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"E eu clico no botão de logout","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"E eu inicio o cadastro com \"Pedro\" e \"email_repetido@teste.com\"","stepMatchArguments":[{"group":{"start":25,"value":"\"Pedro\"","children":[{"start":26,"value":"Pedro","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":35,"value":"\"email_repetido@teste.com\"","children":[{"start":36,"value":"email_repetido@teste.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":40,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"Então devo ver o erro de e-mail duplicado \"Email Address already exist!\"","stepMatchArguments":[{"group":{"start":36,"value":"\"Email Address already exist!\"","children":[{"start":37,"value":"Email Address already exist!","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end