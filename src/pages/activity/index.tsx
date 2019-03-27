import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'

import './index.less'

@observer
class Activity extends Component {
  config: Config = {
    navigationBarTitleText: '盛典'
  }
  render () {
    return (
      <View className='page__bind'>
        活动
      </View>
    )
  }
}

export default Activity  as ComponentType
