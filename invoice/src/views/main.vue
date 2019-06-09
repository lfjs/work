<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>r2</h2>
    <router-view></router-view>
    <mt-button type="default" @click.native="handleClick" id="r2R1">r2R1</mt-button>
    <mt-button type="primary" @click.native="handleClick" id="r2R2">r2R2</mt-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected: '精选'
    }
  },
  methods: {
    handleClick (evt) {
      console.log('跳转至', this.selected = evt.target.id)
    }
  },
  watch: {
    selected: function (val, oldVal) {
      // 这里就可以通过 val 的值变更来确定
      switch (val) {
        case 'r2R1':
          this.$router.push('/r1')
          break
        case 'r2R2':
          this.$router.push('/r2')
          break
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
