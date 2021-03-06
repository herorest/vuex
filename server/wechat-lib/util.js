import xml2js from 'xml2js'
import template from './tpl'
import sha1 from 'sha1'

function parseXML (xml){
    return new Promise((resolve,reject) => {
        xml2js.parseString(xml, {trim:true},(err,content) => {
            if(err){
                reject(err);
            }else{
                resolve(content);
            }
        });
    })
}

function formatMessage(result){
    let message = {}
    if(typeof result === 'object'){
        const keys = Object.keys(result);
        for(let i=0;i<keys.length;i++){
            let item = result[keys[i]];
            let key = keys[i]

            if(!(item instanceof Array) || item.length == 0){
                continue;
            }

            if(item.length === 1){
                let val = item[0];

                if(typeof val === 'object'){
                    message[key] = formatMessage(val);
                }else{
                    message[key] = (val || '').trim();
                }
            }else{
                message[key] = []

                for(let j=0;j<item.length;j++){
                    message[key].push(formatMessage(item[j]));
                }
            }
        }
    }
    return message;
}

function tpl(content,message){
    let info = {};
    let type;

    if(!content){
        content = '暂无数据';
    }

    if(!content.type){
        type = 'text';
    }
    if(Array.isArray(content)){
        type = 'news';
    }

    type = content.type || type;

    info = Object.assign({},{
        content:content,
        createTime:new Date().getTime(),
        msgType:type,
        toUserName: message.FromUserName,
        fromUserName: message.ToUserName
    });

    return template(info);
}

//签名算法
function sign(ticket,url){
    let nonce = createNonte();
    let timestamp = createTimestamp();
    let signature = signIt(nonce,ticket,timestamp,url);
    return {
        noncestr:nonce,
        timestamp:timestamp,
        signature:signature
    }
}

function createNonte(){
    return Math.random().toString(36).substr(2,15);
}

function createTimestamp(){
    return parseInt(new Date().getTime() / 1000,0) + ''
}

function raw(args){
    let keys = Object.keys(args);
    keys = keys.sort();
    let newArgs = {};
    keys.forEach((key) => {
        newArgs[key.toLowerCase()] = args[key]
    });

    let str = '';
    for(let k in newArgs){
        str += '&' + k + '=' + newArgs[k];
    }

    return str.substr(1);
}

function signIt(nonce,ticket,timestamp,url){
    let ret = {
        jsapi_ticket:ticket,
        nonceStr:nonce,
        timestamp:timestamp,
        url:url
    }
    let str = raw(ret);
    let sha = sha1(str);
    return sha;
}

export {
    formatMessage,
    parseXML,
    tpl,
    sign
}
