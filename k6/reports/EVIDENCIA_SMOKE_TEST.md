# 📄 Evidência de Execução: Smoke Test (k6)

> **Projeto:** BugBank  
> **Tipo de Teste:** Smoke Test (Teste de Fumaça / Verificação Inicial de Performance)  
> **Ferramenta:** Grafana k6 (v2.3.0)  
> **Ambiente:** https://bugbank.netlify.app/  
> **Status:** ✅ **APROVADO (100% de Sucesso)**  
> **Arquivo de Teste:** [`k6/smoke-test.js`](../smoke-test.js)  
> **Relatório Visual Interativo:** [`smoke-test-relatorio.html`](./smoke-test-relatorio.html)  

---

## 🎯 Objetivo do Teste
Validar se a aplicação BugBank está ativa, saudável e respondendo com estabilidade e baixa latência sob carga mínima (1 usuário virtual) antes da aplicação de cargas pesadas de usuários.

---

## ⚙️ Parâmetros de Execução
* **Usuários Virtuais (`VUs`):** 1 VU ativo
* **Duração do Teste:** 10 segundos
* **Pausa entre requisições (`sleep`):** 1 segundo
* **Total de Requisições HTTP Executadas:** 10 requisições

---

## 📊 Métricas Obtidas

| Métrica | Meta / Threshold Definido | Resultado Obtido no Teste | Avaliação de QA |
| :--- | :--- | :--- | :--- |
| **Taxa de Erros (`http_req_failed`)** | `<= 0.00%` (Zero falhas) | **0.00% (0 falhas em 10)** | ✅ Aprovado com perfeição |
| **Tempo Médio de Resposta (`avg`)** | `< 500 ms` | **~260 ms** | ✅ Excelente velocidade |
| **Tempo Mínimo (`min`)** | N/A | **38 ms** | ✅ Resposta quase instantânea |
| **Tempo Mediano (`med`)** | `< 100 ms` | **39 ms** | ✅ Estabilidade comprovada |
| **Percentil 95 (`p(95)`)** | `< 2000 ms` | **~1.18 s** | ✅ Dentro do SLA de rede |

---

## 🔍 Validações Funcionais (Checks)

* [x] **Status Code 200 (Site no ar):** 100% de sucesso.
* [x] **Conteúdo da página carregou corretamente:** 100% de sucesso (tags e textos do BugBank identificados).
* [x] **Tempo de resposta aceitável:** 100% dentro do threshold.

---

## 💡 Conclusão do Engenheiro de QA
A aplicação web BugBank demonstrou excelente comportamento na camada de entrega estática, respondendo a requisições subsequentes em menos de 40ms e sem nenhuma ocorrência de indisponibilidade ou falha 5xx. A aplicação foi considerada **aprovada** e liberada para os testes de carga com múltiplos usuários concorrentes.
