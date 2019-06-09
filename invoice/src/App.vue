<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->

    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>

    <!-- <div v-if="gData.debug" id="consoleBar" @click="consolePop" v-bind:style="{ transform: consoleState?'scale(.2)':'' }"> -->
    <!-- <div id="consoleBar">
      <router-link to="/">
        <mt-button type="default">index</mt-button>
      </router-link>
      <router-link to="/main">
        <mt-button type="primary">main</mt-button>
      </router-link>
      <router-link to="/invoice">
        <mt-button type="danger">开发票</mt-button>
      </router-link>
      <router-link to="/fillMake?type=1&fee=300">
        <mt-button type="main">填写开票信息</mt-button>
      </router-link>
      <mt-button type="danger" @click.native="Language" id="r3">语言{{this.$i18n.locale}}</mt-button>
    </div> -->
  </div>
</template>

<script>
// import js from './assets/js/common'
export default {
  name: 'App',
  data () {
    return {
      selected: '精选',
      consoleState: true
    }
  },
  mounted: function () {
    // console.log('app mounted')
    this.gData.debug = Number(this.js.getUrlParam('debug')) === 1
    this.gData.code = this.js.getUrlParam('code')
    this.gData.bottom = this.js.getUrlParam('bottom')
    this.gData.fakeData = Number(this.js.getUrlParam('fake')) === 1
    this.gData.token = this.js.getUrlParam('token')
    console.log(this.js.getUrlParam('token') ? 'token found ' + this.js.getUrlParam('token') : 'no token')
    this.gData.lang = this.js.getUrlParam('lang') || 'cn'

    this.ua = navigator.userAgent
    this.gData.isAndroid = this.ua.indexOf('Android') > -1 || this.ua.indexOf('Adr') > -1 // android终端
    this.gData.isiOS = !!this.ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端

    if (this.gData.lang === 'cn') {
      localStorage.setItem('lang', 'zh')
      this.$i18n.locale = 'zh'
    } else {
      localStorage.setItem('lang', 'en')
      this.$i18n.locale = 'en'
    }

    if (Number(this.js.getUrlParam('debug')) === 1) {
      console.log('debug mode!!!')
    } else {
      console.log('debug off')
    }
  },
  methods: {
    consolePop () {
      console.log(this.consoleState = !this.consoleState)
    },
    handleClick (evt) {
      console.log('跳转至', this.selected = evt.target.id)
    },
    Language () {
      if (this.$i18n.locale === 'zh') {
        this.$i18n.locale = 'en'
        localStorage.setItem('lang', 'en')
      } else {
        this.$i18n.locale = 'zh'
        localStorage.setItem('lang', 'zh')
      }
    }
  },
  watch: {
    selected: function (val, oldVal) {
      // 这里就可以通过 val 的值变更来确定
      switch (val) {
        case 'r1':
          this.$router.push('/')
          break
        case 'r2':
          this.$router.push('/main')
          break
        case 'r3':
          this.$router.push('/invoice')
          break
      }
    }
  }
}
</script>

<style lang="scss">
#consoleBar{
    position: fixed;
    bottom: 90px;
    padding: 10px;
    // background-color: rgba(0,0,0,.3);
    background-color: black;
    opacity: .3;
    border-radius: 5px;
    left: $globalMargin;
    right: $globalMargin;
}
</style>
