export function setUser (state, data) {
  if (typeof data === 'object') {
    state.user = { ...data }
  } else {
    state.user = data
  }
}

export function setPermissions (state, data) {
  state.roles = data
}
