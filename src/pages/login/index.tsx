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
        <View className="page__login">
            <Button openType="getUserInfo" className="auth-button">点击授权登录</Button>
        </View>
    )
  }
}

export default ThirdAccoundBind  as ComponentType
