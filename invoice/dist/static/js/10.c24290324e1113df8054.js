webpackJsonp([10],{j6m4:function(t,a){},ogcz:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={data:function(){return{msg:"Welcome to Your Vue.js App",selected:"精选",id:this.$route.query.id,apiData:{page:"0",size:"10"},pageData:{},debugInfo:{}}},activated:function(){var t=this;this.id=this.$route.query.id,console.log("activated"),this.$indicator.open({text:"加载中...",spinnerType:"fading-circle"}),this.axios.post(this.gData.api+"/invioceController/getInvoiceOrderlist?invoiceNo="+this.id+"&page="+this.apiData.page+"&size="+this.apiData.size,{}).then(function(a){t.$indicator.close(),t.pageData=a.data.data,t.debugInfo=a.data,console.log(t.pageData)}).catch(function(t){console.log(t)})},mounted:function(){},components:{invoiceHeader:e("aMQM").a}},s={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("invoiceHeader",{attrs:{titleName:t.$t("main.digitalContain")}}),t._v(" "),e("div",[e("div",{staticClass:"ticketCon"},[t.gData.debug?e("div",{staticStyle:{"font-size":"16px"}},[t._v(t._s(t.$data))]):t._e(),t._v(" "),t._l(t.pageData,function(a,i){return e("div",{key:i,staticClass:"ticket"},[e("div",[e("div",{staticClass:"time"},[t._v(t._s(t._f("stampToDate")(a.orderendDate)))]),t._v(" "),e("div",{staticClass:"info"},[e("div",{staticClass:"station"},[e("div",[t._m(0,!0),t._v(t._s(a.startstation))]),t._v(" "),e("div",[e("i",{staticClass:"end"}),t._v(t._s(a.endstation))])]),t._v(" "),e("div",{staticClass:"price"},[e("span",[t._v(t._s(t._f("yuan")(a.orderAmount)))]),t._v(" 元")])])])])})],2)])],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("i",{staticClass:"start"},[a("span")])}]};var n=e("C7Lr")(i,s,!1,function(t){e("j6m4")},"data-v-45e29f63",null);a.default=n.exports}});