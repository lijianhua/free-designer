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
import { toLogin } from '../../api/login'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
    console.info(toLogin)
  },
  methods: {
    // 登录
    loginIn () {
      console.info(this.username, this.password)
      const data = {
        mobile: this.username,
        password: this.password
      }
      toLogin(data)
        .then((res) => {
          console.info(res)
        })
      // this.$router.push({ path: '/home' })
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
        top: 640px;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        input{
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
        .loginbtn{
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
      }
    }
</style>
