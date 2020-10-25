import twinStore from 'twin-starter/store'

var twin = {}

export default ({ Vue, store }) => {
  store.registerModule('twin', twinStore)

  // Only use helpers to call actions.
  // DON'T USE TO GET STATES OR GETTERS BECAUSE OF THE REACTIVITY
  twin = {
    startLoad: () => store.dispatch('twin/startLoadPage'),

    endLoad: () => store.dispatch('twin/endLoadPage'),

    whitLoading (action, data) {
      this.startLoad()
      return store.dispatch(action, data)
        .finally(() => {
          this.endLoad()
        })

    },

    auth: {
      register: (data) => store.dispatch('Auth/register', data),

      login: (data) => store.dispatch('Auth/login', data),

      logout: () => store.dispatch('Auth/logout'),

      verify: (token) => store.dispatch('Auth/verify', token),

      passwordForgot: (data) => store.dispatch('Auth/passwordForgot', data),

      passwordReset: (data) => store.dispatch('Auth/passwordReset', data),

      checkAcl: (roles) => store.getters['Auth/checkAcl'](roles),

      setToken: (data) => store.dispatch('Auth/setToken', data),

      fetch: () => store.dispatch('Auth/fetch')
    }
  }

  Vue.prototype.$twin = twin
}

export { twin }
