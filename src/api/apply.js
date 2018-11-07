import fetchUtil from '@/utils/fetch'

export function getFilters () {
  return fetchUtil('/orders/categories/', {
    method: 'GET'
  })
}
export function getDemands (data = {}) {
  return fetchUtil('/demand/', {
    method: 'GET',
    data
  })
}
