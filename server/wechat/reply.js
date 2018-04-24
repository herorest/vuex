//注意链接不能使用javascript
import { getWechat } from './index.js'
import menu from './menu.js';

export default async(ctx, next) => {
    const message = ctx.weixin;
    switch(message.MsgType){
        case 'text':
            ctx.body = message.Content;

        break;
        case 'image':
            ctx.body = {
                type:'image',
                mediaId:message.MediaId
            };
        break;
        case 'voice':
            ctx.body = {
                type:'voice',
                mediaId:message.MediaId
            };
        break;
        case 'video':
            ctx.body = {
                title:'你要的视频',
                type:'video',
                mediaId:message.MediaId,
                description:'相当多马赛克的视频'
            };
        break;
        case 'location':
            ctx.body = message.Location_X + '|' + message.Location_Y + '|' + message.Label;
        break;
        case 'link':
            ctx.body = [
                {
                    title:message.Title,
                    description:message.Description,
                    picUrl:'http://mat1.gtimg.com/gd/2016/index/ip_zuijie.png',
                    url:message.Url,
                    type:'news'
                }
            ];
        break;
        case 'event':
            var e = message.Event;
            if(e == 'subscribe'){
                let chat = getWechat();
                let menuData = await chat.handleOpertaion('createMenu',JSON.stringify(menu));
                console.log(menuData); //{"errcode":0,"errmsg":"ok"}

                ctx.body = '欢迎关注'
            }else if(e == 'unsubscribe'){
                console.log('取消关注');
            }else if(e == 'LOCATION'){
                ctx.body = message.Latitude + '|' + message.Longitude + '|' + message.Precision;
            }
        break;
    }
}
