<template lang="pug">
.container
  .user
    .user-header
      .user-header-text {{ authUser.nickname }}
      img(:src="authUser.avatarUrl")
    .user-address
      cell(title='收获地址' iconName='place')
      .user-content {{ authUser.address }}
    .user-phone
      cell(title='电话' iconName='phone_iphone')
      .user-content {{ authUser.phoneNumber }}
    .user-name
      cell(title='姓名' iconName='account_box')
      .user-content {{ authUser.name }}
    .user-order
      cell(title='我的订单' iconName='list')
      .user-order-item(v-for='(item, index) in payments' :key='index')
        img(:src='item.product.images[0]')
        .user-order-intro
          .title {{ item.product.title }}
          .content {{ item.product.intro }}
        .user-order-price
          span ¥{{ item.product.price.toFixed(2) }}
</template>


<script>
import cell from '../../components/cell.vue';
import { mapState } from 'vuex'
export default {
  // middleware: 'wechat-auth',
  data () {
    return {
      title: '个人中心',
      authUser:{
          nickname:'你好',
          address:'asdljfa',
          phoneNumber:'2123123123',
          name:'asdfadf',
          avatarUrl:''
      },
      payments:[
          {
              product:{
                  title:'dadf',
                  images:[''],
                  price:100
              }
          }
      ]
    }
  },
  computed: {
    // ...mapState([
    //   'user',
    //   'orders'
    // ])
  },
  methods: {},
  beforeCreate () {
    //   this.$store.dispatch('fetchUserAndOrders')
  },
  components: {
    cell
  }
}
</script>

<style lang="sass" scoped src='static/sass/user.sass'></style>
