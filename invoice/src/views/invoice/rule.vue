<template>
  <div>
    <invoiceHeader v-bind:titleName="$t('main.invoiceRule')"></invoiceHeader>
    <!-- <div class="pageTopNotice">APP不支持因信息填写错误已开取发票核销冲红重开，若有需求请联系xxx。</div> -->
    <div class="mainPadding ruleCon">
      <div>
        <div class="ruleTitle"><i :style="{backgroundImage:`url(${img})`}"></i>
          一、乘车码电子发票领取规则
        </div>
        <div>1．电子发票与纸质发票具有同等的法律效益。</div>
        <div>2．用户可在青岛地铁APP中查询30个自然日内（含当天）二维码乘车业务，并开具电子发票。</div>
        <div>3．电子发票为用户开具的发票金额为用户实际消费金额。</div>
        <div>4．根据相关政策规定，发票内容仅支持开具“*运输服务*客运服务费”。</div>
        <div>5．行程以任意方式开具发票后，不可重复开票。</div>
      </div>
    </div>
    <div class="mainPadding ruleCon">
      <div>
        <div class="ruleTitle"><i :style="{backgroundImage:`url(${img})`}"></i>
          二、定额纸质发票领取规则
        </div>
        <div>1.用户可在青岛地铁APP中查询30个自然日内（含当天）二维码乘车业务，并操作领取定额纸质发票。</div>
        <div>2.乘车码在地铁线网过闸产生的消费，请在地铁线网的任意出站车站的客服中心处领取定额纸质发票。</div>
        <div>3.青岛地铁APP中的行程开具纸质定额发票金额，均为您的实际消费金额。金额零头如遇不足1元的情况，按照1元提供定额纸质发票。</div>
        <div>4．行程以任意方式开具发票后，不可重复开票。</div>
      </div>
    </div>
    <div class="helpTel mainPadding">
      青岛地铁客服电话：55770000
    </div>

  </div>
</template>
<style lang="scss" scoped>
.helpTel{
  font-size: 16px;
  color: $priceGray;
}
.ruleCon{
  background-color: white;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 8px;
  div{
    div{
    margin: 4px 0;
    }
  }
  .ruleTitle{
    font-weight: bold;
    margin-bottom: 12px;
    i{
      display: block;
      width: 100px;
      height: 100px;
      background-repeat: no-repeat;
      background-size: 4px 16px;
      position: absolute;
      left: 0;
      margin-top: 4px;
    }
  }
  .ruleHelp{
    vertical-align: top;
    color: rgb(255, 157, 0);
  }
  table{
    margin-bottom: 32px;
    &:last-child{
      margin-bottom: 0;
    }
  }
}
</style>

<script>
import invoiceHeader from '@/components/invoiceHeader'

export default {
  data () {
    return {
      img: require('@/assets/img/invoiceHistory.png'),
      value: '',
      username: '',
      popupVisible: false

    }
  },
  methods: {
    checkInfo () {
      console.log(this.popupVisible = !this.popupVisible)
    }
  },

  components: {
    invoiceHeader
  }
}
</script>
