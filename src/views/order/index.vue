<template>
    <div class="order-container">
        <div class="header">
            <img src="../../assets/images/banner/orderBanner.png" alt="">
        </div>
        <div class="tab-switch">
            <div class="btn" :class="{active:tabActive === 'employer'}" @click="tabActive = 'employer'">我是雇主</div>
            <div class="btn" :class="{active:tabActive === 'worker'}" @click="tabActive = 'worker'">我是工作者</div>
        </div>
        <div class="main">
            <mt-tab-container v-model="tabActive" style="min-height:100%;">
                <mt-tab-container-item id="employer" style="height:100%;">
                    <div class="tab-main">
                        <mt-loadmore style="height:100%;" :top-method="employerLoadTop" :bottom-method="employerLoadBottom" bottomPullText="" :auto-fill="false" ref="loadmore1">
                            <template v-for="(item, index) in employerList">
                                <router-link class="item" :to="{name:'unconfirmed-detail',params:{id:item.id}}" :key="index">
                                    <div class="state">
                                    <img v-if="item.status <= 80" src="../../assets/images/order/ico_true.jpg" alt="">
                                    <img v-else src="../../assets/images/order/ico_false.jpg" alt="">
                                </div>
                                <div class="main">
                                    <div class="title">
                                        <p class="ellipsis">{{item.title}}</p>
                                    </div>
                                    <p class="title">{{item.pub_cost}} 积分</p>
                                    <div class="date">
                                        发单时间 {{item.created_on | filterDate}} 交稿时间 {{item.deadline | filterDate}}
                                    </div>
                                </div>
                                </router-link>
                            </template>
                        </mt-loadmore>
                        <div class="noData" v-show="employerList.length == 0">暂无数据</div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="worker" style="height:100%">
                    <div class="tab-main">
                        <mt-loadmore style="height:100%;" :top-method="workerLoadTop" :bottom-method="workerLoadBottom" bottomPullText="" :auto-fill="false" ref="loadmore2">
                            <div class="item" v-for="(item, index) in workerList" :key="index">
                                <router-link class="item" :to="{name:'orderDetail',params:{orderid:item.order.id}}" :key="index">
                                <div class="state">
                                    <img v-if="item.order.status <= 80" src="../../assets/images/order/ico_true.jpg" alt="">
                                    <img v-else src="../../assets/images/order/ico_false.jpg" alt="">
                                </div>
                                <div class="main">
                                    <div class="title">
                                        <p class="ellipsis">{{item.order.title}}</p>
                                    </div>
                                    <p class="title">{{item.order.pub_cost}} 积分</p>
                                    <div class="date">
                                        发单时间 {{item.order.created_on | filterDate}} 交稿时间 {{item.order.deadline | filterDate}}
                                    </div>
                                </div>
                                </router-link>
                            </div>
                        </mt-loadmore>
                        <div class="noData" v-show="workerList.length == 0">暂无数据</div>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <div class="btn-box">
            <div class="btn-demand" @click="$router.push('send-creat-order')">
                发需求
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.order-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.header {
    height: 310px;
    img {
        width: 100%;
        height: 100%;
    }
}
.tab-switch {
    display: flex;
    height: 57px;
    line-height: 57px;
    text-align: center;
    background-color: #ebebeb;
    border: 1PX solid #ebebeb;
    .btn {
        flex: 1;
        &.active {
            background-color: #fff;
        }
    }
}
.main {
    flex: 1;
    overflow-y: auto;
}
.tab-main {
    height: 100%;
    padding-top: 50px;
    margin-bottom: 50px;
}
.item {
    display: flex;
    margin: 0 43px;
    .state {
        width: 82px;
        height: 82px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        font-size: 24px;
        margin-left: 30px;
        .title {
            display: flex;
            justify-content: space-between;
            font-weight: 500;

        }
        .date {
            font-size: 21px;
            color: #a1a1a1;
        }
    }
}
.item + .item {
    margin-top: 60px;
}
.btn-box {
    border-top: 3px solid #ebebeb;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 110px;
    .btn-demand {
        border-radius: 50%;
        text-align: center;
        line-height: 142px;
        width: 143px;
        height: 143px;
        color: #fff;
        background-color: #4a94ed;
    }
}
</style>
<script>
import Store from '@/store'
import { mapGetters, mapActions } from 'vuex'
export default {
  async beforeRouteEnter (to, from, next) {
    await Store.dispatch('order/getEmployerList')
    next()
  },
  data () {
    return {
      tabActive: 'employer' // employer 雇主  worker 工作者
    }
  },
  filters: {
    filterDate (val) {
      return val.split(' ')[0]
    }
  },
  computed: {
    ...mapGetters('order', ['employerList', 'workerList'])
  },
  methods: {
    ...mapActions('order', ['getEmployerList', 'getWorkerList']),
    async employerLoadTop () {
      await this.getEmployerList()
      this.$refs.loadmore1.onTopLoaded()
    },
    async employerLoadBottom () {
      await this.getEmployerList(false)
      this.$refs.loadmore1.onBottomLoaded()
    },
    async workerLoadTop () {
      await this.getWorkerList()
      this.$refs.loadmore2.onTopLoaded()
    },
    async workerLoadBottom () {
      await this.getWorkerList(false)
      this.$refs.loadmore2.onBottomLoaded()
    }
  },
  async mounted () {
    await Store.dispatch('order/getWorkerList')
  }
}
</script>
