<template>
  <div>
    <invoiceHeader v-bind:titleName="$t('main.makeInvoice')"></invoiceHeader>
    <div class="mainPadding">
      <mt-cell title="领取日期" value="2019-12-20"></mt-cell>
      <mt-cell title="发票金额" value="6元"></mt-cell>
      <router-link to="/digitalContain?id=1acs">
        <mt-cell label="发票含2个行程" is-link>
          <span style="color: green">查看行程单</span>
        </mt-cell>
      </router-link>

    </div>
  </div>
</template>
<script>
import invoiceHeader from '@/components/invoiceHeader'

export default {

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected: '精选',
      id: this.$route.query.id
    }
  },
  components: {
    invoiceHeader
  }
}
</script>
