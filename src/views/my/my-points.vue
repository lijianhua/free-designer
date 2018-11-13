<template>
  <div class="my-points-container">
    <div class="header">
      <img @click="$router.push('my')" src="../../assets/images/back.png" alt="">
      <h3>积分管理</h3>
    </div>
    <div class="tab-switch">
      <div class="btn" :class="{active:tabActive === 'record'}" @click="tabActive = 'record'">交易记录</div>
      <div class="btn" :class="{active:tabActive === 'putForward'}" @click="tabActive = 'putForward'">积分提现</div>
    </div>
    <mt-tab-container class="tab-container" v-model="tabActive">
      <mt-tab-container-item id="record">
        <div class="tab-main">
          <div class="item">
            <div class="num1">积分</div>
            <div class="num2">交易时间</div>
            <div class="num3">交易类型</div>
          </div>
          <div style="overflow:scroll;height:90%;">
            <mt-loadmore style="height:100%;" :top-method="loadTop" :bottom-method="loadBottom" bottomPullText="" :auto-fill="false" ref="loadmore">
              <div class="item" v-for="(item, index) in pointsList" :key="index">
                <div class="num1" v-if="item.points_type == 1">+ {{item.points}}</div>
                <div class="num1" v-else-if="item.points_type == 2">+ {{item.points}}</div>
                <div class="num1" v-else-if="item.points_type == 3">- {{item.points}}</div>
                <div class="num1" v-else-if="item.points_type == 4">+ {{item.points}}</div>
                <div class="num1" v-else-if="item.points_type == 5">- {{item.points}}</div>
                <div class="num2">{{item.created_on}}</div>
                <div class="num3" v-if="item.points_type == 1">积分充值</div>
                <div class="num3" v-else-if="item.points_type == 2">订单积分获取</div>
                <div class="num3" v-else-if="item.points_type == 3">订单积分支付</div>
                <div class="num3" v-else-if="item.points_type == 4">相册积分获取</div>
                <div class="num3" v-else-if="item.points_type == 5">相册积分支付</div>
              </div>
            </mt-loadmore>
            <div class="noData" v-show="pointsList.length == 0">暂无数据</div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="putForward">
        <div class="tab-main" style="overflow:scroll;">
          <div class="tab-main-header">
            <p>可提现积分<span style="color:#4195f7;">1200</span>，折换成人民币¥<span style="color:#ff0000;">1200</span></p>
            <p>(1积分=1人民币，满100积分可提现）</p>
          </div>
          <div class="form">
            <div class="form-item">
              <div class="name">提现金额</div>
              <div class="content">
                <mu-text-field class="input" v-model="pointsFormData.points" placeholder="提现金额必须是10的倍数"></mu-text-field><br/>
              </div>
            </div>
            <div class="form-item">
              <div class="name">银行账号</div>
              <div class="content">
                <mu-text-field class="input" v-model="pointsFormData.card_number" placeholder="请输入银行卡账号"></mu-text-field><br/>
              </div>
            </div>
            <div class="form-item">
              <div class="name">开户行</div>
              <div class="content">
                <mu-text-field class="input" v-model="pointsFormData.card_name" placeholder="请输入开户行信息"></mu-text-field><br/>
              </div>
            </div>
            <div class="form-item">
              <div class="name">姓名</div>
              <div class="content">
                <mu-text-field class="input" v-model="pointsFormData.username" placeholder="请输入您的真实姓名"></mu-text-field><br/>
              </div>
            </div>
            <div class="form-item">
              <div class="name">手机号</div>
              <div class="content">
                <mu-text-field type="number" class="input" v-model="pointsFormData.mobile" placeholder="请输入手机号码"></mu-text-field><br/>
              </div>
            </div>
          </div>
          <div class="submit" @click="pointsSubmit">提交申请</div>
          <div class="footer">
            <p>提现说明：
            <p>1、提现仅能在每周二申请，审核通过后会在1至7个工作日内打款</p>
            <p>2、请务必确认以上信息完全正确才能收到提现款</p>
            <p>3、如有疑问请<span style="color:#00a0e9;">联系我们</span></p>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Store from '@/store'
export default {
  async beforeRouteEnter (to, from, next) {
    await Store.dispatch('points/getPointsList')
    next()
  },
  data () {
    return {
      tabActive: 'record' // record 记录  putforward 提现
    }
  },
  computed: {
    ...mapGetters('points', ['pointsList', 'pointsFormData'])
  },
  methods: {
    ...mapActions('points', ['getPointsList', 'pointsSubmit']),
    async loadTop () {
      await this.getPointsList()
      this.$refs.loadmore.onTopLoaded()
    },
    async loadBottom () {
      await this.getPointsList(false)
      this.$refs.loadmore.onBottomLoaded()
    }
  }
}
</script>
<style lang="scss" scoped>
.my-points-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow-y: scroll;
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
.tab-switch {
  position: relative;
  z-index: 999;
  display: flex;
  height: 57px;
  line-height: 57px;
  text-align: center;
  background-color: #ebebeb;
  border-bottom: 1PX solid #fff;
  .btn {
      flex: 1;
      &.active {
          background-color: #fff;
      }
  }
}
.tab-container {
  height: calc(100% - 274px);
}
.tab-main {
  width: 100vw;
  height: 100%;

  .item {
    display: flex;
    justify-content: space-between;
    color: #d4d3d3;
    text-align: center;
    padding: 18px 0;
    border-bottom: 1PX solid #ebebeb;

    .num1 {
      width: 200px;
    }
    .num2 {
      flex: 1;
    }
    .num3 {
      width: 220px;
    }
  }
  .tab-main-header {
    text-align: center;
    background-color: #ececec;
    padding: 80px 0;
  }
  .form {
    background-color: #ececec;
    .form-item {
      display: flex;
      align-items: center;
      padding: 10PX 100px;
      border-top: 2PX solid #fff;

      .name {
        width: 114px;
        font-size: 22px;
        font-weight: bold;
      }
      .content {
        flex: 1;
        .input {
          font-size: 16px;
          margin: 0;
          padding: 0;
          min-height: 0;
          height: 38px;
          width: 100%;
          border: 2PX solid #fff;
          border-radius: 4PX;
        }
      }
    }
  }
  .submit {
    font-size: 22px;
    color: #fff;
    background-color: #00a0e9;
    text-align: center;
    width: 375px;
    height: 52px;
    line-height: 52px;
    border-radius: 4PX;
    margin: 70px auto 40px;
  }
  .footer {
    font-size: 16px;
    padding-left: 100px;
    padding-right: 100px;
    color: #b4b4b4;
  }
}
</style>
