import fetchUtil from '@/utils/fetch'

export function getPointsListApi (data = {}) {
  return fetchUtil('/points/', {
    data
  })
}
