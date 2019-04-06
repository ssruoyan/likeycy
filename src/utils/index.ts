import Taro from '@tarojs/taro'
const AUTH_PLATFORM_STROAGE_KEY = 'AUTH_PLATFORM_STROAGE_KEY'

/**
 * 存入授权的平台信息
 * 
 * @param { number } platformId 平台ID
 */
export function saveAuthPlatform(platformId) {
    const authPlatforms = Taro.getStorageSync('AUTH_PLATFORM_STROAGE_KEY')
    const parsedPlatformId = parseInt(platformId)
    let platforms: number[] = []

    if (!authPlatforms) {
        platforms = [parsedPlatformId]
    } else {
        platforms = authPlatforms.split(',')

        if (platforms.indexOf(parsedPlatformId) < 0) {
            platforms.push(parsedPlatformId)
        }
    }

    Taro.setStorageSync(AUTH_PLATFORM_STROAGE_KEY, platforms.join(','))
}

/**
 * 获取授权的平台信息
 */
export function getAuthPlatform() {
    const authPlatform = Taro.getStorageSync(AUTH_PLATFORM_STROAGE_KEY)
    const platforms = authPlatform ? authPlatform.split(',') : []

    return platforms.map((platformId) => {
        return parseInt(platformId)
    })
}