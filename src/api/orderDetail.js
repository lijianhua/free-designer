import fetchUtil from '@/utils/fetch'

export function getOrderDetail (orderId) {
  return fetchUtil('/orders/' + orderId + '/apply_records/')
}
export function getOrderQusetion (orderId) {
  return fetchUtil('/orders/' + orderId + '/questions/')
}
export function setOrderAnswer (dataForm = {}) {
  const data = {
    answer: dataForm.answer,
    start_time: dataForm.start_time,
    end_time: dataForm.end_time
  }
  return fetchUtil('/apply_records/' + dataForm.aid + '/answers/?order_question=' + dataForm.qid, {
    method: 'POST',
    data
  })
}
export function acceptOrder (dataForm = {}) {
  const data = {
    desc: dataForm.desc,
    apply_cost: dataForm.apply_cost,
    works: dataForm.works
  }
  return fetchUtil('/orders/' + dataForm.oid + '/apply_records/' + dataForm.aid + '/', {
    method: 'post',
    data
  })
}
