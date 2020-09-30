import * as methods from 'vuelidate/lib/validators'

export default ({ Vue }) => {
  const i18n = Vue.prototype.$twin.i18n

  Vue.prototype.$twin.rules = {
    is (value, message = null) {
      message = message !== undefined ? message : false
      return (val) => {
        let result
        switch (typeof value) {
          case 'string':
            result = String(val) === value
            break
          case 'number':
            result = Number(val) === value
            break
          default:
            result = val === value
        }
        return result || (message || i18n.t('validation.is')(value))
      }
    },
    required (message = false) {
      return (val) => methods.required(val) || (message || i18n.t('validation.required'))
    },
    minLength (length, message = false) {
      message = message !== undefined ? message : false
      return (val) => methods.minLength(length)(val) || (message || i18n.t('validation.minLength.string')(length))
    },
    maxLength (length, message = false) {
      message = message !== undefined ? message : false
      return (val) => methods.maxLength(length)(val) || (message || i18n.t('validation.maxLength.string')(length))
    },
    minValue (value, message = false) {
      message = message !== undefined ? message : false
      return (val) => methods.minValue(value)(val) || (message || i18n.t('validation.minLength.numeric')(length))
    },
    maxValue (value, message = false) {
      message = message !== undefined ? message : false
      return (val) => methods.maxValue(value)(val) || (message || i18n.t('validation.maxLength.numeric')(length))
    },
    between (min, max, message = false) {
      message = message !== undefined ? message : false
      return (val) => methods.between(min, max)(val) || (message || i18n.t('validation.between.numeric')(min, max))
    },
    alpha (message = false) {
      return (val) => methods.alpha(val) || i18n.t('validation.alpha')
    },
    alphaNum (message = false) {
      return (val) => methods.alphaNum(val) || i18n.t('validation.alphaNum')
    },
    numeric (message = false) {
      return (val) => methods.numeric(val) || (message || i18n.t('validation.numeric'))
    },
    integer (message = false) {
      return (val) => methods.integer(val) || (message || i18n.t('validation.integer'))
    },
    decimal (message = false) {
      return (val) => methods.decimal(val) || (message || i18n.t('validation.decimal'))
    },
    email (message = false) {
      return (val) => methods.email(val) || (message || i18n.t('validation.email'))
    },
    ipAddress (message = false) {
      return (val) => methods.ipAddress(val) || (message || i18n.t('validation.ipAddress'))
    },
    macAddress (separator = ':', message = false) {
      return (val) => methods.macAddress(separator)(val) || (message || i18n.t('validation.macAddress'))
    },
    url (message = false) {
      return (val) => methods.ipAddress(val) || (message || i18n.t('validation.url'))
    },
    or (...args) {
      let message = false
      if (typeof args[args.length - 1] === 'string') {
        message = args.pop()
      }
      return (val) => methods.or(...args)(val) || message
    },
    and (...args) {
      let message = false
      if (typeof args[args.length - 1] === 'string') {
        message = args.pop()
      }
      return (val) => methods.and(...args)(val) || message
    },
    not (rule, message = false) {
      return (val) => methods.not(rule)(val) || message
    },
    sameAs (locator, message) {
      return (val) => val === locator || message
    }
  }
}
