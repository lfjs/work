import Vue from 'vue'
Vue.filter('aa', function (v) {
  return (v + '-->')
})

export default{
  a: function () {
    console.log('commonJS')
  },
  b: function () {
    console.log(this)
  }
}
