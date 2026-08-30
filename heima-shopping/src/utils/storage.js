const INFO_KEY = 'hm_shopping_info'
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
