<template>
  <div class="container">
    <div class="header">
      <div class="back">
        <i class="fas fa-chevron-left"></i>
      </div>
      <h3>实名认证</h3>
    </div>
    <div class="auth-info">
      <div class="main" v-if="false">
        <img src="@/assets/images/certification_true.png" alt="">
        <h4>认证成功</h4>
        <p>恭喜你，提交的资料已成功认证</p>
      </div>
      <div class="main" v-if="false">
        <img src="@/assets/images/certification_false.png" alt="">
        <h4>还未认证</h4>
        <p>还未进行实名制认证哦，点击按钮提交资料</p>
        <mt-button type="primary" size="small">实名认证</mt-button>
      </div>
      <div class="main" v-if="false">
        <img src="@/assets/images/certification_false.png" alt="">
        <h4>认证失败</h4>
        <p>您提交的资料不完整未通过认证</p>
        <mt-button type="primary" size="small">重新提交</mt-button>
      </div>
      <div class="main" v-if="true">
        <img src="@/assets/images/certification.png" alt="">
        <h4>认证审核中</h4>
        <p>资料已提交认证，预计48小时内认证完毕</p>
      </div>
    </div>
    <div class="info">
      <h3>认证信息</h3>
      <div class="item">
        <span>真实姓名：</span>
        <span>137****0000</span>
      </div>
      <div class="item">
        <span>证件类型：</span>
        <span>身份证</span>
      </div>
      <div class="item">
        <span>证件号码：</span>
        <span>123456345723984792834</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  height: 100%;
  background-color: #eee;

  .header {
    position: relative;
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

  .auth-info {
    padding-top: 144px;
    padding-bottom: 144px;
    background-color: #fff;
    .main {
      text-align: center;
      img {
        width: 200px;
        height: 200px;
      }
      h4 {
        color: #333;
        font-size: 40px;
        line-height: 64px;
        font-weight: normal;
      }
      p {
        color: #aaa;
        font-size: 32px;
        line-height: 64px;
      }
      button {
        margin-top: 40px;
      }
    }
  }

  .info {
    padding: 20px;
    margin-top: 20px;
    background-color: #fff;

    h3 {
      font-size: 40px;
      font-weight: normal;
      text-align: left;
      line-height: 100px;
    }
    .item {
      color: #aaa;
      font-size: 32px;
      line-height: 64px;
      span:nth-child(1) {
        width: 24%;
      }
      span:nth-child(2) {
        width: 76%;
      }
    }
  }

}
</style>
