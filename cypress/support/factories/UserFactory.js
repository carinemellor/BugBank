import { fakerPT_BR as faker } from '@faker-js/faker'

class UserFactory {
  static gerarUsuarioValido(comSaldo = false) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ firstName, lastName }).toLowerCase()
    const password = faker.internet.password({ length: 8 })

    return {
      nome: `${firstName} ${lastName}`,
      email,
      senha: password,
      comSaldo,
    }
  }

  static gerarDadosTransferencia() {
    return {
      valor: faker.number.int({ min: 50, max: 400 }),
      descricao: `Pix ${faker.commerce.productName()}`,
    }
  }
}

export default UserFactory

