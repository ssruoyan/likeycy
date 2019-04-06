import { ComponentType } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Button, Text } from "@tarojs/components";
import { observer } from "@tarojs/mobx";
import { PLATFORM_TYPE, PLATFORM_TYPE_NAME } from "../../const/index";
import { AtMessage } from "taro-ui";
import { getAuthPlatform } from "../../utils/index";
import { userLogin, saveUserInfo } from '../../api/index'


import 'taro-ui/dist/style/components/message.scss'
import "./index.less";

const PLATFORM_TYPE_COVER = {
  [PLATFORM_TYPE.ZHIHU]: 'https://image.ff2333.com/ycy/zhihu.png',
  [PLATFORM_TYPE.TIEBA]: 'https://image.ff2333.com/ycy/tieba.png',
  [PLATFORM_TYPE.HUPU]: 'https://image.ff2333.com/ycy/hupu.png',
  [PLATFORM_TYPE.WEIBO]: 'https://image.ff2333.com/ycy/sina.png',
  [PLATFORM_TYPE.DOUBAN]: 'https://image.ff2333.com/ycy/douban.png',
}

@observer
class ThirdAccoundBind extends Component {
  config: Config = {
    navigationBarTitleText: "绑定账号"
  };

  state = {
    platforms: [],
    authed: false,
  }

  componentDidMount() {
    const uinfo = Taro.getStorageSync('userinfo')

    this.setState({
      platforms: Object.keys(PLATFORM_TYPE).map((key) => {
        const id = PLATFORM_TYPE[key]
        const name = PLATFORM_TYPE_NAME[id]
        const cover = PLATFORM_TYPE_COVER[id]
        return {
          id,
          name,
          cover
        }
      })
    })

    if (uinfo) {
      this.setState({
        authed: true
      })
      return
    }

    Taro.login().then(({ code }) => {

      console.log(code)
      userLogin(code).then(({ data }) => {
        Taro.setStorageSync("accessToken", data.data.accessToken);
      });
    });
  }

  getUserInfo = (id, { detail }) => {
    const accessToken = Taro.getStorageSync("accessToken");

    const data = {
      accessToken,
      nickname: detail.userInfo.nickName,
      avatar: encodeURIComponent(detail.userInfo.avatarUrl)
    };

    Taro.setStorage({
      key: 'userinfo',
      data,
    })


    saveUserInfo(data).then(() => {
      this.auth(id)
    }).catch(() => {
      this.auth(id)
    })
  };
  auth = platformId => {
    const platforms = getAuthPlatform();

    if (platforms.indexOf(platformId) < 0) {
      Taro.navigateTo({
        url: `/pages/bind-input/index?id=${platformId}`
      });
    } else {
      Taro.atMessage({
        type: "info",
        message: `您已经授权过${PLATFORM_TYPE_NAME[platformId]}`
      });
    }
  };
  render() {
    const { platforms } = this.state

    return (
      <View className="page__bind">
        <AtMessage />
        <View className="bind-text">
          <Text className="paragraph">点击授权一下社交账号</Text>
          <Text className="paragraph">
            同步你的“<Text className="main">吸花指数</Text>”
          </Text>
        </View>
        <View className="bind-icons">
        {
          platforms.map((data: any) => {
            return (
              <Button key={data.id} openType='getUserInfo' onGetUserInfo={this.getUserInfo.bind(this, data.id)}>
                <Image
                  className="icon"
                  src={data.cover}
                />
              </Button>
            )
          })
        }
        </View>
      </View>
    );
  }
}

export default ThirdAccoundBind as ComponentType;
