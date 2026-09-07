import request from '@/utils/request'

export const getProList = (obj) => {
  const { categoryId, page, goodsName } = obj
  return request({
    method: 'get',
    url: '/goods/list',
    params: {
      categoryId,
      page,
      goodsName
    }
  })
}
// 获取商品详情数据
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 获取商品评价
export const getProComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
