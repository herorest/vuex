import request from 'request-promise'
import DataBase from '../operation'
import formstream from 'formstream'
import fs from 'fs'
import {sign} from './util'

const base = 'https://api.weixin.qq.com/sns/'
//注意参数顺序
const api = {
    authorize:'https://open.weixin.qq.com/connect/oauth2/authorize?',
    accessToken:base + 'oauth2/access_token?',
    userInfo:base + 'userinfo?'
}

export default class Wechat{
    constructor(opts){
        this.opts = Object.assign({},opts);
        this.appID = this.opts.appID;
        this.appSecret = this.opts.appSecret;

    }

    async request (opt){
        opt = Object.assign({},opt);
        try{
            const response = await request(opt);
            return response;
        } catch(e){
            console.log('error');
        }

    }

    getAuthorizeURL(scope = 'snsapi_base',targetURL,state){
        const url = `${api.authorize}appid=${this.appID}&&redirect_uri=${encodeURIComponent(targetURL)}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
        return url;
    }

    async getUserInfo(token,openID,lang='zh_CN'){
        const url = `${api.userInfo}access_token=${token}&openid=${openID}&lang=${lang}`
        let data = await request({ url: url});
        return data;
    }

    async fetchAccessToken(code){
        const url = `${api.authorize}appid=${this.appID}&secret=${this.appSecret}&code=${code}&grant_type=authorization_code`
        let data = await request({ url: url});
        return data;
    }

}
