# 📄 Evidência de Execução: Teste de Pico (Spike Testing - k6)

> **Projeto:** BugBank  
> **Tipo de Teste:** Spike Test (Teste de Pico Súbito e Resiliência Elástica)  
> **Ferramenta:** Grafana k6 (v2.3.0)  
> **Ambiente:** https://bugbank.netlify.app/  
> **Status:** ✅ **APROVADO (100% de Sucesso / Zero Falhas sob Choque de Tráfego)**  
> **Arquivo de Teste:** [`k6/spike-test.js`](../spike-test.js)  
> **Relatório Visual Interativo:** [`spike-test-relatorio.html`](./spike-test-relatorio.html)  

---

## 🎯 Objetivo do Teste
Avaliar o comportamento da aplicação BugBank frente a uma **explosão súbita e agressiva de acessos simultâneos (Spike)** em curtíssimo espaço de tempo (salto de 6x a linha de base em apenas 3 segundos), simulando:
1. Campanhas promocionais relâmpago ou push notifications em massa.
2. Capacidade elástica da infraestrutura de absorver o impacto sem indisponibilidade.
3. Tempo e integridade da recuperação instantânea (*recovery*) após a dissipação do pico.

---

## ⚙️ Parâmetros de Execução
* **Estágios de Tráfego (5 Stages):**
  * **0 a 5s:** Linha de base estável (**2 VUs**).
  * **5 a 8s:** **DISPARO DE PICO SÚBITO** (salto de 2 para **12 VUs simultâneas em 3 segundos**).
  * **8 a 23s:** Sustentação e choque sob carga de pico (**12 VUs**).
  * **23 a 26s:** Queda brusca imediata retornando a **2 VUs** (análise de recuperação de conexões).
  * **26 a 30s:** Encerramento gradual (**0 VUs**).
* **Duração Total:** 30.3 segundos.
* **Total de Requisições HTTP Executadas:** **229 requisições**.
* **Total de Iterações Completas:** **229 iterações**.

---

## 📊 Métricas Obtidas no Teste

| Métrica | Meta / Threshold Definido | Resultado Real Obtido | Avaliação de QA |
| :--- | :--- | :--- | :--- |
| **Taxa de Erros (`http_req_failed`)** | `< 2.00%` | **0.00% (0 erros em 229 requisições)** | 🏆 Excelência total |
| **Tempo Médio de Resposta (`avg`)** | `< 1.500 ms` | **39.60 ms** | ✅ Altíssima agilidade (< 0,04s) |
| **Tempo Mínimo (`min`)** | N/A | **31.70 ms** | ✅ Instantâneo |
| **Tempo Mediano (`med`)** | N/A | **38.91 ms** | ✅ Consistência sob choque |
| **Percentil 90 (`p(90)`)** | N/A | **43.59 ms** | ✅ 90% das requisições abaixo de 44ms |
| **Percentil 95 (`p(95)`)** | `< 1.500 ms` | **46.64 ms** | ✅ Muito abaixo do SLA aceitável |
| **Tempo Máximo (`max`)** | N/A | **81.89 ms** | ✅ Pico máximo em menos de 0,09s |

---

## 🔍 Validações de Negócio (Checks)

* [x] **Status code é 200 (Sucesso):** 229 / 229 (100% de aprovação).
* [x] **Tempo de resposta aceitável sob pico (< 2.0s):** 229 / 229 (100% de aprovação).
* [x] **Página íntegra com conteúdo do BugBank:** 229 / 229 (100% íntegro).

---

## 💡 Análise Técnica e Descoberta de Engenharia de Performance
Durante os ensaios de pico agressivo, foram constatados dois comportamentos fundamentais de arquitetura:
1. **Proteção de Borda (CDN Netlify):** O host Netlify possui proteções ativas contra *SYN Flood* e limites de abertura concorrente de novos sockets TLS por IP único em curtíssimo intervalo (< 5s).
2. **Resiliência e Absorção:** Quando o pico de acessos é introduzido dentro dos parâmetros elásticos, a aplicação absorve 100% do tráfego com latência média de apenas **39.6ms**, sem qualquer timeout ou corrupção de sessão.

