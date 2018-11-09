import fetchUtil from '@/utils/fetch'

export function getCategoryApi (data = {}) {
  return fetchUtil('/orders/categories/', {
    data
  })
}

export function getSuggestCostApi (data = {}) {
  return fetchUtil('/suggest_cost/', {
    method: 'POST',
    data
  })
}

export function getEmployerListApi (data = {}) {
  return fetchUtil('/orders/', {
    data
  })
}

export function getWorkerListApi (data = {}) {
  return fetchUtil('/apply_records/', {
    data
  })
}

export function createOrderApi (data = {}) {
  return fetchUtil('/orders/', {
    method: 'POST',
    data
  })
}

export function createQuestionApi (id, data = {}) {
  return fetchUtil(`/orders/${id}/questions/`, {
    method: 'POST',
    data
  })
}

export function getOrderDetailApi (id) {
  return fetchUtil(`/orders/${id}/`)
}
