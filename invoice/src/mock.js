const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
// const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
// const domain = 'https://api.qd-metro.com/testngcustomer' // 定义默认域名，随便写
const respcod = '01' // 返回的状态码
const respmsg = Mock.mock('@cword(3, 5)') // 返回msg
Mock.setup({
  timeout: 800 // 设置延迟响应，模拟向后端请求数据
})

// 30天可开票数据
const getUnInvoiceRecordList = req => {
  console.log(req) // 请求体，用于获取参数
  // 返回状态码和文章数据posts
  return {
    respcod,
    data: Mock.mock({
      'size|1-1': 100,
      'cardType|1': ['02', '03', '04'],
      'orderList|3-7': [{
        'entryStationName': '@ctitle(3, 5)',
        'entryDate': '@datetime("yyyyMMddHHmmss")',
        'exitStationName': '@ctitle(3, 5)',
        'exitDate': '@datetime("yyyyMMddHHmmss")',
        'payAmount|1-999': 100,
        'orderExpType': '0',
        'tradeOrderNo': '04201904161516293648',
        'payTradeOrderNo': '4200000310201904163345841171',
        'payOrderNoDate': '@datetime("yyyyMMddHHmmss")',
        'payChannelCode': '04',
        'debitRequestResult': '0',
        'discountFee': {}
      }]
    }),
    respmsg
  }
}

const getInvoicedRecordByUserid = req => {
  console.log(req) // 请求体，用于获取参数
  return {
    respcod,
    data: Mock.mock({
      'invoiceHead': '@cword(3, 5)',
      'identiNo|1': /\d{18,18}/,
      'email': /\w{5,7}\d{3,7}@[a-z]{2,7}\.com/
    }),
    respmsg
  }
}
const insertInvoice = req => {
  console.log(req) // 请求体，用于获取参数
  return {
    respcod,
    data: {},
    respmsg
  }
}
const getInvoicedRecordList = req => {
  console.log(req) // 请求体，用于获取参数
  const temp = Mock.mock({
    'data|11-17': [{
      'startstation': '@ctitle(3, 5)',
      'invoiceDate': /155\d{10}/,
      'endstation': '@ctitle(3, 5)',
      id: /\w{5,7}\d{3,7}[a-z]{2,7}/,
      'amount|1-999': 100,
      invoiceNo: /\w{5,7}\d{3,7}[a-z]{2,7}/,
      'invoiceType|1': ['02', '01']
    }]
  })
  return {
    respcod,
    data: temp.data,
    respmsg
  }
}
const getinvoicedRecordDetail = req => {
  console.log(req) // 请求体，用于获取参数
  return {
    respcod,
    data: Mock.mock({
      count: 1,
      invoiceMain: {
        'address': '@ctitle(3, 5)',
        'amount|1-999': 100,
        'bank': '@ctitle(3, 5)',
        contents: '客运服务费',
        'createDate': /155\d{10}/,
        'email': /\w{5,7}\d{3,7}@[a-z]{2,7}\.com/,
        'headType|1': ['02', '01'],
        id: /\w{5,7}\d{3,7}[a-z]{2,7}/,
        invoiceHead: '@ctitle(3, 5)',
        'identiNo|1': /\d{18,18}/,
        'invoiceType|1': ['02', '01']

      }
    }),
    respmsg
  }
}
const getInvoiceOrderlist = req => {
  console.log(req) // 请求体，用于获取参数
  const temp = Mock.mock({
    'data|1-7': [{
      'startstation': '@ctitle(3, 5)',
      'invoiceDate': /155\d{10}/,
      'endstation': '@ctitle(3, 5)',
      id: /\w{5,7}\d{3,7}[a-z]{2,7}/,
      'orderAmount|1-999': 100,
      invoiceNo: /\w{5,7}\d{3,7}[a-z]{2,7}/,
      'invoiceType|1': ['02', '01']
    }]
  })
  return {
    respcod,
    data: temp.data,
    respmsg
  }
}
const postData = req => {
  console.log(req) // 请求体，用于获取参数
  return {
    respcod,
    data: Random.image('200x100', '#50B347', '#FFF', '票面展示'),
    respmsg
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(/\/invioceController\/getUnInvoiceRecordList(.*)/, 'post', getUnInvoiceRecordList)
Mock.mock(/\/invioceController\/getInvoicedRecordByUserid(.*)/, 'post', getInvoicedRecordByUserid)
Mock.mock(/\/invioceController\/insertInvoice(.*)/, 'post', insertInvoice)
Mock.mock(/\/invioceController\/getInvoicedRecordList(.*)/, 'post', getInvoicedRecordList)
Mock.mock(/\/invioceController\/getinvoicedRecordDetail(.*)/, 'post', getinvoicedRecordDetail)
Mock.mock(/\/invioceController\/getInvoiceOrderlist(.*)/, 'post', getInvoiceOrderlist)
Mock.mock(/\/invioceController\/downLoadInvoice(.*)/, 'post', postData)
