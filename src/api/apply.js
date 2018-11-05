import fetchUtil from '@/utils/fetch'

export function getFilters () {
  return fetchUtil('/order/category/', {
    method: 'GET'
  })
}
export function getDemands (data = {}) {
  return fetchUtil('/demand/', {
    method: 'GET',
    data
  })
}
