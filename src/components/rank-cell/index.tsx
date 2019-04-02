import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import classnames from 'classnames'

import './index.less'

interface RankCell {
    props: {
        rank: number;
        avatar: string;
        userNick: string;
        count: number;
    }
}

class RankCell extends Component {
    render() {
        const { rank, avatar, userNick, count } = this.props

        const golden = rank <= 3


        return (
            <View className={classnames({"rank-cell": true, golden})}>
                <View className="rank-index">{rank}</View>
                <View className="rank-data">
                    <View className="rank-user">
                        <Image src={avatar} className="rank-avatar"/>
                        <Text className="rank-usernick">{userNick}</Text>
                    </View>
                    <View className="rank-score">
                        <Text className="rank-count">{count}</Text>
                        <Image className="rank-flower" src="https://image.ff2333.com/ycy/rank-flower.png" />
                    </View>
                </View>
            </View>
        )
    }
}

export default RankCell