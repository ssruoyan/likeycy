import Taro from '@tarojs/taro'

const DOMAIN = 'http://192.168.31.189:8080'

/**
 * 登录
 * 
 * @param { string }  code 
 */
export function userLogin(code) {
    return Taro.request({
        url: DOMAIN + '/user/login',
        method: 'POST',
        data: {
            code,
        }
    })
}

/**
 * 保存用户信息
 * 
 * @param { string } data.accessToken 凭证
 * @param { string } data.nickname 用户名
 * @param { string } data.avatar 头像
 */
export function saveUserInfo(data) {
    return Taro.request({
        url: DOMAIN + '/user/save',
        method: 'POST',
        data,
    })
}

/**
 * 查询用户信息
 * 
 * @param { string } accessToken
 */
export function getUserInfo(accessToken) {
    return Taro.request({
        url: DOMAIN + '/user/userinfo',
        method: 'GET',
        data: {
            accessToken,
        }
    })
}

/**
 * 查询总排行信息
 * 
 * @param { string } data.accessToken 凭证
 * @param { string } data.type  排行类型
 * @param { string } data.platform_type 平台
 * 
 */
export function getTotalRank(data) {
    return Taro.request({
        url: DOMAIN + '/user/rank',
        method: 'GET',
        data,
    })
}

/**
 * 获取群排行信息
 *
 * @param { string } data.accessToken 凭证
 * @param { string } data.type  排行类型
 * @param { string } data.platform_type 平台
 * @param { number } data.groupId 群ID
 */
export function getGroupRank(data) {
    return Taro.request({
        url: DOMAIN + '/user/group/rank',
        method: 'GET',
        data
    })
}