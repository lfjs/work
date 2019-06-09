<template>
  <div>
    <invoiceHeader v-bind:titleName="$t('main.makeInvoice')"></invoiceHeader>
    <div class="pageTopNotice">只能开取近一个月的行程发票</div>
    <div v-if="gData.debug" style="font-size:16px">{{$data}}</div>
    <!-- <div v-if="gData.debug" style="font-size:16px">checked30List===={{gData.checked30List}}</div> -->
    <!-- <div v-if="gData.debug" style="font-size:16px">listInUrl===={{listInUrl}}</div> -->
    <!-- <div v-if="gData.debug" style="font-size:16px">debugDate===={{debugDate}}</div>listInUrl -->
    <div v-if="gData.debug" style="font-size:16px">----getListInVuex: {{$store.getters.getListInVuex}}</div>
    <div v-if="gData.debug" style="font-size:16px">----getMoreInfoVuex: {{$store.getters.getMoreInfoVuex}}</div>

    <div class="ticketCon">

      <div class="ticket" v-for="(item,index) in pageData.orderList" :key="index"
       @click="pickTicket(item,index)">
        <div>
          <div class="time">{{item.entryDate|date}}-{{item.exitDate|dateTimeOnly}}</div>
          <div class="info">
            <img :src="item.checked?choosenImg:unchoosenImg" class="choosen" alt="" />
            <div class="station">
              <div><i class="start"><span></span></i>{{item.entryStationName}}</div>
              <div><i class="end"></i>{{item.exitStationName}}</div>
            </div>
            <div class="price"><span>{{item.payAmount | yuan}}</span> 元</div>
          </div>
        </div>
      </div>
<!--
      <div class="ticket">
        <div>
          <div class="time">2019年4月22日11:30:25</div>
          <div class="info">
            <img src="@/assets/img/ticketChoosen.png" class="choosen" alt="" />
            <div class="station">
              <div><i class="start"><span></span></i>错埠岭</div>
              <div><i class="end"></i>苗岭路</div>
            </div>
            <div class="price"><span>4</span>元</div>
          </div>
        </div>
        <div class="hr"></div>
        <div>
          <div class="time">2019年4月22日11:30:25</div>
          <div class="info">
            <img src="@/assets/img/ticketChoosen.png" class="choosen" alt="" />
            <div class="station">
              <div><i class="start"><span></span></i>错埠岭</div>
              <div><i class="end"></i>苗岭路</div>
            </div>
            <div class="price"><span>4</span>元</div>
          </div>
        </div>
      </div> -->

      <div class="noMore">没有更多数据了</div>
    </div>
    <div class="ticketFooter" v-bind:style="{ 'padding-bottom': gData.bottom?gData.bottom+'px':'' }">
      <div class="info" @click="pickAll">
        <!-- <img :src="item.checked?choosenImg:unchoosenImg" class="choosen" alt="" /> -->

        <img :src="cho?choosenImg:unchoosenImg" alt="">
        <div>
          <div>全选</div>
          <div class="count">
            <span>{{allCount}}</span> 个行程 共<span> {{allPrice|yuan}} </span>元
          </div>
        </div>
      </div>
      <mt-button :class="(allCount === 0||allPrice ===0)?'disabled':''" type="default" @click="stratMake">开具发票</mt-button>
    </div>
    <mt-popup  class="startPop" v-model="popupVisible"  popup-transition="popup-fade">
      <div>
        <div class="popHead">选择开票类型</div>
        <div class="hr"></div>
        <div class="popCon">
          <div class="popInfo">电子发票与纸质发票具有同等的法律效力，均可支持报销</div>
          <mt-button @click="kindOf" id="digital" class="mainButton" type="default">开具电子发票</mt-button>
          <mt-button @click="kindOf" id="paper" class="subButton" type="default">开具纸质发票</mt-button>
          <!-- <router-link to="/fillMake">
            <mt-button class="mainButton" type="default">开具电子发票</mt-button>
          </router-link>
          <router-link to="/fillPaperMake">
            <mt-button class="subButton" type="default">开具纸质发票</mt-button>
          </router-link> -->
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<style scoped lang="scss">
html{
  background-color: yellow
}
.mint-popup.startPop{
  border-radius: 8px;
  width: 280px;
  font-size: 16px;
  .popHead{
    text-align: center;
    font-size: 14px;
    padding: 16px 0;
  }
  .hr{
    border-bottom: 1px solid;
    border-color: rgba(227, 230, 228, 1);
  }
  .popCon{
    padding: 12px 18px;
    .popInfo{
      margin-bottom: 24px;
    }
    button{
      width: 100%;
      &.popBtnE{
        margin-bottom: 12px;
      }
    }
  }
}
.ticketFooter{
  display: flex;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 14px 20px;
  box-shadow: 0 -2px 7px rgba(18, 18, 18, 0.07);
  color:$globalStationColor;
  button{
    background-color: rgb(115, 222, 133);
    border-radius: 5000px;
    color: white;
    font-size: 16px;
    padding: 11px 18px;
    height: auto;
    &.disabled{
      background-color: #ccc!important;
    }
  }
  .info{
    display: flex;
    align-items: center;
    img{
      width: 24px;
      height: 24px;
      padding-right: 8px;
    }
    .count{
      font-size: 12px;
      span{
        color: rgb(105, 201, 121);
      }
    }
  }
}
.ticketCon{
  padding: 20px;
  .noMore{
    font-size: 12px;
    // color: rgb(177, 179, 177);
    color: $noMoreColor;
    text-align: center;
    margin-bottom: 70px
  }
}
.ticket{
    background-color: white;
    border-radius: 10px;
    padding: 12px 16px;
    // box-shadow: 0 0 9px rgba( 18,18,18,0.05);
    box-shadow: $boxShadow;
    font-size: 14px;
    margin-bottom: 20px;
    .hr{
      border-bottom: 1px solid;
      border-color: rgb(237, 240, 238);
      margin: 12px 0 12px 68px;
    }
    .time{
      padding-left: 40px;
      color: rgb(151, 153, 152);
      font-size: 12px
    }
    .info{
      display: flex;
      justify-content: space-between;
      img.choosen{
        width: 24px;
        height: 24px;
        align-self: center;
        padding: 16px;
        padding-left:0;
      }
      .station{
        align-self: stretch;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color:$globalStationColor;
        div{
          i{
            width: 7px;
            height: 7px;
            display: inline-block;
            border-radius: 5000px;
            margin-right: 8px;
            vertical-align: middle;
            &.start{
              background-color: rgb(82, 204, 106);
              span{
                display: inline-block;
                position: relative;
                border-left: 1px dashed;
                left: 3.4px;
                top: 9px;
                border-color: rgb(227, 230, 228);
                height: 13px;
              }
            }
            &.end{
              background-color: rgb(250, 80, 81);
            }
          }
        }
      }
      .price{
        align-self: center;
        span{
          font-size: 32px;
        }
      }
    }
}
</style>
<script>
import invoiceHeader from '@/components/invoiceHeader'
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      id: this.$route.query.id,
      popupVisible: false,
      cho: false,
      allPrice: 0,
      allCount: 0,
      tickets: [1, 2],
      choosenImg: require('@/assets/img/ticketChoosen.png'),
      unchoosenImg: require('@/assets/img/unchoosen.png'),
      apiData: {
        // api: '/invioceController/getUnInvoiceRecordList',
        // token: 'C1535217A77BDF3EDD9DC7D4670F6D1B',
        // cardType: '02',
        // deviceCoding: '1'
      },
      pageData: {},
      debugInfo: {},
      debugDate: '',
      listInUrl: []
    }
  },
  mounted () {
    // console.log('mounted')
  },
  activated: function () {
    this.id = this.$route.query.nfc
    this.$indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    this.pageData = []
    this.listInUrl = []

    if (this.gData.fakeData) { // 假数据模式
      console.log('fakeDataMode!')
      this.axios.get('/static/fakeInvoice30List.json' +
      '?page=' + this.apiData.page
        , {
      })
        .then((res) => {
          this.$indicator.close()
          this.pageData = res.data.data
          this.debugInfo = res.data

          // 暂无可开票行程
          console.log(res.data.data.orderList, res.data.data.orderList.length === 0)

          if (res.data.data.orderList.length === 0) {
            Toast({
              message: '暂无可开票行程',
              duration: 500 * 4
            })
          }
        })
        .catch((error) => {
          this.$indicator.close()
          console.log(error)
          this.debugInfo = error
        })
    } else {
      // this.axios.post(this.gData.api + '/posts?v=2555').then(res => {
      //   console.log(res.data)
      // })
      this.axios.post(this.gData.api + '/invioceController/getUnInvoiceRecordList' +
        '?token=' + this.gData.token +
        '&cardType=' + this.id +
        '&deviceCoding=' + this.gData.code
        , {
      })
        .then((res) => {
          console.log(res.data)

          this.debugInfo = res.data
          if (res.data.respcod === '01') {
            this.$indicator.close()
            this.pageData = res.data.data

            // 暂无可开票行程
            console.log(res.data.data.orderList, res.data.data.orderList.length === 0)

            if (res.data.data.orderList.length === 0) {
              Toast({
                message: '暂无可开票行程',
                duration: 500 * 4
              })
            }
          } else {
            this.$indicator.close()
            Toast({
              message: res.data.respmsg,
              duration: 500 * 4
            })
          }
        })
        .catch((error) => {
          this.$indicator.close()
          console.log(error)
          this.debugInfo = error
          Toast({
            message: error,
            duration: 500 * 3
          })
        })
    }
  },
  deactivated: function () {
    this.$indicator.close()
    this.allPrice = 0
    this.allCount = 0
    this.cho = false
    console.log('deactivated')
  },
  methods: {
    checkAll () {
      // alert(' checkAll' + (this.pageData.orderList.length - 1))//ios9有坑，测试for执行两次的bug
      this.allPrice = 0
      this.allCount = 0
      for (let x in this.pageData.orderList) {
        // alert(x + ' for')
        if (this.pageData.orderList[x].checked) {
          // alert(x + ' if')
          this.allPrice += parseInt(this.pageData.orderList[x].payAmount)
          this.allCount += 1
        }
        if (Number(x) === Number(this.pageData.orderList.length - 1)) {
          // alert(' forExit')//ios9神一般执行两次for循环，到这里主动干掉第二次
          break
        }
      }
      // alert(' checkAllOut')
      this.$forceUpdate()
    },
    pickTicket (item, index) {
      item.checked ? item.checked = !item.checked : item.checked = true
      for (let x in this.pageData.orderList) { // 遍历确定全选状态
        if (!this.pageData.orderList[x].checked) {
          this.cho = false
          break
        }
        this.cho = true
      }
      this.checkAll()
    },
    pickAll () {
      this.checkAll()
      if (this.cho) {
        for (let x in this.pageData.orderList) {
          (this.pageData.orderList[x].checked = false)
        }
        this.cho = false
      } else {
        for (let x in this.pageData.orderList) {
          (this.pageData.orderList[x].checked = true)
        }
        this.cho = true
      }
      this.checkAll()
    },
    stratMake () {
      if (this.allCount === 0) { return }
      if (this.allPrice === 0) { return }// 新增 拦截0元行程
      this.gData.checked30List = []
      this.listInUrl = []
      this.$store.dispatch('resetListInVuex')// vuex clear

      for (let x in this.pageData.orderList) {
        if (this.pageData.orderList[x].checked) {
          this.gData.checked30List.push(this.pageData.orderList[x])
          this.listInUrl.push(this.pageData.orderList[x])

          this.$store.dispatch('setListInVuex', (this.pageData.orderList[x]))// vuex push

          // this.allPrice += parseInt(this.pageData.orderList[x].payAmount)
        }
        if (Number(x) === Number(this.pageData.orderList.length - 1)) break // ios9执行两次for循环，到这里主动干掉第二次
      }
      var obj = JSON.stringify(this.listInUrl)
      this.listInUrl = obj

      this.popupVisible = !this.popupVisible

      console.log('checked', this.gData.checked30List)
    },
    kindOf (evt) {
      console.log(evt.target.id)
      this.popupVisible = false
      switch (evt.target.id) {
        case 'digital':
          this.$router.push({path: '/fillMake', query: {type: '1', fee: this.allPrice}})
          this.$store.dispatch('setAutoFillVuex', (true))// vuex push重新判定请求回填信息
          break
        case 'paper':
          this.$router.push({path: '/fillPaperMake', query: {type: '2', fee: this.allPrice}})
          break
      }
      // this.$router.push('/invoice')
    }
  },
  components: {
    invoiceHeader
  }
}
</script>
