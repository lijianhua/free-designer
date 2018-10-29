<template>
    <div class="product">
        <mt-swipe class="swiper" :auto="4000">
            <mt-swipe-item v-for="(item, index) in bannersList" :key="index">
                <img :src="item.pic" alt="banner">
            </mt-swipe-item>
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
                <mu-select v-if="showFilter" v-model="selectFilter">
                    <mu-option v-for="(option, index) in filtersList" :key="index" :label="option.name" :value="option.name"></mu-option>
                </mu-select>
            </div>
        </div>
        <div class="designBox">
            <div class="title">1000平米办公室项目</div>
            <div class="designImg" @click="isShowDetail = true">
                <img src="../../assets/images/designImg.png" alt="designImg">
            </div>
            <div class="designInfo">
                <div class="price">本案授权 39积分/套</div>
                <div class="clickGood">
                    <img src="../../assets/images/good.png" alt="good">
                    <span>587</span>
                    <img src="../../assets/images/talk.png" alt="talk">
                    <span>6</span>
                </div>
            </div>
        </div>
        <!-- 作品详情 -->
        <mu-slide-left-transition>
            <productDetail v-if="isShowDetail" :detailData='detailData' @callBack='callBack'></productDetail>
        </mu-slide-left-transition>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import productDetail from './productDetail'
export default {
  data () {
    return {
      sortOptions: ['最多浏览', '最多点赞', '最多下载'],
      selectSort: '最多浏览',
      selectFilter: '',
      detailData: 1,
      isShowDetail: false,
      showFilter: false
    }
  },
  computed: {
    ...mapGetters('home', ['bannersList', 'filtersList'])
  },
  async created () {
    this.getBanners()
    await this.getFilters()
    this.selectFilter = this.filtersList[0].name
    this.showFilter = true
  },
  methods: {
    ...mapActions('home', ['getBanners', 'getFilters']),
    callBack () {
      this.isShowDetail = false
    }
  },
  components: {
    productDetail
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
    border-bottom: 3px solid #ebebeb;
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
  .designBox{
    border-bottom: 3px solid #ebebeb;
    .title{
        padding: 0 15px;
        line-height: 58px;
        color: #797979;
        font-size: 26px;
    }
    .designImg{
        img{
            width: 100%;
        }
    }
    .designInfo{
        padding: 0 15px;
        display: flex;
        justify-content: space-between;
        .price{
            line-height: 58px;
            color: #797979;
            font-size: 26px;
        }
        .clickGood{
            display: flex;
            align-items: center;
            img{
                width: 26px;
                height: 26px;
            }
            span{
                margin-left: 15px;
                margin-right: 50px;
                color: #797979;
                font-size: 26px;
            }
        }
    }
  }
}
</style>
