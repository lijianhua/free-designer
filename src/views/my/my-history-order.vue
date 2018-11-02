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
    <mt-tab-container :value="orderTabActive">
      <mt-tab-container-item id="send">
        <div class="tab-main">
          <mt-loadmore :top-method="loadTop" :auto-fill="false" ref="loadmore1">
            <ul class="list">
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
            </ul>
          </mt-loadmore>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="apply">
        <div class="tab-main">
          <mt-loadmore :top-method="loadTop" :auto-fill="false" ref="loadmore2">
            <ul class="list">
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
            </ul>
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
    await Store.dispatch('my/getOrderList', 'apply')
    next()
  },
  computed: {
    ...mapGetters('my', ['orderTabActive', 'sendOrderList', 'applyOrderList'])
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
    }
  }
}
</script>
<style lang="scss" scoped>
.order-container {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.header {
  position: relative;
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
    height: 565px;
    padding-top: 50px;
    margin-bottom: 50px;
    overflow-y: auto;
}
.item {
    display: flex;
    margin: 60px 43px 0;
    &:nth-child(1){
        margin-top: 0;
    }
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
.btn-box {
    border-top: 3px solid #ebebeb;
    height: 257px;
    display: flex;
    justify-content: center;
    align-items: center;
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
