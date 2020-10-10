const isMockError = error => Boolean(error.mockData)

const getMockResponse = mockError => {
  const { mockData, config } = mockError

  const defaultResponse = {
    data: {},
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
    isMock: true
  }

  // Handle mocked error (any non-2xx status code)
  if (mockData.status && String(mockData.status)[0] !== '2') {
    const err = new Error(mockData.message || 'mock error')
    err.code = mockData.status
    err.response = Object.assign(defaultResponse, mockData)
    err.config = config
    return Promise.reject(err)
  }
  // Handle mocked success
  return Promise.resolve(Object.assign(defaultResponse, mockData))
}

export default class {
  constructor (axiosInstance, delay = 0) {
    this.axiosInstance = axiosInstance

    this.mocks = {}

    this.mockingEnabled = true

    this.delay = delay

    // Add a request interceptor
    this.axiosInstance.interceptors.request.use(config => {
      const data = this.getDataMock(config)

      if (this.mockingEnabled && data) {
        console.log('Mock Axios: url ' + config.url)
        return this.getMockError(config, data)
      }
      return config
    })

    // Add a response interceptor
    this.axiosInstance.interceptors.response.use(response => response, error => {
      if (isMockError(error)) {
        return getMockResponse(error)
      }
      return Promise.reject(error)
    })
  }

  addMock (data) {
    if (Array.isArray(data)) {
      this.mocks = data
    } else {
      this.mocks = [data]
    }
  }

  enableMocking (state) {
    this.mockingEnabled = state
  }

  getDataMock (config) {
    return this.mocks
      .find(x => x.url === config.url && (x.activated === undefined || x.activated === true) && (!x.method || x.method.toLowerCase() === config.method))
  }

  getMockError (config, data) {
    const mockError = new Error()
    mockError.mockData = data
    mockError.config = config

    if (this.delay) {
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          reject(mockError)
        }, this.delay)
      })
    }

    return Promise.reject(mockError)
  }
}
