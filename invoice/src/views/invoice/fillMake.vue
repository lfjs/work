<template>
  <div>
    <invoiceHeader v-bind:titleName="$t('main.fillMake')"></invoiceHeader>
    <div class="fillForm">
      <div v-if="gData.debug" style="font-size:16px">{{infoFake}}<br></div>
      <!-- <div v-if="gData.debug" style="font-size:16px">checked30List===={{gData.checked30List}}<br></div> -->
      <!-- <div v-if="gData.debug" style="font-size:16px">listInUrl===={{$route.query.listInUrl}}<br></div> -->
      <div v-if="gData.debug" style="font-size:16px">----getListInVuex: {{$store.getters.getListInVuex}}</div>
      <div v-if="gData.debug" style="font-size:16px">----listdetail: {{infoFake.listdetail}}</div>
      <div v-if="gData.debug" style="font-size:16px">----getMoreInfoVuex: {{$store.getters.getMoreInfoVuex}}</div>
      <div v-if="gData.debug" style="font-size:16px">----autoFillVuex: {{$store.getters.getAutoFillVuex}}</div>

      <div class="formItem">
        <mt-cell title="抬头类型">
          <mt-radio v-model="infoFake.headType" :options="options"></mt-radio>
        </mt-cell>
      </div>
      <div class="formItem">
        <mt-field label="发票抬头" placeholder="填写发票抬头" v-model="infoFake.invoiceHead"></mt-field>
      </div>
      <div class="formItem" v-if="Number(infoFake.headType) === 1">
       <mt-field label="纳税人识别号" placeholder="填写纳税人识别号" v-model="infoFake.identiNo"></mt-field>
      </div>
      <div class="formItem">
       <mt-cell title="发票内容" v-bind:value="infoFake.contents"></mt-cell>
      </div>
      <div class="formItem">
       <mt-cell title="发票金额" v-bind:value="(infoFake.amount)+' 元'"></mt-cell>
      </div>
      <div class="formItem">
        <router-link to="/fillMore">
          <mt-cell title="更多信息" value="填写备注、地址等(非必填)" is-link></mt-cell>
        </router-link>
      </div>
      <!-- <div class="formItem">
       <mt-field label="收件人" placeholder="收件人姓名" v-model="infoFake.userid"></mt-field>
      </div>
      <div class="formItem">
       <mt-field label="电话号码" placeholder="收件人电话" v-model="infoFake.phone"></mt-field>
      </div> -->
      <div class="">
        <mt-field label="电子邮箱" placeholder="用于向您发送电子发票" v-model="infoFake.email"></mt-field>
      </div>

      <!-- <mt-actionsheet :actions="actions" v-model="popupVisible"></mt-actionsheet> -->

      <mt-popup class="checkList startPop" v-model="popupVisible" position="bottom">
        <div>
          <div class="popHead">确认开票信息</div>
          <div class="hr"></div>
          <div class="popCon">
            <div class="popInfo">发票开具成功后不可撤销，请您仔细核对开票信息</div>
            <mt-cell title="发票类型" :value="Number(infoFake.invoiceType)===1?'电子发票':'纸质发票'"></mt-cell>
            <mt-cell title="抬头类型" :value="options[0].value == infoFake.headType?options[0].label:options[1].label"></mt-cell>
            <mt-cell title="发票抬头" :value="infoFake.invoiceHead"></mt-cell>
            <mt-cell title="纳税人识别号" :value="infoFake.identiNo" v-if="Number(infoFake.headType) === 1"></mt-cell>
            <mt-cell title="发票金额" :value="infoFake.amount+' 元'"></mt-cell>
            <mt-cell title="电子邮件" :value="infoFake.email"></mt-cell>
            <div @click="sendInfo">
              <!-- <mt-button :class="sending?'disabled':''" @click="sendInfo" class="mainButton" type="default">确认</mt-button> -->
              <!-- <mt-button @click="sendInfo" class="mainButton" type="default">确认</mt-button> -->
              <mt-button class="mainButton" type="default">确认</mt-button>
            </div>
          </div>
        </div>
      </mt-popup>

      <div>
        <mt-button @click="checkInfo" type="default" class="mainButton">提交</mt-button>
      </div>
      <div class="spaceBottom24"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
input[type="text"]{
  text-align: right;
}
.fillForm{
  padding: 5px 20px;
  .mint-radiolist{
    display: flex;
  }
}
.checkList{
  font-size: 16px;
  border-radius: 16px 16px 0px 0px!important;
  width: 100%;
  .mint-cell{
    min-height: 38px!important;
  }
  &.startPop{
    width: 100%!important;
  }
}
</style>
<script>
import invoiceHeader from '@/components/invoiceHeader'
import { Toast } from 'mint-ui'
// Vue.component(Actionsheet.name, Actionsheet)

export default {
  data () {
    return {
      actions: [
        {
          name: '拍'
          // method: this.getCamera// 调用methods中的函数
        },
        {
          name: '照'
          // method: this.getCamera// 调用methods中的函数
        }
      ],
      sending: false,
      type: this.$route.query.type,
      username: '',
      popupVisible: false,
      options: [{
        label: '企业/单位',
        value: '1'
      },
      {
        label: '个人',
        value: '2'
      }],
      info: {
        type: '1',
        compName: 'company',
        number: '6666',
        tel: '18766666666',
        name: 'user',
        email: 'user@qq.com',
        moreInfo: {
          address: '',
          moreTel: '',
          bank: '',
          bankId: ''
        }
      },

      // {"invoiceType":"1",
      // "headType":"1",
      // "invoiceHead":"发票抬头",
      // "identiNo":"91370202787583552F",
      // "contents":"contents",
      // "amount":"20",
      // "userid":"12345",
      // "email":"majinhu1983@126.com",
      // "address":"address",
      // "phone":"18669880520",
      // "bank":"bank",
      // "bankNo":"bankNo",
      // "mark":"mark",
      // "FPLSH":"KPCS0000201905050020",
      // "listdetail":[{
      // "startstation":"startstation",
      // "endstation":"endstation",
      // "orderDate":"20190429101010",
      // "orderendDate":"20190429102010",
      // "orderAmount":"10",
      // "orderid":"444"
      // },
      // {
      // "startstation":"startstation",
      // "endstation":"endstation",
      // "orderDate":"20190429101010",
      // "orderendDate":"20190429102010",
      // "orderAmount":"10",
      // "orderid":"443"
      // }]}

      infoFake: {
        token: '',
        deviceCoding: '',
        invoiceType: '',
        headType: '1',
        invoiceHead: '',
        identiNo: '', // 91370202787583552F
        contents: '*运输服务*客运服务费',
        amount: '',
        // userid: 'userid',
        email: '',
        address: '',
        phone: '',
        bank: '',
        bankNo: '',
        mark: '',
        // fplsh: 'KPCS0000201905050020',
        listdetail: [
          // {
          //   startstation: 'startstation',
          //   endstation: 'endstation',
          //   orderDate: 20190429101010,
          //   orderendDate: 20190429102010,
          //   orderAmount: 20.3,
          //   orderid: 444
          // }
        ]
      }

    }
  },
  filters: {
    formatMoney: function (value) {
      return '￥' + value.toFixed(2)
    },
    stampToDate: function (value) {
      if (!value) return ''
      var date = new Date(value)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      // let D = date.getDate() + ' '
      value = (Y + M + D)
      return value
    }
  },
  activated: function () {
    this.infoFake.token = this.gData.token
    this.infoFake.deviceCoding = this.gData.code

    this.infoFake.invoiceType = this.$route.query.type
    this.info.moreInfo = this.gData.moreInfo

    // this.infoFake.address = this.gData.moreInfo.address
    // this.infoFake.phone = this.gData.moreInfo.moreTel
    // this.infoFake.bank = this.gData.moreInfo.bank
    // this.infoFake.bankNo = this.gData.moreInfo.bankId

    this.infoFake.address = this.$store.getters.getMoreInfoVuex.address
    this.infoFake.phone = this.$store.getters.getMoreInfoVuex.moreTel
    this.infoFake.bank = this.$store.getters.getMoreInfoVuex.bank
    this.infoFake.bankNo = this.$store.getters.getMoreInfoVuex.bankId

    // this.infoFake.listdetail = this.gData.checked30List
    // this.infoFake.listdetail = JSON.parse(this.$route.query.listInUrl)
    // this.infoFake.listdetail = this.$store.getters.getListInVuex---------

    this.infoFake.amount = (this.$route.query.fee / 100)
    console.log('activated', '')
    this.$forceUpdate()

    // this.$store.dispatch('setAutoFillVuex', (true))// vuex push继续获取历史记录
    if (this.$store.getters.getAutoFillVuex) {
      this.$indicator.open({
        text: '获取预填信息...',
        spinnerType: 'fading-circle'
      })
      this.axios.post(this.gData.api + '/invioceController/getInvoicedRecordByUserid' +
        '?token=' + this.gData.token
        , {
      })
        .then((res) => {
          console.log(res.data)
          Toast({
            message: '已帮您填写上次信息',
            duration: 500 * 2
          })
          this.$indicator.close()
          if (res.data.respcod === '01') { // 请求成功？请求上次填写
            console.log(res.data.data)
            console.log(this.infoFake)
            this.infoFake.invoiceHead = res.data.data.invoiceHead
            this.infoFake.identiNo = res.data.data.identiNo
            this.infoFake.email = res.data.data.email
          } else {
            // Toast({
            //   message: res.data.respmsg,
            //   duration: 500 * 2
            // })
          }
        })
        .catch(function (error) {
          this.$indicator.close()
          console.log(error)
        })
    }
  },
  deactivated () {
    this.popupVisible = false
    this.gData.checked30List = []
  },
  methods: {
    sendInfo () {
      this.popupVisible = !this.popupVisible
      this.$indicator.open({
        text: '开票中...',
        spinnerType: 'fading-circle'
      })
      this.sending = true

      for (let x in this.$store.getters.getListInVuex) { // 转换listdetail所需key
        let tempItem = {}// 临时对象
        for (let y in this.$store.getters.getListInVuex[x]) { // 遍历单票
          if (this.js.transKey(y)) { // 按需换key
            // console.log(this.js.transKey(y), (this.$store.getters.getListInVuex[x])[y])
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
          '&contents=' + ((this.js.checkNull(this.infoFake.contents))) +
          '&amount=' + this.js.checkNull(this.infoFake.amount) +
          '&userid=' + this.js.checkNull(this.infoFake.userid) +
          '&email=' + this.js.checkNull(this.infoFake.email) +
          '&address=' + this.js.checkNull(this.infoFake.address) + this.js.checkNull(this.infoFake.phone) +
          '&phone=' +
          // '&phone=' + this.js.checkNull(this.infoFake.phone) +
          '&bank=' + this.js.checkNull(this.infoFake.bank) + this.js.checkNull(this.infoFake.bankNo) +
          '&bankNo=' +
          '&mark=' + this.js.checkNull(this.infoFake.mark) +
          // '&listdetail=' + ((JSON.stringify(this.js.checkNull(this.infoFake.listdetail))))
          '&listdetail=' + ((JSON.stringify(this.js.checkNull(this.infoFake.listdetail))))
          , {
        })
          .then((res) => {
            this.gData.checked30List = []

            this.$store.dispatch('resetListInVuex')// vuex clear
            this.$store.dispatch('resetMoreInfoVuex')// vuex clear

            this.$indicator.close()
            if (res.data.respcod === '01') { // 请求成功？
              this.$router.push('/makeSuccess')
              this.$store.dispatch('setAutoFillVuex', (true))// vuex push继续获取历史记录
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
            // 'userid': this.js.checkNull(this.infoFake.userid),
            'email': this.js.checkNull(this.infoFake.email),
            'address': this.js.checkNull(this.infoFake.address) + this.js.checkNull(this.infoFake.phone),
            'phone': '',
            'bank': this.js.checkNull(this.infoFake.bank) + this.js.checkNull(this.infoFake.bankNo),
            'bankNo': '',
            'mark': this.js.checkNull(this.infoFake.mark),
            // 'fplsh': this.js.checkNull(this.infoFake.fplsh),
            // 'listdetail': JSON.stringify(this.js.checkNull(this.infoFake.listdetail))
            'listdetail': (this.js.checkNull(this.infoFake.listdetail))
          }
        })
          .then((res) => {
            this.$indicator.close()
            this.sending = false

            if (res.data.respcod === '01') { // 请求成功？
              this.$store.dispatch('resetListInVuex')// vuex clear
              this.$store.dispatch('resetMoreInfoVuex')// vuex clear

              this.$router.replace('/makeSuccess')
              console.log('开票成功返回01', res.data.respmsg)
            } else {
              console.log('不成功!==01', res.data.respmsg)
              Toast({
                message: '开票失败 请返回重试',
                duration: 500 * 4
              })
            }
          })
          .catch(function (error) {
            this.$indicator.close()
            this.sending = false

            console.log(error)
          })
      }
    },
    checkInfo () {
      for (let x in this.infoFake) {
        if (this.infoFake[x]) {
          if (/<|>|"|'|&/g.test(this.infoFake[x])) {
            // console.log('出现尖括号等', /\<|\>|\"|\'|\&/g.test(this.infoFake[x]))

            Toast({
              message: this.js.checkFill(x) + '有误，请确认', // 公共js
              duration: 500 * 2
            })
            return false
          }
          if (x === 'email') {
            // if (!(/^1[34578]\d{9}$/.test(this.infoFake[x]))) {
            if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.infoFake[x]))) {
              Toast({
                message: this.js.checkFill(x) + '有误，请确认', // 公共js
                duration: 500 * 2
              })
              return false
            }
          }
          if (x === 'identiNo') { //
            if (!(/^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g.test(this.infoFake[x]))) {
              Toast({
                message: '请输入正确的18位' + this.js.checkFill(x), // 公共js
                duration: 500 * 2
              })
              return false
            }
          }
        } else if (x === 'address' || x === 'bank' || x === 'bankNo' || x === 'mark' || x === 'phone' || x === 'token' || x === 'deviceCoding') {
        } else {
          if (x === 'identiNo') {
            if (Number(this.infoFake.headType) === 2) continue
          }
          console.log('未填', x)
          Toast({
            message: '请输入：' + this.js.checkFill(x), // 公共js
            duration: 500 * 2
          })
          return
        }
      }
      this.popupVisible = !this.popupVisible
      if (Number(this.infoFake.headType) === 2) this.infoFake.identiNo = ''
    }
  },
  components: {
    invoiceHeader
  }
}
</script>
