export function isAuthenticated (state) {
  if (state.user) return true

  return state.user
}

export function getUser (state) {
  return state.user
}

export const checkAcl = state => roles => {
  if (typeof roles === 'boolean') {
    return roles
  }

  if (!roles) {
    return true
  }

  let userRoles = state.roles

  if (userRoles) {
    if (!Array.isArray(userRoles) && typeof userRoles === 'object') {
      userRoles = Object.values(userRoles)
    }

    if (Array.isArray(roles)) {
      roles.forEach(role => {
        if (!userRoles.includes(role)) {
          return false
        }
      })
    } else if (roles) {
      if (!userRoles.includes(roles)) {
        return false
      }
    } else {
      return false
    }

    return true
  }

  return false
}
