// Generated from: features\test_cases.feature
import { test } from "playwright-bdd";

test.describe('Verificação de Casos de Teste', () => {

  test('Acessar página de Test Cases', async ({ Given, When, Then, page }) => { 
    await Given('que eu acesso a home do site', null, { page }); 
    await When('eu clico no botão "Test Cases"', null, { page }); 
    await Then('devo ser redirecionado para a página com a lista de casos de teste', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\test_cases.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Dado que eu acesso a home do site","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"Quando eu clico no botão \"Test Cases\"","stepMatchArguments":[{"group":{"start":18,"value":"\"Test Cases\"","children":[{"start":19,"value":"Test Cases","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Então devo ser redirecionado para a página com a lista de casos de teste","stepMatchArguments":[]}]},
]; // bdd-data-end