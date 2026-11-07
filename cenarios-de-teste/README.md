# 📁 Engenharia de Qualidade (QA) - Projeto BugBank

Este repositório contém a suíte completa de **Garantia da Qualidade (QA)**, **Automação de Testes E2E (Cypress)** e **Testes de Performance (k6)** da aplicação bancária digital **BugBank**, estruturada com as melhores práticas da indústria (Page Object Model, CI/CD, Gherkin BDD, Geração de Relatórios e Faker).

---

## 🏗️ Arquitetura e Pilares do Projeto

```text
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── bug_report.md             # Template padronizado de abertura de bugs
│   └── workflows/
│       ├── cypress.yml               # Pipeline de CI/CD para testes E2E
│       └── k6-performance.yml        # Pipeline de CI/CD para testes de carga e performance
├── cenarios-de-teste/
│   ├── PLANO_DE_TESTES.md            # Especificação detalhada de Casos de Teste (CT-01 a CT-37)
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
├── k6/
│   ├── reports/
│   │   ├── EVIDENCIA_SMOKE_TEST.md   # Evidência formal do Smoke Test
│   │   ├── EVIDENCIA_TESTE_CARGA.md  # Evidência formal do Teste de Carga
│   │   ├── smoke-test-relatorio.html # Dashboard visual HTML do Smoke Test
│   │   └── teste-carga-relatorio.html# Dashboard visual HTML do Teste de Carga
│   ├── smoke-test.js                 # Script do Smoke Test (1 VU)
│   ├── teste-carga.js                # Script do Teste de Carga com Ramp-up (20 VUs)
│   └── README.md                     # Documentação de testes de performance
├── cypress.config.js                 # Configuração do Cypress, baseUrl e Mochawesome
└── package.json                      # Scripts de execução rápida e dependências
```

---

## 🧭 Estrutura dos Módulos Cobertos

1. **Módulo 1: Cadastro de Usuários** (Criação com/sem saldo, obrigatoriedade de campos, formatos de e-mail, senhas divergentes, visibilidade, testes de limite e borda).
2. **Módulo 2: Autenticação (Login)** (Credenciais válidas, senha errada, conta inexistente, validações de campos vazios).
3. **Módulo 3: Página Inicial e Navegação (Home)** (Informações de conta e saldo, botões e atalhos, modais informativos, logout e re-login).
4. **Módulo 4: Transferência de Valores** (Transferência com sucesso, validação de saldo insuficiente, conta inexistente, valor zero/negativo e mesma conta).
5. **Módulo 5: Extrato Bancário e Auditoria Financeira** (Histórico de lançamentos de débito e conferência de crédito na conta destino).
6. **Módulo 6: Segurança e Proteção de Rotas** (Bloqueio de acesso anônimo às páginas `/home`, `/transfer` e `/bank-statement`).
7. **Módulo 7: Responsividade Mobile** (Testes de viewport de smartphone iPhone XR).
8. **Módulo 8: Testes de Performance e Carga (k6)** (Smoke test com 1 VU e Teste de Carga Real com ramp-up de até 20 VUs).

---

## 🚀 Como Executar os Testes

No terminal, na pasta raiz do projeto, você pode usar os seguintes comandos:

```bash
# === TESTES FUNCIONAIS (CYPRESS) ===
# Abrir a interface visual do Cypress (Interativo)
npm run cy:open

# Executar todos os testes em modo headless (Terminal)
npm run cy:run

# Executar especificamente no Google Chrome
npm run cy:run:chrome

# Executar e gerar o Relatório Visual HTML (Mochawesome)
npm run cy:report

# === TESTES DE PERFORMANCE (k6) ===
# Smoke Test (1 usuário por 10s)
npm run k6:smoke

# Teste de Carga Real com Ramp-up (20 usuários por 40s)
npm run k6:run
```

---

## 📊 Relatórios Visuais de Execução

* **Cypress (Mochawesome):** Ao executar `npm run cy:report`, o dashboard é gerado em `cypress/reports/index.html`.
* **k6 (k6-reporter):** Ao executar `npm run k6:run`, o dashboard é gerado em `k6/reports/teste-carga-relatorio.html`.

---

## 🔄 Integração Contínua (CI/CD)
Toda alteração enviada para o repositório (`git push` ou `Pull Request`) dispara automaticamente a execução dos testes no **GitHub Actions** em ambiente Linux Ubuntu para ambos os pipelines:
* `cypress.yml` (E2E)
* `k6-performance.yml` (Performance)
