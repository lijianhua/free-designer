<template>
  <div class="pay-new-container">
    <div class="header">
      <img @click="$router.push('my')" src="../../assets/images/back.png" alt="">
      <h3>积分充值</h3>
    </div>
    <div class="main">
      <h4>第一步：选择溜币充值套包</h4>
      <div class="list">
        <div
          class="item"
          v-for="(item, index) in payList"
          :key="index"
          :class="{active:activeIndex === index}"
          @click="handleSwitchItem(index,item.id)">
          <div class="box">
            <div class="t">
              <h5>{{item.total_points}}积分</h5>
              <p>积分:{{item.ori_points}} 赠送:{{item.extra_points}}</p>
              <p>{{item.name}}</p>
            </div>
            <div class="b">
              <p>{{item.order_cost}}元</p>
            </div>
          </div>
        </div>
        <div class="item" :class="{active:activeIndex === -1}" @click="handleSwitchItem(-1)">
          <div class="box">
            <div class="t">
              <h5>自定义充值</h5>
              <p>无积分优惠</p>
              <p>自定义套餐</p>
            </div>
            <div class="b">
              <p>
                <input type="text" placeholder="请输入金额/">
                元
              </p>
            </div>
          </div>
        </div>
      </div>
      <h4>第二步：选择支付方式并付款</h4>
      <div class="wechat-pay"></div>
      <div class="pay-btn" @click="handlePay">立即支付</div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import { payApi } from '@/api/my'
import Store from '@/store'
import { mapGetters } from 'vuex'
export default {
  async beforeRouteEnter (to, from, next) {
    await Store.dispatch('my/getPayList')
    next()
  },
  data () {
    return {
      activeIndex: null,
      curPayId: null,
      money: 0
    }
  },
  computed: {
    ...mapGetters('my', ['payList'])
  },
  methods: {
    handleSwitchItem (index, id) {
      this.activeIndex = index
      this.curPayId = id
    },
    handlePay () {
      MessageBox({
        title: '提示',
        message: '确认支付?',
        showCancelButton: true
      }).then(async action => {
        if (action !== 'confirm') return

        const { data } = await payApi({
          goods_id: this.curPayId,
          goods_type: 'prestore',
          price_type: 'prestore',
          pay_type: 1
        })

        location.href = data.url
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.pay-new-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.header {
  position: relative;
  height: 113px;
  border-bottom: 3px solid #ededed;
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
.main {
  flex: 1;
  padding: 0 36px 100px;
  overflow-y: auto;

  h4 {
    padding-left: 10px;
    font-size: 25px;
    margin-top: 40px;
    margin-bottom: 40px;
  }

    .list {
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 50%;
        margin-bottom: 50px;

        &.active {

          .box {
            border-color: #4195f7;
          }
        }

        .box {
          margin: 12px;
          text-align: center;
          border: 2px solid #e2e2e2;
          background-color: #fff;
          border-radius: 6PX;

          .t {
            padding-bottom: 20px;
            h5 {
              font-size: 44px;
              margin: 32px 0;
              font-weight: normal;
            }
            p {
              color: #bababa;
              margin: 24px 0;
            }
          }

          .b {
            border-top: dashed 2px #e2e2e2;
            p {
              font-size: 32px;
              color: #4195f7;
              margin: 32px 0;
              display: flex;
              justify-content: center;
              input {
                border: none;
                width: 56%;
              }
              input::-webkit-input-placeholder {
                color: #4195f7;
                font-size: 32px;
              }
            }
          }
        }
      }
    }

    .wechat-pay {
      width: 312px;
      height: 76px;
      border: solid 2PX #4195f7;
      background: url('../../assets/images/icon-pay.png') no-repeat 36px -72px;
      background-size: 74%;
      background-color: #fff;
      margin: 0 auto;
    }

    .pay-btn {
      text-align: center;
      margin-top: 40px;
      width: 312px;
      background: #ff9900;
      border: none;
      color: #fff;
      font-size: 28px;
      padding: 0 30px;
      line-height: 76px;
      margin-bottom: 40px;
      box-sizing: border-box;
      margin: 100px auto;
    }
}
</style>
