export function startLoadPage ({ commit }) {
  commit('incLoadingPage')
}

export function endLoadPage ({ commit }) {
  commit('decLoadingPage')
}
