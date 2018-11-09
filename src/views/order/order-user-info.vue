<template>
  <div class="containers">
    <div class="header">
      <img @click="$router.back()" src="../../assets/images/back.png" alt="">
      <h3>接单人详情</h3>
    </div>
    <div class="main">
      <div class="main-header">
        <div class="user-info">
          <div class="avatar" style="background:red;">
          </div>
          <div class="info">
            <div class="item-header">
              <div class="title">豆豆</div>
              <div class="integral">议价：0积分</div>
            </div>
            <div>
              <div class="address">北京</div>
              <div class="exp">10年工作经验</div>
            </div>
            <div class="skill">
              【1，2，3，4】
            </div>
          </div>
        </div>
        <div class="explain">
          <h3>竞标说明</h3>
          <p>主要承接办公室设计，以及平面规划方案，从规划开始满足甲方的设计需求。并能提高其企业管理效率，对施工工艺比较了解，能独立完成施工图纸。</p>
        </div>
      </div>
      <div class="case">
        <h3>同类案例</h3>
        <div class="box">
          <div class="scroll" style="width:500%;">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
          </div>
        </div>
      </div>
      <div class="test-paper">
        <div class="paper-header">
          <h3>答题试卷<span>【您设置了3道试题】</span></h3>
        </div>
        <div class="paper-main">
          <div class="item">
            <h4>第一题：预估本项目每平米造价大约多少？</h4>
            <div class="time">
              <img src="../../assets/images/ico_time.png" alt="">【3分18秒】
            </div>
            <p>这个主要根据您所采用的材料决定的，一般能控制在1500每平米吧</p>
          </div>
          <div class="item">
            <h4>第一题：预估本项目每平米造价大约多少？</h4>
            <div class="time">
              <img src="" alt="">【3分18秒】
            </div>
            <p>这个主要根据您所采用的材料决定的，一般能控制在1500每平米吧</p>
          </div>
          <div class="item">
            <h4>第一题：预估本项目每平米造价大约多少？</h4>
            <div class="time">
              <img src="" alt="">【3分18秒】
            </div>
            <p>这个主要根据您所采用的材料决定的，一般能控制在1500每平米吧</p>
          </div>
        </div>
      </div>
      <div class="tel-check">
        <h3>电话考核</h3>
        <img src="../../assets/images/ico_tel.png" alt="">
      </div>
      <div class="footer">
        <h4 class="total-price">服务总价：2700积分</h4>
        <div class="price-info">【系统报价2000+增加奖金300+接单人加价400】</div>
        <div class="submit">确定合作并付款</div>
        <div class="agree">
          <img src="../../assets/images/redyes.png" alt="redyes">
          <span>我已阅读并同意遵守本次服务协议</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Store from '@/store'
import { mapGetters } from 'vuex'
export default {
  async beforeRouteEnter (to, from, next) {
    // await Store.dispatch('order/getUserInfo', to.params.id)
    next()
  },
  props: ['id'],
  computed: {
    ...mapGetters('order', ['userInfo'])
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
          .address {
            color: #808080;
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
        background-color: red;

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
