export function isAuthenticated (state) {
  if (state.user) return true

  return state.user
}

export function getUser (state) {
  return state.user
}

export const checkAcl = state => permissions => {
  if (typeof permissions === 'boolean') {
    return permissions
  }

  if (!permissions) {
    return true
  }

  let userPermissions = state.permissions

  if (userPermissions) {
    if (!Array.isArray(userPermissions) && typeof userPermissions === 'object') {
      userPermissions = Object.values(userPermissions)
    }

    if (Array.isArray(permissions)) {
      permissions.forEach(role => {
        if (!userPermissions.includes(role)) {
          return false
        }
      })
    } else if (permissions) {
      if (!userPermissions.includes(permissions)) {
        return false
      }
    } else {
      return false
    }

    return true
  }

  return false
}
