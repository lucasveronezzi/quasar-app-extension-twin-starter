import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
})

export default {

  axiosInstance,

  errorHandling: {},

  noResponse () {},

  errorInterceptor (failure) {
    if (failure.response) {
      if (failure.config.ignoreCode &&
        (failure.config.ignoreCode === '*' ||
          (Array.isArray(failure.config.ignoreCode) && failure.config.ignoreCode.includes(failure.response.status))
        )
      ) {
        return Promise.reject(failure)
      }

      const action = this.errorHandling[failure.response.status]

      if (typeof action === 'function') {
        action(failure.response.data)
      } else if (typeof this.errorHandling.default === 'function') {
        this.errorHandling.default(failure.response.data)
      }
    } else {
      this.noResponse()
    }

    return Promise.reject(failure)
  },

  enableInterceptor () {
    axiosInstance.interceptors.response.use(response => response,
      failure => {
        return this.errorInterceptor(failure)
      }
    )
  }
}
