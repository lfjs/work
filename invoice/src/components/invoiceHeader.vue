<template>
<!-- <div></div> -->
  <!-- 头部由原生代替 -->
  <mt-header fixed :title="titleName">
    <router-link to="" slot="left">
      <mt-button icon="back" @click="handleClose"></mt-button>
    </router-link>
  </mt-header>

  <!-- <mt-header fixed title="多个按钮">
    <router-link to="" slot="left">
      <mt-button icon="back" @click.native="$router.back(-1)"></mt-button>
    </router-link>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header> -->
</template>
<style scoped lang="scss">

.mint-header{
  box-shadow: 0 2px 7px rgba(18, 18, 18, 0.07);
  // top: 32px

}
</style>
<script>
export default{
  props: [
    'titleName'
  ],
  data () {
    return {}
  },
  methods: {
    handleClose () {
      this.$router.back(-1)
    }
  }
}
</script>
