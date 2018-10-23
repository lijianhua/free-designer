<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created () {
    const clientWidth = document.documentElement.clientWidth
    document.documentElement.style.fontSize = `${(clientWidth / 375) * 20}px`
  }
}
</script>

<style lang="scss">
html,body,#app {
  height: 100%;
}
</style>
