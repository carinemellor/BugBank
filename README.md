# 🏦 BugBank - Automação de Testes E2E com Cypress

[![Cypress](https://img.shields.io/badge/Cypress-16.2.1-04C38C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![Mochawesome](https://img.shields.io/badge/Reports-Mochawesome-FF6B6B?style=for-the-badge)](https://www.npmjs.com/package/mochawesome)

Projeto profissional de **Garantia da Qualidade (QA)** e **Automação de Testes End-to-End (E2E)** desenvolvido sobre a aplicação bancária digital [BugBank](https://bugbank.netlify.app/).

A suíte foi construída seguindo as melhores práticas da engenharia de testes de software, incluindo **Page Object Model (POM)**, **Custom Commands**, **Massa de Dados Dinâmica (Faker.js)**, **Pipeline de CI/CD** e **Documentação Completa de Cenários (Manuais e BDD/Gherkin)**.

---

## 📑 Documentação de QA e Cenários de Teste

Toda a especificação de testes está disponível na pasta [`cenarios-de-teste/`](./cenarios-de-teste/):
* 📋 **[Plano e Especificação de Casos de Teste (CT-01 a CT-35)](./cenarios-de-teste/PLANO_DE_TESTES.md):** Contém passos detalhados, dados de entrada, resultados esperados, matriz de rastreabilidade e relatório de bugs catalogados.
* 🥒 **[Cenários em BDD / Gherkin (`.feature`)](./cenarios-de-teste/cenarios.feature):** Especificação no padrão `Dado / Quando / Então`.
* 🐛 **[Template de Defeitos (Bug Report)](./.github/ISSUE_TEMPLATE/bug_report.md):** Modelo padronizado para abertura de issues de defeitos.

---

## 🏛️ Arquitetura do Projeto

```text
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── bug_report.md             # Modelo de relatório de bugs
│   └── workflows/
│       └── cypress.yml               # Pipeline de CI/CD automática via GitHub Actions
├── cenarios-de-teste/
│   ├── PLANO_DE_TESTES.md            # Plano de testes e casos de teste manuais e automatizados
│   ├── cenarios.feature              # Cenários de teste no formato BDD (Gherkin)
│   └── README.md                     # Índice de documentação de testes
├── cypress/
│   ├── e2e/
│   │   └── bugbank.cy.js             # Suíte de testes automatizados E2E
│   ├── fixtures/
│   │   ├── usuarios.json             # Massa de dados estática
│   │   └── transferencias.json       # Dados de transferências
│   ├── reports/                      # Relatórios visuais gerados pelo Mochawesome
│   └── support/
│       ├── commands.js               # Comandos customizados (cy.login, cy.cadastrarConta, etc.)
│       ├── factories/
│       │   └── UserFactory.js        # Geração de dados dinâmicos com @faker-js/faker
│       └── pages/                    # Design Pattern: Page Object Model (POM)
│           ├── LoginPage.js
│           ├── RegisterPage.js
│           ├── HomePage.js
│           ├── TransferPage.js
│           └── StatementPage.js
├── cypress.config.js                 # Configurações globais e do reporter
├── package.json                      # Dependências e scripts de execução
└── .gitignore
```

---

## 🎯 Cobertura de Testes

1. **Cadastro de Usuários:** Criação de conta com/sem saldo, obrigatoriedade de campos, limites e regras de formato de e-mail, senhas divergentes, alternância de visibilidade de senha e cancelamento.
2. **Autenticação (Login):** Credenciais válidas, senha incorreta, usuário inexistente, campos em branco e validações de máscara.
3. **Página Inicial (Home):** Exibição de dados cadastrais, saldo monetário em BRL, botões de navegação, modais de recursos em desenvolvimento, logout e re-login.
4. **Transferência de Valores:** Transferência de ponta a ponta entre contas, validações de saldo insuficiente, conta inexistente, valor zero/negativo e mesma conta.
5. **Extrato Bancário e Auditoria:** Conferência do débito na conta devedora e auditoria de crédito na conta favorecida.
6. **Segurança (Route Guarding):** Bloqueio de acesso não autenticado a rotas protegidas (`/home`, `/transfer`, `/bank-statement`).
7. **Responsividade Mobile:** Testes em viewport de smartphone (`iphone-xr`).

---

## 🚀 Como Executar

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [Git](https://git-scm.com/)

### Instalação
```bash
# Clone este repositório
git clone <URL_DO_SEU_REPOSITORIO>

# Acesse a pasta do projeto
cd "Bugbank - cypress"

# Instale as dependências
npm install
```

### Execução dos Testes

```bash
# Modo Interativo (Interface visual do Cypress)
npm run cy:open

# Modo Headless (Terminal)
npm run cy:run

# Modo Headless no Google Chrome
npm run cy:run:chrome

# Executar e gerar Relatório Visual HTML consolidado
npm run cy:report
```

---

## 📊 Relatório Visual HTML (Mochawesome)
Após executar `npm run cy:report`, abra o arquivo `cypress/reports/index.html` em qualquer navegador para visualizar o dashboard completo com métricas de aprovação, tempo de execução e screenshots de eventuais falhas.

---

## 👩‍💻 Autora
Desenvolvido por **Carine**  
[petitocarine@gmail.com](mailto:petitocarine@gmail.com)

