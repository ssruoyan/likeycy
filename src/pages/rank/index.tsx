import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import RankCell from '../../components/rank-cell'

import './index.less'

interface Rank {
  props: {
    rankStore: any
  }
}
@inject('rankStore')
@observer
class Rank extends Component {
  config: Config = {
    navigationBarTitleText: '排行'
  }
  render () {
    const { rankStore } = this.props
    const { ranks, self } = rankStore

    return (
      <View className='page__rank'>
        <View className="head">
            <View className="head-select">
                <View className="select">
                  <Text className="select-text"></Text>
                  <Image className="select-icon" src="https://image.ff2333.com/ycy/down.png" />
                </View>
                <View className="select">
                  <Text className="select-text"></Text>
                  <Image className="select-icon" src="https://image.ff2333.com/ycy/down.png" />
                </View>
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
            <ScrollView scrollY className="rank-list">
            {
              (ranks || []).map((info, idx) => {
                
                return <RankCell key={idx} rank={idx + 1} avatar={info.avatar} userNick={info.username} count={info.score - idx} />
              })
            }
            </ScrollView>
        </View>
      </View>
    )
  }
}

export default Rank  as ComponentType
