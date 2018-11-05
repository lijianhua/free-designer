import { getCategoryApi, getSuggestCostApi } from '@/api/order'

export default {
  namespaced: true,
  state: {
    formData: {
      orderType: '1', // 订单类型
      fcate: '', // 项目分类
      scate: '', // 项目需求
      location: '', // 项目地址
      task_count: '', // 任务总量
      deadline: '', // 交稿时间
      task_unit: '张', // 总任务量单位
      system_cost: 0, // 系统报价
      pub_cost: 0, // 最终报价
      fee: null, // 小费
      desc: '', // 任务要求
      extra_resource: '' // 项目资料
    },
    question: {
      a: '',
      b: '',
      c: '',
      d: '',
      e: ''
    },
    dynamicInfo: {}, // 项目需求详情
    dynamicInfoOptions: [], // 项目需求详情KEYS
    category: {
      scateList: [] // 项目需求列表
    } // 类别列表
  },
  getters: {
    formData: state => state.formData,
    categoryList: state => state.category,
    dynamicInfoOptions: state => state.dynamicInfoOptions,
    dynamicInfo: state => state.dynamicInfo,
    question: state => state.question
  },
  mutations: {
    SET_CATEGORY (state, v) {
      v.scateList = Object.keys(v.scates)
      state.category = v
    },
    SET_DYNAMIC_INFO (state, v) {
      const { category } = state
      const dynamicInfo = {}

      let keys = Object.keys(category.scates[v])
      keys = keys.map(key => {
        const obj = {}
        obj['name'] = category.scates[v][key]
        obj['key'] = key
        if (key.indexOf('is') !== -1 || key.indexOf('has') !== -1 || key.indexOf('day_sallary') !== -1 || v.indexOf('work_days') !== -1) {
          obj['type'] = 'checkout'
          dynamicInfo[key] = false
        } else if (key.indexOf('area') !== -1 || key.indexOf('nums') !== -1) {
          obj['type'] = 'input'
          dynamicInfo[key] = ''
        } else if (key.indexOf('style') !== -1) {
          obj['type'] = 'style'
          dynamicInfo[key] = '简约'
        } else if (key.indexOf('date') !== -1) {
          obj['type'] = 'date'
          dynamicInfo[key] = ''
        }
        return obj
      })

      state.dynamicInfo = dynamicInfo
      state.dynamicInfoOptions = keys
    },
    SET_SYSTEM_COST (state, v) {
      state.formData = Object.assign({}, state.formData, {
        system_cost: v.system_cost
      })
    },
    SET_PUB_COST (state, v) {
      const { system_cost: SystemCost } = state.formData
      state.formData = Object.assign({}, state.formData, {
        pub_cost: Number(v) + Number(SystemCost)
      })
    }
  },
  actions: {
    async getCategory ({ commit }) {
      const { data } = await getCategoryApi()
      commit('SET_CATEGORY', data)
    },
    async getSuggestCost ({ commit }, v) {
      const { data } = await getSuggestCostApi(v)
      commit('SET_SYSTEM_COST', data)
    }
  }
}
