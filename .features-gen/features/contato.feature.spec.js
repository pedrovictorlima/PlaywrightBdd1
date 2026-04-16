// Generated from: features\contato.feature
import { test } from "playwright-bdd";

test.describe('Formulário de Contato', () => {

  test('Enviar mensagem com sucesso', async ({ Given, When, Then, And, page }) => { 
    await Given('que eu acesso a página de contato', null, { page }); 
    await When('eu preencho o formulário com "Pedro Victor" e "pedro@teste.com"', null, { page }); 
    await And('clico no botão de enviar', null, { page }); 
    await Then('devo ver a mensagem de sucesso', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\contato.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Dado que eu acesso a página de contato","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"Quando eu preencho o formulário com \"Pedro Victor\" e \"pedro@teste.com\"","stepMatchArguments":[{"group":{"start":29,"value":"\"Pedro Victor\"","children":[{"start":30,"value":"Pedro Victor","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"pedro@teste.com\"","children":[{"start":47,"value":"pedro@teste.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"E clico no botão de enviar","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Então devo ver a mensagem de sucesso","stepMatchArguments":[]}]},
]; // bdd-data-end