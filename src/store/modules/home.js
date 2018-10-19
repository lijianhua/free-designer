export default {
  namespaced: true,
  state: {
    obj: {
      a: 'gettera',
      b: 'getterB'
    }
  },
  getters: {
    getterA: state => state.obj.a,
    getterB: state => state.obj.b
  },
  mutations: {
    SET_TEST1 (state, v) {
      state.obj.a = v
    },
    SET_TEST2 (state, v) {
      state.obj.b = v
    }
  },
  actions: {
    test3 (ctx, v) {
      console.log(ctx, v)
    },
    test4 (ctx, v) {
      console.log(ctx, v)
    }
  }
}
