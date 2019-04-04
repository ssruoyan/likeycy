import { observable } from 'mobx'
import { getTotalRank } from '../api/index'
import { PLATFORM_TYPE, RANK_TYPE } from '../const/index'

const rankStore = observable({
  self: 0,
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
  ],
  type: RANK_TYPE.DAY,
  platform_type: PLATFORM_TYPE.ZHIHU,
  getRankList() {
    
    getTotalRank({
        type: this.type,
        platform_type: this.platform_type,
    }).then(({ data }) => {
        this.ranks = data.ranks
        this.self = data.self
    })
  },
  changePlatformType() {
      
  },
  changeRankType() {

  }
})
export default rankStore