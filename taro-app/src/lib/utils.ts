export function isObj (data) {
  return Object.prototype.toString.call(data) === '[object Object]'
}
/*
  数据持久化：
  initDataProxyStorage('globalState')
  读取 Taro.globalState.foo
  赋值 Taro.globalState.foo = 2
*/
const isEmpty = val => val === undefined // 目前只认为 undefined 为空，0 '' null 认为是操作后值
export function initDataProxyStorage (globalKey = 'GOLBAL_STATE', globalEnv: any = wx) {
  if (globalEnv[globalKey] === undefined) {
    globalEnv[globalKey] = {}
  }
  const baseData = {
    // 方法未 object 类型下的key，修改时需要使用赋值的方式: globalEnv.$globalState.loginInfo = Object.assign(globalEnv.$globalState.loginInfo, { name: 'Messi' })
    loginInfo: {
      name: 'justwe7',
      age: 18
    },
    token: 12345
  }

  const GOLBAL_STATE = globalEnv[globalKey]

  const defObj = {}
  for (const [key, defVal] of Object.entries(baseData)) {
    defObj[key] = (GOLBAL_STATE && GOLBAL_STATE[key]) || globalEnv.getStorageSync(`__stay_state__${key}`) || defVal
  }

  try {
    globalEnv[globalKey] = new Proxy(defObj, {
      // https://github.com/GoogleChrome/proxy-polyfill/blob/master/proxy.min.js
      get: function (target, propKey: any, receiver) {
        const rtVal = Reflect.get(target, propKey, receiver)
        return isEmpty(rtVal) ? globalEnv.getStorageSync(`__stay_state__${propKey}`) : rtVal
      },
      set: function (target, propKey: any, value, receiver) {
        globalEnv.setStorage({
          key: `__stay_state__${propKey}`,
          data: value
        })
        return Reflect.set(target, propKey, value, receiver)
      }
    })
  } catch (error) {
    console.warn('当前设备不支持proxy')
    const valueReal = (() => {
      const o = Object.assign({}, baseData, defObj)
      console.log(o, defObj)
      return (key, value = null, type = 'get') => {
        if (type === 'get') {
          const rtVal = o[key]
          return isEmpty(rtVal) ? globalEnv.getStorageSync(`__stay_state__${key}`) : rtVal
        } else {
          o[key] = value
          globalEnv.setStorage({
            key: `__stay_state__${key}`,
            data: value
          })
        }
      }
    })()

    const proxyKeys = Object.assign({}, globalEnv[globalKey], baseData)

    Object.keys(proxyKeys).forEach((key) => {
      console.log(key)
      Object.defineProperty(globalEnv[globalKey], key, {
        enumerable: true,
        configurable: false,
        get () {
          return valueReal(key)
        },
        set (val) {
          valueReal(key, val, 'set')
        }
      })
    })
  }
}
