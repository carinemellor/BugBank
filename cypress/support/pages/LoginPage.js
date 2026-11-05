class LoginPage {
  get inputEmail() {
    return cy.get('input[name="email"]').first()
  }

  get inputPassword() {
    return cy.get('input[name="password"]').first()
  }

  get btnAcessar() {
    return cy.contains('button', 'Acessar')
  }

  get btnRegistrar() {
    return cy.contains('button', 'Registrar')
  }

  get eyeIcon() {
    return cy.get('.login__eye').first()
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
    if (email) this.inputEmail.type(email)
    return this
  }

  preencherSenha(senha) {
    if (senha) this.inputPassword.type(senha)
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

