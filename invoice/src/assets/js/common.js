// import vue from 'vue'
// import VueI18n from 'vue-i18n'
function setupWebViewJavascriptBridge (callback) {
  // if (window.WebViewJavascriptBridge) {
  //   return callback(window.WebViewJavascriptBridge)
  // }
  // if (window.WVJBCallbacks) {
  //   return window.WVJBCallbacks.push(callback)
  // }
  if (callback === 'invoice' || callback === 'makeSuccess') callback = ''
  window.WVJBCallbacks = [callback]
  let WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'qdtitle://' + callback
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe)
    // alert(WVJBIframe.src)
    // console.log(WVJBIframe.src)
  }, 0)
}
export default{

  transKey: function (val) { // 转译开发票接口需要的字段名，不需要的字段返回false
    switch (val) {
      case 'entryStationName':
        return 'startstation'
      case 'exitStationName':
        return 'endstation'
      case 'entryDate':
        return 'orderDate'
      case 'exitDate':
        return 'orderendDate'
      case 'payAmount':
        return 'orderAmount'
      case 'tradeOrderNo':
        return 'orderid'
      default:return false
    }
  },

  checkNull: function (data) { // 防止接口提交undefined
    if (data === undefined) return ''
    return data
  },
  getUrlParam: function (name) { // 获取rul中的参数，基本由app指派
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg) // 匹配目标参数
    if (r != null) return unescape(r[2]); return null // 返回参数值
  },
  checkFill: function (val) { // 翻译展示给用户的信息，开发票填表验证表单时使用
    // toast字段名转汉字
    switch (val) {
      case 'headType':
        return '抬头类型'
      case 'invoiceHead':
        return '发票抬头'
      case 'identiNo':
        return '纳税人识别号'
      case 'userid':
        return '收件人'
      case 'phone':
        return '电话号码'
      case 'email':
        return '电子邮箱'
      default:return '输入信息'
    }
  },
  callhandler (name, data, callback) { // 弃用，先前的与app交互方案
    setupWebViewJavascriptBridge(name, function (bridge) {
      // bridge.callHandler(name, data, callback)
    })
  },
  registerhandler (name, callback) { // 弃用，先前的与app交互方案
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.registerHandler(name, function (data, responseCallback) {
        callback(data, responseCallback)
      })
    })
  },
  a: function () {
    console.log('commonJS.a()')
  },
  b: function () {
    console.log(this)
  }
}
