import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Text } from '@tarojs/components'
import { AtMessage, AtButton } from 'taro-ui'
import { observer } from '@tarojs/mobx'
import { PLATFORM_TYPE_NAME } from '../../const/index'

import 'taro-ui/dist/style/components/message.scss'
import 'taro-ui/dist/style/components/button.scss'
import './index.less'

@observer
class ThirdAccoundInput extends Component {
  config: Config = {
    navigationBarTitleText: '绑定账号'
  }
  state = {
    loading: false
  }
  click = () => {
    this.setState({
      loading: true
    })

    setTimeout(() => {
      Taro.atMessage({
        message: '绑定成功',
        type: 'success'
      })
      this.setState({
        loading: false
      })
    }, 500)
  }
  render () {
    const { loading } = this.state
    const { id } = this.$router.params

    return (
      <View className='page__bind-input'>
        <AtMessage />
        <View className="bind-input-tips">
            <Text>您的账号仅仅用于爬虫获取互动数据，</Text>
            <Text>用于计算吸花指数，</Text>
            <Text>我们不会做任何散播，请您放心。</Text>
        </View>
        <View>
          <Input className="bind-input" placeholder={`请输入${PLATFORM_TYPE_NAME[id || 1]}昵称`}/>
          <AtButton loading={loading} onClick={this.click} className="bind-button" >确定</AtButton>
        </View>
      </View>
    )
  }
}

export default ThirdAccoundInput  as ComponentType
