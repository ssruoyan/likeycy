import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import './index.less'

class RankRule extends Component {
  config: Config = {
    navigationBarTitleText: '关于榜单'
  }
  render () {
    return (
      <View className='page__rule'>
        <View className="rule-section">
            <Text className="rule-title">关于榜单</Text>
            <View className="rule-content">
                <Text>1. 从授权小程序开始计算吸花指数，越早加入、优势越大</Text>
                <Text>2. 吸花指数：来源授权社区关于“🐑超越”相关话题的互动，如发帖、评论、点赞、转发等行为</Text>
                <Text>3. 参与空瓶，能获得更高的吸花指数</Text>
            </View>
        </View>
        <View className="rule-section">
            <Text className="rule-title">关于奖品</Text>
            <View className="rule-content">
              <Text>
                来自赞助商提供的奖品，细节将在07.01公布，
                获奖名单将来源于：
              </Text>
              <Text>1.  年度榜单TOP1~10：都有奖</Text>
              <Text>2. 月度榜单TOP1~10：随机抽奖</Text>
              <Text>3. 幸运奖（每一位参加榜单的小伙伴都有机会获奖）</Text>
              <View className="rule-table">
                <View className="rule-cell">
                  <Text>TOP11-50</Text>
                  <Text>3名</Text>
                  <Text>一档奖品</Text>
                </View>
                <View className="rule-cell">
                  <Text>TOP51-100</Text>
                  <Text>3名</Text>
                  <Text>一档奖品</Text>
                </View>
                <View className="rule-cell">
                  <Text>TOP100-200</Text>
                  <Text>3名</Text>
                  <Text>一档奖品</Text>
                </View>
                <View className="rule-cell">
                  <Text>TOP200以上</Text>
                  <Text>3名</Text>
                  <Text>一档奖品</Text>
                </View>
              </View>
            </View>
        </View>
        <Text className="rule-tips">
            以上说明仅用于产品demo演示，不作为最终规则。最终解释权归研发者所有。
        </Text>
      </View>
    )
  }
}

export default RankRule  as ComponentType
