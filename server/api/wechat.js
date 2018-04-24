import {getWechat,getOAuth} from '../wechat'

const chat = getWechat();

export async function getSignatureAsync(url){
    const data = await chat.fetchAccessToken();
    const token = data.access_token;
    const ticketData = await chat.fetchTicket(token);
    const ticket = ticketData.ticket;

    let params = chat.sign(ticket,url);
    params.appId = chat.appID;
    return params;
}

export function getAuthorizeURL(...args){
    const oauth = getOAuth();
    return oauth.getAuthorizeURL(...args);
}

export async function getUserByCode(...args){
    const oauth = getOAuth();
    const data = await oauth.fetchAccessToken(code);
    const user = await oauth.getUserInfo(data.access_token,data.openid);
    return user;
}
