import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
} from '@tarojs/taro'
import {
  Button,
} from '@antmjs/vantui'
import './index.scss'

function Index () {
  const [bar, setBar] = useState(0)
  const handleToLogin = () => {
    Taro.$location.to('/pages/login/index')
  }
  // 可以使用所有的 React Hooks
  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  // return (<Button type='primary'>去登录</Button>)

  return (
    <>
      <Text>Hello 函数组件!</Text>
      <View className='index' onClick={() => setBar(bar + 1)}>{bar}</View>
      <Button type='primary' onClick={handleToLogin}>去登录</Button>
    </>
  )
}

export default Index
