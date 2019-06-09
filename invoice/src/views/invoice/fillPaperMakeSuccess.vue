<template>
  <div>
    <invoiceHeader v-bind:titleName="$t('main.fillPaperMakeSuccess')"></invoiceHeader>
    <div class="infoCon">
      <div class="progress">
        <div class="cell">
          <div class="num active"><i></i>1</div>
          <div class="text">阅读须知</div>
        </div>
        <div class="cell">
          <div class="num active"><i></i>2</div>
          <div class="text">金额确认</div>
        </div>
        <div class="cell">
          <div class="num on">3</div>
          <div class="text">领取成功</div>
        </div>
      </div>
      <div class="info">
        <div>向工作人员出示此页面，领取发票</div>
        <div class="text" style="margin-top:5px">不可使用页面截图领取发票</div>

        <img style="width:50px;height:50px;margin-top:40px" src="@/assets/img/ticketChoosen.png" alt="">
        <div>领取成功</div>

        <div class="text">开票金额 (元)</div>
        <div class="price">{{amount*100|yuan}}</div>
      </div>
    </div>
    <div class="mainPadding">
      <router-link to="/invoice">
        <mt-button class="mainButton" type="default">确定</mt-button>
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

export default {
  data () {
    return {
      value: '',
      username: '',
      popupVisible: false,
      amount: ''

    }
  },
  methods: {
    checkInfo () {
      console.log(this.popupVisible = !this.popupVisible)
    }
  },
  activated () {
    this.amount = (this.$route.query.fee / 1)
  },

  components: {
    invoiceHeader
  }
}
</script>
