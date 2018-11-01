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
export function getUserInfo (data) {
  return fetchUtil('/users/' + data, {
    method: 'GET'
  })
}
export function getHistory (data = {}) {
  return fetchUtil('/apply_records/', {
    method: 'GET',
    data
  })
}
export function getPicture (data, pageData = {}) {
  return fetchUtil('/users/' + data + '/gallery/', {
    method: 'GET',
    pageData
  })
}
