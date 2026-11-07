class RegisterPage {
  get inputEmail() {
    return cy.get('.card__register input[name="email"]')
  }

  get inputName() {
    return cy.get('.card__register input[name="name"]')
  }

  get inputPassword() {
    return cy.get('.card__register input[name="password"]')
  }

  get inputPasswordConfirmation() {
    return cy.get('.card__register input[name="passwordConfirmation"]')
  }

  get toggleAddBalance() {
    return cy.get('#toggleAddBalance')
  }

  get btnCadastrar() {
    return cy.get('.card__register button').contains('Cadastrar')
  }

  get btnVoltarAoLogin() {
    return cy.get('#btnBackButton')
  }

  get eyePassword() {
    return cy.get('.card__register .login__eye').eq(0)
  }

  get eyePasswordConfirmation() {
    return cy.get('.card__register .login__eye').eq(1)
  }

  get modalText() {
    return cy.get('#modalText')
  }

  get btnCloseModal() {
    return cy.get('#btnCloseModal')
  }

  preencherCadastro({ email, name, password, passwordConfirmation, comSaldo = false }) {
    if (email) this.inputEmail.clear({ force: true }).type(email)
    if (name) this.inputName.clear({ force: true }).type(name)
    if (password) this.inputPassword.clear({ force: true }).type(password)
    if (passwordConfirmation) this.inputPasswordConfirmation.clear({ force: true }).type(passwordConfirmation)
    if (comSaldo) this.toggleAddBalance.click({ force: true })
    return this
  }

  clicarCadastrar() {
    this.btnCadastrar.click()
    return this
  }

  clicarVoltarAoLogin() {
    this.btnVoltarAoLogin.click()
    return this
  }

  alternarOlhoSenha() {
    this.eyePassword.click()
    return this
  }

  alternarOlhoConfirmacao() {
    this.eyePasswordConfirmation.click()
    return this
  }

  validarCadastroSucesso() {
    cy.contains(/A conta .* foi criada com sucesso/).should('be.visible')
    return this
  }

  fecharModal() {
    this.btnCloseModal.click()
    return this
  }
}

export default new RegisterPage()

