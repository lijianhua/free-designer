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
  }, true)
}

export function editOrderApi (id, data = {}) {
  return fetchUtil(`/orders/${id}/`, {
    method: 'PATCH',
    data
  })
}

export function createQuestionApi (id, data = {}) {
  return fetchUtil(`/orders/${id}/questions/`, {
    method: 'POST',
    data
  })
}

export function editQuestionApi (id, qid, data = {}) {
  return fetchUtil(`/orders/${id}/questions/${qid}/`, {
    method: 'PATCH',
    data
  })
}

export function getOrderDetailApi (id) {
  return fetchUtil(`/orders/${id}/`)
}

export function getUserInfoApi (id) {
  return fetchUtil(`/orders/${id}/apply_records`)
}

export function getUserQusetion (id, questionId) {
  return fetchUtil(`/apply_records/${id}/answers/?order_question=${questionId}`)
}

export function pleaseAcceptOrder (data = {}) {
  return fetchUtil('/pay/create_order/', {
    method: 'POST',
    data
  })
}

export function deleteOrder (id) {
  return fetchUtil(`/orders/${id}/`, {
    method: 'DELETE'
  })
}

export function getQuestionListApi (id) {
  return fetchUtil(`/orders/${id}/questions/`)
}
