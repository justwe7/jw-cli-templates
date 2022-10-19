/// <reference types="@tarojs/taro" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd'
  }
}

type MyGlobalState = {
  token?: string
} & AnyObject

type MyLocationFn = (
  url: string,
  queryStringParameter?: AnyObject
) => string

type MyRequest = (
  url: string,
  queryData?: AnyObject,
  config?: {
    method: 'GET'|'POST'
    toast?: boolean
    baseUrl?: string
    headers?: AnyObject
  } & AnyObject
) => Promise<unknown>
declare module Taro {
  interface TaroStatic {
    $globalState: MyGlobalState
    $toast: (
      msg: string,
      ...rest: unknown[]
    ) => void
    $get: MyRequest
    $post: MyRequest
    $addQuery: MyLocationFn
    $location: {
      to: MyLocationFn,
      replace: MyLocationFn,
      back: (
        option: number|AnyObject
      ) => void
    }
    $loading: {
      show: (
        msg: string,
        ...rest: unknown[]
      ) => void,
      hide: () => void
    }
  }
}
