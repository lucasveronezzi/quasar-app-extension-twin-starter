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

  page: {
    login: {
      passwordForgot: 'Esqueceu a senha?',
      registerMessage: ' Não possui uma conta?',
      register: 'Registre-se'
    },

    passowrdReset: {
      welcome: 'Bem vindo, ',
      subTitle: 'Digite sua nova senha e confirme-a.',
      passwordChangedMessage: 'Senha alterada com sucesso.',
      redirectMessage: 'Redirecionando para tela de login...'
    },

    passwordForgot: {
      title: 'Recuperar Senha',
      subTitle: 'Digite seu e-mail e clique em enviar para receber no seu e-mail o link recuperação de senha.',
      emailSent: 'E-mail enviado com sucesso',
      checkEmailMessage: 'Verifique na sua caixa de entrada o e-mail com o link de recuperação de senha'
    },

    register: {
      title: 'Registrar-se',
      formTitle: 'Dados Cadastrais',
      agreeWith: 'Eu concordo com os',
      termsService: 'termos e condições de serviço.'
    },

    verification: {

    },
  },

  label: {
    username: 'Nome',
    email: 'E-mail'
    password: 'Senha',
    passwordConfirm: 'Confirmar Senha',
    goBack: 'Voltar',
  },

  btn: {
    createAccount: 'Criar Conta',
    logIn: 'Entrar',
    resetPassword: 'Confirmar',
    sendEmail: 'Enviar E-mail'
  }
}
