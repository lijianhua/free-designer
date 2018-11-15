<template>
  <div class="containers">
    <div class="header">
      <img @click="$router.back()" src="../../assets/images/back.png" alt="">
      <h3>接单人详情</h3>
    </div>
    <div class="main">
      <div class="main-header">
        <div class="user-info">
          <div class="avatar">
            <img :src="userInfo.user.avatar" alt="">
          </div>
          <div class="info">
            <div class="item-header">
              <div class="title">{{userInfo.user.name}}</div>
              <div class="integral">议价：{{userInfo.apply_cost}}积分</div>
            </div>
            <div>
              <div class="exp">{{userInfo.user.career}}年工作经验</div>
            </div>
            <div class="skill">
              {{userInfo.user.role | filterRole}}
            </div>
          </div>
        </div>
        <div class="explain">
          <h3>竞标说明</h3>
          <p>{{userInfo.desc}}</p>
        </div>
      </div>
      <div class="case">
        <h3>同类案例</h3>
        <div class="box">
          <div class="scroll" :style="{width:userInfo.works.length + '00%'}">
            <div class="item" v-for="(item, index) in userInfo.works" :key="index">
              <img :src="item[1]" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="test-paper">
        <div class="paper-header">
          <h3>答题试卷<span>【您设置了{{userQuestionList.length}}道试题】</span></h3>
        </div>
        <div class="paper-main">
          <div class="item" v-for="(item, index) in userQuestionList" :key="index">
            <h4>第{{ index + 1 }}题：{{ item.order_question.question }}</h4>
            <div class="time">
              <img src="../../assets/images/ico_time.png" alt="">【{{ showAnswerTime(item.start_time, item.end_time) }}】
            </div>
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
      <div class="tel-check">
        <h3>电话考核</h3>
        <img src="../../assets/images/ico_tel.png" alt="">
      </div>
      <div class="footer">
        <h4 class="total-price">服务总价：{{orderDetail.pub_cost + orderDetail.apply_cost + orderDetail.system_cost}}积分</h4>
        <div class="price-info">【系统报价{{orderDetail.system_cost}}+增加奖金{{orderDetail.fee}}+接单人加价{{orderDetail.apply_cost}}】</div>
        <div class="submit" @click="surePay">确定合作并付款</div>
        <div class="agree">
          <img src="../../assets/images/redyes.png" alt="redyes">
          <span>我已阅读并同意遵守本次服务协议</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Store from '@/store'
import { mapGetters, mapActions } from 'vuex'
export default {
  async beforeRouteEnter (to, from, next) {
    await Store.dispatch('order/getUserQusetion', to.params.id)
    next()
  },
  props: ['id'],
  computed: {
    ...mapGetters('order', ['orderDetail', 'userQuestionList'])
  },
  data () {
    return {
      userInfo: {}
    }
  },
  filters: {
    filterRole (val) {
      return val.split(',').filter(v => v !== '').map(v => `【${v}】`).join('')
    }
  },
  created () {
    if (!Object.keys(this.orderDetail).length) {
      this.$router.back()
      return
    }
    this.userInfo = this.orderDetail.apply_records.find(v => v.id === this.id)
  },
  methods: {
    ...mapActions('order', ['pleaseAcceptOrder']),
    showAnswerTime (start, end) {
      const time = (end - start) / 1000
      const hour = Math.floor(time / 3600)
      const min = Math.floor(time / 60) % 60
      const sec = time % 60
      let t = ''
      if (hour > 0) {
        if (hour < 10) {
          t = '0' + hour + ':'
        } else {
          t = hour + '时'
        }
      }
      if (min < 10) { t += '0' }
      t += min + '分'
      if (sec < 10) { t += '0' }
      t += sec.toFixed(0) + '秒'
      return t
    },
    async surePay () {
      const dataForm = {
        goods_id: this.id,
        goods_type: 'pre_order',
        price_type: 'all'
      }
      await this.pleaseAcceptOrder(dataForm)
      this.$router.push({
        name: 'order'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.containers {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
}
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
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
  min-height: 100%;
  padding-top: 116px;
  padding-bottom: 100px;
  background-color: #f0f0f0;
  >div {
    padding: 0 75px;
  }

  .main-header {
    padding-top: 44px;
    padding-bottom: 44px;
    border-bottom: 10px solid #fff;
    .user-info {
      display: flex;
      .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        flex: 1;
        margin-left: 25px;
        >div {
          display: flex;
          font-size: 26px;
          &.item-header {
            justify-content: space-between;
          }
          &.skill {
            font-size: 22px;
            font-weight: bold;
          }
          .title {
            font-weight: bold;
          }
          .integral {
            font-weight: bold;
            color: #ff0000;
          }
          .exp {
            color: #808080;
            padding-left: 20px;
          }
        }
      }
    }
    .explain {
      margin-top: 28px;
      h3 {
        font-size: 30px;
      }
      p {
        font-size: 22px;
        margin-top: 24px;
      }
    }
  }

  .case {
    width: 100%;
    overflow: hidden;
    padding-right: 0;
    padding-bottom: 33px;
    border-bottom: 10px solid #fff;
    h3 {
      font-size: 30px;
      padding: 36px 0 30px;
    }
    .box {
      width: 100%;
      overflow-x: scroll;
      .item {
        display: inline-block;
        width: 578px;
        height: 449px;
        // background-color: red;
        img {
          width: 100%;
          height: 100%;
        }

        & + .item {
          margin-left: 44px;
        }
      }
    }

  }

  .test-paper {
    padding: 0;
    padding-bottom: 50px;
    background-color: #fff;
    .paper-header {
      font-weight: bold;
      font-size: 30px;
      padding: 20px 75px;
      background-color: #f0f0f0;
      span{
        color: #808080;
      }
    }
    .paper-main {
      padding: 0 75px;
      .item {
        margin-top: 40px;
        h4 {
          font-size: 22px;
          font-weight: bold;
        }
        .time {
          margin-top: 50px;
          font-size: 24px;
          color: #ff0000;
          img {
            width: 55px;
            height: 55px;
          }
        }
        p {
          padding-left: 68px;
        }
      }
    }
  }

  .tel-check {
    text-align: center;
    h3 {
      font-size: 28px;
      font-weight: bold;
      margin: 40px 0;
    }
    img {
      width: 97px;
      height: 97px;
      margin-bottom: 40px;
    }
  }

  .footer {
    text-align: center;
    padding: 0;
    padding-top: 60px;
    padding-bottom: 60px;
    margin-bottom: 40px;
    background-color: #fff;

    .total-price {
      font-size: 34px;
      color: #4195f7;
    }
    .price-info {
      margin-top: 14px;
      font-size: 16px;
      color: #4195f7;
    }
    .submit {
      margin-top: 40px;
      display: inline-block;
      font-size: 30px;
      color: #fff;
      padding: 20px 118px;
      background-color: #4195f7;
    }
    .agree {
      margin-top: 20px;
      img {
        width: 18px;
        height: 18px;
      }
      span {
        padding-left: 14px;
        font-size: 18px;
        color: #818181;
      }
    }
  }

}
</style>
