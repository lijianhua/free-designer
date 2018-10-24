import fetchUtil from '@/utils/fetch'

export function toLogin (data = {}) {
  return fetchUtil('/login', {
    methods: 'GET',
    data
  })
}
