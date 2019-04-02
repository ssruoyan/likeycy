import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import RankCell from '../../components/rank-cell'

import './index.less'

@observer
class Rank extends Component {
  config: Config = {
    navigationBarTitleText: '排行'
  }
  state = {
    self: null,
    ranks: [
      {
        username: '我是个萨比',
        avatar: 'https://image.ff2333.com/ycy/mock-avatar.png',
        score: 999,
      },
      {
        username: '我是个萨比',
        avatar: 'https://image.ff2333.com/ycy/mock-avatar.png',
        score: 999,
      },
      {
        username: '我是个萨比',
        avatar: 'https://image.ff2333.com/ycy/mock-avatar.png',
        score: 999,
      },
      {
        username: '我是个萨比',
        avatar: 'https://image.ff2333.com/ycy/mock-avatar.png',
        score: 999,
      },
      {
        username: '我是个萨比',
        avatar: 'https://image.ff2333.com/ycy/mock-avatar.png',
        score: 999,
      },
      {
        username: '我是个萨比',
        avatar: 'https://image.ff2333.com/ycy/mock-avatar.png',
        score: 999,
      },
      {
        username: '我是个萨比',
        avatar: 'https://image.ff2333.com/ycy/mock-avatar.png',
        score: 999,
      },
      {
        username: '我是个萨比',
        avatar: 'https://image.ff2333.com/ycy/mock-avatar.png',
        score: 999,
      }
    ]
  }
  render () {
    const { ranks } = this.state

    return (
      <View className='page__rank'>
        <View className="head">
            <View className="head-select">
                
            </View>
            <View className="my-rank">
                <View className="left">
                    <Text className="my-rank-index">99+</Text>
                    <Image className="my-rank-avatar" src=""/>
                    <Text>我</Text>
                </View>
                <View className="right">
                    <Text className="my-rank-count">999</Text>
                    <Image className="my-rank-flower" src="https://image.ff2333.com/ycy/rank-flower.png" />
                </View>
            </View>
        </View>
        <View className="main">
            <ScrollView scrollY={true} className="rank-list">
            {
              ranks.map((rank: any, idx) => {
                return <RankCell rank={idx + 1} avatar={rank.avatar} userNick={rank.username} count={rank.score - idx} />
              })
            }
            </ScrollView>
        </View>
      </View>
    )
  }
}

export default Rank  as ComponentType
