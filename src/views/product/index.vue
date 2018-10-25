<template>
    <div class="product">
        <mt-swipe class="swiper" :auto="4000">
            <mt-swipe-item><img src="../../assets/images/banner/banner1.png" alt="banner1"></mt-swipe-item>
            <mt-swipe-item><img src="../../assets/images/banner/banner2.png" alt="banner2"></mt-swipe-item>
            <mt-swipe-item><img src="../../assets/images/banner/banner3.png" alt="banner3"></mt-swipe-item>
            <mt-swipe-item><img src="../../assets/images/banner/banner4.png" alt="banner4"></mt-swipe-item>
            <mt-swipe-item><img src="../../assets/images/banner/banner5.png" alt="banner5"></mt-swipe-item>
        </mt-swipe>
        <div class="selectFilter">
            <div class="sortFilter">
                <span>排序</span>
                <mu-select v-model="selectSort">
                    <mu-option v-for="option in sortOptions" :key="option" :label="option" :value="option"></mu-option>
                </mu-select>
            </div>
            <div class="sortFilter">
                <span>筛选</span>
                <mu-select v-model="selectFilter">
                    <mu-option v-for="option in fliterOtions" :key="option" :label="option" :value="option"></mu-option>
                </mu-select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      sortOptions: ['最多浏览', '最多点赞', '最多下载'],
      selectSort: '最多浏览',
      fliterOtions: ['弱电系统', '项目经理', '施工图', '暖通系统', '强电系统', '风水设计', '短期雇佣', '软装配饰', '造价预算', '效果图', '消防报审图', '平面规划', '主案设计', '施组编制'],
      selectFilter: '弱电系统'
    }
  }
}
</script>

<style scoped lang="scss">
.product {
  .swiper {
    height: 309px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .selectFilter{
    padding: 0 90px;
    height: 68px;
    line-height: 68px;
    // border-top: 3px solid #ebebeb;
    display: flex;
    justify-content: space-between;
    .sortFilter{
        span{
            font-size: 24px;
            margin-right: 40px;
            color: #808080;
        }
    }
  }
}
</style>
