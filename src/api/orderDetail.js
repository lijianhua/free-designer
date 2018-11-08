import fetchUtil from '@/utils/fetch'

export function getOrderDetail (orderId) {
  return fetchUtil('/orders/' + orderId + '/apply_records/')
}
