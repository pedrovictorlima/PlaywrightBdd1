🚀 Automação de Testes: Playwright + BDD (Gherkin)
Este projeto contém a automação de testes E2E utilizando Playwright e a estratégia de BDD (Behavior Driven Development) com Cucumber/Gherkin. A estrutura foi desenhada seguindo o padrão Page Object Model (POM) para garantir manutenção e escalabilidade.

🛠️ Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:

Node.js (Versão 18 ou superior)

VS Code (Opcional, mas recomendado)

📥 Instalação
Clone o repositório:

git clone [https://github.com/SEU_USUARIO/NOME_DO_REPO.git](https://github.com/pedrovictorlima/PlaywrightBdd1.git)
cd PlaywrightBdd1
Instale as dependências do projeto:

npm install

Instale os navegadores do Playwright:

npm install @cucumber/cucumber --save-dev

npx playwright install

🏃 Como Rodar os Testes
Como este projeto utiliza BDD, a execução ocorre em duas etapas (automatizadas ou manuais):

1. Gerar os arquivos de teste (BDD)
O Playwright não lê arquivos .feature nativamente. Precisamos "traduzi-los" para a pasta .features-gen:

npx bddgen

2. Executar os testes
Após gerar os arquivos, rode o comando padrão:

npx playwright test

📊 Ver o Relatório de Testes
Após a execução, um relatório detalhado será gerado. Para visualizá-lo, use:

npx playwright show-report

📁 Estrutura do Projeto
features/: Arquivos .feature escritos em Gherkin (especificações de negócio).

steps/: Implementação dos passos (Step Definitions) em TypeScript.

pages/: Implementação do Page Object Model (seletores e ações da tela).

.features-gen/: (Gerado automaticamente) Testes compilados para execução do Playwright.

playwright.config.ts: Configurações globais do framework (timeout, browsers, etc).

💡 Dicas Importantes
Configuração de Ambiente: Se o projeto possuir URLs diferentes, verifique o arquivo playwright.config.ts.

Erros de Leitura: Certifique-se de que a pasta .features-gen foi criada antes de rodar os testes. Se houver erro, apague a pasta e rode npx bddgen novamente.
