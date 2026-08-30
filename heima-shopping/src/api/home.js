import request from '@/utils/request'

// 获取首页数据
export const getHomePageList = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
