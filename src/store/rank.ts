import Taro from '@tarojs/taro'
import { observable } from 'mobx'
import { getTotalRank } from '../api/index'
import { PLATFORM_TYPE, PLATFORM_TYPE_NAME, RANK_TYPE_NAME, RANK_TYPE } from '../const/index'

const rankStore = observable({
  self: {
    userId: 0,
    totalScore: 0,
    nickName: '',
    avatar: 'https://image.ff2333.com/ycy/mock-avatar.png',
    rank: 1
  },
  ranks: [],
  type: RANK_TYPE.DAY,
  platformType: PLATFORM_TYPE.ZHIHU,
  isOpenedRankTypeSelection: false,
  isOpenedPlatformTypeSelection: false,
  rankTypeList: Object.keys(RANK_TYPE).map((type) => {
    return {
      id: RANK_TYPE[type],
      name: RANK_TYPE_NAME[RANK_TYPE[type]]
    }
  }),
  platformTypeList: Object.keys(PLATFORM_TYPE).map((type) => {
    return {
      id: PLATFORM_TYPE[type],
      name: PLATFORM_TYPE_NAME[PLATFORM_TYPE[type]]
    }
  }),
  getRankList() {
    const accessToken = Taro.getStorageSync('accessToken')

    getTotalRank({
        accessToken,
        type: this.type,
        platform_type: this.platformType,
    }).then(({ data }) => {
      this.ranks = data.data.ranks
      this.self = data.data.self
    })
  },
  openRankSelection() {
    this.isOpenedRankTypeSelection = true
  },
  closeRankSelection() {
    this.isOpenedRankTypeSelection = false
  },
  openPlatformSelection() {
    this.isOpenedPlatformTypeSelection = true
  },
  closePlatformSelection() {
    this.isOpenedPlatformTypeSelection = false
  },
  changePlatformType(id) {
      this.platformType = id
      this.getRankList()
  },
  changeRankType(id) {
    this.type = id
    this.getRankList()
  }
})
export default rankStore