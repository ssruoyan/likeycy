import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text, Image } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
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
    list?: ActEventInfo[]
}
interface ActList {
    props: {
        actived: number,
        list: ActEvent[]
    }
}

@observer
class ActList extends Component {
    constructor(...props) {
        super(...props)
    }
    render() {
        const { actived, list } = this.props
        const activeEvent = actived >= 0 ? list[actived] : list[0]

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
                            <View className={cls}>
                                <View className="act-event-card">
                                    <Text className="title">榜单与奖品</Text>
                                    <Image className="lock" src={icon} />
                                </View>
                                <Text className="act-event-desc">{evt.desc}</Text>
                            </View>
                        )
                    })
                } 
                </ScrollView>
                <View className="act-list-show">
                {
                    (activeEvent.list || []).map((info) => {
                        return (
                            <View className="act-show">
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
                </View>
            </View>
        )
    }
}

export default ActList