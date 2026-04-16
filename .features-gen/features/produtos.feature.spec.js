// Generated from: features\produtos.feature
import { test } from "playwright-bdd";

test.describe('Gestão de Produtos', () => {

  test('Verificar detalhes do primeiro produto', async ({ Given, When, Then, page }) => { 
    await Given('que eu navego até a página de produtos', null, { page }); 
    await When('eu seleciono o primeiro produto para ver detalhes', null, { page }); 
    await Then('devo ver as informações de nome, categoria, preço e marca', null, { page }); 
  });

  test('Buscar por um produto específico', async ({ Given, When, Then, page }) => { 
    await Given('que eu navego até a página de produtos', null, { page }); 
    await When('eu busco pelo produto "Blue Top"', null, { page }); 
    await Then('o sistema deve exibir os produtos encontrados', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\produtos.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Dado que eu navego até a página de produtos","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"Quando eu seleciono o primeiro produto para ver detalhes","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Então devo ver as informações de nome, categoria, preço e marca","stepMatchArguments":[]}]},
  {"pwTestLine":12,"pickleLine":9,"tags":[],"steps":[{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Dado que eu navego até a página de produtos","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"Quando eu busco pelo produto \"Blue Top\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Blue Top\"","children":[{"start":23,"value":"Blue Top","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Então o sistema deve exibir os produtos encontrados","stepMatchArguments":[]}]},
]; // bdd-data-end