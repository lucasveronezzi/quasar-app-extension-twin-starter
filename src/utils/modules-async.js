export async function registerAsyncModules (names, { store, router }) {
  const modules = []

  names.forEach(name => {
    modules.push(import('src/modules/' + name + '/store/index.js'), import('src/modules/' + name + '/router/index.js'))
  })

  for (let x = 0; x < modules.length; x++) {
    const resolved = await modules[x].catch(() => {})
    if (resolved) {
      if (resolved.routes) {
        router.addRoutes(resolved.routes)
      } else {
        store.registerModule(names[x], resolved.default)
      }
    }
  }
}
