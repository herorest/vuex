import config from '../config'
import Wechat from '../wechat-lib'
import WechatOAuth from '../wechat-lib/oauth'

const wechatConfig = {
    wechat:{
        appID:config.wechat.appID,
        appSecret:config.wechat.appsecret,
        token:config.wechat.token
    }
}

export const getWechat = () => {
    return new Wechat(wechatConfig.wechat);
}

export const getOAuth = () => {
    return new WechatOAuth(wechatConfig.wechat);
}
