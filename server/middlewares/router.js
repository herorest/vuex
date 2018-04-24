import Router from 'koa-router'
import config from '../config'
import sha1 from 'sha1'
import { getWechat } from '../wechat'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import {signature,redirect,oauth} from '../controllers/wechat'
import path from 'path'
export const router = app => {
    const router = new Router();

    //公众平台配置接口信息URL时的验证程序，过后可以不用
    // router.get('/wechat-hear',(ctx,next) => {
    //     const token = config.wechat.token;
    //     const {
    //         signature,
    //         nonce,
    //         timestamp,
    //         echostr
    //     } = ctx.query;
    //
    //     const str = [token,timestamp,nonce].sort().join('');
    //     const sha = sha1(str);
    //
    //     if(sha == signature){
    //         ctx.body = echostr;
    //     }else{
    //         ctx.body = 'failed';
    //     }
    // });

    router.all('/wechat-hear',wechatMiddle(config.wechat,reply));

    router.all('/wechat-signature',signature);

    router.all('/wechat-redirect',redirect);

    router.all('/wechat-oauth',oauth);

    router.get('/upload',(ctx,next) => {
        let chat = getWechat();
        // 临时图片
        // chat.handleOpertaion('uploadMedia','pic',path.resolve(__dirname,'../../img.jpg'));

        // 永久图片
        // chat.handleOpertaion('uploadMedia','image',path.resolve(__dirname,'../../img.jpg'),{
        //     type:'image'
        // });


        // 永久视频
        // chat.handleOpertaion('uploadMedia','video',path.resolve(__dirname,'../../card.mp4'),{
        //     type:'video',
        //     description:'{"title":"test", "introduction":"介绍"}'
        // });

        // 图文 -FejjZoJ_YPIr3vnWa2t4lxT3-0OUM6lVSO4BviSSNI
        // const news = {
        //     articles:[
        //         {
        //             title:'测试图文1',
        //             thumb_media_id:'-FejjZoJ_YPIr3vnWa2t4t8VkdDinb3NqaOolFNtzzs',
        //             author:'sj',
        //             digest:'digest',
        //             show_cover_pic:1,
        //             content:'content',
        //             content_source_url:'http://coding.imooc.com'
        //         },
        //         {
        //             title:'测试图文2',
        //             thumb_media_id:'-FejjZoJ_YPIr3vnWa2t4t8VkdDinb3NqaOolFNtzzs',
        //             author:'sj',
        //             digest:'digest',
        //             show_cover_pic:0,
        //             content:'content',
        //             content_source_url:'http://coding.imooc.com'
        //         }
        //     ]
        // };
        // chat.handleOpertaion('uploadMedia','news',news,{});

        //获取
        // chat.handleOpertaion('fetchMedia', '-FejjZoJ_YPIr3vnWa2t4t8VkdDinb3NqaOolFNtzzs' ,'image',{
        //     type:'image'
        // });
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
}
