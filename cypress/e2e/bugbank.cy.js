// ====================================================================
// SUÍTE DE TESTES AUTOMATIZADOS - BUGBANK COM CYPRESS E PAGE OBJECTS
// ====================================================================

import LoginPage from '../support/pages/LoginPage'
import RegisterPage from '../support/pages/RegisterPage'
import HomePage from '../support/pages/HomePage'
import TransferPage from '../support/pages/TransferPage'
import StatementPage from '../support/pages/StatementPage'
import UserFactory from '../support/factories/UserFactory'

describe('1. Testes de Cadastro do BugBank', { testIsolation: false }, () => {
  it('Deve registrar conta com sucesso (sem saldo inicial)', () => {
    LoginPage.visitar().clicarRegistrar()

    RegisterPage.preencherCadastro({
      email: 'carininha@test.com',
      name: 'Carine Test',
      password: 'senha123',
      passwordConfirmation: 'senha123',
    }).clicarCadastrar()

    RegisterPage.validarCadastroSucesso().fecharModal()
  })

  it('Deve registrar conta com sucesso marcando a opção de saldo inicial', () => {
    LoginPage.visitar().clicarRegistrar()

    RegisterPage.preencherCadastro({
      email: 'com_saldo@teste.com',
      name: 'Carine Com Saldo',
      password: 'senha123',
      passwordConfirmation: 'senha123',
      comSaldo: true,
    }).clicarCadastrar()

    RegisterPage.validarCadastroSucesso().fecharModal()
  })

  it('Deve alternar a visibilidade da senha e confirmação ao clicar no ícone de olho', () => {
    LoginPage.visitar().clicarRegistrar()

    // Campo Senha
    RegisterPage.inputPassword.type('senha123').should('have.attr', 'type', 'password')
    RegisterPage.alternarOlhoSenha()
    RegisterPage.inputPassword.should('have.attr', 'type', 'text')
    RegisterPage.alternarOlhoSenha()
    RegisterPage.inputPassword.should('have.attr', 'type', 'password')

    // Campo Confirmação de Senha
    RegisterPage.inputPasswordConfirmation.type('senha123').should('have.attr', 'type', 'password')
    RegisterPage.alternarOlhoConfirmacao()
    RegisterPage.inputPasswordConfirmation.should('have.attr', 'type', 'text')
    RegisterPage.alternarOlhoConfirmacao()
    RegisterPage.inputPasswordConfirmation.should('have.attr', 'type', 'password')
  })

  it('Deve retornar para a tela de login ao clicar no botão Voltar ao login', () => {
    LoginPage.visitar().clicarRegistrar()
    RegisterPage.clicarVoltarAoLogin()
    LoginPage.btnAcessar.should('be.visible')
  })

  it('Deve exibir erro ao tentar registrar com o campo nome vazio', () => {
    LoginPage.visitar().clicarRegistrar()

    RegisterPage.preencherCadastro({
      email: 'carininha_vazio@test.com',
      password: 'senha123',
      passwordConfirmation: 'senha123',
    }).clicarCadastrar()

    LoginPage.validarMensagemErro('Nome não pode ser vazio').fecharModal()
  })

  it('Deve exibir erro de validação ao tentar registrar com e-mail inválido', () => {
    LoginPage.visitar().clicarRegistrar()

    RegisterPage.preencherCadastro({
      email: 'carininha@test',
      name: 'Carine Test',
      password: 'senha123',
      passwordConfirmation: 'senha123',
    }).clicarCadastrar()

    cy.contains(/A conta .* foi criada com sucesso/).should('not.exist')
    cy.contains('Formato inválido').should('be.visible')
  })

  it('Deve exibir erro de validação ao tentar registrar com e-mail sem @', () => {
    LoginPage.visitar().clicarRegistrar()

    RegisterPage.preencherCadastro({
      email: 'carininha.test.com',
      name: 'Carine Test',
      password: 'senha123',
      passwordConfirmation: 'senha123',
    }).clicarCadastrar()

    cy.contains(/A conta .* foi criada com sucesso/).should('not.exist')
    cy.contains('Formato inválido').should('be.visible')
  })

  it('Deve bloquear o cadastro de e-mail com caractere especial (cedilha)', () => {
    LoginPage.visitar().clicarRegistrar()

    RegisterPage.preencherCadastro({
      email: 'carinhaç@teste.com',
      name: 'Carine Teste',
      password: 'senha123',
      passwordConfirmation: 'senha123',
    }).clicarCadastrar()

    cy.contains(/A conta .* foi criada com sucesso/).should('not.exist')
    cy.contains('Formato inválido').should('be.visible')
  })

  it('Deve bloquear cadastro quando as senhas digitadas não conferem', () => {
    LoginPage.visitar().clicarRegistrar()

    RegisterPage.preencherCadastro({
      email: 'senhas_diferentes@teste.com',
      name: 'Carine Teste',
      password: 'senha123',
      passwordConfirmation: 'senha321',
    }).clicarCadastrar()

    LoginPage.validarMensagemErro('As senhas não são iguais.').fecharModal()
  })

  it('Deve bloquear cadastro se o campo de senha ficar vazio', () => {
    LoginPage.visitar().clicarRegistrar()

    RegisterPage.preencherCadastro({
      email: 'senha_vazia@teste.com',
      name: 'Carine Teste',
    }).clicarCadastrar()

    cy.contains('É campo obrigatório').should('be.visible')
    cy.contains(/A conta .* foi criada com sucesso/).should('not.exist')
  })

  it('Deve cadastrar com sucesso usando uma senha forte (letras e números)', () => {
    LoginPage.visitar().clicarRegistrar()

    RegisterPage.preencherCadastro({
      email: 'senha_forte@teste.com',
      name: 'Carine Teste',
      password: 'SenhaSegura123',
      passwordConfirmation: 'SenhaSegura123',
    }).clicarCadastrar()

    RegisterPage.validarCadastroSucesso().fecharModal()
  })

  it('Deve cadastrar com sucesso utilizando massa de dados dinâmica gerada pelo Faker', () => {
    const usuarioFaker = UserFactory.gerarUsuarioValido(true)

    LoginPage.visitar().clicarRegistrar()
    RegisterPage.preencherCadastro({
      email: usuarioFaker.email,
      name: usuarioFaker.nome,
      password: usuarioFaker.senha,
      passwordConfirmation: usuarioFaker.senha,
      comSaldo: usuarioFaker.comSaldo,
    }).clicarCadastrar()

    RegisterPage.validarCadastroSucesso().fecharModal()
  })
})

describe('2. Testes de Login do BugBank', { testIsolation: false }, () => {
  it('Deve exibir mensagem de campos obrigatórios ao tentar acessar com email e senha vazios', () => {
    LoginPage.visitar().clicarAcessar()
    cy.contains('É campo obrigatório').should('be.visible')
  })

  it('Deve exibir erro de formato inválido ao tentar acessar com email fora do padrão', () => {
    LoginPage.visitar()
    LoginPage.preencherEmail('emailinvalido')
    LoginPage.preencherSenha('senha123')
    LoginPage.clicarAcessar()
    cy.contains('Formato inválido').should('be.visible')
  })

  it('Deve alternar a visibilidade da senha no login ao clicar no ícone de olho', () => {
    LoginPage.visitar()
    LoginPage.preencherSenha('senha123')
    LoginPage.inputPassword.should('have.attr', 'type', 'password')
    LoginPage.alternarVisibilidadeSenha()
    LoginPage.inputPassword.should('have.attr', 'type', 'text')
    LoginPage.alternarVisibilidadeSenha()
    LoginPage.inputPassword.should('have.attr', 'type', 'password')
  })

  it('Deve exibir erro ao tentar acessar com conta inexistente', () => {
    LoginPage.visitar().realizarLogin('conta_inexistente@test.com', 'senha123')
    LoginPage.validarMensagemErro('Usuário ou senha inválido').fecharModal()
  })

  it('Deve exibir erro ao tentar acessar com senha incorreta', () => {
    LoginPage.visitar().realizarLogin('carininha@test.com', 'senha_errada')
    LoginPage.validarMensagemErro('Usuário ou senha inválido').fecharModal()
  })

  it('Deve realizar login com sucesso utilizando credenciais válidas', () => {
    LoginPage.visitar().realizarLogin('carininha@test.com', 'senha123')
    HomePage.validarUsuarioLogado('Carine Test')
    HomePage.btnTransferencia.should('be.visible')
    HomePage.btnExtrato.should('be.visible')
  })
})

describe('3. Testes de Navegação e Botões da Página Inicial (Home)', { testIsolation: false }, () => {
  it('Deve validar navegação e funcionamento do botão TRANSFERÊNCIA e botão Voltar', () => {
    LoginPage.visitar().realizarLogin('carininha@test.com', 'senha123')

    HomePage.acessarTransferencia()
    cy.url().should('include', '/transfer')
    TransferPage.btnTransferNow.should('be.visible')

    TransferPage.voltarParaHome()
    HomePage.validarUsuarioLogado('Carine Test')
  })

  it('Deve validar navegação e funcionamento do botão EXTRATO e botão Voltar', () => {
    HomePage.acessarExtrato()
    cy.url().should('include', '/bank-statement')
    StatementPage.textBalanceAvailable.should('be.visible')

    StatementPage.voltarParaHome()
    HomePage.validarUsuarioLogado('Carine Test')
  })

  it('Deve exibir aviso de funcionalidade em desenvolvimento para PAGAMENTOS e SAQUE', () => {
    HomePage.clicarPagamentos()
    LoginPage.validarMensagemErro('Funcionalidade em desenvolvimento').fecharModal()

    HomePage.clicarSaque()
    LoginPage.validarMensagemErro('Funcionalidade em desenvolvimento').fecharModal()
  })

  it('Deve realizar logout (Sair) e retornar para a tela de login', () => {
    HomePage.fazerLogout()
    LoginPage.btnAcessar.should('be.visible')
  })

  it('Deve fazer login novamente com a mesma conta após o logout', () => {
    LoginPage.realizarLogin('carininha@test.com', 'senha123')
    HomePage.validarUsuarioLogado('Carine Test')
  })
})

describe('4. Testes de Transferência de Valores', { testIsolation: false }, () => {
  let contaDestinoNumero = ''
  let contaDestinoDigito = ''

  it('Pré-requisito: Deve cadastrar conta de destino para receber a transferência', () => {
    LoginPage.visitar().clicarRegistrar()

    RegisterPage.preencherCadastro({
      email: 'destino_transf@test.com',
      name: 'Conta Destino',
      password: 'senha123',
      passwordConfirmation: 'senha123',
    }).clicarCadastrar()

    RegisterPage.modalText.invoke('text').then((texto) => {
      const match = texto.match(/(\d+)-(\d+)/)
      expect(match).to.not.be.null
      contaDestinoNumero = match[1]
      contaDestinoDigito = match[2]
    })
    RegisterPage.fecharModal()
  })

  it('Pré-requisito: Deve cadastrar conta de origem com saldo de R$ 1.000,00', () => {
    LoginPage.clicarRegistrar()

    RegisterPage.preencherCadastro({
      email: 'origem_transf@test.com',
      name: 'Conta Origem',
      password: 'senha123',
      passwordConfirmation: 'senha123',
      comSaldo: true,
    }).clicarCadastrar()

    RegisterPage.validarCadastroSucesso().fecharModal()
  })

  it('Deve realizar transferência com sucesso e validar débito no saldo', () => {
    // 1. Login na conta de origem
    LoginPage.realizarLogin('origem_transf@test.com', 'senha123')

    // 2. Confirma saldo inicial
    HomePage.validarSaldo('1.000,00')

    // 3. Acessa área de transferência
    HomePage.acessarTransferencia()

    // 4. Preenche transferência usando a conta destino capturada
    cy.then(() => {
      TransferPage.preencherTransferencia({
        conta: contaDestinoNumero,
        digito: contaDestinoDigito,
        valor: 350,
        descricao: 'Transferência de teste Cypress',
      }).confirmarTransferencia()
    })

    // 5. Valida sucesso e fecha modal
    TransferPage.validarSucesso().fecharModal()

    // 6. Retorna para a home e valida saldo atualizado (1.000 - 350 = 650,00)
    TransferPage.voltarParaHome()
    HomePage.validarSaldo('650,00')
  })

  it('Deve exibir erro ao tentar transferir valor maior que o saldo disponível', () => {
    HomePage.acessarTransferencia()

    cy.then(() => {
      TransferPage.preencherTransferencia({
        conta: contaDestinoNumero,
        digito: contaDestinoDigito,
        valor: 5000,
        descricao: 'Tentativa sem saldo',
      }).confirmarTransferencia()
    })

    TransferPage.validarErro('Você não tem saldo suficiente para essa transação').fecharModal()
    TransferPage.voltarParaHome()
  })

  it('Deve exibir erro ao tentar transferir para uma conta inexistente', () => {
    HomePage.acessarTransferencia()

    TransferPage.preencherTransferencia({
      conta: '99999',
      digito: '9',
      valor: 100,
      descricao: 'Conta inexistente',
    }).confirmarTransferencia()

    TransferPage.validarErro('Conta inválida ou inexistente').fecharModal()
    TransferPage.voltarParaHome()
  })

  it('Deve exibir erro ao tentar transferir valor zerado ou negativo', () => {
    HomePage.acessarTransferencia()

    cy.then(() => {
      TransferPage.preencherTransferencia({
        conta: contaDestinoNumero,
        digito: contaDestinoDigito,
        valor: 0,
        descricao: 'Valor zero',
      }).confirmarTransferencia()
    })

    TransferPage.validarErro('Valor da transferência não pode ser 0 ou negativo').fecharModal()
    TransferPage.voltarParaHome()
  })

  it('Deve exibir erro ao tentar transferir para a própria conta', () => {
    let propriaConta = ''
    let proprioDigito = ''

    HomePage.textAccountNumber.find('span').invoke('text').then((texto) => {
      const match = texto.match(/(\d+)-(\d+)/)
      propriaConta = match[1]
      proprioDigito = match[2]
    })

    HomePage.acessarTransferencia()

    cy.then(() => {
      TransferPage.preencherTransferencia({
        conta: propriaConta,
        digito: proprioDigito,
        valor: 50,
        descricao: 'Para mim mesmo',
      }).confirmarTransferencia()
    })

    TransferPage.validarErro('Nao pode transferir pra mesmo conta').fecharModal()
    TransferPage.voltarParaHome()
  })
})

describe('5. Testes de Extrato Bancário e Conferência do Ciclo Financeiro', { testIsolation: false }, () => {
  it('Deve exibir o histórico de transações e saldo debitado no extrato da conta de origem', () => {
    HomePage.acessarExtrato()

    StatementPage.validarSaldoDisponivel('650,00')
    StatementPage.validarTransacao('Abertura de conta')
    StatementPage.validarTransacao('Transferência de teste Cypress', '-R$ 350,00')

    StatementPage.voltarParaHome()
    HomePage.fazerLogout()
  })

  it('Deve realizar login na conta de destino e validar recebimento do crédito de R$ 350,00 no extrato', () => {
    // 1. Login na conta favorecida
    LoginPage.realizarLogin('destino_transf@test.com', 'senha123')

    // 2. Valida saldo creditado
    HomePage.validarSaldo('350,00')

    // 3. Valida no extrato a entrada do valor
    HomePage.acessarExtrato()
    StatementPage.validarSaldoDisponivel('350,00')
    StatementPage.validarTransacao('Transferência de teste Cypress', 'R$ 350,00')

    StatementPage.voltarParaHome()
    HomePage.fazerLogout()
  })
})

describe('6. Testes de Segurança e Proteção de Rotas (Route Guarding)', { testIsolation: false }, () => {
  it('Deve impedir acesso direto à página /home sem autenticação e redirecionar para login', () => {
    cy.clearCookies()
    cy.visit('/home')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    LoginPage.btnAcessar.should('be.visible')
  })

  it('Deve impedir acesso direto à página /transfer sem autenticação e redirecionar para login', () => {
    cy.clearCookies()
    cy.visit('/transfer')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    LoginPage.btnAcessar.should('be.visible')
  })

  it('Deve impedir acesso direto à página /bank-statement sem autenticação e redirecionar para login', () => {
    cy.clearCookies()
    cy.visit('/bank-statement')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    LoginPage.btnAcessar.should('be.visible')
  })
})

describe('7. Testes de Responsividade e Mobile Viewport (iPhone XR)', { testIsolation: false }, () => {
  it('Deve renderizar os componentes e permitir autenticação e navegação na tela mobile', () => {
    cy.viewport('iphone-xr')
    LoginPage.visitar()

    // Valida que os elementos do login se adaptam à tela pequena
    LoginPage.inputEmail.should('be.visible')
    LoginPage.inputPassword.should('be.visible')
    LoginPage.btnAcessar.should('be.visible')

    // Realiza login no viewport mobile
    LoginPage.realizarLogin('carininha@test.com', 'senha123')
    HomePage.validarUsuarioLogado('Carine Test')

    // Valida atalhos na tela de smartphone
    HomePage.btnTransferencia.should('be.visible')
    HomePage.btnExtrato.should('be.visible')

    HomePage.fazerLogout()
  })
})
