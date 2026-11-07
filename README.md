# 🏦 BugBank - Automação de Testes E2E (Cypress) e Performance (k6)

[![Cypress](https://img.shields.io/badge/Cypress-16.2.1-04C38C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![k6](https://img.shields.io/badge/k6-Performance-7D47B7?style=for-the-badge&logo=k6&logoColor=white)](https://k6.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![Mochawesome](https://img.shields.io/badge/Reports-Mochawesome-FF6B6B?style=for-the-badge)](https://www.npmjs.com/package/mochawesome)

Projeto profissional de **Garantia da Qualidade (QA)**, **Automação de Testes End-to-End (E2E)** e **Testes de Performance e Carga** desenvolvido sobre a aplicação bancária digital [BugBank](https://bugbank.netlify.app/).

A suíte foi construída seguindo as melhores práticas da engenharia de testes de software, incluindo **Page Object Model (POM)**, **Custom Commands**, **Massa de Dados Dinâmica (Faker.js)**, **Pipeline de CI/CD Multi-Job**, **Testes de Carga com k6** e **Documentação Completa de Cenários (Manuais e BDD/Gherkin)**.

---

## 📑 Documentação de QA e Cenários de Teste

Toda a especificação de testes está disponível na pasta [`cenarios-de-teste/`](./cenarios-de-teste/):
* 📋 **[Plano e Especificação de Casos de Teste (CT-01 a CT-37)](./cenarios-de-teste/PLANO_DE_TESTES.md):** Contém passos detalhados, dados de entrada, resultados esperados, matriz de rastreabilidade e relatório de bugs catalogados.
* 🥒 **[Cenários em BDD / Gherkin (`.feature`)](./cenarios-de-teste/cenarios.feature):** Especificação no padrão `Dado / Quando / Então`.
* 🐛 **[Template de Defeitos (Bug Report)](./.github/ISSUE_TEMPLATE/bug_report.md):** Modelo padronizado para abertura de issues de defeitos.
* ⚡ **[Evidência do Teste de Carga (k6)](./k6/reports/EVIDENCIA_TESTE_CARGA.md):** Relatório de métricas de performance com 20 VUs simultâneos.

---

## 🏛️ Arquitetura do Projeto

```text
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── bug_report.md             # Modelo de relatório de bugs
│   └── workflows/
│       ├── cypress.yml               # CI/CD: Testes E2E com Cypress
│       └── k6-performance.yml        # CI/CD: Testes de Carga e Performance com k6
├── cenarios-de-teste/
│   ├── PLANO_DE_TESTES.md            # Plano de testes manuais, automatizados e de performance
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
├── k6/
│   ├── reports/
│   │   ├── EVIDENCIA_SMOKE_TEST.md   # Evidência do Smoke Test
│   │   ├── EVIDENCIA_TESTE_CARGA.md  # Evidência do Teste de Carga
│   │   ├── smoke-test-relatorio.html # Dashboard HTML do Smoke Test
│   │   └── teste-carga-relatorio.html# Dashboard HTML do Teste de Carga
│   ├── smoke-test.js                 # Script k6: Smoke Test (1 VU)
│   ├── teste-carga.js                # Script k6: Teste de Carga com Ramp-up (20 VUs)
│   └── README.md                     # Documentação de performance
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
8. **Performance e Carga (k6):** Smoke testing e teste de carga com ramp-up de até 20 usuários simultâneos (latência média de 42ms, 0% de falhas).

---

## 🚀 Como Executar

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [Git](https://git-scm.com/)

### Instalação
```bash
# Clone este repositório
git clone https://github.com/carinemellor/BugBank.git

# Acesse a pasta do projeto
cd "BugBank"

# Instale as dependências
npm install
```

### Execução dos Testes E2E (Cypress)

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

### Execução dos Testes de Performance (k6)

```bash
# Smoke Test (1 usuário por 10s)
npm run k6:smoke

# Teste de Carga Real com Ramp-up (até 20 usuários por 40s)
npm run k6:run
```

---

## 📊 Relatórios Visuais em HTML

* **E2E (Mochawesome):** `cypress/reports/index.html`
* **Performance (k6):** `k6/reports/teste-carga-relatorio.html`

---

## 🔄 Integração Contínua (CI/CD)
O repositório conta com dois workflows automatizados no **GitHub Actions**:
1. **`cypress.yml`:** Executa a suíte E2E completa no Chrome Headless e gera os relatórios Mochawesome.
2. **`k6-performance.yml`:** Executa os testes de carga e gera os dashboards de performance na nuvem.

---

## 👩‍💻 Autora
Desenvolvido por **Carine**  
[petitocarine@gmail.com](mailto:petitocarine@gmail.com)
