import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { WebView } from '@tarojs/components'

import './index.less'

class YCYWebview extends Component {
  config: Config = {
    navigationBarTitleText: this.$router.params.title || '网页'
  }
  render () {
    const { url } = this.$router.params

    return (
      <WebView src={url} />
    )
  }
}

export default YCYWebview  as ComponentType
