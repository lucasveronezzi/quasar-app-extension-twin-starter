import { axiosAPI } from 'boot/axios'
import { Cookies } from 'quasar'

function resolveDataUser (commit, user) {
  if (user?.roles) {
    commit('setRoles', user.roles)
    delete user.roles
  } else if (user?.user?.roles) {
    commit('setRoles', user.user.roles)
    delete user.user.roles
  }

  commit('setUser', user || {})
}

export function login ({ state, commit }, data) {
  return axiosAPI.post(process.env.TWIN_API_LOGIN, Object.assign({
    grant_type: 'password',
    client_id: process.env.API_CLIENT_ID,
    client_secret: process.env.API_CLIENT_SECRET,
    scope: '*'
  }, data), { ignoreCode: [400, 401] })
    .then(response => {
      resolveDataUser(commit, response.data)

      state.loginCallback.forEach(callback => {
        callback(response.data)
      })

      return response
    })
}

export function setHeader ({ commit }, data) {
  if (process.env.TWIN_AUTH_SCHEME === 'Basic') {
    data.token = btoa(`${data.username}:${data.password}`)
  }

  axiosAPI.defaults.headers.Authorization = `${process.env.TWIN_AUTH_SCHEME} ${data.token}`

  if (data.expires_in) {
    Cookies.set('api_token', data.token, {
      expires: data.expires_in
    })
  } else {
    Cookies.set('api_token', data.token)
  }
}

export function loadUser ({ state, commit }) {
  if (process.env.TWIN_AUTH_SCHEME !== 'nothing') {
    var token = Cookies.get('api_token')

    if (token) {
      axiosAPI.defaults.headers.Authorization = `${process.env.TWIN_AUTH_SCHEME} ${token}`
    }
  }

  return axiosAPI.get(process.env.TWIN_API_LOAD_USER, null, { ignoreCode: '*' })
    .then(response => {
      resolveDataUser(commit, response.data)

      state.loadUserCallback.forEach(callback => {
        callback(response.data)
      })

      return response
    })
    .catch(e => {
      console.error(e)
      commit('setUser', false)
      return Promise.reject(e)
    })
}

export function register ({ state, commit }, data) {
  return axiosAPI.post(process.env.TWIN_API_REGISTER, data)
}

export function passwordReset ({ state, commit }, data) {
  return axiosAPI.post(process.env.TWIN_API_RESET_PASSWORD, data)
}

export function passwordForgot ({ state, commit }, email) {
  return axiosAPI.post(process.env.TWIN_API_FORGOT_PASSWORD, { email })
}

export function verify ({ state, commit }) {
  return axiosAPI.post(process.env.TWIN_API_EMAIL_VERIFIY_RESEND)
}

export function logout ({ commit }, wihtouApi = false) {
  if (wihtouApi) {
    Cookies.remove('api_token')
    commit('setUser', false)
    return true
  }

  return axiosAPI.post(process.env.TWIN_API_LOGOUT)
    .then(() => {
      Cookies.remove('api_token')
      commit('setUser', false)
    })
}
