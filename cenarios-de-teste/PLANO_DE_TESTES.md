# 📋 Plano e Especificação de Cenários de Teste - BugBank

> **Projeto:** BugBank - Aplicação Bancária Web  
> **Objetivo:** Planejamento e especificação completa de testes manuais e automatizados (E2E)  
> **Ferramenta de Automação:** Cypress  
> **Ambiente:** https://bugbank.netlify.app/  
> **Elaboração:** Carine (QA)  

---

## 📑 Sumário

1. [Visão Geral e Escopo](#1-visão-geral-e-escopo)
2. [Estratégia e Tipos de Teste (Manuais e Automatizados)](#2-estratégia-e-tipos-de-teste)
3. [Matriz de Casos de Teste Estruturados](#3-matriz-de-casos-de-teste-estruturados)
   * [Módulo 1: Cadastro de Usuários (Inclui Testes Manuais Exploratórios e de Limite)](#módulo-1-cadastro-de-usuários)
   * [Módulo 2: Autenticação (Login)](#módulo-2-autenticação-login)
   * [Módulo 3: Página Inicial e Navegação (Home)](#módulo-3-página-inicial-e-navegação-home)
   * [Módulo 4: Transferência de Valores](#módulo-4-transferência-de-valores)
   * [Módulo 5: Extrato Bancário e Conferência Financeira](#módulo-5-extrato-bancário-e-conferência-financeira)
   * [Módulo 6: Segurança e Proteção de Rotas](#módulo-6-segurança-e-proteção-de-rotas)
   * [Módulo 7: Responsividade Mobile](#módulo-7-responsividade-mobile)
4. [Matriz de Rastreabilidade (Casos de Teste x Automação Cypress)](#4-matriz-de-rastreabilidade)
5. [Relatório de Bugs e Defeitos Identificados nos Testes Manuais](#5-relatório-de-bugs-e-defeitos-identificados)

---

## 1. Visão Geral e Escopo

### 🎯 Objetivo
Este documento serve como o **guia oficial de execução de testes manuais** e especificação para os **testes automatizados**. Ele cobre todas as jornadas do usuário no BugBank, desde testes funcionais positivos até testes negativos, testes de caixa-preta, testes de limite e testes exploratórios de regras de negócio bancárias.

### 🔍 Itens em Escopo
* Formulário de Registro de Contas (criação com e sem saldo, regras de nomes, limites de caracteres, regras de e-mail e complexidade de senhas).
* Formulário de Login (autenticação válida, credenciais incorretas, campos em branco, máscaras de senha).
* Dashboard / Home (exibição de nome, número de conta, saldo monetário formatado em BRL e atalhos).
* Módulo de Transferência (validações de saldo, conta inexistente, valores inválidos, transferência com sucesso e atualização de saldos).
* Módulo de Extrato (exibição de transações de entrada e saída com valores, tipo e descrições).
* Segurança de Rotas (redirecionamento de acessos não autorizados sem cookie de sessão).
* Responsividade Mobile (layout adaptado para telas de smartphones).

---

## 2. Estratégia e Tipos de Teste

| Tipo de Teste | Descrição e Aplicação |
| :--- | :--- |
| **Testes Manuais Funcionais** | Validação passo a passo no navegador das funcionalidades esperadas do sistema bancário. |
| **Testes Manuais de Limite e Borda** | Inserção de dados extremos (1 letra, números no nome, senhas de 3 dígitos, caracteres especiais). |
| **Testes Negativos** | Validação do comportamento da aplicação frente a dados inválidos, nulos ou maliciosos. |
| **Testes de Usabilidade (UX)** | Alternância do ícone de visualização de senha e botão de cancelamento/retorno. |
| **Testes de Segurança (Security)** | Bloqueio de acesso a URLs restritas (`/home`, `/transfer`, `/bank-statement`) sem autenticação. |
| **Testes de Auditoria Financeira** | Verificação de balanço contábil (débito na conta pagadora e crédito correspondente na conta recebedora). |
| **Testes Automatizados (E2E)** | Execução contínua da regressão via Cypress com Page Objects. |

---

## 3. Matriz de Casos de Teste Estruturados

### Módulo 1: Cadastro de Usuários

> 💡 **Nota:** Esta seção inclui todos os testes exploratórios e de limites de campos executados manualmente.

| ID | Cenário / Título | Pré-condições | Ações / Passos | Dados de Teste | Resultado Esperado (Regra Bancária) | Status no BugBank | Tipo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CT-CAD-01** | Cadastro de conta com sucesso sem saldo | Página inicial carregada | 1. Clicar em "Registrar"<br>2. Preencher e-mail, nome, senha e confirmação<br>3. Clicar em "Cadastrar" | E-mail: `carininha@test.com`<br>Nome: `Carine Test`<br>Senha: `senha123` | Modal de sucesso exibido: `A conta [num-dig] foi criada com sucesso`. Saldo inicial: R$ 0,00. | ✅ Aprovado | Positivo |
| **CT-CAD-02** | Cadastro com opção de saldo inicial | Página inicial carregada | 1. Clicar em "Registrar"<br>2. Preencher dados<br>3. Ativar toggle "Criar conta com saldo ?"<br>4. Clicar em "Cadastrar" | E-mail: `com_saldo@teste.com`<br>Toggle: Ativo | Conta criada com sucesso com saldo inicial de R$ 1.000,00. | ✅ Aprovado | Positivo |
| **CT-CAD-03** | Alternância de visibilidade de senha (ícone de olho) | Aba de registro aberta | 1. Digitar senha e confirmação<br>2. Clicar no ícone de olho de cada campo<br>3. Clicar novamente | Senha: `senha123` | O atributo do input alterna de `type="password"` para `type="text"` e vice-versa. | ✅ Aprovado | Usabilidade |
| **CT-CAD-04** | Cancelamento do cadastro ("Voltar ao login") | Aba de registro aberta | 1. Clicar no botão "Voltar ao login" (`#btnBackButton`) | N/A | O card de cadastro fecha e o card de login volta a ser exibido. | ✅ Aprovado | Usabilidade |
| **CT-CAD-05** | Tentativa de cadastro com campo Nome vazio | Aba de registro aberta | 1. Preencher e-mail, senha e confirmação<br>2. Deixar Nome vazio<br>3. Clicar em "Cadastrar" | Nome: `""` (vazio) | Modal de erro exibido: `Nome não pode ser vazio.`. Conta não é criada. | ✅ Aprovado | Negativo |
| **CT-CAD-06** | Tentativa de cadastro com e-mail inválido | Aba de registro aberta | 1. Preencher e-mail sem domínio válido<br>2. Clicar em "Cadastrar" | E-mail: `carininha@test` | Mensagem de erro sob o campo: `Formato inválido`. Conta não é criada. | ✅ Aprovado | Negativo |
| **CT-CAD-07** | Tentativa de cadastro com e-mail sem arroba | Aba de registro aberta | 1. Preencher e-mail sem `@`<br>2. Clicar em "Cadastrar" | E-mail: `carininha.test.com` | Mensagem sob o campo: `Formato inválido`. Conta não é criada. | ✅ Aprovado | Negativo |
| **CT-CAD-08** | Bloqueio de e-mail com caractere especial (cedilha) | Aba de registro aberta | 1. Preencher e-mail com cedilha<br>2. Clicar em "Cadastrar" | E-mail: `carinhaç@teste.com` | Mensagem sob o campo: `Formato inválido`. Conta não é criada. | ✅ Aprovado | Negativo |
| **CT-CAD-09** | Senhas divergentes | Aba de registro aberta | 1. Preencher senha e confirmação com valores diferentes<br>2. Clicar em "Cadastrar" | Senha: `senha123`<br>Confirmação: `senha321` | Modal de erro exibido: `As senhas não são iguais.`. Conta não criada. | ✅ Aprovado | Negativo |
| **CT-CAD-10** | Campos de senha vazios | Aba de registro aberta | 1. Preencher apenas e-mail e nome<br>2. Deixar senhas em branco<br>3. Clicar em "Cadastrar" | Senha: `""` | Mensagem sob os campos: `É campo obrigatório`. Conta não criada. | ✅ Aprovado | Negativo |
| **CT-CAD-11** | Cadastro com senha forte | Aba de registro aberta | 1. Preencher com senha alfanumérica e maiúsculas<br>2. Clicar em "Cadastrar" | Senha: `SenhaSegura123` | Conta criada com sucesso com modal informativo. | ✅ Aprovado | Positivo |
| **CT-CAD-12** | Cadastro com nome contendo números ou caracteres especiais *(Teste Manual)* | Aba de registro aberta | 1. Inserir nome misturado com números<br>2. Clicar em "Cadastrar" | Nome: `carine 12`<br>E-mail: `teste1@qa.com` | **Esperado:** Sistema deve bloquear caracteres não alfabéticos.<br>**Real no BugBank:** Permite o cadastro (Bug). | ⚠️ Bug Identificado (BUG-02) | Limite / Negativo |
| **CT-CAD-13** | Cadastro com nome contendo apenas 1 letra *(Teste Manual)* | Aba de registro aberta | 1. Inserir apenas uma única letra no nome<br>2. Clicar em "Cadastrar" | Nome: `C`<br>E-mail: `teste2@qa.com` | **Esperado:** Sistema deve exigir tamanho mínimo de nome.<br>**Real no BugBank:** Permite o cadastro (Bug). | ⚠️ Bug Identificado (BUG-02) | Limite / Negativo |
| **CT-CAD-14** | Cadastro com nome contendo apenas 2 letras *(Teste Manual)* | Aba de registro aberta | 1. Inserir duas letras no nome<br>2. Clicar em "Cadastrar" | Nome: `Ca`<br>E-mail: `teste3@qa.com` | **Esperado:** Sistema deve exigir nome válido.<br>**Real no BugBank:** Permite o cadastro (Bug). | ⚠️ Bug Identificado (BUG-02) | Limite / Negativo |
| **CT-CAD-15** | Cadastro contendo apenas números no nome *(Teste Manual)* | Aba de registro aberta | 1. Inserir somente dígitos numéricos no nome<br>2. Clicar em "Cadastrar" | Nome: `123`<br>E-mail: `teste4@qa.com` | **Esperado:** Sistema deve rejeitar nome numérico.<br>**Real no BugBank:** Permite o cadastro (Bug). | ⚠️ Bug Identificado (BUG-02) | Limite / Negativo |
| **CT-CAD-16** | Cadastro de nome sem sobrenome *(Teste Manual)* | Aba de registro aberta | 1. Inserir apenas o primeiro nome<br>2. Clicar em "Cadastrar" | Nome: `carine`<br>E-mail: `teste5@qa.com` | **Esperado:** Banco deve exigir nome e sobrenome completos.<br>**Real no BugBank:** Permite o cadastro. | ℹ️ Regra Flexível | Negativo |
| **CT-CAD-17** | Cadastro com nome e sobrenome válidos *(Teste Manual)* | Aba de registro aberta | 1. Inserir nome e sobrenome completos<br>2. Clicar em "Cadastrar" | Nome: `Carine Test`<br>E-mail: `teste6@qa.com` | Conta criada com sucesso com modal de confirmação. | ✅ Aprovado | Positivo |
| **CT-CAD-18** | Cadastro com senha muito curta *(Teste Manual)* | Aba de registro aberta | 1. Inserir senha com menos de 6 caracteres<br>2. Clicar em "Cadastrar" | Senha: `123`<br>E-mail: `qa1@teste.com` | **Esperado:** Sistema bancário deve exigir no mínimo 6 a 8 caracteres.<br>**Real no BugBank:** Cria a conta com '123' (Bug). | ⚠️ Bug Identificado (BUG-01) | Segurança / Limite |
| **CT-CAD-19** | Cadastro com senha de caracteres especiais *(Teste Manual)* | Aba de registro aberta | 1. Inserir apenas símbolos na senha<br>2. Clicar em "Cadastrar" | Senha: `!@#$%*`<br>E-mail: `qa2@teste.com` | Conta criada caso a confirmação seja idêntica. | ✅ Aprovado | Limite |

---

### Módulo 2: Autenticação (Login)

| ID | Cenário / Título | Pré-condições | Ações / Passos | Dados de Teste | Resultado Esperado | Status | Tipo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CT-LOG-01** | Tentativa de login com campos vazios | Página inicial carregada | 1. Clicar no botão "Acessar" sem preencher os inputs | E-mail: `""`<br>Senha: `""` | Mensagem de erro sob os inputs: `É campo obrigatório`. | ✅ Aprovado | Negativo |
| **CT-LOG-02** | Tentativa de login com formato de e-mail inválido | Página inicial carregada | 1. Inserir e-mail fora do padrão<br>2. Clicar em "Acessar" | E-mail: `emailinvalido` | Mensagem sob o input: `Formato inválido`. | ✅ Aprovado | Negativo |
| **CT-LOG-03** | Alternância de visibilidade da senha no login | Página inicial carregada | 1. Digitar senha no input<br>2. Clicar no ícone de olho<br>3. Clicar novamente | Senha: `senha123` | Input alterna entre tipo `password` (oculto) e `text` (visível). | ✅ Aprovado | Usabilidade |
| **CT-LOG-04** | Tentativa de login com conta inexistente *(Teste Manual)* | Página inicial carregada | 1. Preencher com e-mail não cadastrado<br>2. Clicar em "Acessar" | E-mail: `conta_inexistente@test.com` | Modal de erro exibido: `Usuário ou senha inválido`. | ✅ Aprovado | Negativo |
| **CT-LOG-05** | Tentativa de login com senha incorreta | Conta cadastrada | 1. Inserir e-mail válido e senha errada<br>2. Clicar em "Acessar" | Senha: `senha_errada` | Modal de erro exibido: `Usuário ou senha inválido`. | ✅ Aprovado | Negativo |
| **CT-LOG-06** | Login com sucesso com credenciais válidas *(Teste Manual)* | Conta cadastrada | 1. Inserir e-mail e senha corretos<br>2. Clicar em "Acessar" | E-mail: `carininha@test.com`<br>Senha: `senha123` | Redirecionamento para `/home`, saudação `Olá Carine Test,` e atalhos visíveis. | ✅ Aprovado | Positivo |

---

### Módulo 3: Página Inicial e Navegação (Home)

| ID | Cenário / Título | Pré-condições | Ações / Passos | Dados de Teste | Resultado Esperado | Status | Tipo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CT-HOM-01** | Exibição correta das informações do cliente | Usuário autenticado | 1. Inspecionar tela `/home` | N/A | Exibe: Nome do cliente (`#textName`), número e dígito da conta (`#textAccountNumber`) e saldo em BRL (`#textBalance`). | ✅ Aprovado | Funcional |
| **CT-HOM-02** | Navegação para Transferência e botão Voltar | Usuário na Home | 1. Clicar no atalho "TRANSFERÊNCIA"<br>2. Clicar no botão "Voltar" (`#btnBack`) | N/A | Navega para `/transfer` e retorna para `/home` com sucesso. | ✅ Aprovado | Navegação |
| **CT-HOM-03** | Navegação para Extrato e botão Voltar | Usuário na Home | 1. Clicar no atalho "EXTRATO"<br>2. Clicar no botão "Voltar" (`#btnBack`) | N/A | Navega para `/bank-statement` e retorna para `/home`. | ✅ Aprovado | Navegação |
| **CT-HOM-04** | Alerta em atalhos não implementados | Usuário na Home | 1. Clicar em "PAGAMENTOS"<br>2. Fechar modal<br>3. Clicar em "SAQUE" | N/A | Modal informativo exibido: `Funcionalidade em desenvolvimento`. | ✅ Aprovado | Funcional |
| **CT-HOM-05** | Logout (Sair da conta) *(Teste Manual)* | Usuário autenticado | 1. Clicar no botão "Sair" (`#btnExit`) | N/A | Cookie de autenticação removido, redirecionamento para `/` e formulário de login visível. | ✅ Aprovado | Funcional |
| **CT-HOM-06** | Re-login com a mesma conta após logout | Logout realizado | 1. Inserir as mesmas credenciais<br>2. Clicar em "Acessar" | Credenciais anteriores | Login realizado com sucesso e dados restaurados na Home. | ✅ Aprovado | Regressão |

---

### Módulo 4: Transferência de Valores

| ID | Cenário / Título | Pré-condições | Ações / Passos | Dados de Teste | Resultado Esperado | Status | Tipo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CT-TRF-01** | Transferência com sucesso entre duas contas | Conta Origem com saldo (R$ 1.000) e Conta Destino existente | 1. Acessar `/transfer`<br>2. Preencher número e dígito da conta destino<br>3. Inserir valor e descrição<br>4. Clicar em "Transferir agora" | Conta Destino: [capturada]<br>Valor: `350`<br>Descrição: `Teste Cypress` | Modal de sucesso: `Transferencia realizada com sucesso`. Saldo da conta origem atualizado para R$ 650,00. | ✅ Aprovado | Positivo |
| **CT-TRF-02** | Transferência com saldo insuficiente | Conta com saldo R$ 650 | 1. Inserir valor superior ao saldo disponível<br>2. Clicar em "Transferir agora" | Valor: `5000` | Modal de erro exibido: `Você não tem saldo suficiente para essa transação`. | ✅ Aprovado | Negativo |
| **CT-TRF-03** | Transferência para conta inexistente | Conta com saldo | 1. Inserir número de conta que não existe<br>2. Clicar em "Transferir agora" | Conta: `99999`<br>Dígito: `9`<br>Valor: `100` | Modal de erro exibido: `Conta inválida ou inexistente`. | ✅ Aprovado | Negativo |
| **CT-TRF-04** | Transferência com valor zero ou negativo | Conta com saldo | 1. Inserir valor `0` ou negativo<br>2. Clicar em "Transferir agora" | Valor: `0` | Modal de erro exibido: `Valor da transferência não pode ser 0 ou negativo`. | ✅ Aprovado | Limite |
| **CT-TRF-05** | Transferência para a própria conta | Conta autenticada | 1. Preencher com o próprio número e dígito de conta<br>2. Clicar em "Transferir agora" | Própria conta | Modal de erro exibido: `Nao pode transferir pra mesmo conta`. | ✅ Aprovado | Negativo |

---

### Módulo 5: Extrato Bancário e Conferência Financeira

| ID | Cenário / Título | Pré-condições | Ações / Passos | Dados de Teste | Resultado Esperado | Status | Tipo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CT-EXT-01** | Visualização do histórico na conta debitada (Origem) | Transferência de R$ 350 realizada | 1. Acessar `/bank-statement` | N/A | Exibe saldo de R$ 650,00, lançamento de "Abertura de conta" e lançamento de débito `-R$ 350,00` com descrição informada. | ✅ Aprovado | Auditoria |
| **CT-EXT-02** | Conferência de crédito no extrato da conta recebedora (Destino) | Transferência de R$ 350 realizada | 1. Deslogar da conta de origem<br>2. Logar na conta de destino<br>3. Verificar saldo e extrato | Conta destino | Saldo da conta de destino atualizado para R$ 350,00. Extrato exibe crédito de `R$ 350,00` com descrição da transferência. | ✅ Aprovado | Auditoria |

---

### Módulo 6: Segurança e Proteção de Rotas

| ID | Cenário / Título | Pré-condições | Ações / Passos | Dados de Teste | Resultado Esperado | Status | Tipo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CT-SEC-01** | Tentativa de acesso direto à `/home` sem login | Sessão limpa / sem cookies | 1. Acessar diretamente a URL `https://bugbank.netlify.app/home` | N/A | Redirecionamento forçado para a página de login (`/`). Conteúdo protegido não exibido. | ✅ Aprovado | Segurança |
| **CT-SEC-02** | Tentativa de acesso direto à `/transfer` sem login | Sessão limpa / sem cookies | 1. Acessar diretamente a URL `https://bugbank.netlify.app/transfer` | N/A | Redirecionamento forçado para a página de login (`/`). | ✅ Aprovado | Segurança |
| **CT-SEC-03** | Tentativa de acesso direto à `/bank-statement` sem login | Sessão limpa / sem cookies | 1. Acessar diretamente a URL `https://bugbank.netlify.app/bank-statement` | N/A | Redirecionamento forçado para a página de login (`/`). | ✅ Aprovado | Segurança |

---

### Módulo 7: Responsividade Mobile

| ID | Cenário / Título | Pré-condições | Ações / Passos | Dados de Teste | Resultado Esperado | Status | Tipo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CT-MOB-01** | Renderização e fluxo de login em smartphone | Viewport Mobile (iPhone XR - 414x896) | 1. Abrir aplicação na resolução mobile<br>2. Realizar login<br>3. Conferir atalhos e fazer logout | E-mail: `carininha@test.com` | Layout adapta-se sem overflow lateral, campos e botões ficam utilizáveis e acessíveis. | ✅ Aprovado | Responsividade |

---

### Módulo 8: Testes de Performance e Carga (k6)

| ID | Cenário / Título | Pré-condições | Ações / Passos | Dados de Teste | Resultado Esperado | Status | Tipo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CT-PERF-01** | Smoke Test (Verificação Inicial de Saúde) | k6 instalado | 1. Executar `npm run k6:smoke`<br>2. Simular 1 VU durante 10s | 1 VU / 10s | Status code 200 em 100%, taxa de falhas 0% e tempo médio < 500ms. Evidência gerada em `k6/reports/smoke-test-relatorio.html`. | ✅ Aprovado | Performance / Smoke |
| **CT-PERF-02** | Teste de Carga com Ramp-up (Simulação Realista) | k6 instalado | 1. Executar `npm run k6:run`<br>2. Subir gradualmente até 20 VUs por 40s | 20 VUs / 40s | 95% das requisições respondendo em menos de 1.5s e taxa de falhas inferior a 1%. Evidência gerada em `k6/reports/teste-carga-relatorio.html`. | ✅ Aprovado | Performance / Carga |
| **CT-PERF-03** | Teste de Estresse Extremo (Pico de 80 VUs) | k6 instalado | 1. Executar `npm run k6:stress`<br>2. Subir progressivamente até 80 VUs simultâneos em múltiplos endpoints | 80 VUs / 50s | 95% das requisições abaixo de 2.5s e taxa de erros < 5%. Evidência gerada em `k6/reports/stress-test-relatorio.html`. | ✅ Aprovado | Performance / Estresse |
| **CT-PERF-04** | Teste de Pico / Spike Test (Salto Súbito de Tráfego) | k6 instalado | 1. Executar `npm run k6:spike`<br>2. Disparar pico repentino de 12 VUs em 3s e medir recuperação | 12 VUs / 30s | 95% das requisições abaixo de 1.5s e taxa de erros < 2%. Evidência gerada em `k6/reports/spike-test-relatorio.html`. | ✅ Aprovado | Performance / Spike |

---

## 4. Matriz de Rastreabilidade

| Caso de Teste (ID) | Descrição do Caso de Teste | Origem | Bloco Cypress correspondente |
| :--- | :--- | :--- | :--- |
| **CT-CAD-01** | Cadastro sem saldo inicial | Manual / Requisito | Bloco 1 |
| **CT-CAD-02** | Cadastro com saldo de R$ 1.000 | Manual / Requisito | Bloco 1 |
| **CT-CAD-03** | Alternância de visibilidade da senha (olho) | Manual / UX | Bloco 1 |
| **CT-CAD-04** | Botão "Voltar ao login" | Manual / UX | Bloco 1 |
| **CT-CAD-05** | Cadastro com Nome vazio | Manual / Negativo | Bloco 1 |
| **CT-CAD-06 a 08** | E-mail inválido, sem arroba e cedilha | Manual / Limite | Bloco 1 |
| **CT-CAD-09** | Senhas divergentes | Manual / Negativo | Bloco 1 |
| **CT-CAD-10** | Campos de senha vazios | Manual / Negativo | Bloco 1 |
| **CT-CAD-11** | Senha forte | Manual / Positivo | Bloco 1 |
| **CT-CAD-12 a 17** | Testes de Borda no Nome (1 letra, números, sem sobrenome) | **Manual Exploratório (Carine)** | Documentado / Bug-02 |
| **CT-CAD-18 e 19** | Testes de Borda na Senha (senha curta '123', especiais) | **Manual Exploratório (Carine)** | Documentado / Bug-01 |
| **CT-LOG-01 e 02** | Login vazio e e-mail fora do padrão | Manual / Negativo | Bloco 2 |
| **CT-LOG-03** | Olho de visibilidade da senha no login | Manual / UX | Bloco 2 |
| **CT-LOG-04 e 05** | Conta inexistente e senha incorreta | Manual / Negativo | Bloco 2 |
| **CT-LOG-06** | Login com credenciais válidas | Manual / Positivo | Bloco 2 |
| **CT-HOM-01 a 04** | Informações da conta, navegação e botões | Manual / Funcional | Bloco 3 |
| **CT-HOM-05 e 06** | Logout e Re-login com a mesma conta | Manual / Regressão | Bloco 3 |
| **CT-TRF-01** | Transferência com sucesso e conferência de saldo | Manual / E2E | Bloco 4 |
| **CT-TRF-02 a 05** | Erros de saldo, conta inválida, valor zero e mesma conta | Manual / Limite | Bloco 4 |
| **CT-EXT-01** | Extrato da conta de origem (débito) | Manual / Auditoria | Bloco 5 |
| **CT-EXT-02** | Extrato da conta de destino (crédito recebido) | Manual / Auditoria | Bloco 5 |
| **CT-SEC-01 a 03** | Proteção de rotas protegidas sem autenticação | Segurança / Regressão | Bloco 6 |
| **CT-MOB-01** | Responsividade Mobile | Usabilidade / Mobile | Bloco 7 |
| **CT-PERF-01** | Smoke Test de Performance (1 VU) | Performance | k6: `smoke-test.js` |
| **CT-PERF-02** | Teste de Carga Real com Ramp-up (20 VUs) | Performance | k6: `teste-carga.js` |
| **CT-PERF-03** | Teste de Estresse Extremo (80 VUs) | Performance | k6: `stress-test.js` |
| **CT-PERF-04** | Teste de Pico / Spike Test (12 VUs) | Performance | k6: `spike-test.js` |

---

## 5. Relatório de Bugs e Defeitos Identificados nos Testes Manuais

Durante os testes manuais exploratórios realizados, os seguintes defeitos foram catalogados:

1. **BUG-01: Aceitação de senhas curtas e fracas no cadastro (Identificado no CT-CAD-18)**
   * *Ação manual:* Preenchimento do campo senha com apenas `123`.
   * *Comportamento observado:* O sistema aceita a senha curta e cria a conta normalmente, sem exigir requisitos de segurança bancária.
2. **BUG-02: Aceitação de nomes inválidos contendo apenas números ou 1 letra (Identificado nos CT-CAD-12, 13, 14 e 15)**
   * *Ação manual:* Preenchimento do campo nome com `carine 12`, `C`, `Ca` ou `123`.
   * *Comportamento observado:* O sistema não valida o formato nem o tamanho mínimo do nome, cadastrando a conta.
3. **BUG-03: Sobrescrita de contas com o mesmo e-mail sem aviso de duplicidade**
   * *Ação manual:* Cadastro de duas contas consecutivas utilizando o mesmo endereço de e-mail.
   * *Comportamento observado:* A aplicação substitui silenciosamente os dados da conta antiga no `localStorage`, sem alertar que o e-mail já existe.
