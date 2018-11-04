import fetchUtil from '@/utils/fetch'

export function getCategoryApi (data = {}) {
  return fetchUtil('/order/category/', {
    data
  })
}

export function getSuggestCostApi (data = {}) {
  return fetchUtil('/suggest_cost/', {
    method: 'POST',
    data
  })
}
