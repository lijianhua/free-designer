<template>
    <div class="login">
        <img class="loginbg" src="../../assets/images/loginBg.png" alt="loginbg">
        <div class="loginForm">
          <input class="icon-username" type="text" v-model="username" placeholder="请输入手机号码">
          <input class="icon-password" type="password" v-model="password" placeholder="请输入密码">
          <div class="loginbtn icon-loginbtn" @click="loginIn">登录</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
  },
  methods: {
    // 登录
    loginIn () {
      console.info(this.username, this.password)
      this.$router.push({ path: '/home' })
    }
  }
}
</script>

<style scoped lang="scss">
    .login{
      position: relative;
      .loginbg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: -1;
      }
      .loginForm{
        width: 100%;
        position: absolute;
        top: 16rem;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        input{
          width: 60%;
          height: 2rem;
          line-height: 2rem;
          border: none;
          border-bottom: 1px solid #dcdcdc;
          color: #dcdcdc;
          margin-bottom: 1rem;
          background-repeat: no-repeat;
          background-position: 5% center;
          background-size: 6%;
          padding-left: 10%;
        }
        .loginbtn{
          width: 75%;
          height: 2rem;
          line-height: 2rem;
          text-align: center;
          color: #ffffff;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          font-size: 0.8rem;
          letter-spacing: 0.5rem;
          margin-top: 2.25rem;
        }
      }
    }
</style>
