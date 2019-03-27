import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'

import './index.less'

@observer
class ThirdAccoundBind extends Component {
  config: Config = {
    navigationBarTitleText: '绑定账号'
  }
  render () {
    return (
      <View className='page__bind'>
        <View className="bind-text">
            <Text className="paragraph">点击授权一下社交账号</Text>
            <Text className="paragraph">同步你的“<Text className="main">吸花指数</Text>”</Text>
        </View>
        <View className="bind-icons">
            <Image className="icon" src="https://image.ff2333.com/ycy/sina.png"/>
            <Image className="icon" src="https://image.ff2333.com/ycy/hupu.png"/>
            <Image className="icon" src="https://image.ff2333.com/ycy/tieba.png"/>
            <Image className="icon" src="https://image.ff2333.com/ycy/douban.png"/>
            <Image className="icon" src="https://image.ff2333.com/ycy/zhihu.png"/>
        </View>
      </View>
    )
  }
}

export default ThirdAccoundBind  as ComponentType
