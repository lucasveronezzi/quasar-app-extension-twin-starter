export default {
  validation: {
    alpha: 'O campo deve ter somente caracteres do alfabeto',
    alphaNum: 'O campo deve ter somente caracteres númericos',
    numeric: 'O campo deve ser um número',
    integer: 'O campo deve ser um número inteiro',
    decimal: 'O campo deve ser um número decimal',
    email: 'O campo deve ser um endereço de e-mail válido',
    ipAddress: 'O campo deve ser um endereço de IP válido',
    macAddress: 'O campo deve ser um número de MAC válido',
    url: 'O campo deve ser uma URL válida',
    passwordMatch: 'Senhas não conferem.',
    required: 'Campo obrigatório.',
    is: (value) => `Valor do campo deve ser '${value}'.`,
    passwordLength: (length) => `O comprimento mínimo da senha é de ${length} caracteres.`,
    minLength: {
      numeric: (value) => `O campo deve ser no mínimo ${value}`,
      file: (value) => `O arquivo deve ter no mínimo ${value} kilobytes`,
      string: (value) => `O campo deve ter no mínimo ${value} caracteres.`,
      array: (value) => `O campo deve ter no mínimo ${value} itens.`,
      date: (value) => `A data deve ser no mínimo ${value}.`
    },
    maxLength: {
      numeric: (value) => `O campo não deve ser no maior que ${value}`,
      file: (value) => `O arquivo não deve ter no maior que ${value} kilobytes`,
      string: (value) => `O campo não deve ter no maior que ${value} caracteres.`,
      array: (value) => `O campo não deve ter no maior que ${value} itens.`,
      date: (value) => `A data deve ser maior que ${value}.`
    },
    between: {
      numeric: (min, max) => `O campo deve estar entre ${min} e ${max}`,
      file: (min, max) => `O campo deve estar entre ${min} e ${max} kilobytes`,
      string: (min, max) => `O campo deve estar entre ${min} e ${max} caracteres`,
      array: (min, max) => `O campo deve estar entre ${min} e ${max} itens`,
      date: (min, max) => `A data deve estar entre o periodo ${min} e ${max}`
    }
  },

  text: {
    login: {

    },

    register: {

    },

    verification: {

    },

    password: {

    }
  },

  field: {

  }
}
