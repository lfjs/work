<template>
  <div>
    <invoiceHeader v-bind:titleName="$t('main.digitalInvoice')"></invoiceHeader>
    <div v-if="gData.debug" style="font-size:16px">{{$data}}</div>
    <div v-if="gData.debug" style="font-size:16px">{{gData}}</div>
    <div v-if="gData.debug" style="font-size:16px">----fullUrl：{{fullUrl}}</div>
    <div v-if="gData.debug" style="font-size:16px">----pdfUrl：{{pdfUrl}}</div>
    <div v-if="gData.debug" style="font-size:16px">----testUrl：{{testUrl}}</div>
    <div v-if="gData.debug" style="font-size:16px">----baiduUrl：{{baiduUrl}}</div>

    <!-- <img v-if="gData.isAndroid&&!gData.isiOS" style="width:100%" :src="fullUrl" class="digital" alt="" /> -->
    <img v-if="gData.isAndroid&&!gData.isiOS" style="width:100%" :src="testUrl" class="digital" alt="" />
    <!-- <img v-if="gData.isAndroid&&!gData.isiOS" style="width:100%" :src="baiduUrl" class="digital" alt="" /> -->

    <iframe v-if="!gData.isAndroid&&gData.isiOS" :src="pdfUrl" frameborder="0" scrolling="no" style="background-color:transparent; position: absolute; z-index: -1; width: 100%; height: 100%; top: 0;left:0;"></iframe>
    <div class="mainPadding">
      <!-- <mt-button @click="download" class="mainButton" type="primary">保存到手机</mt-button> -->
    </div>

  </div>
</template>

<script>
import invoiceHeader from '@/components/invoiceHeader'
// import showPdf from '/static/PDF/web/viewer.html'
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      // showPdf: require('@/assets/show_pdf.html'),no_img
      noImg: require('../../../static/no_img.png'),
      // showPdf: '<span>Hello World</span>',
      id: this.$route.query.id,
      value: '',
      username: '',
      popupVisible: false,
      pageData: '',
      fullUrl: '',
      baiduLogo: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1',

      pdfUrl: ''
    }
  },
  computed: {//
    // fullUrl: function () {
    //   // http://192.168.182.78     /static/img/pdfToPng/png/19051510204886889b1d0b29ef3c429/19051510204886889b1d0b29ef3c429_1.png
    //   // http://192.168.182.78     /static/img/pdfToPng/pdf/19051510204886889b1d0b29ef3c429.pdf
    //   // http://192.168.182.78:8073/static/img/pdfToPng/png/19051510204886889b1d0b29ef3c429
    //   // http://192.168.182.78:8073
    //   // https://api.qd-metro.com/testngcustomer
    //   // http://appcdn.qd-metro.com/testngcustomer/file/201905/dist/static/img/pdfToPng/pdf/190517201445013bdbe0fff2a2fa900.pdf
    //   // http://appcdn.qd-metro.com/file/201905

    //   // http://appcdn.qd-metro.com/file/201905/static/img/pdfToPng/png/190517220840261a040008e0c3c5bed

    //   // var apiNoPort = this.gData.api.replace(/(:|\/)\w+$/i, '')// 去除api字段中端口号
    //   // var patt1 = new RegExp(/\w*$/)// 定义png名匹配规则
    //   // var pngName = patt1.exec(this.pageData)// 获取png名
    //   // return apiNoPort + this.pageData + '/' + pngName + '_000.jpg'
    //   return this.pageData + '.jpg'
    // }
    // ,
    // pdfUrl: function () {
    //   // var apiNoPort = this.gData.api.replace(/(:|\/)\w+$/i, '')// 去除api字段中端口号
    //   var pngToPdf = this.pageData.replace(/\/png\//g, '/pdf/')
    //   return pngToPdf + '.pdf'
    // }
    // ,
    testUrl: function () {
      // var tempImg = this.pageData ? this.pageData + '.jpg' : this.noImg
      var tempImg = this.pageData + '.jpg'
      return tempImg
    },
    baiduUrl: function () { // http://appcdn.qd-metro.com/file/201905/static/img/pdfToPng/png/190520094409775b199cdf1f5d4cff4.jpg
      var tempImg = this.pageData ? this.baiduLogo + '.png' : this.noImg
      return tempImg
    }
  },
  methods: {
    getImgUrl (row) {
      return row
    },
    checkInfo () {
      console.log(this.popupVisible = !this.popupVisible)
    },
    download () {
      console.log()
      let fileName = this.pageData // 文件地址
      let downName = (new Date()).getTime() + '.txt' // 文件下载名称
      const blob = new Blob([fileName])
      if (window.navigator.msSaveOrOpenBlob) {
        // 兼容IE10
        navigator.msSaveBlob(blob, downName)
      } else {
        //  chrome/firefox
        let aTag = document.createElement('a')
        aTag.download = downName
        aTag.href = URL.createObjectURL(blob)
        aTag.click()
        URL.revokeObjectURL(aTag.href)
      }
      Toast({
        message: '操作成功',
        // iconClass: 'icon icon-success',
        duration: 500 * 2
      })
    }
  },

  mounted () {
  },
  deactivated () {
    this.$indicator.close()
    this.pageData = ''
    // this.fullUrl = ''
    // this.pdfUrl = ''
  },
  activated: function () {
    this.id = this.$route.query.id
    this.$indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    console.log('开始请求', performance.now())
    var delayTime = performance.now()

    this.axios.post(this.gData.api + '/invioceController/downLoadInvoice' +//
    // '?invoiceNo=' + this.id, {
    '?fplsh=' + this.id, {
    // '?fplsh=' + 'KPCS0000201905050012', {
    })
      .then((res) => {
        console.log(res.data, performance.now() - delayTime)

        // Thread.sleep(5000)
        setTimeout(() => { // 延迟等待后台转换，否则图会裂
          this.$indicator.close()

          if (res.data.respcod !== '01') {
            Toast({
              message: res.data.respmsg + '，请重试',
              duration: 500 * 3
            })
            // this.$router.back(-1)
            return
          }
          this.pageData = res.data.data
          console.log(res.data.data + '.jpg')

          this.fullUrl = this.pageData + '.jpg'

          var pngToPdf = this.pageData.replace(/\/png\//g, '/pdf/')

          this.pdfUrl = pngToPdf + '.pdf'

          this.$forceUpdate()
        }, 1000 * 0)// 延迟等待后台转换，否则图会裂
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  components: {
    invoiceHeader
  }
}
</script>
