import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import Taro, {
  useReady,
  useDidShow,
  useDidHide,
} from '@tarojs/taro'
import './index.scss'

function Index () {
  const [bar, setBar] = useState(0)
  // 可以使用所有的 React Hooks
  useEffect(() => {})

  // 对应 onReady
  useReady(() => {})

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  return (
    <View className='index' onClick={() => setBar(bar + 1)}>{bar}</View>
  )
}

export default Index
