<template>
    <div class="mobileLayout">
        <router-view></router-view>
        <div class="tabBar">
            <router-link to="/m/home">
                <img v-show="!isNowUrl('home')" src="../../../assets/images/icon_home_normal.png" alt="home">
                <img v-show="isNowUrl('home')" src="../../../assets/images/icon_home_click.png" alt="home-hover">
                <div>首页</div>
            </router-link>
            <router-link to="/m/apply">
                <img v-show="!isNowUrl('apply')" src="../../../assets/images/icon_apply_normal.png" alt="apply">
                <img v-show="isNowUrl('apply')" src="../../../assets/images/icon_apply_click.png" alt="apply-hover">
                <div>需求池</div>
            </router-link>
            <router-link to="/m/order">
                <img v-show="!isNowUrl('order')" src="../../../assets/images/icon_demand_normal.png" alt="order">
                <img v-show="isNowUrl('order')" src="../../../assets/images/icon_demand_click.png" alt="order-hover">
                <div>订单</div>
            </router-link>
            <router-link to="/m/my">
                <img v-show="!isNowUrl('my')" src="../../../assets/images/icon_my_normal.png" alt="my">
                <img v-show="isNowUrl('my')" src="../../../assets/images/icon_my_click.png" alt="my-hover">
                <div>个人中心</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    // 判断当前位置
    isNowUrl (url) {
      if (this.$route.path.indexOf(url) === -1) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .mobileLayout{
        height: 100%;
        .tabBar{
            height: 2.5rem;
            width: 100%;
            position: fixed;
            bottom: 0;
            color: #666;
            font-size: .5rem;
            background: #fafafa;
            display: flex;
            justify-content: space-around;
            align-items: center;
            a{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img{
                    width: 1.2rem;
                    height: 1.2rem;
                    margin-bottom: 0.2rem;
                }
            }
        }
    }
</style>
