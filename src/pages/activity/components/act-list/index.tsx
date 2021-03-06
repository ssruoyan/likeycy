import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text, Image } from '@tarojs/components'
import cx from 'classnames'

import './index.less'

type ActEventInfo = {
    title: string;
    link?: string;
    content: string;
}
type ActEvent = {
    title: string;
    locked: boolean;
    desc: string;
    link?: string;
    list?: ActEventInfo[]
}
interface ActList {
    props: {
        actived: number,
        list: ActEvent[]
    }
}

class ActList extends Component {
    static defaultProps = {
        list: [],
        actived: 0
    }
    constructor(...props) {
        super(...props)
    }
    link = (target) => {
        target && Taro.navigateTo({
            url: target
        })
    }
    render() {
        const { actived, list } = this.props
        const activeEvent = list[actived]

        return (
            <View className="ycy-act-list">
                <ScrollView scrollX className="act-list-shift">
                {
                    list.map((evt) => {
                        const cls = cx({
                            'act-event': true,
                            unlocked: !evt.locked,
                            locked: evt.locked
                        })
                        const icon = evt.locked ? 'https://image.ff2333.com/ycy/lock.png' : 'https://image.ff2333.com/ycy/unlock.png'

                        return (
                            <View className={cls} onClick={this.link.bind(this, evt.link)}>
                                <View className="act-event-card">
                                    <Text className="title">{evt.title}</Text>
                                    <Image className="lock" src={icon} />
                                </View>
                                <Text className="act-event-desc">{evt.desc}</Text>
                            </View>
                        )
                    })
                } 
                </ScrollView>
                { activeEvent && <View className="act-list-show">
                {
                    (activeEvent.list || []).map((info) => {
                        return (
                            <View className="act-show" onClick={this.link.bind(this, info.link)}>
                                <View className="act-show-head">
                                    <Text className="act-show-title">{info.title}</Text>
                                </View>
                                <View>
                                    <Text className="act-show-text">{info.content}</Text>
                                </View>
                                <Image className="act-show-icon" src="https://image.ff2333.com/ycy/more.png" />
                            </View>
                        )
                    })
                }
                </View>}
            </View>
        )
    }
}

export default ActList