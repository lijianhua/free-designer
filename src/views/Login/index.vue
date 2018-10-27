<template>
    <div class="login">
      <img class="loginbg" src="../../assets/images/loginBg.png" alt="loginbg">
      <div class="loginForm">
        <input class="icon-username" type="text" v-model="formData.mobile" placeholder="请输入手机号码">
        <input class="icon-password" type="password" v-model="formData.password" placeholder="请输入密码">
        <div class="loginbtn icon-loginbtn" @click="submit($router)">登录</div>
        <div class="accound">
          <span @click="isShowRegister = true">账号注册 ></span> | <span @click="isShowFindpassword = true">找回密码 ></span>
        </div>
      </div>
      <!-- 账号注册 -->
      <mu-slide-left-transition>
        <register v-if="isShowRegister" @callBack='closeRegister'></register>
      </mu-slide-left-transition>
      <!-- 找回密码 -->
      <mu-slide-left-transition>
        <findPassword v-if="isShowFindpassword" @callBack='closeFindpassword'></findPassword>
      </mu-slide-left-transition>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import register from './register'
import findPassword from './findPassword'
export default {
  data () {
    return {
      isShowRegister: false,
      isShowFindpassword: false
    }
  },
  computed: {
    ...mapGetters('login', ['formData'])
  },
  methods: {
    ...mapActions('login', ['submit']),
    closeRegister () {
      this.isShowRegister = false
    },
    closeFindpassword () {
      this.isShowFindpassword = false
    }
  },
  components: {
    register,
    findPassword
  }
}
</script>
<style scoped lang="scss">
    .login{
      width: 100%;
      height: 100%;
      position: relative;
      background-color: #ffffff;
      .loginbg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
      }
      .loginForm{
        width: 100%;
        position: absolute;
        top: 640px;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 2;
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
        .accound{
          font-size: 26px;
          color: #a2a2a2;
          margin-top: 40px;
        }
      }
    }
</style>
