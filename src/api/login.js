import fetchUtil from '@/utils/fetch'

export function fetchLogin (data = {}) {
  return fetchUtil('/login/', {
    method: 'POST',
    data
  })
}
