function isArrayOrString (value) {
  if (Array.isArray(value) || typeof value === typeof 'string') {
    return true
  }
  return false
}

function checkAuth (route, store, next) {
  // console.log(route.matched)
  let canContinue = route.matched.every(record => {
    const auth = record.meta.auth
    if (auth) {
      if (store.getters['Auth/isAuthenticated'] === false) {
        next({
          name: 'login',
          query: { redirect: route.fullPath },
          replace: true
        })

        return false
      } else if (isArrayOrString(auth) && store.getters['Auth/checkAcl'](auth)) {
        next({
          name: 'notAllowed'
        })

        return false
      }
    } else if (auth === false) {
      if (store.getters['Auth/isAuthenticated']) {
        next({
          name: 'home',
          replace: true
        })

        return false
      }
    }

    return true
  })

  if (canContinue) next()
}

export default async ({ router, store, Vue, urlPath }) => {
  router.beforeEach((to, from, next) => {
    if (store.getters['Auth/isAuthenticated'] === null) {
      store.dispatch('Auth/loadUser')
      .finally( () => {
        checkAuth(to, store, next)
      })
      .catch(() => {})
    } else {
      checkAuth(to, store, next)
    }
  })
}
