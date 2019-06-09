<template>
  <div>
    <invoiceHeader v-bind:titleName="$t('main.fillPaperMake')"></invoiceHeader>
    <div class="infoCon">
      <div class="progress">
        <div class="cell">
          <div class="num on"><i></i>1</div>
          <div class="text">阅读须知</div>
        </div>
        <div class="cell">
          <div class="num"><i></i>2</div>
          <div class="text">金额确认</div>
        </div>
        <div class="cell">
          <div class="num">3</div>
          <div class="text">领取成功</div>
        </div>
      </div>
      <div class="info">
        <div>纸质发票只支持地铁站内领取</div>
        <div>请务必由工作人员配合完成</div>
        <div class="text">开票金额 (元)</div>
        <div class="price">{{infoFake.amount*100|yuan}}</div>
      </div>
    </div>
    <div v-if="gData.debug" style="font-size:16px">{{$data}}<br></div>
    <!-- <div v-if="gData.debug" style="font-size:16px">checked30List===={{gData.checked30List}}<br></div> -->
      <div v-if="gData.debug" style="font-size:16px">----getListInVuex: {{$store.getters.getListInVuex}}</div>
      <!-- <div v-if="gData.debug" style="font-size:16px">listdetail: {{infoFake.listdetail}}</div> -->

    <div class="notice">
      <div class="title">纸质发票开票须知</div>
      <div>1.请根据上一步选择的开票行程，前往车站的售票/补票窗口领取纸质发票。</div>
      <div>2.同一行程或订单开具纸质发票后无法再开具电子发票。</div>
      <div>3.由于个人原因造成的误开，将不予受理重复开票。</div>
      <div>4.开票流程需由站务人员配合下完成。</div>
      <div>5.开票流程需现场操作，截图将不予受理。</div>
      <div class="spaceBottom24"></div>
      <router-link replace :to="{path: '/fillPaperCheck?fee='+this.infoFake.amount}" class="">
        <!-- <mt-button @click="sendInfo" class="mainButton" type="default">下一步</mt-button> -->
        <mt-button class="mainButton" type="default">下一步</mt-button>
        <!-- this.$router.replace({path: '/fillPaperCheck', query: {fee: this.infoFake.amount}}) -->

      </router-link>
    </div>

  </div>
</template>
<style lang="scss" scoped>
.infoCon{
  background-color: white;
  position: relative;
  z-index: 0
}
.notice{
    font-size: 14px;
    line-height: 20px;
    padding: 24px 20px;
    color: rgba(151, 153, 152, 1);
    .title{
      font-size: 16px;
      margin-bottom: 10px;
      color: $globalFontColor;
    }
}
.info{
    font-size: 18px;
    text-align: center;
    padding-bottom: 38px;
    .text{
      font-size: 12px;
      margin-top: 24px;
      color: $priceGray;
    }
    .price{
      font-size: 36px;
      line-height: 50px;
    }
}
</style>

<script>
import invoiceHeader from '@/components/invoiceHeader'
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      value: '',
      username: '',
      popupVisible: false,
      infoFake: {
        invoiceType: '',
        headType: '',
        invoiceHead: '',
        identiNo: '',
        contents: '*运输服务*客运服务费',
        amount: '',
        // userid: 'userid',
        email: '',
        address: '',
        // phone: '',
        bank: '',
        fplsh: '',
        bankNo: '',
        mark: '',
        listdetail: [
        ]
      }
    }
  },
  methods: {
    sendInfo () {
      this.$indicator.open({
        text: '开票中...',
        spinnerType: 'fading-circle'
      })
      for (let x in this.gData.checked30List) { // 遍历列表
        let tempItem = {}// 临时对象
        for (let y in this.gData.checked30List[x]) { // 遍历单票
          // console.log(this.js.transKey(y), (this.gData.checked30List[x])[y])
          if (this.js.transKey(y)) { // 按需换key
            tempItem[this.js.transKey(y)] = (this.gData.checked30List[x])[y]// 受体赋值
          }
        }
        this.infoFake.listdetail[x] = tempItem
      }
      this.gData.checked30List = []

      if (this.gData.fakeData) {
        this.axios.get('/static/fakeInvoice30List.json' +
          '?invoiceType=' + this.js.checkNull(this.infoFake.invoiceType) +
          '&headType=' + this.js.checkNull(this.infoFake.headType) +
          '&invoiceHead=' + this.js.checkNull(this.infoFake.invoiceHead) +
          '&identiNo=' + this.js.checkNull(this.infoFake.identiNo) +
          '&contents=' + this.js.checkNull(this.infoFake.contents) +
          '&amount=' + this.js.checkNull(this.infoFake.amount) +
          '&userid=' + this.js.checkNull(this.infoFake.userid) +
          '&email=' + this.js.checkNull(this.infoFake.email) +
          '&address=' + this.js.checkNull(this.infoFake.address) +
          '&phone=' + this.js.checkNull(this.infoFake.phone) +
          '&bank=' + this.js.checkNull(this.infoFake.bank) +
          '&bankNo=' + this.js.checkNull(this.infoFake.bankNo) +
          '&mark=' + this.js.checkNull(this.infoFake.mark) +
          '&listdetail=' + JSON.stringify(this.js.checkNull(this.infoFake.listdetail))
          , {
        })
          .then((res) => {
            this.$indicator.close()
            if (res.data.respcod === '01') { // 请求成功？
              this.$router.push({path: '/fillPaperCheck', query: {fee: this.infoFake.amount}})
            } else {
              Toast({
                message: res.data.respmsg,
                duration: 500 * 2
              })
            }
          })
          .catch(function (error) {
            this.$indicator.close()
            console.log(error)
          })
      } else {
        // this.axios.post(this.gData.api + '/invioceController/insertInvoice' +
        //   '?invoiceType=' + this.js.checkNull(this.infoFake.invoiceType) +
        //   '&headType=' + this.js.checkNull(this.infoFake.headType) +
        //   '&invoiceHead=' + this.js.checkNull(this.infoFake.invoiceHead) +
        //   '&identiNo=' + this.js.checkNull(this.infoFake.identiNo) +
        //   '&contents=' + this.js.checkNull(this.infoFake.contents) +
        //   '&amount=' + this.js.checkNull(this.infoFake.amount) +
        //   '&userid=' + this.js.checkNull(this.infoFake.userid) +
        //   '&email=' + this.js.checkNull(this.infoFake.email) +
        //   '&address=' + this.js.checkNull(this.infoFake.address) +
        //   '&phone=' + this.js.checkNull(this.infoFake.phone) +
        //   '&bank=' + this.js.checkNull(this.infoFake.bank) +
        //   '&bankNo=' + this.js.checkNull(this.infoFake.bankNo) +
        //   '&mark=' + this.js.checkNull(this.infoFake.mark) +
        //   '&listdetail=' + JSON.stringify(this.js.checkNull(this.infoFake.listdetail))
        //   , {
        // })

        // this.$ajax({// 开发票接口有异于其他接口
        //   method: 'post',
        //   url: this.gData.api + '/invioceController/insertInvoice',
        //   headers: {'Content-Type': 'application/json;charset=utf-8'},
        //   data: {
        //     'invoiceType': this.js.checkNull(this.infoFake.invoiceType),
        //     'headType': this.js.checkNull(this.infoFake.headType),
        //     'invoiceHead': this.js.checkNull(this.infoFake.invoiceHead),
        //     'identiNo': this.js.checkNull(this.infoFake.identiNo),
        //     'contents': this.js.checkNull(this.infoFake.contents),
        //     'amount': this.js.checkNull(this.infoFake.amount),
        //     'userid': this.js.checkNull(this.infoFake.userid),
        //     'email': this.js.checkNull(this.infoFake.email),
        //     'address': this.js.checkNull(this.infoFake.address),
        //     'phone': this.js.checkNull(this.infoFake.phone),
        //     'bank': this.js.checkNull(this.infoFake.bank),
        //     'bankNo': this.js.checkNull(this.infoFake.bankNo),
        //     'mark': this.js.checkNull(this.infoFake.mark),
        //     'fplsh': this.js.checkNull(this.infoFake.fplsh),
        //     'listdetail': JSON.stringify(this.js.checkNull(this.infoFake.listdetail))
        //   }
        // })

        this.$ajax({// 开发票接口有异于其他接口
          method: 'post',
          url: this.gData.api + '/invioceController/insertInvoice',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: {
            'token': this.js.checkNull(this.gData.token),
            'deviceCoding': this.js.checkNull(this.gData.code),
            'invoiceType': this.js.checkNull(this.infoFake.invoiceType),
            'headType': this.js.checkNull(this.infoFake.headType),
            'invoiceHead': this.js.checkNull(this.infoFake.invoiceHead),
            'identiNo': this.js.checkNull(this.infoFake.identiNo),
            'contents': this.js.checkNull(this.infoFake.contents),
            'amount': this.js.checkNull(this.infoFake.amount),
            'userid': this.js.checkNull(this.infoFake.userid),
            'email': this.js.checkNull(this.infoFake.email),
            'address': this.js.checkNull(this.infoFake.address),
            'phone': this.js.checkNull(this.infoFake.phone),
            'bank': this.js.checkNull(this.infoFake.bank),
            'bankNo': this.js.checkNull(this.infoFake.bankNo),
            'mark': this.js.checkNull(this.infoFake.mark),
            'fplsh': this.js.checkNull(this.infoFake.fplsh),
            // 'listdetail': JSON.stringify(this.js.checkNull(this.infoFake.listdetail))
            'listdetail': (this.js.checkNull(this.infoFake.listdetail))
          }
        })
          .then((res) => {
            this.gData.checked30List = []

            this.$indicator.close()
            if (res.data.respcod === '01') { // 请求成功？
              this.$router.replace({path: '/fillPaperCheck', query: {fee: this.infoFake.amount}})
            } else {
              Toast({
                message: res.data.respmsg,
                duration: 500 * 2
              })
            }
          })
          .catch(function (error) {
            this.gData.checked30List = []

            this.$indicator.close()
            console.log(error)
          })
      }
    },
    checkInfo () {
      console.log(this.popupVisible = !this.popupVisible)
    }
  },
  activated () {
    this.infoFake.invoiceType = this.$route.query.type
    this.infoFake.amount = (this.$route.query.fee / 100)

    this.infoFake.listdetail = this.gData.checked30List
  },
  deactivated () {
    // this.gData.checked30List = []
  },

  components: {
    invoiceHeader
  }
}
</script>
