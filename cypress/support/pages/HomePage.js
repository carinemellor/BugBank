class HomePage {
  get textName() {
    return cy.get('#textName')
  }

  get textAccountNumber() {
    return cy.get('#textAccountNumber')
  }

  get textBalance() {
    return cy.get('#textBalance')
  }

  get btnTransferencia() {
    return cy.contains('TRANSFERÊNCIA')
  }

  get btnExtrato() {
    return cy.contains('EXTRATO')
  }

  get btnPagamentos() {
    return cy.contains('PAGAMENTOS')
  }

  get btnSaque() {
    return cy.contains('SAQUE')
  }

  get btnExit() {
    return cy.get('#btnExit')
  }

  get btnCloseModal() {
    return cy.get('#btnCloseModal')
  }

  validarUsuarioLogado(nome) {
    cy.url().should('include', '/home')
    this.textName.should('contain.text', `Olá ${nome}`)
    return this
  }

  validarSaldo(saldoEsperado) {
    this.textBalance.should('contain.text', saldoEsperado)
    return this
  }

  acessarTransferencia() {
    this.btnTransferencia.click()
    return this
  }

  acessarExtrato() {
    this.btnExtrato.click()
    return this
  }

  clicarPagamentos() {
    this.btnPagamentos.click()
    return this
  }

  clicarSaque() {
    this.btnSaque.click()
    return this
  }

  fazerLogout() {
    this.btnExit.click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    return this
  }

  fecharModal() {
    this.btnCloseModal.click()
    return this
  }
}

export default new HomePage()

