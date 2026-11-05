class RegisterPage {
  get inputEmail() {
    return cy.get('input[name="email"]').last()
  }

  get inputName() {
    return cy.get('input[name="name"]')
  }

  get inputPassword() {
    return cy.get('input[name="password"]').last()
  }

  get inputPasswordConfirmation() {
    return cy.get('input[name="passwordConfirmation"]')
  }

  get toggleAddBalance() {
    return cy.get('#toggleAddBalance')
  }

  get btnCadastrar() {
    return cy.contains('button', 'Cadastrar')
  }

  get btnVoltarAoLogin() {
    return cy.get('#btnBackButton')
  }

  get eyePassword() {
    return cy.get('.login__eye').eq(1)
  }

  get eyePasswordConfirmation() {
    return cy.get('.login__eye').eq(2)
  }

  get modalText() {
    return cy.get('#modalText')
  }

  get btnCloseModal() {
    return cy.get('#btnCloseModal')
  }

  preencherCadastro({ email, name, password, passwordConfirmation, comSaldo = false }) {
    if (email) this.inputEmail.type(email)
    if (name) this.inputName.type(name)
    if (password) this.inputPassword.type(password)
    if (passwordConfirmation) this.inputPasswordConfirmation.type(passwordConfirmation)
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

