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
                <img src="../../assets/images/filter9.png" alt="filter9">
                <p>软装配饰</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter10.png" alt="filter10">
                <p>平面规划</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter11.png" alt="filter11">
                <p>灯光设计</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter12.png" alt="filter12">
                <p>弱电智能</p>
            </div>
        </div>
        <div v-show="isShowMoreFilter" class="filter-container">
            <div class="filterBox">
                <img src="../../assets/images/filter13.png" alt="filter13">
                <p>声学设计</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter14.png" alt="filter14">
                <p>水系统</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter15.png" alt="filter15">
                <p>暖通系统</p>
            </div>
            <div class="filterBox">
                <img src="../../assets/images/filter16.png" alt="filter16">
                <p>风水设计</p>
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
                <mu-select v-model="selectFilter">
                    <mu-option v-for="option in fliterOtions" :key="option" :label="option" :value="option"></mu-option>
                </mu-select>
            </div>
        </div>
        <div @click="isShowDetail = true" class="desingerInfo">
            <div class="header">
                <div class="header-img">
                    <img src="../../assets/images/avatar.png" alt="avatar">
                </div>
                <div class="ownInfo">
                    <div>
                        <span class="name">豆豆</span>
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
        </div>
        <div class="bottomBg"></div>
        <!-- 工作者详情页 -->
        <mu-slide-left-transition>
            <designerDetail v-if="isShowDetail" :detailData='detailData' @callBack='callBack'></designerDetail>
        </mu-slide-left-transition>
    </div>
</template>

<script>
import designerDetail from './designerDetail'
export default {
  data () {
    return {
      isShowMoreFilter: false,
      sortOptions: ['最多浏览', '最多点赞', '最多下载'],
      selectSort: '最多浏览',
      fliterOtions: ['弱电系统', '项目经理', '施工图', '暖通系统', '强电系统', '风水设计', '短期雇佣', '软装配饰', '造价预算', '效果图', '消防报审图', '平面规划', '主案设计', '施组编制'],
      selectFilter: '弱电系统',
      detailData: 1,
      isShowDetail: false
    }
  },
  methods: {
    isShowMore () {
      this.isShowMoreFilter = !this.isShowMoreFilter
    },
    callBack () {
      this.isShowDetail = false
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
    padding: 29px 110px 0 110px;
    display: flex;
    justify-content: space-between;
    .filterBox {
      width: 100px;
      height: 162px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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
