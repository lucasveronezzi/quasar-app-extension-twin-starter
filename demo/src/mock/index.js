import MockAxios from 'twin-starter/utils/mock-axios'
import twinAxios from 'twin-starter/utils/axios'
import mockData from './mock.json'

const apiMock = new MockAxios(twinAxios.axiosInstance, 500)

apiMock.addMock(mockData)
