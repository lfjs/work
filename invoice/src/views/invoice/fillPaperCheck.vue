<template>
  <div>
    <invoiceHeader v-bind:titleName="$t('main.fillPaperCheck')"></invoiceHeader>
    <div class="infoCon">
      <div class="progress">
        <div class="cell">
          <div class="num active"><i></i>1</div>
          <div class="text">阅读须知</div>
        </div>
        <div class="cell">
          <div class="num on"><i></i>2</div>
          <div class="text">金额确认</div>
        </div>
        <div class="cell">
          <div class="num">3</div>
          <div class="text">领取成功</div>
        </div>
      </div>
      <div v-if="gData.debug" style="font-size:16px">{{$data}}<br></div>
      <div v-if="gData.debug" style="font-size:16px">getListInVuex: {{$store.getters.getListInVuex}}</div>
      <div v-if="gData.debug" style="font-size:16px">listdetail: {{infoFake.listdetail}}</div>

      <div class="info">
        <div>确定领取发票</div>
        <div class="text" style="margin-top:5px">确定领取后不可重开</div>
        <div class="text">开票金额 (元)</div>
        <div class="price">{{infoFake.amount*100|yuan}}</div>
      </div>

    </div>
    <div class="fixSet">
      <div class="highlightNotice fontSize14" style="text-align:center">需工作人员确认开票金额，才可领取开票</div>
      <!-- <router-link :to="{path: '/fillPaperMakeSuccess?fee='+infoFake.amount}"> -->
        <!-- <mt-button class="mainButton fontSize16" type="default">确认领取</mt-button> -->
        <mt-button @click="sendInfo" class="mainButton fontSize16" type="default">确认领取</mt-button>
      <!-- </router-link> -->
    </div>

  </div>
</template>

<style lang="scss" scoped>
.fixSet{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24px 20px;
}
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
    }
}
.info{
    font-size: 18px;
    text-align: center;
    padding-bottom: 38px;
    .text{
      font-size: 12px;
      margin-top: 24px;
      color: $priceGray
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
  activated () {
    this.infoFake.amount = (this.$route.query.fee / 1)
    this.infoFake.invoiceType = 2

    // this.infoFake.listdetail = this.gData.checked30List

    // this.infoFake.listdetail = this.$store.getters.getListInVuex
    // this.$store.dispatch('resetListInVuex')// vuex clear
  },
  methods: {
    checkInfo () {
      console.log(this.popupVisible = !this.popupVisible)
    },

    sendInfo () {
      this.$indicator.open({
        text: '开票中...',
        spinnerType: 'fading-circle'
      })
      for (let x in this.$store.getters.getListInVuex) { // 转换listdetail所需key
        let tempItem = {}// 临时对象
        for (let y in this.$store.getters.getListInVuex[x]) { // 遍历单票
          // console.log(this.transKey(y), (this.$store.getters.getListInVuex[x])[y])
          if (this.js.transKey(y)) { // 按需换key
            tempItem[this.js.transKey(y)] = (this.$store.getters.getListInVuex[x])[y]// 受体赋值
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
              this.$router.replace({path: '/fillPaperMakeSuccess', query: {fee: this.infoFake.amount}})
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
    }
  },

  components: {
    invoiceHeader
  }
}
</script>
