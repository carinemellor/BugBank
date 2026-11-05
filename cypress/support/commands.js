import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TransferPage from './pages/TransferPage'

// Comando customizado de Login
Cypress.Commands.add('login', (email, password) => {
  LoginPage.visitar()
  LoginPage.realizarLogin(email, password)
})

// Comando customizado de Cadastro
Cypress.Commands.add('cadastrarConta', ({ email, name, password, comSaldo = false }) => {
  LoginPage.visitar()
  LoginPage.clicarRegistrar()
  RegisterPage.preencherCadastro({
    email,
    name,
    password,
    passwordConfirmation: password,
    comSaldo,
  })
  RegisterPage.clicarCadastrar()
})

// Comando customizado de Transferência
Cypress.Commands.add('realizarTransferencia', ({ conta, digito, valor, descricao }) => {
  TransferPage.preencherTransferencia({ conta, digito, valor, descricao })
  TransferPage.confirmarTransferencia()
})

// Comando customizado para fechar qualquer modal aberto
Cypress.Commands.add('fecharModal', () => {
  cy.get('#btnCloseModal').click()
})
