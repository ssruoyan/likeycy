import Taro, { Component } from '@tarojs/taro'
import { Text } from '@tarojs/components'

import './index.less'

interface CountUp {
    props: {
        num: number
    }
}
class CountUp extends Component {

    componentDidMount() {
        console.log(this.props)
    }
    render() {
        const { num } = this.props

        return <Text className="count-up">{num}</Text>   
    }
}

export default CountUp