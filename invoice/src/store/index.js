import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {// 要设置的全局访问的state对象
  gState: 999,
  moreInfoVuex: {a: 1, b: 2},
  listInVuex: [5, 3, 2, 'default'],
  autoFillVuex: true
  // 要设置的初始属性值
}
const getters = { // 实时监听state值的变化(最新状态)
  showGState () {
    return state.gState
  },
  getListInVuex () {
    return state.listInVuex
  },
  getMoreInfoVuex () {
    return state.moreInfoVuex
  },
  getAutoFillVuex () {
    return state.autoFillVuex
  }
}
const mutations = {
  pushListInVuex (state, obj) { // 同上，这里面的参数除了state之外还传了需要增加的值sum
    state.listInVuex.push(obj)
  },
  clearListInVuex (state) {
    state.listInVuex = []
  },
  writeMoreInfoVuex (state, obj) {
    state.moreInfoVuex = (obj)
  },
  clearMoreInfoVuex (state) {
    state.moreInfoVuex = {}
  },
  writeAutoFillVuex (state, check) {
    state.autoFillVuex = (check)
  }
}
const actions = {
  setListInVuex (context, obj) { // 同上注释，num为要变化的形参
    context.commit('pushListInVuex', obj)
  },
  resetListInVuex (context) { // 同上注释，num为要变化的形参
    context.commit('clearListInVuex')
  },
  setMoreInfoVuex (context, obj) { // 同上注释，num为要变化的形参
    context.commit('writeMoreInfoVuex', obj)
  },
  resetMoreInfoVuex (context) { // 同上注释，num为要变化的形参
    context.commit('clearMoreInfoVuex')
  },
  setAutoFillVuex (context, check) { // 同上注释，num为要变化的形参
    context.commit('writeAutoFillVuex', check)
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
export default store
