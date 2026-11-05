# language: pt
Funcionalidade: Aplicação Bancária BugBank
  Como um cliente do BugBank
  Quero gerenciar minha conta bancária digital
  Para realizar transferências, consultar saldo, extrato e manter meus acessos seguros

  Contexto:
    Dado que o usuário acessa a página principal do BugBank "https://bugbank.netlify.app/"

  # ====================================================================
  # 1. CADASTRO DE CLIENTES (Testes Manuais e Automatizados)
  # ====================================================================

  Cenário: Cadastro de conta com sucesso sem saldo inicial
    Quando o usuário clica no botão "Registrar"
    E preenche o e-mail "carininha@test.com"
    E preenche o nome "Carine Test"
    E preenche a senha "senha123" e confirmação "senha123"
    E clica em "Cadastrar"
    Então o sistema deve exibir uma mensagem informando que a conta foi criada com sucesso
    E o saldo inicial da conta deve ser de "R$ 0,00"

  Cenário: Cadastro de conta com saldo inicial de R$ 1.000,00
    Quando o usuário clica no botão "Registrar"
    E preenche os dados cadastrais obrigatórios
    E marca a opção "Criar conta com saldo ?"
    E clica em "Cadastrar"
    Então o sistema deve criar a conta com sucesso
    E atribuir um saldo inicial de "R$ 1.000,00"

  Cenário: Alternância de visibilidade da senha no cadastro
    Quando o usuário clica no botão "Registrar"
    E digita a senha no campo correspondente
    E clica no ícone de olho da senha
    Então o campo deve revelar o texto da senha
    E ao clicar novamente no ícone de olho deve ocultar a senha

  Cenário: Cancelar cadastro e voltar para o login
    Quando o usuário clica no botão "Registrar"
    E clica no botão "Voltar ao login"
    Então o formulário de cadastro deve ser fechado
    E o formulário de login deve ficar visível

  Cenário: Tentativa de cadastro com o campo nome vazio
    Quando o usuário clica no botão "Registrar"
    E preenche o e-mail "teste@qa.com"
    E deixa o campo de nome vazio
    E preenche as senhas corretamente
    E clica em "Cadastrar"
    Então o sistema deve exibir a mensagem de erro "Nome não pode ser vazio."

  Esquema do Cenário: Validação de e-mail inválido no cadastro
    Quando o usuário clica no botão "Registrar"
    E preenche o e-mail com "<email_invalido>"
    E clica em "Cadastrar"
    Então o sistema deve exibir o alerta "Formato inválido" abaixo do campo
    E a conta não deve ser criada

    Exemplos:
      | email_invalido      |
      | carininha@test      |
      | carininha.test.com  |
      | carinhaç@teste.com  |

  Cenário: Tentativa de cadastro com senhas divergentes
    Quando o usuário clica no botão "Registrar"
    E preenche a senha com "senha123"
    E preenche a confirmação de senha com "senha321"
    E clica em "Cadastrar"
    Então o sistema deve exibir o alerta "As senhas não são iguais."

  Cenário: Tentativa de cadastro com senhas vazias
    Quando o usuário clica no botão "Registrar"
    E preenche apenas e-mail e nome
    E deixa os campos de senha e confirmação vazios
    E clica em "Cadastrar"
    Então o sistema deve exibir a mensagem "É campo obrigatório" abaixo dos campos

  # --- TESTES MANUAIS EXPLORATÓRIOS E DE LIMITES (BUGS DE REQUISITO) ---

  Cenário: Tentativa de cadastro com nome contendo números ou caracteres especiais
    Quando o usuário clica no botão "Registrar"
    E preenche o nome com "carine 12"
    E preenche os demais campos obrigatórios
    E clica em "Cadastrar"
    Então o sistema deveria bloquear o cadastro por formato de nome inválido

  Esquema do Cenário: Validação de limites mínimos de tamanho no nome
    Quando o usuário clica no botão "Registrar"
    E preenche o campo de nome com "<nome_invalido>"
    E clica em "Cadastrar"
    Então o sistema deveria impedir a criação da conta

    Exemplos:
      | nome_invalido |
      | C             |
      | Ca            |
      | 123           |

  Cenário: Tentativa de cadastro com senha muito curta
    Quando o usuário clica no botão "Registrar"
    E preenche a senha com "123" e confirmação "123"
    E clica em "Cadastrar"
    Então o sistema deveria exigir um comprimento mínimo de 6 a 8 caracteres

  Cenário: Cadastro com senha forte
    Quando o usuário preenche a senha com "SenhaSegura123"
    E clica em "Cadastrar"
    Então o sistema deve criar a conta com sucesso

  # ====================================================================
  # 2. AUTENTICAÇÃO (LOGIN)
  # ====================================================================

  Cenário: Tentativa de login com campos vazios
    Quando o usuário clica em "Acessar" sem preencher os campos
    Então o sistema deve exibir a mensagem "É campo obrigatório" para e-mail e senha

  Cenário: Tentativa de login com formato de e-mail inválido
    Quando o usuário digita "email_invalido" no campo de e-mail
    E clica em "Acessar"
    Então o sistema deve exibir a mensagem "Formato inválido"

  Cenário: Alternância de visibilidade da senha no login
    Quando o usuário preenche a senha no login
    E clica no ícone de olho
    Então a senha deve ser exibida em texto claro
    E ao clicar novamente deve voltar a ser mascarada

  Cenário: Tentativa de login com conta inexistente
    Quando o usuário digita um e-mail não cadastrado
    E digita qualquer senha
    E clica em "Acessar"
    Então o sistema deve exibir o modal com a mensagem "Usuário ou senha inválido"

  Cenário: Tentativa de login com senha incorreta
    Dado que existe uma conta cadastrada para "carininha@test.com"
    Quando o usuário digita a senha incorreta "senha_errada"
    E clica em "Acessar"
    Então o sistema deve exibir a mensagem "Usuário ou senha inválido"

  Cenário: Realizar login com credenciais válidas
    Dado que o usuário possui uma conta cadastrada com "carininha@test.com" e senha "senha123"
    Quando o usuário insere suas credenciais válidas
    E clica em "Acessar"
    Então deve ser redirecionado para a página "/home"
    E deve visualizar a saudação "Olá Carine Test,"
    E deve visualizar os atalhos de operações e saldo

  # ====================================================================
  # 3. NAVEGAÇÃO E BOTÕES DA PÁGINA INICIAL (HOME)
  # ====================================================================

  Cenário: Navegação entre a Home e tela de Transferência
    Dado que o usuário está autenticado na página "/home"
    Quando clica no botão "TRANSFERÊNCIA"
    Então deve ser direcionado para a página "/transfer"
    E ao clicar no botão "Voltar" deve retornar para a página "/home"

  Cenário: Navegação entre a Home e tela de Extrato
    Dado que o usuário está autenticado na página "/home"
    Quando clica no botão "EXTRATO"
    Então deve ser direcionado para a página "/bank-statement"
    E ao clicar no botão "Voltar" deve retornar para a página "/home"

  Cenário: Notificação em funcionalidades em desenvolvimento
    Dado que o usuário está autenticado na página "/home"
    Quando clica no atalho "PAGAMENTOS" ou "SAQUE"
    Então o sistema deve exibir o modal com "Funcionalidade em desenvolvimento"

  Cenário: Logout e re-login na conta
    Dado que o usuário está autenticado na página "/home"
    Quando clica no botão "Sair"
    Então o sistema deve deslogar e redirecionar para a tela inicial "/"
    E ao informar novamente as mesmas credenciais deve realizar o login com sucesso

  # ====================================================================
  # 4. TRANSFERÊNCIA DE VALORES
  # ====================================================================

  Cenário: Transferência bancária realizada com sucesso
    Dado que a conta de origem possui saldo de "R$ 1.000,00"
    E existe uma conta de destino válida no sistema
    Quando o usuário transfere "R$ 350,00" com a descrição "Transferência de teste Cypress"
    Então o sistema deve exibir a mensagem "Transferencia realizada com sucesso"
    E o saldo da conta de origem deve ser atualizado para "R$ 650,00"

  Cenário: Tentativa de transferência com saldo insuficiente
    Dado que o usuário possui saldo de "R$ 650,00"
    Quando tenta transferir "R$ 5.000,00"
    Então o sistema deve exibir "Você não tem saldo suficiente para essa transação"
    E o saldo não deve sofrer alteração

  Cenário: Tentativa de transferência para conta inexistente
    Dado que o usuário está na tela de transferência
    Quando preenche o número de conta "99999" e dígito "9"
    E tenta transferir qualquer valor
    Então o sistema deve exibir "Conta inválida ou inexistente"

  Cenário: Tentativa de transferência de valor zero ou negativo
    Dado que o usuário está na tela de transferência
    Quando tenta transferir o valor "0"
    Então o sistema deve exibir "Valor da transferência não pode ser 0 ou negativo"

  Cenário: Tentativa de transferência para a própria conta
    Dado que o usuário está autenticado em sua conta
    Quando tenta transferir informando o seu próprio número e dígito
    Então o sistema deve exibir "Nao pode transferir pra mesmo conta"

  # ====================================================================
  # 5. EXTRATO BANCÁRIO E AUDITORIA FINANCEIRA
  # ====================================================================

  Cenário: Validação de extrato na conta de origem (Débito)
    Dado que foi realizada uma transferência de "R$ 350,00"
    Quando o usuário devedor acessa a tela "/bank-statement"
    Então deve visualizar o lançamento "-R$ 350,00"
    E o saldo disponível exibido deve ser de "R$ 650,00"

  Cenário: Validação de crédito no extrato da conta de destino (Recebedor)
    Dado que a conta de destino recebeu uma transferência de "R$ 350,00"
    Quando o usuário favorecido realiza login em sua conta
    Então seu saldo na Home deve ser de "R$ 350,00"
    E ao acessar o extrato deve constar o lançamento de crédito de "R$ 350,00"

  # ====================================================================
  # 6. SEGURANÇA E PROTEÇÃO DE ROTAS (ROUTE GUARDING)
  # ====================================================================

  Esquema do Cenário: Bloqueio de acesso direto a rotas protegidas sem autenticação
    Dado que o usuário não está logado no sistema
    Quando tenta acessar diretamente a URL "<rota_protegida>"
    Então o sistema deve interceptar a requisição e redirecionar para "/"
    E exibir a tela de login

    Exemplos:
      | rota_protegida                         |
      | https://bugbank.netlify.app/home       |
      | https://bugbank.netlify.app/transfer   |
      | https://bugbank.netlify.app/bank-statement |

  # ====================================================================
  # 7. RESPONSIVIDADE MOBILE
  # ====================================================================

  Cenário: Utilização do banco em resolução de smartphone
    Dado que o cliente acessa o BugBank através de um dispositivo móvel (resolução 414x896)
    Quando realiza o login com sucesso
    Então os cards, atalhos de operações e saldo devem se adaptar sem quebras de layout
