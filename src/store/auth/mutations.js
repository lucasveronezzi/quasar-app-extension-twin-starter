export function setUser (state, data) {
  state.user = data
}

export function setRoles (state, data) {
  state.roles = data
}

export function addLoginCallback (state, callback) {
  state.loginCallback.push(callback)
}

export function addLoadUserCallback (state, callback) {
  state.loadUserCallback.push(callback)
}
