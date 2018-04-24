import sha1 from 'sha1'
import getRawBody from 'raw-body'
import * as util from './util'
import reply from '../wechat/reply'
import config from '../config'

//微信消息中间件
export default function(opts,reply){
    return async function wechatMiddle(ctx,next){
        const token = config.wechat.token;
        const {
            signature,
            nonce,
            timestamp,
            echostr
        } = ctx.query;

        const str = [token,timestamp,nonce].sort().join('');
        const sha = sha1(str);

        //针对all的类型做判断
        if(ctx.method === 'GET'){
            if(sha == signature){
                ctx.body = echostr;
            }else{
                ctx.body = 'failed';
            }
        }else if(ctx.method === 'POST'){
            if(sha == signature){
                const data = await getRawBody(ctx.req,{
                    length: ctx.length,
                    limit: '1mb',
                    encoding: ctx.charset
                });
                const content = await util.parseXML(data);
                const message = util.formatMessage(content.xml);
                ctx.weixin = message;

                await reply.apply(ctx,[ctx,next]);
                const replyBody = ctx.body;
                const msg = ctx.weixin;
                let xml = util.tpl(replyBody,msg);
                
                ctx.status = 200;
                ctx.type = 'application/xml';
                ctx.body = xml;
                console.log(xml);
            }else{
                ctx.body = 'failed';
            }
        }
    }
}
