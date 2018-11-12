import {
  getCategoryApi,
  getSuggestCostApi,
  getEmployerListApi,
  createOrderApi,
  getWorkerListApi,
  createQuestionApi,
  getOrderDetailApi,
  getUserQusetion
} from '@/api/order'

const defaultListPagination = {
  order_by: 'created_on',
  page: 1,
  per_page: 20
}

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
      files: '' // 项目资料
      // extra_resource: '1,2,3' // 项目资料
    },
    question: {
      a: '',
      b: '',
      c: '',
      d: '',
      e: ''
    }, // 问题
    userQuestionList: {}, // 用户答题列表
    projectFiles: [], // 处理过的项目资料 =>formData.extra_resource
    dynamicInfo: {}, // 项目需求详情
    dynamicInfoOptions: [], // 项目需求详情KEYS
    category: {
      scateList: [] // 项目需求列表
    }, // 类别列表
    employerList: [], // 发单列表
    employerPagination: defaultListPagination, // 发单分页
    workerList: [], // 接单列表
    workerPagination: defaultListPagination, // 接单分页
    orderDetail: {} // 订单详情
  },
  getters: {
    formData: state => state.formData,
    categoryList: state => state.category,
    dynamicInfoOptions: state => state.dynamicInfoOptions,
    dynamicInfo: state => state.dynamicInfo,
    question: state => state.question,
    projectFiles: state => state.projectFiles,
    employerList: state => state.employerList,
    workerList: state => state.workerList,
    orderDetail: state => state.orderDetail,
    userQuestionList: state => state.userQuestionList
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
    },
    SET_EMPLOYER_LIST (state, v) {
      state.employerList = v.data
      state.employerPagination = v.page_info
    },
    SET_WORKER_LIST (state, v) {
      state.workerList = v.data
      state.workerPagination = v.page_info
    },
    SET_PROJECT_FILE (state, v) {
      state.projectFiles.push(v)
    },
    SET_ORDER_DETAIL (state, v) {
      state.orderDetail = v
    },
    SET_USER_INFO (state, v) {
      state.userInfo = v
    },
    SET_USER_QUESTION_LIST (state, v) {
      state.userQuestionList = v
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
    },
    async getEmployerList ({ commit, state }, isPullDown = true) {
      const { employerPagination, employerList } = state
      const pagination = Object.assign({}, defaultListPagination)

      if (!isPullDown) {
        if (employerPagination.page >= employerPagination.total_page) return
        pagination.page = employerPagination.page + 1
      } else {
        pagination.page = 1
      }

      const { data } = await getEmployerListApi(Object.assign({}, pagination, {
        status__gt: 0
      }))

      if (!isPullDown) {
        data.data = employerList.concat(data.data)
      }
      commit('SET_EMPLOYER_LIST', data)
    },
    async getWorkerList ({ commit, state }, isPullDown = true) {
      const { workerPagination, workerList } = state
      const pagination = Object.assign({}, defaultListPagination)

      if (!isPullDown) {
        if (workerPagination.page >= workerPagination.total_page) return
        pagination.page = workerPagination.page + 1
      } else {
        pagination.page = 1
      }

      const { data } = await getWorkerListApi(Object.assign({}, pagination, {
        status__in: 'confirmed,active'
      }))

      if (!isPullDown) {
        data.data = workerList.concat(data.data)
      }
      commit('SET_WORKER_LIST', data)
    },
    async submit ({ commit, state }) {
      const { formData, question, dynamicInfo, projectFiles } = state

      const params = Object.assign({}, formData, {
        deadline: new Date(formData.deadline).toLocaleDateString().split('/').join('-'),
        dynamic_info: dynamicInfo,
        orderType: Number(formData.orderType),
        fee: Number(formData.fee),
        files: projectFiles.map(v => {
          return v[2]
        }).join()
      })

      const { data } = await createOrderApi(params)
      await Promise.all([
        Object.keys(question).map((v, i) =>
          createQuestionApi(data.id, {
            qid: i,
            question: question[v]
          })
        )
      ])
    },
    async getOrderDetail ({ commit }, id) {
      const { data } = await getOrderDetailApi(id)
      commit('SET_ORDER_DETAIL', data.data)
    },
    async getUserQusetion ({ commit }, id) {
      let res = await Promise.all([0, 1, 2, 3, 4].map(v => getUserQusetion(id, v)))
      res = res.map(v => v.data.data[0])
      console.log(res)
      commit('SET_USER_QUESTION_LIST', res)
    }
  }
}
