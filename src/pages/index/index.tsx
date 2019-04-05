import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, CoverView, Button, CoverImage } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { getUserInfo } from '../../api/index'
import IndexGraph from './index-graph/index'
import CountUp from './count-up/index'
import FixedNavCover from '../../images/nav.png'

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
    backgroundColor: '#282B48',
    navigationBarTextStyle: 'white'
  }
  state = {
    percent: 7,
    rank: 2,
    score: 20,
    scoreDetail: [],
    showNav: false,
  }
  componentDidMount() {
    Taro.showShareMenu({
      withShareTicket: true
    })
    this.setState({
      showNav: true
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
      path: '/pages/rank/index?groupId=999'
    }
  }
  render () {
    const { percent, rank, score, showNav } = this.state

    return (
      <View className='page__index'>
        <View className="main">
          <View className="count-up-score">
            <CountUp num={score}></CountUp>
          </View>
          <View className="rate">
            <Text>今日吸花指数</Text>
            <CountUp className="count-up-percent" num={percent}></CountUp>
            <Text>%</Text>
          </View>
          <Text className="rank">排名{rank}位</Text>
          <IndexGraph />
        </View>
        <View className="foot">
          { showNav && <CoverView className="fixed-nav">
            <CoverImage src={FixedNavCover} className="fixed-nav-bg" />
            <CoverView className="fixed-nav-content">
              <CoverView className="nav-text actived">综合</CoverView>
              <CoverView className="nav-text">微博</CoverView>
              <CoverView className="nav-text">贴吧</CoverView>
              <CoverView className="nav-text">虎扑</CoverView>
              <CoverView className="nav-text">豆瓣</CoverView>
              <CoverView className="nav-text">知乎</CoverView>
            </CoverView>
            
          </CoverView> }
          <Button plain={true} openType="share" className="pk-button">
            <Image className="pk-button-cover" src="https://image.ff2333.com/ycy/pk-button.png"/>
          </Button>
        </View>
      </View>
    )
  }
}

export default Index  as ComponentType
