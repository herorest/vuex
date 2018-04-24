import request from 'request-promise'
import DataBase from '../operation'
import formstream from 'formstream'
import fs from 'fs'
import {sign} from './util'

const base = 'https://api.weixin.qq.com/cgi-bin/'
//注意参数顺序
const api = {
    accessToken:base + 'token?grant_type=client_credential',
    temporary: {
        upload: base + 'media/upload?',
        fetch: base + 'media/get?'
    },
    permanent: {
        upload: base + 'material/add_material?',
        uploadNews: base + 'material/add_news?',
        uploadNewsPic: base + 'media/uploadimg?',
        fetch: base + 'material/get_material?',
        del: base + 'material/del_material?',
        update: base + 'meterial/update_news?',
        count: base + 'meterial/get_materialcount?',
        batch: base + 'meterial/batchget_material?'
    },
    tag:{
        create: base + 'tag/create?',
        get: base + 'tag/get?',
        update: base + 'tag/update?',
        delete: base + 'tag/delete?',
        fetchUsers: base + 'user/tag/get?',
        batchtags: base + 'tags/members/batchtagging?',
        batchuntag: base + 'tags/members/batchuntagging?',
        getIdTags:base + 'tags/getidlist?'
    },
    user:{
        updateremark: base + 'user/info/updateremark?',
        info:base + 'cgi-bin/user/info?',
        batchInfo:base + 'cgi-bin/user/info/batchget?',
        fetchUserList:base + 'cgi-bin/user/get?',
        getBlackList:base + 'cgi-bin/tags/members/getblacklist?',
        batchBlackUsers:base + 'cgi-bin/tags/members/batchblacklist?',
        batchUnblackUsers:base + 'cgi-bin/tags/members/batchunblacklist?'
    },
    menu:{
        create:base + 'menu/create?',
        get:base + 'menu/get?',
        del:base + 'menu/delete?',
        addconditional:base + 'menu/addconditional?',
        delconditional:base + 'menu/delconditional?',
        trymatch:base + 'menu/trymatch?'
    },
    ticket:{
        get: base + 'ticket/getticket?',

    }
}

//获取文件大小
function statfile(filepath){
    return new Promise((resolve,reject) =>{
        fs.stat(filepath,(err,stat) => {
            if(err) reject(err);
            else resolve(stat)
        })
    })
}

export default class Wechat{
    constructor(opts){
        this.opts = Object.assign({},opts);
        this.appID = this.opts.appID;
        this.appSecret = this.opts.appSecret;
        this.database = new DataBase();
        this.getAccessToken = this.database.getAccessToken;
        this.saveAccessToken = this.database.saveAccessToken;
        this.getTicket = this.database.getTicket;
        this.saveTicket = this.database.saveTicket;
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

    async fetchAccessToken(){
        let data = await this.getAccessToken();
        if(!this.isValidToken(data[data.length-1])){
            data = await this.updateAccessToken();
            await this.saveAccessToken(data);
        }
        return data;
    }

    async updateAccessToken(){
        let url = api.accessToken + '&appID=' + this.appID + '&secret=' + this.appSecret;
        let data = await this.request({
            url:url
        });
        data = JSON.parse(data);
        const now = (new Date().getTime());
        const expiresIn = now + (data.expires_in - 20) * 1000;
        data.expires_in = expiresIn;
        return data;
    }

    isValidToken(data,name){
        if(!data || !data[name] || !data.expires_in){
            return false
        }
        const expiresIn = data.expires_in;
        const now = (new Date().getTime());
        if(now < expiresIn){
            return true;
        }else{
            return false;
        }
    }

    async handleOpertaion(operation,...args){
        const tokenData = await this.fetchAccessToken();
        const options = this[operation](tokenData.access_token,...args);

        const data = await this.request(options);
        return data;
        return {}
    }

    async fetchTicket(token){
        let data = await this.getTicket();
        if(!this.isValidToken(data[data.length-1])){
            data = await this.updateTicket(token);
            await this.saveTicket(data);
        }
        return data;
    }

    async updateTicket(token){
        let url = api.ticket.get + 'access_token=' + token + '&type=jsapi';
        let data = await this.request({
            url:url
        });
        data = JSON.parse(data);
        const now = (new Date().getTime());
        const expiresIn = now + (data.expires_in - 20) * 1000;
        data.expires_in = expiresIn;
        return data;
    }

    fetchMedia(token, mediaId, type, permanent){
        let form = {}
        let fetchUrl = api.temporary.fetch;

        if(permanent){
            fetchUrl = api.permanent.fetch;
        }

        let url = fetchUrl + 'access_token=' + token;
        let options = {
            method: 'POST' ,
            url: url
        };

        if(permanent){
            form.media_id = mediaId;
            form.access_token = token;
            options.body = form;
        }else{
            if(type == 'video'){
                url = url.replace('https://','http://');
            }
            url += '&media_id=' + mediaId;
        }

        return options;
    }

    delMedia(token, mediaId){
        let form = {
            media_id: mediaId
        }
        let url = api.permanent.del + 'access_token=' + token + '&media_id=' + mediaId;

        let options = {
            method: 'POST' ,
            url: url
        };
        return options;
    }

    updateMedia(token, mediaId, news){
        let form = {
            media_id: mediaId
        }
        form = Object.assign({},form,news);
        let url = api.permanent.update + 'access_token=' + token + '&media_id=' + mediaId;

        let options = {
            method: 'POST' ,
            url: url
        };
        return options;
    }

    uploadMedia(token,type,media,permanent){
        let form = {};
        let url = api.temporary.upload;
        if(permanent){
            url = api.permanent.upload;
            form = Object.assign({},form,permanent);
        }

        if(type == 'pic'){
            url = api.permanent.uploadNewsPic;
        }

        if(type == 'news'){
            url = api.permanent.uploadNews;
            form = media;
        }else {
            form.media = fs.createReadStream(media);
        }

        let uploadurl = url + 'access_token=' + token;
        if(!permanent){
            uploadurl += '&type=' + type;
        }else{
            if(type != 'news'){
                form.access_token = token;
            }
        }

        const options = {
            method:'POST',
            url:uploadurl,
            json:true
        }

        if(type == 'news'){
            options.body = form;
        }else{
            options.formData = form;
        }

        return options
    }

    countMaterial(token){
        return {
            url:api.permanent.count + 'access_token=' + token,
            method:'GET'
        }
    }

    batchMaterial(token,options){
        options.type = options.type || 'image';
        options.offset = options.offset || 0;
        options.count = options.count || 10;
        const url = api.permanent.batch + 'access_token=' + token;

        return options;
    }

    createTag(token,name){
        let form = {
            tag: {
                name:name
            }
        }
        let url = api.tag.create + 'access_token=' + token ;

        let options = {
            method: 'POST' ,
            url: url,
            body: form
        };
        return options;
    }

    getTag(token){
        let url = api.tag.get + 'access_token=' + token ;

        let options = {
            url: url
        };
        return options;
    }

    updateTag(token,tagId,name){
        let form = {
            tag: {
                id: tagId,
                name:name
            }
        }
        let url = api.tag.update + 'access_token=' + token ;

        let options = {
            method: 'POST' ,
            url: url,
            body: form
        };
        return options;
    }

    deleteTag(token,tagId){
        let form = {
            tag: {
                id: tagId
            }
        }
        let url = api.tag.del + 'access_token=' + token ;

        let options = {
            method: 'POST' ,
            url: url,
            body: form
        };
        return options;
    }

    //获取标签下粉丝列表
    fetchUsers(token,tagId,openId){
        let form = {
            tagid: tagId
        }

        openId = openId || ''
        form.next_openid = openId;

        let url = api.tag.fetchTagUser + 'access_token=' + token ;

        let options = {
            method: 'POST' ,
            url: url,
            body: form
        };
        return options;
    }

    //批量打标签
    batchtags(token,openIdList,tagId,unTag){
        let form = {
            openid_list: openIdList,
            tagid: tagId
        }

        let url = 'access_token=' + token ;

        if(!unTag){
            url = api.tag.batchtags + url;
        }else{
            url = api.tag.batchuntag + url;
        }

        let options = {
            method: 'POST' ,
            url: url,
            body: form
        };
        return options;
    }

    //获取用户的标签
    getTagList(token,openId){
        let form = {
            openid: openId
        }

        let url = api.tag.getIdTags + 'access_token=' + token ;

        let options = {
            method: 'POST' ,
            url: url,
            body: form
        };
        return options;
    }

    //取消标签
    remarkUser(token,openId,remark){
        let form = {
            openid: openId,
            remark: remark
        }

        let url = api.user.updateremark + 'access_token=' + token ;

        let options = {
            method: 'POST' ,
            url: url,
            body: form
        };
        return options;
    }

    //获取用户信息
    getUserInfo(token,openId,lang){
        let url = api.user.info + 'access_token=' + token + '&openid=' + openId + '&lang=' + (lang || zh_CN);

        let options = {
            url: url
        };
        return options;
    }

    //批量获取用户信息
    batchUserInfo(token,userList){
        let url = api.user.batchInfo + 'access_token=' + token;
        let form = {
            user_list:userList
        }
        let options = {
            url: url,
            body: form
        };
        return options;
    }

    //批量获取用户列表
    fatchUserList(token,openId){
        let url = api.user.fetchUserList + 'access_token=' + token + '&next_openid=' + (openId || '');
        let options = {
            url: url
        };
        return options;
    }

    //自定义菜单创建
    createMenu(token,menu){
        let url = api.menu.create + 'access_token=' + token;
        let options = {
            url: url,
            method: 'POST',
            body: menu
        };
        return options;
    }

    //获取菜单
    getMenu(token){
        let url = api.menu.get + 'access_token=' + token;
        let options = {
            url: url
        };
        return options;
    }

    //删除菜单
    delMenu(token){
        let url = api.menu.del + 'access_token=' + token;
        let options = {
            url: url
        };
        return options;
    }

    //创建个性化菜单
    addConditionalMenu(token,menu,rule){
        let url = api.menu.addconditional + 'access_token=' + token;
        let form = {
            button:menu,
            metchrule:rule
        }
        let options = {
            url: url,
            method: 'POST',
            body: form
        };
        return options;
    }

    //删除个性化菜单
    delConditionalMenu(token,menuId){
        let url = api.menu.delconditional + 'access_token=' + token;
        let form = {
            menuid:menuId
        }
        let options = {
            url: url,
            method: 'POST',
            body: form
        };
        return options;
    }

    sign (ticket, url) {
        return sign(ticket, url)
    }
}
