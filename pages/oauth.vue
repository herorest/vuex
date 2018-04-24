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
            const url = window.location.href;

            this.$store.dispatch('getUserByOAuth',encodeURIComponent(url))
            .then(res => {
                if(res.data.success){
                    console.log(res.data);
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
