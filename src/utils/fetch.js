import axios from 'axios'
import { Toast } from 'mint-ui'
import Loading from 'muse-ui-loading'

const instance = axios.create({
  baseURL: '/api',
  timeout: 20000,
  withCredentials: true
})

instance.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => {
    if (response && response.data && response.data.success) {
      if (response.data.page_info) {
        response.data.data = {
          data: response.data.data,
          page_info: response.data.page_info
        }
      }
      delete response.data.page_info
      return response.data
    } else if (response && response.data && response.data.message) {
      Toast({
        message: response.data.message,
        duration: 5000
      })
    } else {
      Toast({
        message: '接口报错',
        duration: 5000
      })
    }
    return Promise.reject(response)
  },
  error => {
    Toast({
      message: '接口报错',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default function fetchUtil (name, options = {}, isLoading = false) {
  const {
    method = 'GET',
    data = {}
  } = options

  const opt = {}

  if (method === 'GET') {
    opt['params'] = data
  } else {
    opt['data'] = data
  }

  opt['url'] = name
  opt['method'] = method

  let loading = null
  if (isLoading) {
    loading = Loading()
  }

  try {
    return instance(opt)
  } catch (error) {
    throw error
  } finally {
    if (isLoading) {
      setTimeout(() => {
        loading.close()
      }, 100)
    }
  }
}
