# 📄 Evidência de Execução: Teste de Estresse (Stress Test - k6)

> **Projeto:** BugBank  
> **Tipo de Teste:** Stress Test (Teste de Estresse com Carga Extrema e Avaliação de Ruptura)  
> **Ferramenta:** Grafana k6 (v2.3.0)  
> **Ambiente:** https://bugbank.netlify.app/  
> **Status:** ✅ **APROVADO (100% de Sucesso / Zero Falhas sob Pico de 80 VUs)**  
> **Arquivo de Teste:** [`k6/stress-test.js`](../stress-test.js)  
> **Relatório Visual Interativo:** [`stress-test-relatorio.html`](./stress-test-relatorio.html)  

---

## 🎯 Objetivo do Teste
Avaliar a resiliência e estabilidade da infraestrutura web do BugBank muito além do tráfego operacional normal, submetendo o sistema a um pico de **80 usuários simultâneos (VUs)** para identificar:
1. Ponto de degradação da performance ou ruptura (breaking point).
2. Comportamento sob concorrência simultânea entre múltiplos endpoints (`/` e `/requirements`).
3. Tempo e capacidade de recuperação (recovery time) após o encerramento do pico.

---

## ⚙️ Parâmetros de Execução
* **Estágios de Carga Progressiva (Stages):**
  * **0 a 10s:** Aquecimento gradual até carga padrão (**20 VUs**).
  * **10 a 25s:** Elevação para nível de estresse moderado (**50 VUs**).
  * **25 a 40s:** Pico de estresse extremo com **80 usuários virtuais simultâneos** concorrentes.
  * **40 a 50s:** Ramp-down gradual retornando a **0 VUs** (análise de recuperação de recursos).
* **Duração Total:** 50 segundos (+ 1.2s graceful stop).
* **Total de Requisições HTTP Executadas:** **2.606 requisições**.
* **Total de Iterações Completas:** **1.303 iterações**.

---

## 📊 Métricas Obtidas no Teste

| Métrica | Meta / Threshold Definido | Resultado Real Obtido | Avaliação de QA |
| :--- | :--- | :--- | :--- |
| **Taxa de Erros (`http_req_failed`)** | `< 5.00%` | **0.00% (0 erros em 2.606 requisições)** | 🏆 Excelência absoluta |
| **Tempo Médio de Resposta (`avg`)** | `< 2.500 ms` | **38.41 ms** | ✅ Latência ultra-baixa (< 0,04s) |
| **Tempo Mínimo (`min`)** | N/A | **30.02 ms** | ✅ Instantâneo |
| **Tempo Mediano (`med`)** | N/A | **37.23 ms** | ✅ Consistência total sob carga |
| **Percentil 90 (`p(90)`)** | N/A | **40.13 ms** | ✅ 90% das requisições abaixo de 41ms |
| **Percentil 95 (`p(95)`)** | `< 2.500 ms` | **41.96 ms** | ✅ Excepcional, muito abaixo do limite |
| **Tempo Máximo (`max`)** | N/A | **1.570,59 ms (1.57s)** | ✅ Pico isolado absorvido sem erro |

---

## 🔍 Validações de Negócio (Checks)

Foram executadas **6.515 checagens automáticas** durante o estresse:

* [x] **Home - Status code é 200 (OK):** 1.303 / 1.303 (100% de aprovação).
* [x] **Home - Tempo de resposta aceitável (< 2.5s):** 1.303 / 1.303 (100% de aprovação).
* [x] **Home - Conteúdo do BugBank íntegro:** 1.303 / 1.303 (100% íntegro).
* [x] **Requirements - Status code é 200 (OK):** 1.303 / 1.303 (100% de aprovação).
* [x] **Requirements - Tempo de resposta aceitável (< 2.5s):** 1.303 / 1.303 (100% de aprovação).

---

## 💡 Conclusão da Análise de Estresse
O BugBank demonstrou altíssima robustez e capacidade de escalabilidade na CDN/edge do Netlify. Mesmo quando submetido a um estresse severo de **80 usuários simultâneos enviando mais de 50 requisições por segundo**, o sistema:
- **Não apresentou nenhuma queda de conexão ou erro HTTP 5xx/4xx** (0 falhas).
- Manteve o percentil 95 de tempo de resposta em **41.96ms**, um resultado de altíssima qualidade para aplicações financeiras.
- Recuperou-se instantaneamente após o ramp-down.
