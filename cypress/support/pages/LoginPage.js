class LoginPage {
  get inputEmail() {
    return cy.get('.card__login input[name="email"]')
  }

  get inputPassword() {
    return cy.get('.card__login input[name="password"]')
  }

  get btnAcessar() {
    return cy.get('.card__login button').contains('Acessar')
  }

  get btnRegistrar() {
    return cy.get('.card__login button').contains('Registrar')
  }

  get eyeIcon() {
    return cy.get('.card__login .login__eye')
  }

  get modalText() {
    return cy.get('#modalText')
  }

  get btnCloseModal() {
    return cy.get('#btnCloseModal')
  }

  visitar() {
    cy.visit('/')
    return this
  }

  preencherEmail(email) {
    if (email) this.inputEmail.clear({ force: true }).type(email)
    return this
  }

  preencherSenha(senha) {
    if (senha) this.inputPassword.clear({ force: true }).type(senha)
    return this
  }

  clicarAcessar() {
    this.btnAcessar.click()
    return this
  }

  clicarRegistrar() {
    this.btnRegistrar.click()
    return this
  }

  alternarVisibilidadeSenha() {
    this.eyeIcon.click()
    return this
  }

  realizarLogin(email, senha) {
    this.preencherEmail(email)
    this.preencherSenha(senha)
    this.clicarAcessar()
    return this
  }

  validarMensagemErro(mensagem) {
    cy.contains(mensagem).should('be.visible')
    return this
  }

  fecharModal() {
    this.btnCloseModal.click()
    return this
  }
}

export default new LoginPage()

