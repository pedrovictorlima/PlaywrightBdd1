# 🚀 Automação de Testes E2E com Playwright + BDD (Cucumber)

Este projeto contém a automação de testes end-to-end (E2E) utilizando **Playwright** com **BDD (Behavior Driven Development)** usando **Cucumber/Gherkin**.

A arquitetura segue o padrão **Page Object Model (POM)**, garantindo organização, reutilização e escalabilidade.

---

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Git

---

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/pedrovictorlima/PlaywrightBdd1.git

```
Acesse a pasta do projeto:

```bash
cd PlaywrightBdd1

```
Instale as dependências:

```bash
npm install

```

Instale os navegadores do Playwright:

```bash
npx playwright install
```

▶️ Execução dos testes

Gerar os arquivos BDD:

```bash
npx bddgen


```
Executar os testes:

```bash
npx playwright test
```
🧠 Boas práticas aplicadas
Uso de BDD com Gherkin
Aplicação de Page Object Model (POM)
Separação de responsabilidades
Código reutilizável e escalável
