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
export function getProduct (data = {}) {
  return fetchUtil('/hot_gallery/', {
    method: 'GET',
    data
  })
}
export function getPicUser (data = {}) {
  return fetchUtil('/users/' + data.user + '/gallery/' + data.gallery, {
    method: 'GET'
  })
}
export function getGalleryPic (data = {}) {
  return fetchUtil('/users/' + data.user + '/gallery/' + data.gallery + '/image/', {
    method: 'GET'
  })
}
export function getGalleryComment (data = {}) {
  return fetchUtil('/gallery/' + data.gallery + '/comment/', {
    method: 'GET',
    data
  })
}
export function addGalleryComment (data = {}) {
  return fetchUtil('/gallery/' + data.gallery + '/comment/', {
    method: 'POST',
    data
  })
}
