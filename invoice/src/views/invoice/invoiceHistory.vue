<template>
  <div>
    <invoiceHeader v-bind:titleName="$t('main.invoiceHistory')"></invoiceHeader>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="infiniteScrollDisabled" infinite-scroll-distance="10" class="historyCon">
    <!-- <div class="historyCon"> -->

      <div v-if="gData.debug" style="font-size:16px">{{pageData}}</div>

      <div v-for="(item,index) in pageData" :key="index" @click="pickHistory(item)" class="historyItem" :style="{backgroundImage:`url(${img})`}">
        <router-link :to="{path: '/'+(item.invoiceType==1?'digitalDetail':'digitalDetail')+'?id='+(item.invoiceNo)}">
          <mt-cell :title="(Number(item.invoiceType)===1?'电子发票 ':'纸质发票 ')+(item.amount)+'.00 元'"
          :label="item.invoiceDate|stampToDate" is-link>
              <span>已开票</span>
          </mt-cell>
        </router-link>
      </div>

      <div v-if="pageData.length===0" class="ticketCon">
        <div class="noMore">暂无开票记录</div>
      </div>
      <!-- digitalDetail -->
      <!-- <div v-for="item in list" class="historyItem" :style="{backgroundImage:`url(${img})`}">
        <router-link to="/paperDetail?id=1acs">
          <mt-cell title="纸质发票！！ 30.00元" label="2018-12-29" is-link>
              <span>已开票</span>
          </mt-cell>
        </router-link>
      </div> -->

      <!-- <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="infiniteScrollDisabled" infinite-scroll-distance="10">
        <li v-for="(item,index) in list" :key="index">{{ item }}</li>
      </ul> -->

    </div>
  </div>
</template>
<style lang="scss" scoped>
.historyCon{

  padding: 20px;
  .historyItem{
    box-shadow: $boxShadow;
    margin-bottom: 16px;
    border-radius: 4px;
    overflow: hidden;

    background-repeat: no-repeat;
    background-size: 4px 14px;
    background-position-y: 15px;
    padding: 0px 16px;
    .mint-cell-value{
      span{
        font-size: 12px;
        color:$priceGray;
      }
    }

    .mint-cell-label{
      color:$priceGray!important;
    }
  }
}

 .ticketCon .noMore {
  font-size: 0.32rem;
  color: #b1b3b1;
  text-align: center;
  margin-bottom: 1.866667rem;
}
</style>

<script>
import invoiceHeader from '@/components/invoiceHeader'
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      img: require('@/assets/img/invoiceHistory.png'),
      popupVisible: false,
      apiData: {
        // api: 'http://192.168.0.164:8073/invioceController/getInvoicedRecordList',
        // token: 'C1535217A77BDF3EDD9DC7D4670F6D1B',
        page: '0',
        size: '10'
      },
      list: [
        {'invoiceType': 1, 'amount': 200},
        {'invoiceType': 2, 'amount': 300},
        {'invoiceType': 1, 'amount': 400}
      ],
      pageData: [],
      infiniteScrollDisabled: !true,
      currentPage: 0
    }
  },
  mounted () {
  },
  deactivated () {
    this.$indicator.close()
    this.pageData = []
    this.apiData.page = 0
    console.log('停止无限加载', this.infiniteScrollDisabled = true)
  },
  activated: function () {
    console.log('activated')
    this.pageData = []
    this.apiData.page = 0
    this.infiniteScrollDisabled = !true
  },
  methods: {
    checkInfo () {
      console.log(this.popupVisible = !this.popupVisible)
    },
    loadHistoryList () {
    },
    loadMore () {
      console.log('loadMore')
      this.infiniteScrollDisabled = true
      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      if (this.gData.fakeData) {
        console.log('fakeDataMode!')
        this.axios.get('/static/fakeInvoiceHistory.json' +
      '?page=' + this.apiData.page
          , {
        })
          .then((res) => {
          // this.list.push.apply(this.list, res.data.data)
            this.pageData.push.apply(this.pageData, res.data.data)
            this.apiData.page = Number(this.apiData.page) + 1
            // this.$indicator.close()
            // this.infiniteScrollDisabled = false
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        this.axios.post(this.gData.api + '/invioceController/getInvoicedRecordList' +
      '?token=' + this.gData.token +
      '&page=' + this.apiData.page +
      '&size=' + this.apiData.size, {
        })
          .then((res) => {
            console.log(res.data)
            this.$indicator.close()
            if (res.data.respcod === '01') { // 请求成功？
              this.pageData.push.apply(this.pageData, res.data.data)// 写入页面
              if ((res.data.data.length ? res.data.data.length : '0') < Number(this.apiData.size)) { // 数据见底？
                Toast({
                  message: '已是最后一页',
                  duration: 500 * 3
                })
                this.infiniteScrollDisabled = true// 无限加载关停
              } else { // 数据没见底
                this.apiData.page = Number(this.apiData.page) + 1// 准备下次页码
                setTimeout(() => { // 延迟防爆
                  if (this.$route.name === 'invoiceHistory') { // 请求中跳出本页防爆
                    this.infiniteScrollDisabled = false// 开启无限加载等待下次请求
                  }
                }, 500 * 1)
              }
            } else {
              Toast({
                message: res.data.respmsg,
                duration: 500 * 2
              })
            }
          })
          .catch((error) => {
            console.log(error)
            this.infiniteScrollDisabled = true
            this.$indicator.close()
            Toast({
              message: error,
              duration: 500 * 3
            })
          })
      }
    },
    pickHistory (index) {
      console.log(index)
      // this.cho = !this.cho
    }
  },

  components: {
    invoiceHeader
  }
}
</script>
