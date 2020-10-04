import twinStore from 'twin-starter/store'

export default ({ Vue, store }) => {
  store.registerModule('twin', twinStore)

  // Only use helpers to call actions.
  // DON'T USE TO GET STATES OR GETTERS BECAUSE OF THE REACTIVITY
  Vue.prototype.$twin = {
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
      register: (data) => store.dispatch('twin/auth/register', data),

      login: (data) => store.dispatch('twin/auth/login', data),

      logout: () => store.dispatch('twin/auth/logout'),

      verify: (token) => store.dispatch('twin/auth/verify', token),

      passwordForgot: (data) => store.dispatch('twin/auth/passwordForgot', data),

      passwordReset: (data) => store.dispatch('twin/auth/passwordReset', data),

      checkAcl: (roles) => store.getters['twin/auth/checkAcl'](roles),

      setHeader: (data) => store.dispatch('twin/auth/setHeader', data),

      fetch: () => store.dispatch('twin/auth/fetch')
    }
  }
}
