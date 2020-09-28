import {request} from './request'

export function getHomeMultidata() {
  return request({
    url: '../data/goods.json'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
