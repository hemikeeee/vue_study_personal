import request from '@/utils/request'

// 订单结算确认
// mode: cart => obj cartIds
// mode: buyNow => obj goodsId, goodsNum, goodsSkuId
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // cart 购物车 buyNow 立即购买
      delivery: 10, // 10 快递配送 20 门店自提
      couponId: 0, // 优惠卷ID
      isUsePoints: 0, // 是否使用积分 0 不使用 1 使用
      ...obj
    }
  })
}

// 提交订单
export const submitOrder = (mode, params) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 物流方式  配送方式 (10快递配送 20门店自提)
    couponId: 0, // 优惠券 id
    payType: 10, // 余额支付
    isUsePoints: 0, // 是否使用积分
    ...params
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
