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
                <mu-select v-model="selectSort" @change="getList">
                    <mu-option v-for="(option, index) in sortOptions" :key="index" :label="option.name" :value="option.value"></mu-option>
                </mu-select>
            </div>
            <div class="sortFilter">
                <span>筛选</span>
                <mu-select v-if="showFilter" v-model="selectFilter" @change="getList">
                    <mu-option v-for="(option, index) in filtersList" :key="index" :label="option.name" :value="option.name"></mu-option>
                </mu-select>
            </div>
        </div>
        <div class="productBox">
            <mt-loadmore :top-method="getList" :bottom-method="load" :bottom-all-loaded="isLoadedAll" ref="loadmore">
                <div class="designBox" v-for="(item, index) in productList" :key="index">
                    <div class="title">{{ item.name }}</div>
                    <div class="designImg" @click="showDetail(item)">
                        <img :src="item.thumb" alt="designImg">
                    </div>
                    <div class="designInfo">
                        <!-- <div class="price">本案授权 39积分/套</div> -->
                        <div class="clickGood">
                            <img src="../../assets/images/good.png" alt="good">
                            <span>{{ item.like_count }}</span>
                            <!-- <img src="../../assets/images/talk.png" alt="talk"> -->
                            <!-- <span>6</span> -->
                        </div>
                    </div>
                </div>
            </mt-loadmore>
            <div class="noData" v-show="productList.length == 0">暂无数据</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      sortOptions: [{
        name: '最多浏览',
        value: 'view_count'
      }, {
        name: '最多点赞',
        value: 'like_count'
      }, {
        name: '最多下载',
        value: 'download_count'
      }],
      selectSort: 'view_count',
      selectFilter: '',
      showFilter: false,
      isLoadedAll: false
    }
  },
  computed: {
    ...mapGetters('product', ['bannersList', 'filtersList', 'productList', 'proPageInfo'])
  },
  async created () {
    this.getBanners()
    await this.getFilters()
    this.selectFilter = this.filtersList[0].name
    this.showFilter = true
    this.getList()
  },
  methods: {
    ...mapActions('product', ['getBanners', 'getFilters', 'getProducts', 'getMoreProducts']),
    async getList () {
      if (this.isLoadedAll) {
        this.isLoadedAll = false
      }
      const dataFrom = {
        role: this.selectFilter,
        sort_by: this.selectSort
      }
      await this.getProducts(dataFrom)
      this.$refs.loadmore.onTopLoaded()
    },
    async load () {
      if (this.selectFilter === '') {
        return
      }
      if (this.proPageInfo.page + 1 > this.proPageInfo.total_page) {
        this.isLoadedAll = true
        return
      }
      const dataFrom = {
        page: this.proPageInfo.page + 1,
        role: this.selectFilter,
        sort_by: this.selectSort
      }
      await this.getMoreProducts(dataFrom)
      this.$refs.loadmore.onBottomLoaded()
    },
    showDetail (item) {
      this.$router.push({
        name: 'productDetail',
        params: {
          userid: item.uid,
          galleryid: item.id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.product {
  height: calc(100% - 100px);
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
  .productBox{
    overflow-y: auto;
    height: calc(100% - 309px - 68px);
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
      height: 438px;
      display: flex;
      justify-content: center;
      img{
        height: 438px;
      }
    }
    .designInfo{
        padding: 0 15px;
        display: flex;
        justify-content: flex-end;
        // justify-content: space-between;
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
