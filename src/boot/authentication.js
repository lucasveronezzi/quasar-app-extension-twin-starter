function isArrayOrString (value) {
  if (Array.isArray(value) || typeof value === typeof 'string') {
    return true
  }
  return false
}

function checkPermission (route, store, router) {
  return route.matched.every(record => {
    const auth = record.meta.auth
    if (auth) {
      if (store.getters['twin/auth/authenticated'] === false) {
        router.push({
          name: 'login',
          query: { redirect: route.fullPath },
          replace: true
        })

        return false
      } else if (isArrayOrString(auth) && store.getters['twin/auth/checkAcl'](auth)) {
        router.push({
          name: 'notAllowed'
        })

        return false
      }
    } else if (auth === false) {
      if (store.getters['twin/auth/authenticated']) {
        router.push({
          name: 'home',
          replace: true
        })

        return false
      }
    }

    return true
  })
}

export default async ({ router, store, Vue, urlPath }) => {
  router.beforeEach((to, from, next) => {
    if (checkPermission(to, store, { push: next })) {
      next()
    }
  })

  if (process.env.TWIN_SPLASHSCREEN) {
    store.dispatch('twin/auth/loadUser')
      .finally(() => {
        checkPermission(router.resolve(urlPath).route, store, router)
      })
      .catch(() => {})
  } else {
    try {
      await store.dispatch('twin/auth/loadUser')
    } catch {
    }
  }
}
