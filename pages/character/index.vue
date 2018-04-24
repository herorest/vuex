<template lang="pug">
.container
  .focusHouse-media
    .focusHouse-text
      .name {{ character.name }}

  .focusHouse-body
    .focusHouse-item-title {{ character.cname }}
    .focusHouse-item-body {{ character.intro }}

    .focusHouse-item-title 主要角色
    .focusHouse-item-body(v-for='(item, index) in character.swornMembers' :key='index')
      .swornMembers
        img(:src="item.profile")
        .swornMembers-body
          .name {{ item.cname }}
          .introduction {{ item.text }}

    .focusHouse-item-section(v-for='(item, index) in character.sections' :key='index')
      .focusHouse-item-title {{ item.title }}
      .focusHouse-item-body(v-for='text in item.content') {{ text }}
</template>


<script>
    import {mapState} from 'vuex';
    export default {
        beforeCreate(){
            let id = this.$route.query.id;
            this.$store.dispatch('showCharacter',id);
        },
        computed:{
            ...mapState({
                'character':'currentCharacter'
            })
        },
        methods:{

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
<style scoped lang="sass" src='static/sass/character.sass'></style>
