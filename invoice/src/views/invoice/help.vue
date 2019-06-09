<template>
  <div>
    <invoiceHeader v-bind:titleName="$t('main.invoiceHelp')"></invoiceHeader>
    <div class="pageTopNotice">APP不支持因信息填写错误已开取发票核销冲红重开，若有需求请联系55770000。</div>
    <div class="mainPadding helpCon">
      <div>
        <table>
          <tr>
            <td class="titleHelp">问:</td>
            <td>已正确填写电子邮箱，为何无法获取电子发票？</td>
          </tr>
          <tr>
            <td class="titleHelp">答:</td>
            <td>数据传输可能出现短暂延迟，请稍后再尝试查询，如仍无法获取，请在“开票记录-电子发票详情”中操作重发。</td>
          </tr>
        </table>
        <table>
          <tr>
            <td class="titleHelp">问:</td>
            <td>收到的发票为何无法在税务局查到？</td>
          </tr>
          <tr>
            <td class="titleHelp">答:</td>
            <td>发票数据从企业上传到税局端可能出现短暂的延迟，请稍后再尝试查询。</td>
          </tr>
        </table>
        <table>
          <tr>
            <td class="titleHelp">问:</td>
            <td>发票抬头等信息填写错误，能否修改？</td>
          </tr>
          <tr>
            <td class="titleHelp">答:</td>
            <td>请您及时拨打青岛地铁客服电话，我们将为您采取补救措施。</td>
          </tr>
        </table>
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
.helpCon{
  background-color: white;
  font-size: 16px;
  line-height: 1.5;
  .titleHelp{
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
