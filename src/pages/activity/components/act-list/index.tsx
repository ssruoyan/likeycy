import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text, Image } from '@tarojs/components'
import { observer } from '@tarojs/mobx'


interface ActEventInfo {
    title: string;
    link: string;
    desc: string;
}
interface ActEvent {
    title: string;
    locked: boolean;
    description: string;
    list: ActEventInfo[]
}
interface ActList {
    props: {
        actived: boolean,
        list: ActEvent[]
    }
}

@observer
class ActList extends Component {
    state = {
        
    }
    render() {
        const { actived, list } = this.props

        
        return (
            <View className="ycy-act-list">
                <ScrollView scrollX className="act-list-shift">
                {
                    list.map((evt, idx) => {
                        return (
                            <View className="act-event unlocked">
                                <View className="act-event-card">
                                <Text>榜单与奖品</Text>
                                <Image src="https://image.ff2333.com/ycy/unlock.png"/>
                                </View>
                            </View>
                        )
                    })
                } 
                </ScrollView>
                <View className="act-list-show">
                    
                </View>
            </View>
        )
    }
}

export default ActList as ComponentType