import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.free-designer.cn/api/',
  timeout: 20000
})

instance.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export default function fetchUtil (name, options = {}) {
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

  try {
    return instance(opt)
  } catch (error) {
    throw error
  }
}
