class TransferPage {
  get inputAccountNumber() {
    return cy.get('input[name="accountNumber"]')
  }

  get inputDigit() {
    return cy.get('input[name="digit"]')
  }

  get inputTransferValue() {
    return cy.get('input[name="transferValue"]')
  }

  get inputDescription() {
    return cy.get('input[name="description"]')
  }

  get btnTransferNow() {
    return cy.contains('button', 'Transferir agora')
  }

  get btnBack() {
    return cy.get('#btnBack')
  }

  get btnCloseModal() {
    return cy.get('#btnCloseModal')
  }

  preencherTransferencia({ conta, digito, valor, descricao }) {
    if (conta) this.inputAccountNumber.type(conta)
    if (digito) this.inputDigit.type(digito)
    if (valor !== undefined) this.inputTransferValue.type(String(valor))
    if (descricao) this.inputDescription.type(descricao)
    return this
  }

  confirmarTransferencia() {
    this.btnTransferNow.click()
    return this
  }

  voltarParaHome() {
    this.btnBack.click()
    cy.url().should('include', '/home')
    return this
  }

  validarSucesso() {
    cy.contains(/Transfer[eê]ncia realizada com sucesso/i).should('be.visible')
    return this
  }

  validarErro(mensagem) {
    cy.contains(mensagem).should('be.visible')
    return this
  }

  fecharModal() {
    this.btnCloseModal.click()
    return this
  }
}

export default new TransferPage()

