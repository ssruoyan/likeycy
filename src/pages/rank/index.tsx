import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import RankCell from '../../components/rank-cell'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui' 
import { RANK_TYPE_NAME, PLATFORM_TYPE_NAME } from '../../const/index'

import 'taro-ui/dist/style/index.scss'
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
    navigationBarTitleText: '排行榜',
  }
  componentDidMount() {
    const { rankStore } = this.props
    
    Taro.showShareMenu({
      withShareTicket: true
    })

    console.log(this.$router)

    rankStore.getRankList()
  }
  openRankSelection = () => {
    const { rankStore } = this.props

    rankStore.openRankSelection()
  }
  openPlatformSelection = () => {
    const { rankStore } = this.props

    rankStore.openPlatformSelection()
  }
  closeRankSelection = () => {
    const { rankStore } = this.props

    rankStore.closeRankSelection()
  }
  closePlatformSelection = () => {
    const { rankStore } = this.props

    rankStore.closePlatformSelection()
  }
  selectRankType = (rankId) => {
    const { rankStore } = this.props

    rankStore.changeRankType(rankId)
    rankStore.closeRankSelection()
  }
  selectPlatformType = (platformId) => {
    const { rankStore } = this.props

    rankStore.changePlatformType(platformId)
    rankStore.closePlatformSelection()
  }
  render () {
    const { rankStore } = this.props
    const {
      ranks,
      self,
      type,
      platformType,
      rankTypeList,
      isOpenedRankTypeSelection,
      isOpenedPlatformTypeSelection,
      platformTypeList } = rankStore

    return (
      <View className='page__rank'>
        <View className="head">
            <View className="head-select">
                <View className="select" onClick={this.openPlatformSelection}>
                  <Text className="select-text">{PLATFORM_TYPE_NAME[platformType]}</Text>
                  <Image className="select-icon" src="https://image.ff2333.com/ycy/down.png" />
                </View>
                <View className="select" onClick={this.openRankSelection}>
                  <Text className="select-text">{RANK_TYPE_NAME[type]}</Text>
                  <Image className="select-icon" src="https://image.ff2333.com/ycy/down.png" />
                </View>
            </View>
            <View className="my-rank">
                <View className="left">
                    <Text className="my-rank-index">{self.rank}</Text>
                    <View className="my-rank-avatar">
                      <Image className="avatar-cover" src={self.avatar}/>
                    </View>
                    <Text>我</Text>
                </View>
                <View className="right">
                    <Text className="my-rank-count">{self.totalScore}</Text>
                    <Image className="my-rank-flower" src="https://image.ff2333.com/ycy/rank-flower.png" />
                </View>
            </View>
        </View>
        <View className="main">
            <ScrollView scrollY className="rank-list">
            {
              (ranks || []).map((info, idx) => {
                
                return <RankCell key={`${info.totalScore}_${idx}`} rank={idx + 1} avatar={info.avatar} userNick={info.nickname} count={info.totalScore} />
              })
            }
            </ScrollView>
        </View>
        <AtActionSheet className="rank-type-select-action" isOpened={isOpenedRankTypeSelection} onCancel={this.closeRankSelection} onClose={this.closeRankSelection}>
        {
          rankTypeList.map((rank) => {
            return <AtActionSheetItem onClick={this.selectRankType.bind(this, rank.id)} key={rank.id}>{rank.name}</AtActionSheetItem>
          })
        }
        </AtActionSheet>
        <AtActionSheet className="platform-type-select-action" isOpened={isOpenedPlatformTypeSelection} onCancel={this.closePlatformSelection} onClose={this.closePlatformSelection}>
        {
          platformTypeList.map((platform) => {
            return <AtActionSheetItem onClick={this.selectPlatformType.bind(this, platform.id)} key={platform.id}>{platform.name}</AtActionSheetItem>
          })
        }
        </AtActionSheet>
      </View>
    )
  }
}

export default Rank  as ComponentType
