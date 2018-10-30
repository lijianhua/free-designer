import fetchUtil from '@/utils/fetch'

export function getBanners (data = {}) {
  return fetchUtil('/banners/', {
    method: 'GET',
    data
  })
}
export function getFilters () {
  return fetchUtil('/categories/', {
    method: 'GET'
  })
}
export function getUsers (data = {}) {
  return fetchUtil('/users/', {
    method: 'GET',
    data
  })
}
