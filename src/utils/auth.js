const loginCallback = [], loadUserCallback = []

export function addLoginCallback (callback) {
  loginCallback.push(callback)
}

export function addLoadUserCallback (callback) {
  loadUserCallback.push(callback)
}

export async function runLoginCallBack (args) {
  for (let x = 0; x < loginCallback.length; x++) {
    await loginCallback[x](args)
  }
}

export function runLoadUserCallback (args) {
  loadUserCallback.forEach(callback => {
    callback(args)
  })
}
