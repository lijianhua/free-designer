<template>
  <div class="order-container">
    <div class="header">
      <img @click="$router.push('my')" src="../../assets/images/back.png" alt="">
      <h3>历史订单</h3>
    </div>
    <div class="tab-switch">
      <div class="btn" :class="{active:orderTabActive === 'send'}" @click="SET_ORDER_TAB_ACTIVE('send')">发单列表</div>
      <div class="btn" :class="{active:orderTabActive === 'apply'}" @click="SET_ORDER_TAB_ACTIVE('apply')">接单列表</div>
    </div>
    <mt-tab-container :value="orderTabActive" style="height:100%;">
      <mt-tab-container-item id="send">
        <div class="tab-main">
          <mt-loadmore style="height:100%;" :top-method="loadTop" :bottom-method="loadBottom" bottomPullText="" :auto-fill="false" ref="loadmore1">
            <ul class="list" v-if="sendOrderList.length">
              <li v-for="(item, index) in sendOrderList" :key="index">
                <h4>{{item.title}}</h4>
                <p>项目积分：<span>{{item.pub_cost}}积分</span></p>
                <p>项目时间：{{item.applied_on}} - {{item.deadline}}</p>
              </li>
            </ul>
            <div v-else class="empty">暂无数据</div>
          </mt-loadmore>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="apply">
        <div class="tab-main">
          <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" bottomPullText="" :auto-fill="false" ref="loadmore2">
            <ul class="list" v-if="applyOrderList.length">
              <li v-for="(item, index) in applyOrderList" :key="index">
                <h4>{{item.title}}</h4>
                <p>项目积分：<span>{{item.pub_cost}}积分</span></p>
                <p>项目时间：{{item.applied_on}} - {{item.deadline}}</p>
              </li>
            </ul>
            <div v-else class="empty">暂无数据</div>
          </mt-loadmore>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import Store from '@/store'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  async beforeRouteEnter (to, from, next) {
    await Store.dispatch('my/getOrderList')
    Store.commit('my/SET_ORDER_TAB_ACTIVE', 'apply')
    await Store.dispatch('my/getOrderList')
    Store.commit('my/SET_ORDER_TAB_ACTIVE', 'send')
    next()
  },
  computed: {
    ...mapGetters('my', ['orderTabActive', 'sendOrderList', 'applyOrderList'])
  },
  mounted () {
    console.log(this)
  },
  methods: {
    ...mapMutations('my', ['SET_ORDER_TAB_ACTIVE']),
    ...mapActions('my', ['getOrderList']),
    async loadTop () {
      await this.getOrderList()
      if (this.orderTabActive === 'send') {
        this.$refs.loadmore1.onTopLoaded()
      } else {
        this.$refs.loadmore2.onTopLoaded()
      }
    },
    async loadBottom () {
      await this.getOrderList(false)
      if (this.orderTabActive === 'send') {
        this.$refs.loadmore1.onBottomLoaded()
      } else {
        this.$refs.loadmore2.onBottomLoaded()
      }
    }

  }
}
</script>
<style lang="scss" scoped>
.order-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
}
.header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 113px;
  background-color: #fff;
  img{
    width: 22px;
    height: 41px;
    position: absolute;
    top: 50%;
    left: 27px;
    margin-top: -20.5px;
  }
  h3 {
    font-size: 46px;
    text-align: center;
    line-height: 113px;
  }
}
.tab-switch {
    position: fixed;
    left: 0;
    top: 113px;
    z-index: 999;
    width: 100%;
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
.tab-main {
  position: relative;
  height: 100%;
  padding-top: 170px;
  padding-bottom: 100px;

  .empty {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
.list {
  height: 100%;
  li {
    padding: 0 50px;
    background-color: #f0f0f0;

    & + li {
      margin-top: 20px;
    }
    h4 {
      font-size: 24px;
    }
    p {
      font-size: 20px;
      span {
        color: #ff1100;
      }
    }
  }
}
</style>
