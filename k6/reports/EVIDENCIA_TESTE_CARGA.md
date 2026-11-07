# 📄 Evidência de Execução: Teste de Carga Real (k6)

> **Projeto:** BugBank  
> **Tipo de Teste:** Load Test (Teste de Carga com Ramp-up / Ramp-down)  
> **Ferramenta:** Grafana k6 (v2.3.0)  
> **Ambiente:** https://bugbank.netlify.app/  
> **Status:** ✅ **APROVADO (100% de Sucesso / Zero Falhas)**  
> **Arquivo de Teste:** [`k6/teste-carga.js`](../teste-carga.js)  
> **Relatório Visual Interativo:** [`teste-carga-relatorio.html`](./teste-carga-relatorio.html)  

---

## 🎯 Objetivo do Teste
Avaliar o comportamento, estabilidade e capacidade de resposta da aplicação BugBank sob carga concorrente realista de múltiplos usuários acessando simultaneamente em curva de subida e descida.

---

## ⚙️ Parâmetros de Execução
* **Estágios de Carga (Stages):**
  * 0 a 10s: Subida gradual de 0 para **5 usuários simultâneos** (Ramp-up).
  * 10 a 30s: Sustentação de **20 usuários simultâneos** concorrentes.
  * 30 a 40s: Redução gradual de 20 para **0 usuários** (Ramp-down).
* **Duração Total:** 40 segundos
* **Total de Requisições HTTP Executadas:** **364 requisições**

---

## 📊 Métricas Obtidas no Teste

| Métrica | Meta / Threshold Definido | Resultado Real Obtido | Avaliação de QA |
| :--- | :--- | :--- | :--- |
| **Taxa de Erros (`http_req_failed`)** | `< 1.00%` | **0.00% (0 erros em 364)** | ✅ Aprovado com excelência |
| **Tempo Médio de Resposta (`avg`)** | `< 1.500 ms` | **42.02 ms** | ✅ Altíssima performance (< 0,05s) |
| **Tempo Mínimo (`min`)** | N/A | **31.14 ms** | ✅ Instantâneo |
| **Tempo Mediano (`med`)** | N/A | **38.73 ms** | ✅ Consistência total da aplicação |
| **Percentil 90 (`p(90)`)** | N/A | **40.87 ms** | ✅ 90% das requisições abaixo de 41ms |
| **Percentil 95 (`p(95)`)** | `< 1.500 ms` | **43.92 ms** | ✅ Muito abaixo do SLA aceitável |
| **Tempo Máximo (`max`)** | N/A | **899.34 ms** | ✅ Abaixo de 1 segundo |

---

## 🔍 Validações de Negócio (Checks)

* [x] **Status Code 200 (Sucesso):** 100% de taxa de sucesso em todas as 364 requisições.
* [x] **Tempo de resposta aceitável (< 1.5s):** 100% aprovado.
* [x] **Conteúdo do BugBank íntegro:** 100% das páginas responderam com o corpo HTML completo sem corrupção.

---

## 💡 Conclusão da Análise de Performance
A aplicação demonstrou capacidade exemplar de suporte a múltiplos acessos simultâneos. Mesmo durante o pico com **20 usuários virtuais concorrentes**, a latência média permaneceu em **42ms** e a taxa de erros foi estritamente **0.00%**. A aplicação está **aprovada** nos critérios de carga operacional padrão.
