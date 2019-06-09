<template>
  <div>
    <invoiceHeader v-bind:titleName="$t('main.fillMore')"></invoiceHeader>
    <div class="fillForm mainPadding">
      <div v-if="gData.debug" style="font-size:16px">{{moreInfo}}</div>
      <div v-if="gData.debug" style="font-size:16px">getListInVuex: {{$store.getters.getListInVuex}}</div>
      <div v-if="gData.debug" style="font-size:16px">----getMoreInfoVuex: {{$store.getters.getMoreInfoVuex}}</div>
      <div v-if="gData.debug" style="font-size:16px">----autoFillVuex: {{$store.getters.getAutoFillVuex}}</div>

      <div class="formItem">
       <mt-field label="注册地址" placeholder="填写注册地址(选填)" v-model="moreInfo.address"></mt-field>
      </div>
      <div class="formItem">
       <mt-field label="注册电话" placeholder="填写注册电话(选填)" v-model="moreInfo.moreTel"></mt-field>
      </div>
      <div class="formItem">
        <mt-field label="开户银行" placeholder="填写开户银行(选填)" v-model="moreInfo.bank"></mt-field>
      </div>
      <div class="">
        <mt-field label="银行账号" placeholder="填写银行账号(选填)" v-model="moreInfo.bankId"></mt-field>
      </div>
      <div class="">
        <mt-button @click.native="fillMoreBack" class="mainButton" type="default">确认</mt-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.fixButton{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
}
</style>

<script>
import invoiceHeader from '@/components/invoiceHeader'

export default {
  data () {
    return {
      value: '',
      username: '',
      popupVisible: true,
      moreInfo: {
        address: '',
        moreTel: '',
        bank: '',
        bankId: ''
      }
    }
  },
  activated () {
    this.$store.dispatch('setAutoFillVuex', (false))// vuex push重新判定请求回填信息
  },
  methods: {
    fillMoreBack () {
      this.gData.moreInfo = this.moreInfo
      this.$store.dispatch('setMoreInfoVuex', (this.moreInfo))// vuex push

      this.$store.dispatch('setAutoFillVuex', (false))// vuex push

      this.$router.back(-1)
      console.log(this.moreInfo)
      console.log(this.gData)
    }
  },

  components: {
    invoiceHeader
  }
}
</script>
