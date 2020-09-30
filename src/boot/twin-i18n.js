export default async ({ Vue }) => {
  const lang = Vue.prototype.$q.lang.isoName || 'en-us'

  try {
    var info = require(`app/src/i18n/${lang}/index.js`)
    info = info.default
  } catch (e) {
    console.error(e)
  }

  // try {
  //   var info = (await import(`app/src/i18n/${lang}/index.js`)).default
  // } catch(e) {
  //   console.error(e)
  // }

  Vue.prototype.$twin.i18n = {
    t (message) {
      if (!info || !message) return ''

      return message.split('.').reduce((acc, val) => {
        if (typeof acc !== 'object') return ''
        return acc[val] || ''
      }, info)
    }
  }
}
