import {request} from './request'

/**
 * 获取详情信息
 * @param id
 * @returns {AxiosPromise}
 */
export function getDetail(id) {
  return request({
    url: '/detail',
    params: {
      id
    }
  })
}

/**
 * 对象封装，从请求对象中抽离界面需要的数据
 */
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.newPrice
    this.oldPrice = itemInfo.oldPrice
    this.columns = columns
    this.service = services
  }
}
