// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import js from './assets/js/common'
import VueI18n from 'vue-i18n'

import store from './store'// 引入store

import Mock from './mock'

Vue.use(VueI18n)

Vue.use(VueAxios, axios)
Vue.use(MintUI)
Vue.use(VueRouter)

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.prototype.mock = Mock
Vue.prototype.$ajax = axios
Vue.prototype.js = js

// http://192.168.8.119:8073/index.html?token=33A7E94C7EECD4E5492D19D405E5BFD5&bottom=24.5&code=4E205A08-C31B-43CA-B2F4-3599A684DCE0&lang=cn&debug=1&h=0#/invoice

// token &bottom &code &lang &fake &debug
Vue.prototype.gData = {// 全局变量
  token: '',
  // api: 'http://192.168.0.118:8073', // 本地
  // api: 'http://192.168.8.114:8073', // 本地
  // api: 'http://192.168.182.78:8073', // 测试环境vpn
  // api: 'http://dtcustomer.bestonepay.com/ngcustomer', // 测试环境vpn
  api: 'https://api.qd-metro.com/testngcustomer', // 预生产，生产还要去掉test
  // api: 'https://api.qd-metro.com/ngcustomer', // 正式生产，
  debug: true,
  moreInfo: {},
  testA: 1,
  matchInfo: {},
  checked30List: []
}
Vue.config.productionTip = false
// 路由导航守卫
router.beforeEach((to, from, next) => {
  // console.log('其实导航守卫可以做更多的事情，比如判断登录状态或权限进行拦截页面等。')
  // console.log('to.name:', to.name)
  // console.log('from:', from)
  Vue.prototype.js.callhandler(to.name)// 回传页面标题

  // 阻止双击放大
  var lastTouchEnd = 0
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  document.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime()
    if (now - lastTouchEnd <= 300) {
      event.preventDefault()
    }
    lastTouchEnd = now
  }, false)

  // 阻止双指放大
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault()
  })
  window.scrollTo(0, 0)// 跳转时滚到顶端

  // 不同页面html背景色
  if (to.name === 'makeInvoice') {
    document.querySelector('body').setAttribute('style', 'background-color:rgb(250,252,250)')
  } else if (to.name === 'fillPaperMake' || to.name === 'invoiceHelp' || to.name === 'digitalMail' || to.name === 'invoiceRule') {
    document.querySelector('body').setAttribute('style', 'background-color:rgb(247,247,247)')
  } else {
    document.querySelector('body').removeAttribute('style')
  }
  // 更改页面 title
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '标题'
  }
  next()
})

// 多语言实例
const i18n = new VueI18n({
  locale: (function () {
    if (localStorage.getItem('lang')) {
      return localStorage.getItem('lang')
    }
    return 'zh'
  }()),
  messages: {
    'zh': require('./assets/language/zh'), // 中文语言包
    'en': require('./assets/language/en') // 英文语言包
  }
})

window.onresize = setHtmlFontSize
function setHtmlFontSize () {
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  const htmlDom = document.getElementsByTagName('html')[0]
  htmlDom.style.fontSize = htmlWidth / 10 + 'px'
};
setHtmlFontSize()

Vue.filter('yuan', function (value) {
  if (!value) return 0
  value = Number(value / 100).toFixed(2)
  return value
})
Vue.filter('yuanNoPoint', function (value) {
  if (!value) return 0
  value = Number(value / 100).toFixed(0)
  return value
})
Vue.filter('yuanTwoZero', function (value) {
  if (!value) return 0
  value = Number(value / 100).toFixed(2)
  return value
})
Vue.filter('date', function (value) {
  if (!value) return ''
  // timestamp2 = new Date('2009/04/21 18:01:22').getTime()
  value = value.split('')

  value.splice(12, 0, ':')
  value.splice(10, 0, ':')
  value.splice(8, 0, ' ')
  value.splice(6, 0, '/')
  value.splice(4, 0, '/')
  value = new Date(value.join('')).getTime()

  var date = new Date(value)
  let Y = date.getFullYear() + '年'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
  let D = date.getDate() + '日 '
  let h = date.getHours() + ':'
  // let m = date.getMinutes() + ':'
  // let s = date.getSeconds()
  let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
  // let s = (date.getSeconds() + 1 < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
  value = (Y + M + D + h + m)
  return value
  // return value
})
Vue.filter('dateTimeOnly', function (value) {
  if (!value) return ''
  // timestamp2 = new Date('2009/04/21 18:01:22').getTime()
  value = value.split('')

  value.splice(12, 0, ':')
  value.splice(10, 0, ':')
  value.splice(8, 0, ' ')
  value.splice(6, 0, '/')
  value.splice(4, 0, '/')
  value = new Date(value.join('')).getTime()

  var date = new Date(value)
  let h = date.getHours() + ':'
  // let m = date.getMinutes() + ':'
  // let s = date.getSeconds()
  let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
  // let s = (date.getSeconds() + 1 < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
  value = (h + m)
  return value
  // return value
})
Vue.filter('stampToDate', function (value) {
  if (!value) return ''
  var date = new Date(Number(value))
  let Y = date.getFullYear() + '年'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
  let D = date.getDate() + '日 '
  let h = date.getHours() + ':'
  // let m = date.getMinutes() + ':'
  // let s = date.getSeconds()
  let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':'
  let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
  value = (Y + M + D + h + m + s)
  return value
  // return value
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
