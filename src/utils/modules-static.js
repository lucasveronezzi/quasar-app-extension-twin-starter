const stateModules = []

var resetStateModules = () => {}

export function registerSyncModules ({ store, router }) {
  const requireModuleStore = require.context('src/modules/', true, /(.*?)\/(store)\/index\.js$/)
  const requireModuleRouter = require.context('src/modules/', true, /(.*?)\/(router)\/index\.js$/)

  requireModuleStore.keys().forEach(file => {
    var fileName = file.match(/(?<=.\/)(.*?)(?=\/)/)[0]

    const storeModule = requireModuleStore(file).default

    stateModules.push({
      name: fileName,
      initialState: storeModule.state
    })

    store.registerModule(fileName, storeModule)
  })

  requireModuleRouter.keys().forEach(file => {
    router.addRoutes(requireModuleRouter(file).routes)
  })

  resetStateModules = () => {
    const newState = {}

    stateModules.forEach(state => {
      newState[state.name] = state.initialState()
    })

    store.replaceState({
      ...store.state,
      ...newState
    })
  }
}

export { resetStateModules }
