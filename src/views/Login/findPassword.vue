<template>
    <div class="findPassword">
      <div class="closeHeader">
        <img @click="closeFindpassword" src="../../assets/images/back.png" alt="back">
        忘记密码
      </div>
      <img class="loginbg" src="../../assets/images/loginBg.png" alt="loginbg">
      <div class="findPasswordForm">
        <input class="icon-username" type="text" placeholder="请输入手机号码">
        <input class="icon-vscode" type="vscode" placeholder="请输入验证码">
        <input class="icon-password" type="password" placeholder="请输入新密码">
        <div class="findPasswordbtn icon-loginbtn">提 交</div>
        <div class="getVscodeBtn" @click="countDown">{{ content }}</div>
      </div>
    </div>
</template>
<script>
// import { mapActions, mapGetters } from 'vuex'
export default {
  //   computed: {
  //     ...mapGetters('login', ['formData'])
  //   },
  //   methods: {
  //     ...mapActions('login', ['submit'])
  //   }
  data () {
    return {
      content: '发送验证码',
      totalTime: 60,
      canClick: true
    }
  },
  methods: {
    countDown () {
      if (!this.canClick) return
      this.canClick = false
      this.content = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '发送验证码'
          this.totalTime = 60
          this.canClick = true
        }
      }, 1000)
    },
    closeFindpassword () {
      this.$emit('callBack')
    }
  }
}
</script>
<style scoped lang="scss">
.findPassword {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #ffffff;
  z-index: 10;
  .closeHeader{
    height: 113px;
    line-height: 113px;
    text-align: center;
    padding: 0 27px;
    position: relative;
    z-index: 11;
    font-size: 30px;
    img{
      width: 22px;
      height: 41px;
      position: absolute;
      top: 50%;
      left: 27px;
      margin-top: -20.5px;
    }
  }
  .loginbg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
  .findPasswordForm {
    width: 100%;
    position: absolute;
    top: 640px;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    input {
      width: 60%;
      height: 100px;
      line-height: 100px;
      border: none;
      border-bottom: 1px solid #dcdcdc;
      color: #dcdcdc;
      margin-bottom: 10px;
      background-repeat: no-repeat;
      background-position: 5% center;
      background-size: 6%;
      padding-left: 10%;
    }
    .findPasswordbtn {
      width: 75%;
      height: 70px;
      line-height: 70px;
      text-align: center;
      color: #ffffff;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      font-size: 32px;
      letter-spacing: 20px;
      margin-top: 120px;
    }
    .getVscodeBtn {
      width: 170px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 15px;
      color: #dcdcdc;
      border: 2px solid #dcdcdc;
      position: absolute;
      top: 30px;
      right: 20%;
      font-size: 24px;
    }
  }
}
</style>
