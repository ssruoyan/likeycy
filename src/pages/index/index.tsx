import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { observer } from '@tarojs/mobx'

import './index.less'

@observer
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }
  click = () => {
    Taro.showShareMenu({
      withShareTicket: true
    })
  }
  onShareAppMessage = () => {
    return {
      title: '与好友PK一下',
      path: '/pages/index/index'
    }
  }
  render () {
    return (
      <View className='page__index'>
        首页
        <Button plain={true} openType="share" className="pk-button">
          <Image className="pk-button-cover" src="https://image.ff2333.com/ycy/pk-button.png"/>
        </Button>
      </View>
    )
  }
}

export default Index  as ComponentType
