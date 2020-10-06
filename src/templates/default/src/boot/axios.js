import twinAxios from 'twin-starter/utils/axios'
import { Notify } from 'quasar'
<% if (prompts.mockApi) { %>import '../mock'<% } else {%>// import '../mockkk'<% }%>

const axiosAPI = twinAxios.axiosInstance

export default ({ Vue, store, router }) => {
  twinAxios.enableInterceptor()

  twinAxios.errorHandling = {

    401 () {
      if (router.currentRoute.matched.some(record => record.meta.requiresAuth)) {
        // Logout without send request to API
        store.dispatch('twin/auth/logout', true)

        router.push({
          name: 'login',
          query: { redirect: router.currentRoute.fullPath }
        })
      }
    },

    403 () {
      Notify.create({
        type: 'negative',
        multiLine: true,
        message: 'Acesso não autorizado. \nVocê não possui permissão para acessar essa funcionalidade. '
      })
    },

    404 () {
      Notify.create({
        type: 'negative',
        message: 'Registro não localizado, atualize a página'
      })
    },

    406 ({ error }) {
      Notify.create({
        type: 'warning',
        message: error
      })
    },

    422 ({ errors }) {
      Object.keys(errors).forEach(key => {
        Notify.create({
          type: 'warning',
          message: errors[key]
        })
      })
    },

    default () {
      Notify.create({
        type: 'negative',
        message: 'Ocorreu um erro interno. Por favor tente novamente.'
      })
    }

  }

  twinAxios.noResponse = function () {
    Notify.create({
      type: 'negative',
      message: 'Não foi possível se conectar ao serviço, verifique sua internet.'
    })
  }

  Vue.prototype.$axios = {
    API: axiosAPI
  }
}

// DON'T CHANGE
export { axiosAPI }
