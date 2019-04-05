import Taro, { Component } from '@tarojs/taro'
import { Text } from '@tarojs/components'
import $wuxCountUp from './countup.js'

interface CountUp {
    props: {
        num: number | string,
        className?: string
    }
}
class CountUp extends Component {
    state = {
        c1: 0
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.num !== this.props.num) {
            const c2 = new $wuxCountUp(this.props.num, nextProps.num, 0, 1, {
                printValue: (value) => {
                    this.setState({
                        c1: value
                    })
                },
                separator: ''
            })

            c2.start()
        }
    }
    componentDidMount() {
        const num = this.props.num

        const c1 = new $wuxCountUp(0, num, 0, 1, {
            printValue: (value) => {
                this.setState({
                    c1: value
                })
            },
            separator: ''
        })
        
        c1.start()
    }
    render() {
        const { c1 } = this.state
        const { className } = this.props

        return <Text className={className}>{c1}</Text>   
    }
}

export default CountUp