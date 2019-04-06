import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import cx from 'classnames'
import { View, Image, Text, CoverView, Button, CoverImage } from '@tarojs/components'
import { AtMessage } from 'taro-ui';
import { getUserInfo } from '../../api/index'
import IndexGraph from './index-graph/index'
import CountUp from './count-up/index'
import FixedNavCover from '../../images/nav.png'
import { getAuthPlatform } from '../../utils/index'
import { PLATFORM_TYPE, PLATFORM_TYPE_NAME } from '../../const/index'


import 'taro-ui/dist/style/components/message.scss'
import './index.less'


const NAV_ITEMS = [{
  id: 0,
  name: '综合'
}].concat(Object.keys(PLATFORM_TYPE).map((key) => {
  const id = PLATFORM_TYPE[key]
  const name = PLATFORM_TYPE_NAME[id]
  return {
    id,
    name,
  }
}))

class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  navItems: any[] = NAV_ITEMS
  config: Config = {
    navigationBarTitleText: '超越吧！村村',
    navigationBarBackgroundColor: '#282B48',
    backgroundColor: '#282B48',
    navigationBarTextStyle: 'white'
  }
  state = {
    percent: 0,
    rank: 0,
    score: 0,
    scoreDetail: [0, 0, 0, 0, 0, 0, 0],
    showNav: false,
    authPlatforms: [],
    activeKey: 0
  }
  componentDidMount() {    
    Taro.showShareMenu({
      withShareTicket: true
    })
    const accessToken = Taro.getStorageSync('accessToken')

    if (!accessToken) {
      Taro.redirectTo({
        url: '/pages/bind/index',
        success() {
          console.log('succss')
        }
      })
    }
  }
  componentDidShow() {
    const platforms: number[] = getAuthPlatform()

    this.fetch()

    this.setState({
      authPlatforms: platforms,
      showNav: true,
    })
  }
  fetch() {
    const accessToken = Taro.getStorageSync('accessToken')
    const { activeKey } = this.state

    Taro.showLoading()

    getUserInfo({ accessToken, activeKey }).then(({ data }) => {
      const { percent, scoreDetail, score, rank } = data.data

      this.setState({
        percent,
        scoreDetail,
        score,
        rank
      })

      Taro.hideLoading()
    }).catch((err) => {
      Taro.hideLoading()
      Taro.atMessage({
        message: '请求错误~~',
        type: 'error'
      })

      console.log(err)
    })
  }
  onShareAppMessage = () => {
    return {
      title: '与好友PK一下',
      path: '/pages/rank/index?groupId=999'
    }
  }
  shift = (data) => {
    if (data.actived) {
      return
    }
    if (!data.authed) {
      Taro.showModal({
        title: '提示',
        content: `您还未授权【${PLATFORM_TYPE_NAME[data.id]}】平台的账号，点击确认前往授权！`,
        success(res) {
          if (res.confirm) {
            Taro.navigateTo({
              url: `/pages/bind-input/index?id=${data.id}`
            })
          }
        }
      })

      return
    }

    this.setState({
      activeKey: data.id
    }, this.fetch)
  }
  render () {
    const { percent, rank, scoreDetail, score, activeKey, showNav, authPlatforms } = this.state
    

    return (
      <View className='page__index'>
        <AtMessage />
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
          <IndexGraph data={scoreDetail} />
        </View>
        <View className="foot">
          { showNav && <CoverView className="fixed-nav">
            <CoverImage src={FixedNavCover} className="fixed-nav-bg" />
            <CoverView className="fixed-nav-content">
              {
                this.navItems.map((data) => {
                  const platforms: any[] = authPlatforms
                  const authed = data.id === 0 ||  platforms.indexOf(data.id) > -1
                  const actived = activeKey === data.id
                  const cls = cx({
                    'nav-text': true,
                    'actived': actived,
                    'authed': authed
                  })
                  data.actived = actived
                  data.authed = authed

                  return <CoverView key={data.id} onClick={this.shift.bind(this, data)} className={cls}>{data.name}</CoverView>
                })
              }
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
