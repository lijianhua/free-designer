<template>
    <div class="home">
        <mt-swipe class="swiper" :auto="4000">
            <mt-swipe-item><img src="../../assets/images/banner/banner5.png" alt="banner5"></mt-swipe-item>
            <mt-swipe-item><img src="../../assets/images/banner/banner4.png" alt="banner4"></mt-swipe-item>
            <mt-swipe-item><img src="../../assets/images/banner/banner3.png" alt="banner3"></mt-swipe-item>
            <mt-swipe-item><img src="../../assets/images/banner/banner2.png" alt="banner2"></mt-swipe-item>
            <mt-swipe-item><img src="../../assets/images/banner/banner1.png" alt="banner1"></mt-swipe-item>
        </mt-swipe>
        <div class="filter-container">
            <div class="filterBox">
                <img src="../../assets/images/filter1.png" alt="filter1">
                <p>主案设计</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter2.png" alt="filter2">
                <p>效果图</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter3.png" alt="filter3">
                <p>施工图</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter4.png" alt="filter4">
                <p>预算定额</p>
            </div>
        </div>
        <div class="filter-container">
            <div class="filterBox">
                <img src="../../assets/images/filter5.png" alt="filter5">
                <p>施组编制</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter6.png" alt="filter6">
                <p>项目经理</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter7.png" alt="filter7">
                <p>消防报警</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter8.png" alt="filter8">
                <p>电气系统</p>
            </div>
        </div>
        <div v-show="isShowMoreFilter" class="filter-container">
            <div class="filterBox">
                <img src="../../assets/images/filter1.png" alt="filter1">
                <p>主案设计</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter2.png" alt="filter2">
                <p>效果图</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter3.png" alt="filter3">
                <p>施工图</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter4.png" alt="filter4">
                <p>预算定额</p>
            </div>
        </div>
        <div v-show="isShowMoreFilter" class="filter-container">
            <div class="filterBox">
                <img src="../../assets/images/filter5.png" alt="filter5">
                <p>施组编制</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter6.png" alt="filter6">
                <p>项目经理</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter7.png" alt="filter7">
                <p>消防报警</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter8.png" alt="filter8">
                <p>电气系统</p>
            </div>
        </div>
        <div class="clickMore">
            <span @click="isShowMore">更多 >></span>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isShowMoreFilter: false
    }
  },
  methods: {
    isShowMore () {
      this.isShowMoreFilter = !this.isShowMoreFilter
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  .swiper {
    height: 308px;
    img {
      width: 100%;
    }
  }
  .filter-container {
    padding: 30px 95px 0 95px;
    display: flex;
    justify-content: space-between;
    .filterBox {
      width: 100px;
      height: 150px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
      }
      p {
        text-align: center;
        font-size: 24px;
        line-height: 70px;
      }
    }
  }
  .clickMore {
    height: 24px;
    padding: 0 95px;
    span {
      font-size: 24px;
      line-height: 24px;
      color: #9e9e9e;
      float: right;
    }
  }
}
</style>
