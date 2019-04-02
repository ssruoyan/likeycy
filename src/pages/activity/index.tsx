import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { observer } from '@tarojs/mobx'

import './index.less'

@observer
class Activity extends Component {
  config: Config = {
    navigationBarTitleText: '盛典',
    navigationBarBackgroundColor: '#100538',
    navigationBarTextStyle: 'white',
  }
  render () {
    return (
      <View className='page__activity'>
        <View className="act-title">
          <Text className="text">距离</Text>
          <Text className="text">731粉丝盛典</Text>
          <Text className="text">还有?</Text>
        </View>
        <Image src="https://image.ff2333.com/ycy/act-logo.png" className="act-logo" />
        <View className="act-countdown">
          <View className="days">
            <Text className="number">71</Text>
            <Text className="unit">DAYS</Text>
          </View>
          <View className="hours">
            <Text className="number">03</Text>
            <Text className="unit">HOURS</Text>
          </View>
          <View className="minutes">
            <Text className="number">10</Text>
            <Text className="unit">MINUTES</Text>
          </View>
        </View>
        <Image src="https://image.ff2333.com/ycy/arrow-down.png" className="act-arrow"/>
        <ScrollView scrollX>
          <View className="act-event unlocked">
            <View className="act-event-card">
              <Text>榜单与奖品</Text>
              <Image src="https://image.ff2333.com/ycy/unlock.png"/>
            </View>
          </View>
          <View className="act-event locked">
            <View className="act-event-card">
              <Text>榜单与奖品</Text>
              <Image src="https://image.ff2333.com/ycy/lock.png"/>
            </View>
            <Text className="act-event-tips"></Text>
          </View>
          <View className="act-event locked"></View>
          <View className="act-event locked"></View>
          <View className="act-event locked"></View>
        </ScrollView>
      </View>
    )
  }
}

export default Activity  as ComponentType
