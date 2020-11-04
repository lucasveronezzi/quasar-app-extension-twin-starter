var routeHome = null

export default ({ router, Vue }) => {
  const routerNested = Vue.observable({
    history: []
  })

  Vue.prototype.$twin.routerNested = routerNested

  router.afterEach((to, from) => {
    const pathArray = to.path.split('/')

    pathArray.shift()

    var fullPath = ''

    routerNested.history = pathArray.reduce((routes, path, idx) => {
      if (path !== '') {
        fullPath = fullPath + '/' + path

        const found = router.resolve(fullPath).route

        if (found.matched[0].path !== '*' && found.name !== 'home') {
          routes.push({
            path: fullPath,
            title: found.meta.breadcrumb || found.meta.title,
            icon: found.meta.icon
          })
        }
      }

      return routes
    }, [])

    if (!routeHome) {
      const route = router.resolve({ name: 'home' }).route
      routeHome = { path: route.fullPath, title: route.meta.title, icon: route.meta.icon }
    }

    routerNested.history.unshift(routeHome)
  })
}
