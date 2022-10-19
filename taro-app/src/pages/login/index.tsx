import Taro from '@tarojs/taro'
import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import {
  Button,
  MiniLoginButton,
  MiniPhoneButton,
  MiniUserButton,
  Icon
  , Cell, CellGroup
} from '@antmjs/vantui'
import './index.scss'

interface IState {
  a: number;
}
export default class Index extends Component<PropsWithChildren, IState> {
  static bar () {
    Taro.$location.to('/pages/download/index')
    // console.log(111)
    // console.log(this)
    // Index.setState()
  }

  constructor (props) {
    super(props)
    this.state = {
      a: 1
    }
    console.log(23)
  }

  componentWillMount () {
    // console.log(Taro.$get('/app'))
    // Taro.$globalState.token = 22
    // console.log(wx.$globalState.token)
  }

  componentDidMount () { }

  componentWillUnmount () { }

  private foo () {
    // console.log(111)
    // console.log(this)
    // Taro.$location.to('/pages/download/index')
    this.setState({
      a: this.state.a + 1
    })
  }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Button icon='star-o' type='primary' onClick={this.foo.bind(this)}>
          <Icon name='chat-o' size='32px' className='icon'></Icon>
          数据变化
        </Button>
        <Button icon='star-o' type='warning' onClick={Index.bar}>
          <Icon name='chat-o' size='32px' className='icon'></Icon>
          去下载
        </Button>
        <CellGroup>
        <Cell title='单元格' value='内容' />
        <Cell title='单元格' value={this.state.a} label='描述信息' border={false} />
      </CellGroup>
        <Text>Hello 类组件!</Text>
      </View>
    )
  }
}
