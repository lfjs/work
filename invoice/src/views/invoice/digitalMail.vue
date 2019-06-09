<template>
  <div>
    <invoiceHeader v-bind:titleName="$t('main.digitalMail')"></invoiceHeader>
    <div v-if="gData.debug" style="font-size:16px">{{$data}}</div>

    <div>
      <div class="fontSize16 bgWhite mainPadding spaceMargin">
        <div>发票编号：{{pageData.invoiceMain.id}}</div>
      </div>

      <div class="fontSize16 bgWhite mainPadding spaceMargin">
        <div class="formItem hr">发票详情</div>
        <div>
          <mt-cell title="发票抬头" :value="pageData.invoiceMain.invoiceHead"></mt-cell>
          <mt-cell title="纳税人识别号" :value="pageData.invoiceMain.identiNo"></mt-cell>
          <mt-cell title="发票内容" :value="pageData.invoiceMain.contents"></mt-cell>
          <mt-cell title="发票金额" :value="pageData.invoiceMain.amount"></mt-cell>
          <mt-cell title="注册地址" :value="pageData.invoiceMain.address"></mt-cell>
          <mt-cell title="开户银行" :value="pageData.invoiceMain.bank"></mt-cell>
          <mt-cell title="银行账号" :value="pageData.invoiceMain.bankNo"></mt-cell>
        </div>
      </div>

      <div class="fontSize16 bgWhite mainPadding spaceMargin">
        <div class="formItem hr">电子邮箱</div>
        <div @click="changeEmail(email)">
          <mt-cell :title="email" value="修改"></mt-cell>
        </div>
      </div>

    </div>
    <div class="mainPadding">
      <mt-button @click="send" class="mainButton" type="primary">重新发送</mt-button>
    </div>

  </div>
</template>
<style scoped lang="scss">
.formItem.hr{

    padding-bottom: 20px;
}
</style>
<script>
import invoiceHeader from '@/components/invoiceHeader'
import { Toast, MessageBox } from 'mint-ui'

export default {
  data () {
    return {
      id: this.$route.query.id,
      value: '',
      username: '',
      popupVisible: false,
      email: '604495945@qq.com',
      pageData: {invoiceMain: {}}

    }
  },
  methods: {//
    changeEmail (email) {
      MessageBox.prompt(' ', '请输入邮箱', {inputValue: email}).then(({ value, action }) => {
        this.email = value
        console.log('changeEmail', value, action)
      })
    },
    checkInfo () {
      console.log(this.popupVisible = !this.popupVisible)
    },
    send () {
      this.$indicator.open({
        text: '发送中...',
        spinnerType: 'fading-circle'
      })
      this.axios.post(this.gData.api + '/invioceController/reSendEmail' +
    '?invoiceNo=' + this.id +
    '&email=' + this.email, {
      })
        .then((res) => {
          this.pageData = res.data.data
          // console.log(this.pageData)
          this.$indicator.close()

          if (res.data.respcod === '01') {
            Toast({
              message: res.data.respmsg,
              duration: 500 * 2
            })
            this.$router.back(-1)
          } else {
            Toast({
              message: res.data.respmsg,
              duration: 500 * 2
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },

  mounted () {
  },
  deactivated () {
    this.$indicator.close()
  },
  activated: function () {
    this.$indicator.open({text: '加载中...', spinnerType: 'fading-circle'})
    if (this.gData.fakeData) {
      console.log('fakeDataMode!')
      this.axios.get('/static/fakeInvoiceDetail.json' +
      '?page=' + this.apiData.page
        , {
      })
        .then((res) => {
          this.$indicator.close()
          this.pageData = res.data.data
          this.debugInfo = res.data
        })
        .catch(function (error) {
          console.log(error)
          this.debugInfo = error
        })
    } else {
      this.axios.post(this.gData.api + '/invioceController/getinvoicedRecordDetail' +
    '?invoiceNo=' + this.id, {
      })
        .then((res) => {
          this.$indicator.close()

          this.debugInfo = res.data

          if (res.data.respcod === '01') {
            this.pageData = res.data.data
          } else {
            Toast({
              message: res.data.respmsg,
              duration: 500 * 2
            })
          }
        })
        .catch(function (error) {
          console.log(error)
          this.debugInfo = error
        })
    }
  },
  components: {
    invoiceHeader
  }
}
</script>
