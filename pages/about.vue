<template>
    <section class="container">
        <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    </section>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        asyncData({req}){
            return {
                name: req ? 'server':'client'
            }
        },
        head(){
            return {
                title:'测试页面'
            }
        },
        beforeMount(){
            const wx = window.wx;
            const url = window.location.href;

            this.$store.dispatch('getWechatSignature',encodeURIComponent(url))
            .then(res => {
                if(res.data.success){
                    const params = res.data.params;
                    wx.config({
                        debug:true,
                        appId:params.appId,
                        timestamp:params.timestamp,
                        nonceStr:params.noncestr,
                        signature:params.signature,
                        jsApiList:[
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'hideOptionMenu',
                            'showOptionMenu',
                            'hideMenuItems',
                            'showMenuItems',
                            'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem'
                        ]
                    });

                    wx.ready(() => {
                        wx.hideAllNonBaseMenuItem();
                    });
                }
            })
        }
    }
</script>

<style scoped>
.title{
  margin: 50px 0;
}
</style>
