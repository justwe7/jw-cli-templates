import { Component, PropsWithChildren } from 'react'
import Taro from '@tarojs/taro'
// import '@antmjs/vantui/lib/index.css'
import './app.scss'
import { initDataProxyStorage } from './lib/utils'
import * as GlobalUtils from './lib/global' // 定义全局的一些方法

initDataProxyStorage('$globalState', Taro)
initDataProxyStorage('$globalState') // 挂wx

Object.assign(Taro, GlobalUtils)

class App extends Component<PropsWithChildren> {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    // this.props.children 是将要会渲染的页面
    return this.props.children
  }
}

export default App
