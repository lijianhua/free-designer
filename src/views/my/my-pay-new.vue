<template>
  <div class="container">
    <div class="header">
      <div class="back">
        <i class="fas fa-chevron-left"></i>
      </div>
      <h3>积分充值</h3>
    </div>
    <div class="main">
      <h4>第一步：选择溜币充值套包</h4>
      <div class="list">
        <div class="item">
          <div class="box">
            <div class="t">
              <h5>1000积分</h5>
              <p>积分:800 赠送:200</p>
              <p>基础套餐</p>
            </div>
            <div class="b">
              <p>800元</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="box">
            <div class="t">
              <h5>1000积分</h5>
              <p>积分:800 赠送:200</p>
              <p>基础套餐</p>
            </div>
            <div class="b">
              <p>800元</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="box">
            <div class="t">
              <h5>1000积分</h5>
              <p>积分:800 赠送:200</p>
              <p>基础套餐</p>
            </div>
            <div class="b">
              <p>800元</p>
            </div>
          </div>
        </div>
      </div>
      <h4>第二步：选择支付方式并付款</h4>
      <div class="wechat-pay"></div>
      <div class="pay-btn">立即支付</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  padding-top: 96px;
  padding-bottom: 100px;
  height: 100%;
  box-sizing: border-box;
  background-color: #eee;

  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 96px;
    background-color: #fafafa;
    border: 2px #eee solid;

    .back {
      position: absolute;
      left: 0;
      top: 0;
      width: 75px;
      height: 100%;
      text-align: center;
      line-height: 96px;
    }

    h3 {
      text-align: center;
      font-size: 40px;
      height: 96px;
      line-height: 96px;
      font-weight: normal;
    }
  }

  .main {
    padding: 0 20px;
    height: 100%;
    overflow-y: auto;

    h4 {
      margin: 44px 0;
      font-size: 34px;
    }

    .list {
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 50%;
        .box {
          margin: 12px;
          text-align: center;
          border: 2px solid #e2e2e2;
          background-color: #fff;

          .t {
            padding-bottom: 20px;
            h5 {
              font-size: 44px;
              margin: 32px 0;
              font-weight: normal;
            }
            p {
              margin: 24px 0;
            }
          }

          .b {
            border-top: dashed 2px #e2e2e2;
            p {
              font-size: 32px;
              color: #ff9900;
              margin: 32px 0;
            }
          }
        }
      }
    }

    .wechat-pay {
      width: 312px;
      height: 76px;
      border: solid 2px #e2e2e2;
      background: url('../../assets/images/icon-pay.png') no-repeat 36px -72px;
      background-color: #fff;
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
    }

  }
}
</style>
