import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import cx from 'classnames'
import { observer, inject } from '@tarojs/mobx'
import RankCell from '../../components/rank-cell'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui' 
import { RANK_TYPE, PLATFORM_TYPE, RANK_TYPE_NAME, PLATFORM_TYPE_NAME } from '../../const/index'
import { getTotalRank, getGroupRank} from '../../api/index'
import { getAuthPlatform } from '../../utils/index'

import 'taro-ui/dist/style/index.scss'
import './index.less'
@observer
class Rank extends Component {
  state = {
    ranks: [{
      userId: 0,
      totalScore: 45,
      nickname: '社会主义接班人',
      avatar: 'https://image.ff2333.com/ycy/ch.jpg',
      rank: 1
    }, {
      userId: 0,
      totalScore: 0,
      nickname: '赵四',
      avatar: 'https://image.ff2333.com/ycy/sen-icon.jpg',
      rank: 2
    }],
    self: {
      userId: 0,
      totalScore: 0,
      nickname: '赵四',
      avatar: 'https://image.ff2333.com/ycy/sen-icon.jpg',
      rank: 2
    },
    authPlatformType: [], // 授权过的平台
    rankType: RANK_TYPE.DAY, //排行类型
    platformType: PLATFORM_TYPE.ZHIHU, // 平台类型
    isOpenedRankTypeSelection: false,
    isOpenedPlatformTypeSelection: false,
    groupId: 0,
  }
  config: Config = {
    navigationBarTitleText: '排行榜',
  }
  componentDidMount() {
    Taro.showShareMenu({
      withShareTicket: true
    })

    const authPlatform = getAuthPlatform()

    this.setState({
      authPlatformType: authPlatform,
      platformType: authPlatform[0] || PLATFORM_TYPE.ZHIHU
    }, this.getRankList)
  }
  componentDidShow() {
    this.setState({
      groupId: this.$router.params.groupId
    })
  }
  getRankList() {
    const accessToken = Taro.getStorageSync('accessToken')
    const { rankType, platformType, groupId } = this.state

    if (groupId) {
      getGroupRank({
        accessToken,
        type: rankType,
        platform_type: platformType,
        groupId
      }).then(({ data }) => {
        this.setState({
          ranks: data.data.ranks,
          self: data.data.self
        })
      })
    } else {
      getTotalRank({
        accessToken,
        type: rankType,
        platform_type: platformType,
      }).then(({ data }) => {
        this.setState({
          ranks: data.data.ranks,
          self: data.data.self
        })
      })
    }
  }
  openRankSelection = () => {
    this.setState({
      isOpenedRankTypeSelection: true
    })
  }
  openPlatformSelection = () => {
    this.setState({
      isOpenedPlatformTypeSelection: true
    })
  }
  closeRankSelection = () => {
    this.setState({
      isOpenedRankTypeSelection: false
    })
  }
  closePlatformSelection = () => {
    this.setState({
      isOpenedPlatformTypeSelection: false
    })
  }
  selectRankType = (rankId) => {


    this.changeRankType(rankId)
    this.closeRankSelection()
  }
  selectPlatformType = (platformId) => {
    this.changePlatformType(platformId)
    this.closePlatformSelection()
  }
  changeRankType(rankId) {
    this.setState({
      rankType: rankId
    }, this.getRankList)
  }
  changePlatformType(platformId) {
    this.setState({
      platformType: platformId
    }, this.getRankList)
  }
  render () {
    const {
      ranks,
      self,
      rankType,
      platformType,
      isOpenedRankTypeSelection,
      authPlatformType,
      groupId,
      isOpenedPlatformTypeSelection } = this.state

    return (
      <View className='page__rank'>
        <View className="head">
            <View className="head-select">
                <View className="select" onClick={this.openPlatformSelection}>
    { groupId ? <Text className="select-text">YCY本群排行</Text> : <Text className="select-text">{PLATFORM_TYPE_NAME[platformType]}</Text> }
                  <Image className="select-icon" src="https://image.ff2333.com/ycy/down.png" />
                </View>
                <View className="select" onClick={this.openRankSelection}>
                  <Text className="select-text">{RANK_TYPE_NAME[rankType]}</Text>
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
              (ranks || []).map((info: any, idx) => {
                
                return <RankCell key={`${info.totalScore}_${idx}`} rank={idx + 1} avatar={info.avatar} userNick={info.nickname} count={info.totalScore} />
              })
            }
            </ScrollView>
        </View>
        <AtActionSheet className="rank-type-select-action" isOpened={isOpenedRankTypeSelection} onCancel={this.closeRankSelection} onClose={this.closeRankSelection}>
        {
          Object.keys(RANK_TYPE).map((key) => {
            const id = RANK_TYPE[key]
            const name = RANK_TYPE_NAME[id]
            const cls = cx({
              'rank-type-select-option': true
            })

            return <AtActionSheetItem className={cls} onClick={this.selectRankType.bind(this, id)} key={id}>{name}</AtActionSheetItem>
          })
        }
        </AtActionSheet>
        <AtActionSheet className="platform-type-select-action" isOpened={isOpenedPlatformTypeSelection} onCancel={this.closePlatformSelection} onClose={this.closePlatformSelection}>
        {
          Object.keys(PLATFORM_TYPE).map((key) => {
            const id = PLATFORM_TYPE[key]
            const platform = PLATFORM_TYPE_NAME[id]
            const disabled = authPlatformType.indexOf(id) < 0
            const cls = cx({
              'platform-type-select-option': true,
              'disabled': disabled
            })
            return <AtActionSheetItem className={cls} onClick={this.selectPlatformType.bind(this, id, disabled)} key={id}>{ disabled ? `${platform}(未授权)` : platform}</AtActionSheetItem>
          })
        }
        </AtActionSheet>
      </View>
    )
  }
}

export default Rank  as ComponentType
