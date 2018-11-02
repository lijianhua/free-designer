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

export function getOrderListApi (active) {
  let url = '/orders/?status=0'
  if (active === 'apply') {
    url = '/apply_records/?status=finished'
  }
  return fetchUtil(url)
}
