import i18n from 'app/src/boot/i18n.js'

export default ({ Vue }) => {
  Vue.prototype.$twin.i18n = i18n
}
