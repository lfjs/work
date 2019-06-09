<template>
  <div>
    <invoiceHeader v-bind:titleName="$t('main.makeSuccess')"></invoiceHeader>
    <div class="success">
      <img src="@/assets/img/ticketChoosen.png" alt="">
      <div>开票成功</div>

    </div>

  </div>
</template>
<style lang="scss" scoped>
.success{

  display: flex;
  justify-content: center;
  /* height: 100%; */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  flex-direction: column;
  img{
    width: 70px;
    height: 70px;
  }
  div{
    font-size: 20px;
    margin: 20px 0;
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
      popupVisible: true

    }
  },
  methods: {
  },
  activated () {
    this.intervalid1 = setInterval(() => {
      this.$router.push('/invoice')
    }, 500 * 3)
  },
  deactivated () {
    clearInterval(this.intervalid1)
  },

  components: {
    invoiceHeader
  }
}
</script>
