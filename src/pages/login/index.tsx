import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { saveUserInfo, userLogin } from '../../api/index'

import './index.less'

@observer
class ThirdAccoundBind extends Component {
  config: Config = {
    navigationBarTitleText: '请先登录'
  }
  componentDidMount() {
    Taro.login().then(({code}) => {
        userLogin(code).then(({ data }) => {
            Taro.setStorageSync('accessToken', data.data.accessToken)
        })
    })
  }
  getUserInfo = ({ detail }) => {
    const accessToken = Taro.getStorageSync('accessToken')

    const data = {
        accessToken,
        nickname: detail.userInfo.nickName,
        avatar: encodeURIComponent(detail.userInfo.avatarUrl)
    }

    saveUserInfo(data).then(() => {
        Taro.navigateBack()
    })
  }
  render () {
    return (
        <View className="page__login">
            <Image className="auth-icon" src="https://image.ff2333.com/ycy/wechat.jpg" />
            <Text className="auth-title">微信授权页面</Text>
            <Text className="auth-desc">授权并同意使用微信账号登录当前小程序</Text>
            <Button onGetUserInfo={this.getUserInfo} openType="getUserInfo" className="auth-button">授权登录</Button>
        </View>
    )
  }
}

export default ThirdAccoundBind  as ComponentType
