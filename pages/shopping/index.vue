<template lang="pug">
.container
    .shopping
        .title  权游周边
        .list
            .items(v-for='(item,index) in products' :key='index')
                img(:src='item.images[0]')
                .body
                    .title(@click='showProduct(item)') {{item.title}}
                    .content {{item.intro}}
</template>


<script>
    import {mapState} from 'vuex';
    export default {
        beforeCreate(){
            this.$store.dispatch('fetchProducts');
        },
        computed:{
            ...mapState([
                'products'
            ])
        },
        methods:{
            showProduct(item){
                this.$router.push({
                    path:'/deal',
                    query:{
                        id:item._id
                    }
                })
            }
        },
        data () {
            return {

            }
        }
    }
</script>

<style scoped>
.title{
  margin: 50px 0;
}
</style>
<style scoped lang="sass" src='static/sass/shopping.sass'></style>
