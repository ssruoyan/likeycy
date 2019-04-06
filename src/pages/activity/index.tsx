import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import ActList from './components/act-list'
import './index.less'

const YCYURL = encodeURIComponent('https://m.weibo.cn/p/1008082a98366b6a3546bd16e9da0571e34b84/super_index')

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
        link: '/pages/rank-rule/index',
        list: [
          {
            title: '感谢赞助商',
            link: `/pages/webview/index?url=${encodeURIComponent('https://www.nin-jiom.com.tw/blogs/37')}`,
            content: '京都念慈菴\n我是糖，但不是一般的糖'
          },
          {
            title: '感谢赞助商',
            link: `/pages/webview/index?url=${YCYURL}`,
            content: 'CCYY小透明粉丝\n杨超越签名照，海报等等'
          }
        ]
      },
      {
        title: '盛典事宜',
        locked: true,
        desc: '20190701揭晓'
      },
      {
        title: '获奖名单',
        locked: true,
        desc: '20190731揭晓'
      },
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
