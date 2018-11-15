import fetchUtil from '@/utils/fetch'

export function updateUserInfoApi (data = {}) {
  return fetchUtil(`/users/${data.id}/`, {
    method: 'PATCH',
    data
  })
}

export function changePasswordApi (data = {}) {
  return fetchUtil(`/user/reset_password/`, {
    method: 'POST',
    data
  })
}

export function getWorkListApi (id, data = {}) {
  return fetchUtil(`/users/${id}/gallery/`, {
    data
  })
}

export function getOrderListApi (active, data) {
  let url = '/orders/?status=0'
  if (active === 'apply') {
    url = '/apply_records/?status=finished'
  }
  return fetchUtil(url, {
    data
  })
}

export function payApi (data = {}) {
  return fetchUtil('/pay/create_order/', {
    method: 'POST',
    data
  })
}

export function getPayListApi (data = {}) {
  return fetchUtil('/prestores/', {
    data
  })
}

export function getWorkDetail (data = {}) {
  return fetchUtil(`/users/${data.user}/gallery/${data.gallery}/`)
}

export function getWorkImage (data = {}) {
  return fetchUtil(`/users/${data.user}/gallery/${data.gallery}/image/`)
}

export function fixWorkDetail (dataForm = {}) {
  const data = {
    name: dataForm.name,
    desc: dataForm.desc
  }
  return fetchUtil(`/gallery/${dataForm.galleryid}/`, {
    method: 'PATCH',
    data
  }, true)
}

export function addWorkImage (dataForm = {}) {
  const data = {
    name: dataForm.name,
    image: dataForm.image
  }
  return fetchUtil(`/gallery/${dataForm.galleryid}/image/`, {
    method: 'POST',
    data
  })
}

export function deleteWorkImage (data = {}) {
  return fetchUtil(`/gallery/${data.galleryid}/image/${data.imageid}/`, {
    method: 'DELETE'
  })
}
