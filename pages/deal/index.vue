<template lang="pug">
.container
  .focus-goods-body
    .focus-goods-swiper(v-swiper='swiperConfig')
      .swiper-wrapper
        .swiper-slide(v-for='item in product.images')
          img(:src="item")

      .swiper-pagination.swiper-pagination-bullets

    .focus-goods-content

      .focus-goods-price
        span.focus-goods-price_main {{ product.price }}

      .focus-goods-name {{ product.title }}

      .focus-goods-intro {{ product.intro }}

      .focus-goods-info
        cell(v-for='(item, index) in product.parameters' :key='index' :title='item.key' :content='item.value')

      .focus-goods-attentions
        .title 购买提示
        ol
          li(v-for='item in attentions') {{ item }}

  .focus-goods-footer
    span(@click='buyProduct') 购买
</template>


<script>
    import {mapState} from 'vuex';
    import cell from '../../components/cell.vue';
    import 'swiper/dist/css/swiper.css'
    export default {
        beforeCreate(){
            let id = this.$route.query.id;
            this.$store.dispatch('showProduct',id);
        },
        computed:{
            ...mapState({
                'product':'currentProduct'
            })
        },
        methods:{
            buyProduct(item){
                console.log(item);
            }
        },
        components:{
            cell
        },
        data () {
            return {
                swiperConfig:{
                    autoplay:4000,
                    direction:'horizontal',
                    loop:true,
                    pagination:'.swiper-pagination'
                },
                attentions:[
                    '商品和服务的差异',
                    '清关服务',
                    '物流服务',
                    '需要更多帮助，请联系'
                ]
            }
        }
    }
</script>

<style scoped>
.title{
  margin: 50px 0;
}
</style>
<style scoped lang="sass" src='static/sass/house.sass'></style>
