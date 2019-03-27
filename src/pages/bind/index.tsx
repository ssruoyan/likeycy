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
        <View>
            <Text>点击授权一下社交账号</Text>
            <Text>同步你的“吸花指数”</Text>
        </View>
        <View>
            <Image src="https://image.ff2333.com/ycy/sina.png"/>
            <Image src="https://image.ff2333.com/ycy/hupu.png"/>
            <Image src="https://image.ff2333.com/ycy/tieba.png"/>
            <Image src="https://image.ff2333.com/ycy/douban.png"/>
            <Image src="https://image.ff2333.com/ycy/zhihu.png"/>
        </View>
      </View>
    )
  }
}

export default ThirdAccoundBind  as ComponentType
