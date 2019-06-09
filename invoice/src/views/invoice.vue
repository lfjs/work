<template>
  <div>
    <invoiceHeader></invoiceHeader>

    <div class="mainPadding">
      <div class="mainH1">{{$t("main.title")}}</div>
      <!-- <div v-if="gData.debug" style="font-size:16px">ua:{{ua}}</div> -->
      <div v-if="gData.debug" style="font-size:16px">gData:{{gData}}</div>
<!-- :to="{path: '/digitalInvoice?id='+id}" -->
      <router-link :to="{path: '/makeInvoice?nfc=02'}" class="formItem">
        <mt-cell title="地铁乘车开票" is-link></mt-cell>
      </router-link>
      <!-- <div class="formItem" v-if="gData.isAndroid&&!gData.isiOS">
        <mt-cell title="NFC乘车开票" :to="{path: '/makeInvoice?nfc=03'}" is-link></mt-cell>
      </div> -->
      <div class="formItem">
        <mt-cell title="NFC乘车开票" :to="{path: '/makeInvoice?nfc=03'}" is-link></mt-cell>
      </div>
      <router-link to="/invoiceHistory" class="formItem">
        <mt-cell title="开票记录" is-link></mt-cell>
      </router-link>
      <router-link to="/rule" class="formItem">
        <mt-cell title="开票规则" is-link></mt-cell>
      </router-link>
      <router-link to="/help" class="formItem">
        <mt-cell title="开票帮助" is-link></mt-cell>
      </router-link>

    </div>
  </div>
</template>

<script>
import invoiceHeader from '@/components/invoiceHeader'
export default {
  name: 'HelloWorld',
  components: {
    invoiceHeader
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected: '精选',
      ua: '',
      debug: '233'
    }
  },
  activated () {
    this.count = setInterval(() => {
      this.gData.testA += 1
      this.$forceUpdate()
    }, 500 * 2)
  },
  deactivated () {
    clearInterval(this.count)
  },
  mounted () {
    // url参数 token  navigationBar lang fake
    // qdmetor://back//首页回退
    // this.gData.navigationBar = this.getUrlParam('navigationBar')
  },
  methods: {
    handleClick (evt) {
      console.log('跳转至', this.selected = evt.target.id)
    },

    getUrlParam: function (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg) // 匹配目标参数
      if (r != null) return unescape(r[2]); return null // 返回参数值
    }
  },
  watch: {
    selected: function (val, oldVal) {
      // 这里就可以通过 val 的值变更来确定
      switch (val) {
        case 'r2R1':
          this.$router.push('/r1')
          break
        case 'r2R2':
          this.$router.push('/r2')
          break
      }
    }
  }
}
</script>
