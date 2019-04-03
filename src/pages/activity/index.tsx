import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import ActList from './components/act-list'
import './index.less'

@observer
class Activity extends Component {
  config: Config = {
    navigationBarTitleText: '盛典',
    navigationBarBackgroundColor: '#100538',
    backgroundColor: '#100538',
    navigationBarTextStyle: 'white',
  }
  state = {
    list: [
      {
        title: '奖品与榜单',
        locked: false,
        desc: '已经开始',
        list: [
          {
            title: '感谢念慈菴赞助',
            content: '京都念慈菴\n您的最佳选择'
          },
          {
            title: '感谢念慈菴赞助',
            content: '京都念慈菴\n您的最佳选择'
          }
        ]
      },
      {
        title: '盛典事情',
        locked: true,
        desc: '还未开始呢'
      },
      {
        title: '盛典事情',
        locked: true,
        desc: '还未开始呢'
      },
      {
        title: '盛典事情',
        locked: true,
        desc: '还未开始呢'
      }
    ]
  }
  render () {
    const { list } = this.state

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
        <ActList actived={0} list={list}></ActList>
      </View>
    )
  }
}

export default Activity  as ComponentType
