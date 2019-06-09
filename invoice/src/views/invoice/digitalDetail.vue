<template>
  <div>
    <invoiceHeader v-bind:titleName="$t('main.digitalDetail')"></invoiceHeader>
    <div class="mainPadding detailForm">
      <div v-if="gData.debug" style="font-size:16px">{{$data}}</div>

      <div class="formItem">
        <mt-cell title="申请日期" :value="pageData.invoiceMain.createDate|stampToDate"></mt-cell>
      </div>
      <div class="formItem">
        <mt-cell title="发票抬头" :value="pageData.invoiceMain.invoiceHead"></mt-cell>
      </div>
      <div class="formItem">
        <mt-cell title="纳税人识别号" :value="pageData.invoiceMain.identiNo"></mt-cell>
      </div>
      <div class="formItem">
       <mt-cell title="发票内容" :value="pageData.invoiceMain.contents"></mt-cell>
      </div>
      <div class="formItem">
       <mt-cell title="发票金额" :value="(pageData.invoiceMain.amount?pageData.invoiceMain.amount:'0')+ '.00 元'"></mt-cell>
      </div>
      <div class="formItem">
        <mt-cell title="注册地址及电话" :value="pageData.invoiceMain.address"></mt-cell>
      </div>
      <div class="formItem">
        <mt-cell title="开户银行及账号" :value="pageData.invoiceMain.bank"></mt-cell>
      </div>
      <!-- <div class="formItem">
        <mt-cell title="银行账号" :value="pageData.invoiceMain.bankNo"></mt-cell>
      </div> -->
      <div class="formItem">
        <mt-cell title="电子邮箱" :value="pageData.invoiceMain.email"></mt-cell>
      </div>
      <div class="formItem">
        <!-- <router-link to="/digitalContain?id=1acs"> -->
          <mt-cell label="发票所含行程" :to="{path: '/digitalContain?id='+id}" is-link>
            <span style="color: rgb(105,201,121)">查看行程单</span>
          </mt-cell>
        <!-- </router-link> -->
      </div>
      <!-- <div v-if="gData.isAndroid&&!gData.isiOS&&Number(pageData.invoiceMain.invoiceType)===1" class="formItem"> -->
      <div v-if="Number(pageData.invoiceMain.invoiceType)===1" class="formItem">
      <!-- <div class="formItem"> -->
        <!-- <router-link to="/digitalInvoice?id=1acs"> -->
          <mt-cell label="电子发票查看" :to="{path: '/digitalInvoice?id='+pageData.invoiceMain.fplsh}" is-link>
            <span style="color: rgb(105,201,121)">查看发票单</span>
          </mt-cell>
        <!-- </router-link> -->
      </div>
      <!-- <div class="formItem">
        <router-link :to="{path: '/digitalMail?id='+id}">
          <mt-cell label="未收到电子发票" is-link>
            <span style="color: rgb(105,201,121)">重发邮件</span>
          </mt-cell>
        </router-link>
      </div> -->
    </div>
  </div>
</template>
<style scoped lang="scss">
</style>

<script>
import invoiceHeader from '@/components/invoiceHeader'
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      id: this.$route.query.id,
      apiData: {
        // api: 'http://192.168.0.164:8073/invioceController/getinvoicedRecordDetail',
        // invoiceNo: '111'
      },
      pageData: {
        invoiceMain: {}
      }
    }
  },
  filters: {
    formatMoney: function (value) {
      return '￥' + value.toFixed(2)
    },
    stampToDate: function (value) {
      if (!value) return ''
      var date = new Date(Number(value))
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      // let D = date.getDate() + ' '
      value = (Y + M + D)
      return value
    }
  },
  mounted () {
  },
  deactivated () {

  },
  activated: function () {
    this.id = this.$route.query.id
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
  // activated: function () {
  //   console.log('activated')
  //   this.axios.post(this.gData.api + '/invioceController/getinvoicedRecordDetail' +
  //   '?invoiceNo=' + this.id, {
  //   })
  //     .then((res) => {
  //       this.pageData = res.data.data
  //       console.log(this.pageData)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // },
  components: {
    invoiceHeader
  }
}
</script>
