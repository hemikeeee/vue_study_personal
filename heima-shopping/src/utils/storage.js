const INFO_KEY = 'hm_shopping_info'
const SEARCH_KEY = 'hm_shopping_search'
const CART_KEY = 'hm_shopping_cart'

// 获取个人信息
export const getInfo = () => {
  const data = localStorage.getItem(INFO_KEY)
  return data ? JSON.parse(data) : { token: '', userId: '' }
}
// 设置个人信息
export const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索记录
export const getSearch = () => {
  const data = localStorage.getItem(SEARCH_KEY)
  return data ? JSON.parse(data) : []
}

// 设置搜索记录
export const setSearch = (search) => {
  localStorage.setItem(SEARCH_KEY, JSON.stringify(search))
}

// 移除搜索记录
export const removeSearch = () => {
  localStorage.removeItem(SEARCH_KEY)
}

// 存储购物车数据
export const setCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

// 获取购物车数据
export const getCart = () => {
  const data = localStorage.getItem(CART_KEY)
  return data ? JSON.parse(data) : []
}

// 移除购物车数据
export const removeCart = () => {
  localStorage.removeItem(CART_KEY)
}
