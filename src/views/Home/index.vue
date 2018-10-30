<template>
    <div class="home">
        <mt-swipe class="swiper" :auto="4000">
            <mt-swipe-item v-for="(item, index) in bannersList" :key="index">
                <img :src="item.pic" alt="banner">
            </mt-swipe-item>
        </mt-swipe>
        <div class="filter-container">
            <div v-for="(item, index) in filtersList" v-show="isCanShowAllFilters(index)" :key="index" class="filterBox">
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
                <mu-select v-model="selectSort">
                    <mu-option v-for="option in sortOptions" :key="option" :label="option" :value="option"></mu-option>
                </mu-select>
            </div>
            <div class="sortFilter">
                <span>筛选</span>
                <mu-select v-if="showFilter" v-model="selectFilter" @change="getUsersList">
                    <mu-option v-for="(option, index) in filtersList" :key="index" :label="option.name" :value="option.id"></mu-option>
                </mu-select>
            </div>
        </div>
        <!-- <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
            <mu-list>
                <template v-for="i in num">
                <mu-list-item>
                    <mu-list-item-title>{{text}} Item {{i}}</mu-list-item-title>
                </mu-list-item>
                <mu-divider />
                </template>
            </mu-list>
        </mu-load-more> -->
        <!-- <div class="desingerInfo">
            <div class="header">
                <div @click="isShowDetail = true" class="header-img">
                    <img src="../../assets/images/avatar.png" alt="avatar">
                </div>
                <div class="ownInfo">
                    <div>
                        <span @click="isShowDetail = true" class="name">豆豆</span>
                        <span class="workExperience">五年工作经验</span>
                    </div>
                    <div class="address">
                        <img src="../../assets/images/address.png" alt="address">
                        <span>北京。丰台</span>
                    </div>
                </div>
                <div class="evaluate">
                    <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                    <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                    <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                    <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                    <img src="../../assets/images/homestart.png" alt="homestart">
                </div>
            </div>
            <div class="skill">
                <div class="skillSort">
                    <span>【主案设计】【平面规划】【深化施工图】</span>
                </div>
                <div class="doSomething">
                    <p>主要承接办公室设计，以及平面规划方案，从规划开始满足甲方的设计需求。并能提高其企业管理效率，对施工工艺比较了解，能独立完成施工图纸。</p>
                </div>
                <div class="worked">
                    <div>
                        <span>96%</span>
                        <span>工作完成率</span>
                    </div>
                    <div>
                        <span>31</span>
                        <span>接单量</span>
                    </div>
                    <div>
                        <span>33</span>
                        <span>作品展示/套</span>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="bottomBg"></div>
        <!-- 工作者详情页 -->
        <mu-slide-left-transition>
            <designerDetail v-if="isShowDetail" :detailData='detailData' @callBack='callBack'></designerDetail>
        </mu-slide-left-transition>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import designerDetail from './designerDetail'
export default {
  data () {
    return {
      isShowMoreFilter: false,
      sortOptions: ['最多浏览', '最多点赞', '最多下载'],
      selectSort: '最多浏览',
      selectFilter: '',
      detailData: 1,
      isShowDetail: false,
      showFilter: false
    }
  },
  computed: {
    ...mapGetters('home', ['bannersList', 'filtersList', 'usersList'])
  },
  async created () {
    this.getBanners()
    await this.getFilters()
    this.selectFilter = this.filtersList[0].id
    this.showFilter = true
    this.getUsersList()
  },
  methods: {
    ...mapActions('home', ['getBanners', 'getFilters', 'getUsers']),
    isShowMore () {
      this.isShowMoreFilter = !this.isShowMoreFilter
    },
    callBack () {
      this.isShowDetail = false
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
    getUsersList () {
      const dataFrom = {
        role: this.selectFilter
      }
      this.getUsers(dataFrom)
    }
  },
  components: {
    designerDetail
  }
}
</script>

<style scoped lang="scss">
.home {
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
        span{
            font-size: 24px;
            margin-right: 40px;
            color: #808080;
        }
    }
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
  .bottomBg{
    height: 200px;
    background-color: #f0f0f0;
  }
}
</style>
