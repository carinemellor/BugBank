# ⚡ Testes de Performance com k6 - BugBank

Este módulo contém a suíte de **Testes de Performance, Carga e Estresse** desenvolvida com o **Grafana k6**.

---

## 📁 Estrutura da Pasta

```text
k6/
├── reports/
│   ├── EVIDENCIA_SMOKE_TEST.md      # Relatório formal com métricas e conclusão de QA
│   └── smoke-test-relatorio.html    # Dashboard visual interativo em HTML gerado pelo k6
├── smoke-test.js                    # Script do Smoke Test (1 usuário, 10s)
├── teste-carga.js                   # Script do Teste de Carga com Ramp-up (até 20 usuários)
└── README.md                        # Documentação e instruções de execução
```

---

## 🎯 Por que o k6?
* **Linguagem:** Escrito em JavaScript (mesma sintaxe do Cypress).
* **Leve e Rápido:** Executado em Go puro por baixo dos panos, consumindo pouquíssima memória.
* **Métricas Claras:** Tempo de resposta (`http_req_duration`), taxa de erro (`http_req_failed`) e usuários virtuais (`VUs`).

---

## 🚀 Como Executar

### 1. Teste Rápido (Smoke Test)
Executa a validação de integridade com 1 usuário por 10 segundos:
```bash
npm run k6:smoke
```

### 2. Teste de Carga Real (Load Test com Ramp-up)
Executa o teste com subida gradual de até 20 usuários simultâneos por 40 segundos e gera o relatório em HTML:
```bash
npm run k6:run
```

---

## 📊 Relatórios Visuais em HTML

Os relatórios gerados automaticamente ficam salvos em:
* 📄 [`k6/reports/smoke-test-relatorio.html`](./reports/smoke-test-relatorio.html)
* 📄 [`k6/reports/teste-carga-relatorio.html`](./reports/teste-carga-relatorio.html)
