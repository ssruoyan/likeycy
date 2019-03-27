import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'

import './index.less'

@observer
class Rank extends Component {
  config: Config = {
    navigationBarTitleText: '排行'
  }
  render () {
    return (
      <View className='page__bind'>
        排行
      </View>
    )
  }
}

export default Rank  as ComponentType
