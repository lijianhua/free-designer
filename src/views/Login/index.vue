<template>
    <div class="login">
        <h1 @click="loginIn">点击登录</h1>
        <div class="mobileLogin" v-if="isMobileBorwser">
            mobile登录
        </div>
        <div v-if="!isMobileBorwser">
            pc登录
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isMobileBorwser: true
    }
  },
  created () {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.isMobileBorwser = true
      const clientWidth = document.documentElement.clientWidth
      document.documentElement.style.fontSize = `${(clientWidth / 375) * 20}px`
    } else {
      this.isMobileBorwser = false
    }
  },
  methods: {
    // 登录
    loginIn () {
      console.info(this.isMobileBorwser)
      if (this.isMobileBorwser) {
        this.$router.push({ path: '/m/home' })
      } else {
        this.$router.push({ path: '/home' })
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .mobileLogin{

    }
</style>
