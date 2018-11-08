<template>
  <div class="work-container">
    <div class="header">
      <img @click="$router.push('my')" src="../../assets/images/back.png" alt="">
      <h3>我的作品</h3>
    </div>
    <div class="main">
      <mt-loadmore style="height:100%;" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" bottomPullText="" :auto-fill="false" ref="loadmore">
        <ul class="list">
          <li class="item" v-for="(item, index) in workList" :key="index">
            <div class="img">
              <img :src="item.thumb" alt="">
            </div>
            <div class="info">
              <div class="title">
                {{item.name}}
              </div>
              <div class="intro">
                {{item.desc}}
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
import Store from '@/store'
import { mapGetters, mapActions } from 'vuex'
export default {
  async beforeRouteEnter (to, from, next) {
    await Store.dispatch('my/getWorkList')
    next()
  },
  data () {
    return {
      allLoaded: false
    }
  },
  computed: {
    ...mapGetters('my', ['workList'])
  },
  methods: {
    ...mapActions('my', ['getWorkList']),
    async loadTop () {
      await this.getWorkList()
      this.$refs.loadmore.onTopLoaded()
    },
    async loadBottom () {
      await this.getWorkList(false)
      // this.allLoaded = true// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded()
    }
  }
}
</script>
<style lang="scss" scoped>
.work-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.header {
  position: relative;
  height: 113px;
  border-bottom: 10px solid #ededed;
  background-color: #fff;
  img{
    width: 22px;
    height: 41px;
    position: absolute;
    top: 50%;
    left: 27px;
    margin-top: -20.5px;
  }
  h3 {
    font-size: 46px;
    text-align: center;
    line-height: 113px;
  }
}
.main {
  flex: 1;
  padding-bottom: 100px;
  overflow: scroll;

  .list {

    .item {
      display: flex;
      padding-left: 50px;
      padding-right: 50px;
      margin-top: 30px;

      .img {
        width: 127px;
        height: 96px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        flex: 1;
        padding-left: 20px;

        .title {
          font-size: 24px;
          font-weight: bold;
        }

        .intro {
          line-height: 1.34;
          font-size: 20px;
          color: #808080;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
