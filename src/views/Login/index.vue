<template>
    <div class="login">
        <img class="loginbg" src="../../assets/images/loginBg.png" alt="loginbg">
        <div class="loginForm">
          <input type="text" v-model="username" placeholder="请输入手机号码">
          <input type="password" v-model="password" placeholder="请输入密码">
          <button @click="loginIn">登录</button>
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
        position: absolute;
        top: 30rem;
        left: 0;
        input{
          width:
        }
      }
    }
</style>
