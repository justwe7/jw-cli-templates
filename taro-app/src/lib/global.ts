import Taro from '@tarojs/taro'
import http from '@/api/http'
import { isObj } from './utils'

// 给url添加查询字符串
export function $addQuery (url, params) {
  let separator = url.indexOf('?') !== -1 ? '&' : '?'
  const queryStringParameter = Object.entries(params).reduce((result, target, index) => {
    result += separator + target[0] + '=' + target[1]
    separator = '&'
    return result
  }, '')
  return url + queryStringParameter
}

export const $location = {
  async to (url, queryData) { // 页面跳转
    if (isObj(queryData)) {
      url = $addQuery(url, queryData)
    }
    try {
      return await Taro.navigateTo({ url })
    } catch (err) {
      console.log('页面栈溢出', err)
      Taro.navigateTo({ url })
    }
  },
  replace (url, queryData) { // 重定向
    if (isObj(queryData)) {
      url = $addQuery(url, queryData)
    }
    return Taro.navigateTo({ url })
  },
  back (options: number|AnyObject) { // 页面回退
    if (isObj(options)) {
      return Taro.navigateBack(options as AnyObject)
    }
    return Taro.navigateBack({ delta: options as number })
  }
}

export function $toast (title, args) {
  Taro.showToast({
    title,
    icon: 'none',
    ...args
  })
}

export const $loading = {
  show (title, ...args) {
    Taro.showLoading({
      title,
      ...args
    })
  },
  hide: Taro.hideLoading
}

export function $getCurrentPage () {
  try {
    const pages = getCurrentPages()
    return pages[pages.length - 1]
  } catch (error) {
    return {}
  }
}

export const $get: MyRequest = function (url, data = {}, config = { method: 'GET' }) {
  return http(url, data, config)
}

export const $post: MyRequest = function (url, data = {}, config = { method: 'POST' }) {
  return http(url, data, config)
}
