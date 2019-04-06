import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'

import './app.less'


class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    tabBar: {
      custom: false,
      color: '#0E254D',
      selectedColor: '#5B62D2',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '我的',
          iconPath: 'images/me-icon.png',
          selectedIconPath: 'images/me-icon-selected.png'
        },
        {
          pagePath: 'pages/rank/index',
          text: '榜单',
          iconPath: 'images/rank-icon.png',
          selectedIconPath: 'images/rank-icon-selected.png'
        },
        {
          pagePath: 'pages/activity/index',
          text: '盛典',
          iconPath: 'images/act-icon.png',
          selectedIconPath: 'images/act-icon-selected.png'
        }
      ]
    },
    pages: [
      'pages/index/index',
      'pages/bind/index',
      'pages/rank/index',
      'pages/activity/index',
      "pages/rank-rule/index",
      "pages/bind-input/index",
      "pages/webview/index"
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
