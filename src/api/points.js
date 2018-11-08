import fetchUtil from '@/utils/fetch'

export function getPointsListApi (data = {}) {
  return fetchUtil('/points/', {
    data
  })
}

export function withdrawApi (data = {}) {
  return fetchUtil('/withdraws/', {
    method: 'POST',
    data
  })
}
