import { getCartList, changeCartCount, delSelect } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, list) {
      state.cartList = list
    },
    changeChecked (state, id) {
      const good = state.cartList.find(item => item.goods_id === id)
      good.isChecked = !good.isChecked
    },
    changeAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, obj) {
      const good = state.cartList.find(item => item.goods_id === obj.goodsId)
      console.log(obj.goodsNum)
      good.goods_num = obj.goodsNum
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCount (context, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      context.commit('changeCount', { goodsId, goodsNum })
      await changeCartCount(goodsId, goodsNum, goodsSkuId)
    },
    async delSel (context) {
      const delIds = context.state.cartList.map(item => {
        if (item.isChecked) {
          return item.id
        } else {
          return null
        }
      })

      await delSelect(delIds)
      Toast('删除成功')
      context.dispatch('getCartAction')
    }
  },
  getters: {
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
