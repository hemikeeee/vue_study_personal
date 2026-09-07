import request from '@/utils/request'

export const getAddressList = () => {
  return request({
    url: '/address/list',
    method: 'get'
  })
}
