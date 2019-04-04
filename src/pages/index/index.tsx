import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { getUserInfo } from '../../api/index'
import IndexGraph from './index-graph/index'
import CountUp from './count-up/index'

import './index.less'

@observer
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '超越吧！村村',
    navigationBarBackgroundColor: '#282B48',
    navigationBarTextStyle: 'white'
  }
  state = {
    percent: '7%',
    rank: 2,
    score: 20,
    scoreDetail: []
  }
  componentDidMount() {
    Taro.showShareMenu({
      withShareTicket: true
    })
  }
  componentDidShow() {
    const accessToken = Taro.getStorageSync('accessToken')

    getUserInfo(accessToken).then(({ data }) => {
      const { percent, scoreDetail, score, rank } = data.data

      this.setState({
        percent,
        scoreDetail,
        score,
        rank
      })
    })
  }
  click = () => {
  }
  onShareAppMessage = () => {
    return {
      title: '与好友PK一下',
      path: '/pages/rank/index'
    }
  }
  render () {
    const { percent, rank, score } = this.state

    return (
      <View className='page__index'>
        <View className="main">
          <CountUp num={score}></CountUp>
          <Text className="rate">今日吸花指数{percent}</Text>
          <Text className="rank">排名{rank}位</Text>
          <IndexGraph />
        </View>
        <View className="foot">
          <View className="fixed-nav">
            <Text className="nav-text actived">综合</Text>
            <Text className="nav-text">微博</Text>
            <Text className="nav-text">贴吧</Text>
            <Text className="nav-text">虎扑</Text>
            <Text className="nav-text">豆瓣</Text>
            <Text className="nav-text">知乎</Text>
          </View>
          <Button plain={true} openType="share" className="pk-button">
            <Image className="pk-button-cover" src="https://image.ff2333.com/ycy/pk-button.png"/>
          </Button>
        </View>
      </View>
    )
  }
}

export default Index  as ComponentType
