# ⚡ Testes de Performance com k6 - BugBank

Este módulo contém a suíte de **Testes de Performance, Carga e Estresse** desenvolvida com o **Grafana k6**.

---

## 🎯 Por que o k6?
* **Linguagem:** Escrito em JavaScript (mesma sintaxe do Cypress).
* **Leve e Rápido:** Executado em Go puro por baixo dos panos, consumindo pouquíssima memória.
* **Métricas Claras:** Tempo de resposta (`http_req_duration`), taxa de erro (`http_req_failed`) e usuários virtuais (`VUs`).

---

## 🚀 Como Executar

### 1. Teste de Carga Básico
Executa o teste configurado com subida gradual de até 20 usuários:
```bash
k6 run k6/teste-carga.js
```

### 2. Teste Rápido (Smoke Test)
Executa com apenas 1 usuário por 10 segundos:
```bash
k6 run --vus 1 --duration 10s k6/teste-carga.js
```

### 3. Teste de Estresse (Stress Test)
Simula 50 usuários simultâneos por 30 segundos:
```bash
k6 run --vus 50 --duration 30s k6/teste-carga.js
```

---

## 📊 Principais Métricas Exibidas no Terminal

| Métrica | Significado | O que avaliar |
| :--- | :--- | :--- |
| `http_req_duration` | Tempo total de resposta da requisição. | Observar a média (`avg`) e o percentil 95 (`p(95)`). Ideal: < 800ms. |
| `http_req_failed` | Porcentagem de requisições que deram erro (ex: 500, 502, 504). | Deve ser 0.00% ou < 1%. |
| `http_reqs` | Total de requisições realizadas e vazão (RPS - requisições por segundo). | Quanto maior, mais capacidade o sistema tem. |
| `vus` / `vus_max` | Usuários virtuais simultâneos ativos no teste. | Capacidade de concorrência testada. |
