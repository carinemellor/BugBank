class StatementPage {
  get textBalanceAvailable() {
    return cy.get('#textBalanceAvailable')
  }

  get btnBack() {
    return cy.get('#btnBack')
  }

  validarSaldoDisponivel(saldoEsperado) {
    this.textBalanceAvailable.should('contain.text', saldoEsperado)
    return this
  }

  validarTransacao(descricao, valor) {
    if (descricao) cy.contains(descricao).should('be.visible')
    if (valor) cy.contains(valor).should('be.visible')
    return this
  }

  voltarParaHome() {
    this.btnBack.click()
    cy.url().should('include', '/home')
    return this
  }
}

export default new StatementPage()

