import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import r1 from '@/views/r1'
import r2 from '@/views/r2'
import main from '@/views/main'
// import invoice from '@/views/invoice'

const invoice = resolve => require.ensure([
], () => resolve(require('@/views/invoice')), 'MainContent')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      meta: {
        title: 'index'
      },
      component: HelloWorld
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      meta: {
        title: 'main'
      },
      children: [
        {
          path: '/r1',
          name: 'r1',
          component: r1
        },
        {
          path: '/r2',
          name: 'r2',
          component: r2
        }

      ]
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: invoice,
      meta: {
        title: '开发票'
      }
    },
    {
      path: '/makeInvoice',
      name: 'makeInvoice',
      component: resolve => require(['@/views/invoice/makeInvoice'], resolve)
    },
    {
      path: '/fillMake',
      name: 'fillMake',
      component: resolve => require(['@/views/invoice/fillMake'], resolve)
    },
    {
      path: '/fillMore',
      name: 'fillMore',
      component: resolve => require(['@/views/invoice/fillMore'], resolve)
    },
    {
      path: '/makeSuccess',
      name: 'makeSuccess',
      component: resolve => require(['@/views/invoice/makeSuccess'], resolve)
    },
    {
      path: '/fillPaperMake',
      name: 'fillPaperMake',
      component: resolve => require(['@/views/invoice/fillPaperMake'], resolve)
    },
    {
      path: '/fillPaperCheck',
      name: 'fillPaperCheck',
      component: resolve => require(['@/views/invoice/fillPaperCheck'], resolve)
    },
    {
      path: '/fillPaperMakeSuccess',
      name: 'fillPaperMakeSuccess',
      component: resolve => require(['@/views/invoice/fillPaperMakeSuccess'], resolve)
    },
    {
      path: '/invoiceHistory',
      name: 'invoiceHistory',
      component: resolve => require(['@/views/invoice/invoiceHistory'], resolve)
    },
    {
      path: '/digitalDetail',
      name: 'digitalDetail',
      params: {
        id: '1'
      },
      component: resolve => require(['@/views/invoice/digitalDetail'], resolve)
    },
    {
      path: '/digitalContain',
      name: 'digitalContain',
      params: {
        id: '1'
      },
      component: resolve => require(['@/views/invoice/digitalContain'], resolve)
    },
    {
      path: '/digitalInvoice',
      name: 'digitalInvoice',
      params: {
        id: '1'
      },
      component: resolve => require(['@/views/invoice/digitalInvoice'], resolve)
    },
    {
      path: '/digitalMail',
      name: 'digitalMail',
      params: {
        id: '1'
      },
      component: resolve => require(['@/views/invoice/digitalMail'], resolve)
    },
    {
      path: '/paperDetail',
      name: 'paperDetail',
      params: {
        id: '1'
      },
      component: resolve => require(['@/views/invoice/paperDetail'], resolve)
    },
    {
      path: '/help',
      name: 'invoiceHelp',
      component: resolve => require(['@/views/invoice/help'], resolve)
    },
    {
      path: '/rule',
      name: 'invoiceRule',
      component: resolve => require(['@/views/invoice/rule'], resolve)
    }
  ]
})
