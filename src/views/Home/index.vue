<template>
    <div class="home">
        <mt-swipe class="swiper" :auto="4000">
            <mt-swipe-item v-for="(item, index) in bannersList" :key="index">
                <img :src="item.pic" alt="banner">
            </mt-swipe-item>
        </mt-swipe>
        <div class="filter-container">
            <div v-for="(item, index) in filtersList" @click="clickFilters(item.id)" v-show="isCanShowAllFilters(index)" :key="index" class="filterBox">
                <img :src="item.pic" alt="filter">
                <p>{{ item.name }}</p>
            </div>
        </div>
        <div class="clickMore">
            <span @click="isShowMore">更多 >></span>
        </div>
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
                    <mu-option v-for="(option, index) in filtersList" :key="index" :label="option.name" :value="option.id"></mu-option>
                </mu-select>
            </div>
        </div>
        <div class="desingerContainer">
            <mt-loadmore :top-method="getList" :bottom-method="load" :bottom-all-loaded="isLoadedAll" ref="loadmore">
                <div class="desingerInfo" v-for="(item, index) in usersList" :key="index">
                    <div class="header">
                        <div @click="showDetail(item.id)" class="header-img">
                            <img :src="item.avatar" alt="avatar">
                        </div>
                        <div class="ownInfo">
                            <div>
                                <span @click="showDetail(item.id)" class="name">{{ item.name }}</span>
                                <span class="workExperience">{{ item.career }}年工作经验</span>
                            </div>
                            <div class="address">
                                <img src="../../assets/images/address.png" alt="address">
                                <span>{{ item.province }} {{ item.city }}</span>
                            </div>
                        </div>
                        <!-- <div class="evaluate">
                            <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                            <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                            <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                            <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                            <img src="../../assets/images/homestart.png" alt="homestart">
                        </div> -->
                    </div>
                    <div class="skill">
                        <div class="skillSort">
                            <span v-for="(childItem, idx) in item.role.split(',')" :key="idx">
                                【{{ childItem }}】
                            </span>
                        </div>
                        <div class="doSomething">
                            <p>{{ item.desc }}</p>
                        </div>
                        <div class="worked">
                            <!-- <div>
                                <span>96%</span>
                                <span>工作完成率</span>
                            </div> -->
                            <div>
                                <span>{{ item.apply_count }}</span>
                                <span>接单量</span>
                            </div>
                            <div>
                                <span>{{ item.gallery_count }}</span>
                                <span>作品展示/套</span>
                            </div>
                        </div>
                    </div>
                </div>
            </mt-loadmore>
            <div class="noData" v-show="usersList.length == 0">暂无数据</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      isShowMoreFilter: false,
      sortOptions: [{
        name: '最多接单',
        value: 'apply_count'
      }, {
        name: '最多作品',
        value: 'gallery_count'
      }],
      selectSort: 'apply_count',
      selectFilter: '',
      showFilter: true,
      isLoadedAll: false
    }
  },
  computed: {
    ...mapGetters('home', ['bannersList', 'filtersList', 'usersList', 'pageInfo'])
  },
  async created () {
    this.getBanners()
    await this.getFilters()
    this.selectFilter = this.filtersList[0].id
    this.getList()
  },
  methods: {
    ...mapActions('home', ['getBanners', 'getFilters', 'getUsers', 'getMoreUsers']),
    isShowMore () {
      this.isShowMoreFilter = !this.isShowMoreFilter
    },
    isCanShowAllFilters (index) {
      if (this.isShowMoreFilter) {
        return true
      } else {
        if (index > 7) {
          return false
        } else {
          return true
        }
      }
    },
    async getList () {
      if (this.isLoadedAll) {
        this.isLoadedAll = false
      }
      const dataForm = {
        role: this.selectFilter,
        sort_by: this.selectSort
      }
      await this.getUsers(dataForm)
      this.$refs.loadmore.onTopLoaded()
    },
    async load () {
      if (this.selectFilter === '') {
        return
      }
      if (this.pageInfo.page + 1 > this.pageInfo.total_page) {
        this.isLoadedAll = true
        return
      }
      const dataForm = {
        role: this.selectFilter,
        sort_by: this.selectSort,
        page: this.pageInfo.page + 1
      }
      await this.getMoreUsers(dataForm)
      this.$refs.loadmore.onBottomLoaded()
    },
    showDetail (userid) {
      this.$router.push({
        name: 'designerDetail',
        params: {
          userid: userid
        }
      })
    },
    clickFilters (id) {
      this.selectFilter = id
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  height: calc(100% - 100px);
  overflow-y: auto;
  .swiper {
    height: 309px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .filter-container {
    padding: 29px 95px 0 95px;
    display: flex;
    flex-wrap: wrap;

    .filterBox {
      width: 100px;
      height: 162px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 53.3333px;
      img {
        width: 80px;
        height: 80px;
      }
      p {
        margin-top: 24px;
        text-align: center;
        font-size: 24px;
        line-height: 29px;
      }
    }
    .filterBox:nth-child(4n+1){
        margin-left: 0;
    }
  }
  .clickMore {
    height: 24px;
    padding: 0 95px;
    margin-top: 10px;
    margin-bottom: 20px;
    span {
      font-size: 24px;
      line-height: 24px;
      color: #9e9e9e;
      float: right;
    }
  }
  .selectFilter{
    padding: 0 90px;
    height: 68px;
    line-height: 68px;
    border-top: 3px solid #ebebeb;
    display: flex;
    justify-content: space-between;
    .sortFilter{
        display: flex;
        align-content: center;
        .mu-input{
          margin-bottom: 0;
          padding-bottom: 0;
        }
        span{
            font-size: 24px;
            margin-right: 40px;
            color: #808080;
        }
    }
  }
  .desingerContainer{
    overflow-y: auto;
    height: calc(100% - 309px - 324px - 29px - 54px - 68px);
  }
  .desingerInfo{
    padding: 30px 50px;
    background-color: #f0f0f0;
    border-bottom: 5px solid #ffffff;
    .header{
        display: flex;
        align-items: center;
        position: relative;
        .header-img{
            width: 120px;
            height: 120px;
            overflow: hidden;
            border-radius: 50%;
            margin-right: 40px;
            img{
                width: 120px;
                height: 120px;
            }
        }
        .ownInfo{
            .name{
                font-size: 24px;
                margin-right: 35px;
            }
            .workExperience{
                font-size: 18px;
                color: #808080;
            }
            .address{
                img{
                    width: 17px;
                    height: 20px;
                    margin-right: 15px;
                    vertical-align: middle;
                }
                span{
                    font-size: 18px;
                    color: #808080;
                    line-height: 70px;
                }
            }
        }
        .evaluate{
            width: 125px;
            height: 25px;
            position: absolute;
            top: 8px;
            right: 0;
            img{
                width: 25px;
                height: 25px;
            }
        }
    }
    .skill{
        margin-top: 30px;
        .doSomething{
            margin-top: 10px;
            p{
                font-size: 20px;
                color: #808080;
                line-height: 35px;
            }
        }
        .worked{
            display: flex;
            margin-top: 20px;
            div{
                display: flex;
                flex-direction: column;
                margin-right: 80px;
                span{
                    font-size: 20px;
                    line-height: 35px;
                }
            }
        }
    }
  }
}
</style>
