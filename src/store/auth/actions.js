import { axiosAPI } from 'boot/axios'
import { runLoginCallBack, runLoadUserCallback } from 'twin-starter/utils/auth'
import { Cookies, LocalStorage } from 'quasar'
import { resetStateModules } from 'twin-starter/utils/modules-static'

function removeToken () {
  if (process.env.TWIN_AUTH_SCHEME_SEND_TOKEN === 'header') {
    if (process.env.TWIN_AUTH_STORAGE_TOKEN === 'cookie') {
      Cookies.remove('api_access_token')
    }

    if (process.env.TWIN_AUTH_STORAGE_TOKEN === 'localStorage') {
      LocalStorage.remove('api_access_token')
    }
  }
}

function resolveDataUser (commit, data) {
  if (!data) data = {}

  if (data.data) data = data.data

  if (data.permissions) {
    commit('setPermissions', data.permissions)
    delete data.permissions
  } else if (data.user?.permissions) {
    commit('setPermissions', data.user.permissions)
    delete data.user.permissions
  }

  if (data.user) {
    commit('setUser', data.user)
  } else {
    commit('setUser', data)
  }
}

export function login ({ state, commit }, data) {
  return axiosAPI.post(process.env.TWIN_API_LOGIN, Object.assign({
    grant_type: 'password',
    client_id: process.env.API_CLIENT_ID,
    client_secret: process.env.API_CLIENT_SECRET,
    scope: '*'
  }, data), { ignoreCode: [400, 401] })
    .then(async response => {
      resolveDataUser(commit, response.data)

      await runLoginCallBack(response.data)

      return response
    })
}

export function setToken ({ commit }, data) {
  if (process.env.TWIN_AUTH_SCHEME_SEND_TOKEN === 'cookie') {
    Cookies.set(process.env.TWIN_AUTH_COOKIE_NAME, data.access_token, {
      expires: data.expires_in || 3650,
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'Strict'
    })
    console.log(Cookies.get(process.env.TWIN_AUTH_COOKIE_NAME))
  }

  if (process.env.TWIN_AUTH_SCHEME_SEND_TOKEN === 'header') {
    if (process.env.TWIN_AUTH_SCHEME === 'Basic') {
      data.access_token = btoa(`${data.username}:${data.password}`)
    }

    axiosAPI.defaults.headers.Authorization = `${process.env.TWIN_AUTH_SCHEME} ${data.access_token}`

    if (process.env.TWIN_AUTH_STORAGE_TOKEN === 'cookie') {
      Cookies.set('api_access_token', data.access_token, {
        expires: data.expires_in || 3650,
        sameSite: 'Strict'
      })
    }

    if (process.env.TWIN_AUTH_STORAGE_TOKEN === 'localStorage') {
      LocalStorage.set('api_access_token', data.access_token)
    }
  }
}

export function loadUser ({ state, commit }) {
  if (process.env.TWIN_AUTH_SCHEME_SEND_TOKEN === 'header') {
    var token
    if (process.env.TWIN_AUTH_STORAGE_TOKEN === 'cookie') {
      token = Cookies.get('api_access_token')
    }

    if (process.env.TWIN_AUTH_STORAGE_TOKEN === 'localStorage') {
      token = LocalStorage.getItem('api_access_token')
    }

    if (token) {
      axiosAPI.defaults.headers.Authorization = `${process.env.TWIN_AUTH_SCHEME} ${token}`
    }
  }

  return axiosAPI.get(process.env.TWIN_API_LOAD_USER, null, { ignoreCode: '*' })
    .then(response => {
      resolveDataUser(commit, response.data)

      runLoadUserCallback(response.data)

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

export async function logout ({ commit }, wihtouApi = false) {
  var response = null

  if (!wihtouApi) {
    response = await axiosAPI.post(process.env.TWIN_API_LOGOUT)
  }

  removeToken()

  if (process.env.TWIN_USE_MODULES) {
    resetStateModules()
  }

  commit('setUser', false)

  return response
}
