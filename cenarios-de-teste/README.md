# 📁 Engenharia de Qualidade (QA) - Projeto BugBank

Este repositório contém a suíte completa de **Garantia da Qualidade (QA)** e **Automação de Testes E2E** da aplicação bancária digital **BugBank**, estruturada com as melhores práticas da indústria (Page Object Model, CI/CD, Gherkin BDD, Geração de Relatórios e Faker).

---

## 🏗️ Arquitetura e Pilares do Projeto

```text
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── bug_report.md             # Template padronizado de abertura de bugs
│   └── workflows/
│       └── cypress.yml               # Pipeline de CI/CD automática via GitHub Actions
├── cenarios-de-teste/
│   ├── PLANO_DE_TESTES.md            # Especificação detalhada de Casos de Teste (CT-01 a CT-35)
│   ├── cenarios.feature              # Cenários de Teste em formato BDD / Gherkin
│   └── README.md                     # Este sumário
├── cypress/
│   ├── e2e/
│   │   └── bugbank.cy.js             # Suíte de testes automatizados com Cypress
│   ├── fixtures/
│   │   ├── usuarios.json             # Dados estáticos de apoio
│   │   └── transferencias.json       # Dados de transações
│   ├── reports/                      # Relatórios visuais gerados pelo Mochawesome
│   └── support/
│       ├── commands.js               # Comandos customizados (cy.login, cy.cadastrarConta, etc.)
│       ├── factories/
│       │   └── UserFactory.js        # Geração de massa dinâmica com @faker-js/faker
│       └── pages/                    # Design Pattern: Page Object Model (POM)
│           ├── LoginPage.js
│           ├── RegisterPage.js
│           ├── HomePage.js
│           ├── TransferPage.js
│           └── StatementPage.js
├── cypress.config.js                 # Configuração do Cypress, baseUrl e Mochawesome
└── package.json                      # Scripts de execução rápida e dependências
```

---

## 🚀 Como Executar os Testes

No terminal, na pasta raiz do projeto, você pode usar os seguintes comandos:

```bash
# Abrir a interface visual do Cypress (Interativo)
npm run cy:open

# Executar todos os testes em modo headless (Terminal)
npm run cy:run

# Executar especificamente no Google Chrome
npm run cy:run:chrome

# Executar e gerar o Relatório Visual HTML (Mochawesome)
npm run cy:report
```

---

## 📊 Relatórios Visuais de Execução
Ao executar `npm run cy:report`, um dashboard completo em HTML é gerado em `cypress/reports/index.html` com:
* Gráficos de % de testes aprovados e reprovados;
* Duração individual de cada teste;
* Screenshots automáticos anexados em caso de falhas.

---

## 🔄 Integração Contínua (CI/CD)
Toda alteração enviada para o repositório (`git push` ou `Pull Request`) dispara automaticamente a execução dos testes no **GitHub Actions** em ambiente Linux Ubuntu, gerando e salvando os artefatos de relatório e capturas de tela.
