import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'

import counterStore from './store/counter'

import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore
}

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
      'pages/activity/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
