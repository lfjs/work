webpackJsonp([7],{"+5WQ":function(t,a){},JNZL:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("aMQM"),n=e("wSez"),o={data:function(){return{id:this.$route.query.id,apiData:{},pageData:{invoiceMain:{}}}},filters:{formatMoney:function(t){return"￥"+t.toFixed(2)},stampToDate:function(t){if(!t)return"";var a=new Date(Number(t));return t=a.getFullYear()+"-"+((a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1)+"-")+(a.getDate()<10?"0"+a.getDate():a.getDate())}},mounted:function(){},deactivated:function(){},activated:function(){var t=this;this.id=this.$route.query.id,this.$indicator.open({text:"加载中...",spinnerType:"fading-circle"}),this.gData.fakeData?(console.log("fakeDataMode!"),this.axios.get("/static/fakeInvoiceDetail.json?page="+this.apiData.page,{}).then(function(a){t.$indicator.close(),t.pageData=a.data.data,t.debugInfo=a.data}).catch(function(t){console.log(t),this.debugInfo=t})):this.axios.post(this.gData.api+"/invioceController/getinvoicedRecordDetail?invoiceNo="+this.id,{}).then(function(a){t.$indicator.close(),t.debugInfo=a.data,"01"===a.data.respcod?t.pageData=a.data.data:Object(n.Toast)({message:a.data.respmsg,duration:1e3})}).catch(function(t){console.log(t),this.debugInfo=t})},components:{invoiceHeader:i.a}},s={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("invoiceHeader",{attrs:{titleName:t.$t("main.digitalDetail")}}),t._v(" "),e("div",{staticClass:"mainPadding detailForm"},[t.gData.debug?e("div",{staticStyle:{"font-size":"16px"}},[t._v(t._s(t.$data))]):t._e(),t._v(" "),e("div",{staticClass:"formItem"},[e("mt-cell",{attrs:{title:"申请日期",value:t._f("stampToDate")(t.pageData.invoiceMain.createDate)}})],1),t._v(" "),e("div",{staticClass:"formItem"},[e("mt-cell",{attrs:{title:"发票抬头",value:t.pageData.invoiceMain.invoiceHead}})],1),t._v(" "),e("div",{staticClass:"formItem"},[e("mt-cell",{attrs:{title:"纳税人识别号",value:t.pageData.invoiceMain.identiNo}})],1),t._v(" "),e("div",{staticClass:"formItem"},[e("mt-cell",{attrs:{title:"发票内容",value:t.pageData.invoiceMain.contents}})],1),t._v(" "),e("div",{staticClass:"formItem"},[e("mt-cell",{attrs:{title:"发票金额",value:(t.pageData.invoiceMain.amount?t.pageData.invoiceMain.amount:"0")+".00 元"}})],1),t._v(" "),e("div",{staticClass:"formItem"},[e("mt-cell",{attrs:{title:"注册地址及电话",value:t.pageData.invoiceMain.address}})],1),t._v(" "),e("div",{staticClass:"formItem"},[e("mt-cell",{attrs:{title:"开户银行及账号",value:t.pageData.invoiceMain.bank}})],1),t._v(" "),e("div",{staticClass:"formItem"},[e("mt-cell",{attrs:{title:"电子邮箱",value:t.pageData.invoiceMain.email}})],1),t._v(" "),e("div",{staticClass:"formItem"},[e("mt-cell",{attrs:{label:"发票所含行程",to:{path:"/digitalContain?id="+t.id},"is-link":""}},[e("span",{staticStyle:{color:"rgb(105,201,121)"}},[t._v("查看行程单")])])],1),t._v(" "),1===Number(t.pageData.invoiceMain.invoiceType)?e("div",{staticClass:"formItem"},[e("mt-cell",{attrs:{label:"电子发票查看",to:{path:"/digitalInvoice?id="+t.pageData.invoiceMain.fplsh},"is-link":""}},[e("span",{staticStyle:{color:"rgb(105,201,121)"}},[t._v("查看发票单")])])],1):t._e()])],1)},staticRenderFns:[]};var c=e("C7Lr")(o,s,!1,function(t){e("+5WQ")},"data-v-73e6f87f",null);a.default=c.exports}});