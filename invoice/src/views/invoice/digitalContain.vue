<template>
  <div>
    <invoiceHeader v-bind:titleName="$t('main.digitalContain')"></invoiceHeader>
    <div>
      <div class="ticketCon">
        <div v-if="gData.debug" style="font-size:16px">{{$data}}</div>

        <div v-for="(item,index) in pageData" :key="index" class="ticket">
          <div>
            <div class="time">{{item.orderendDate|stampToDate}}</div>
            <div class="info">
              <!-- <img src="@/assets/img/ticketChoosen.png" class="choosen" alt="" /> -->
              <div class="station">
                <div><i class="start"><span></span></i>{{item.startstation}}</div>
                <div><i class="end"></i>{{item.endstation}}</div>
              </div>
              <div class="price"><span>{{item.orderAmount|yuan}}</span> 元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

.ticketCon{
  padding: 20px;
  .noMore{
    font-size: 12px;
    color: rgba(177, 179, 177, 1);
    text-align: center;
    margin-bottom: 70px
  }
}
.ticket{
    background-color: white;
    border-radius: 10px;
    padding: 12px 16px;
    box-shadow: 0 0 9px rgba( 18,18,18,0.1);
    font-size: 14px;
    margin-bottom: 20px;
    .hr{
      border-bottom: 1px solid;
      border-color: rgb(237, 240, 238);
      margin: 12px 0 12px 68px;
    }
    .time{
      color: rgb(151, 153, 152);
      font-size: 12px
    }
    .info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      img.choosen{
        width: 24px;
        height: 24px;
        align-self: center;
        padding: 16px;
      }
      .station{
        align-self: stretch;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 56px;
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

export default {

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected: '精选',
      id: this.$route.query.id,
      apiData: {
        // api: 'http://192.168.0.164:8073/invioceController/getInvoiceOrderlist',
        // invoiceNo: '111',
        page: '0',
        size: '10'
      },
      pageData: {
      },
      debugInfo: {}
    }
  },
  activated: function () {
    this.id = this.$route.query.id
    console.log('activated')
    this.$indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    this.axios.post(this.gData.api + '/invioceController/getInvoiceOrderlist' +
    '?invoiceNo=' + this.id +
    '&page=' + this.apiData.page +
    '&size=' + this.apiData.size, {
    })
      .then((res) => {
        this.$indicator.close()

        this.pageData = res.data.data
        this.debugInfo = res.data
        console.log(this.pageData)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  mounted () {
  },
  components: {
    invoiceHeader
  }
}
</script>
