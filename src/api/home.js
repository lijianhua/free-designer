import fetchUtil from '@/utils/fetch'

export function getUserInfo (data = {}) {
  return fetchUtil('getUserInfo', {
    methods: 'GET',
    data
  })
}
