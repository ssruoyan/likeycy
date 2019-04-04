import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { observer } from '@tarojs/mobx'

import './index.less'

@observer
class ThirdAccoundBind extends Component {
  config: Config = {
    navigationBarTitleText: '绑定账号'
  }
  componentDidMount() {
      Taro.login().then((data) => {
          console.log(data)
      })
  }
  getUserInfo = (data) => {
      console.log(data)
  }
  render () {
    return (
        <View className="page__login">
            <Button onGetUserInfo={this.getUserInfo} openType="getUserInfo" className="auth-button">点击授权登录</Button>
        </View>
    )
  }
}

export default ThirdAccoundBind  as ComponentType
