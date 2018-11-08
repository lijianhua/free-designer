<template>
    <div class="designerDetail">
        <div class="closeHeader">
            <img @click="closeDetail" src="../../assets/images/back.png" alt="back">
            工作者详情
        </div>
        <div class="desingerInfo">
            <div class="header">
                <div class="header-img">
                    <img :src="userInfo.avatar" alt="avatar">
                </div>
                <div class="ownInfo">
                    <div>
                        <span class="name">{{ userInfo.name }}</span>
                        <span class="workExperience">{{ userInfo.career }}年工作经验</span>
                    </div>
                    <div class="address">
                        <img src="../../assets/images/address.png" alt="address">
                        <span>{{ userInfo.province }}。{{ userInfo.city }}</span>
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
                <div v-if="userInfo.role" class="skillSort">
                    <span v-for="(childItem, idx) in userInfo.role.split(',')" :key="idx">
                        【{{ childItem }}】
                    </span>
                </div>
                <div class="doSomething">
                    <p>{{ userInfo.desc }}</p>
                </div>
                <div class="worked">
                    <!-- <div>
                        <span>96%</span>
                        <span>工作完成率</span>
                    </div> -->
                    <div>
                        <span>{{ userInfo.apply_count }}</span>
                        <span>接单量</span>
                    </div>
                    <div>
                        <span>{{ userInfo.gallery_count }}</span>
                        <span>作品展示/套</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="history">
            <span>工作历史和反馈</span>
            <span @click="isShowBrowWork = true">作品浏览<strong>》</strong></span>
        </div>
        <mt-loadmore :top-method="getList" :bottom-method="load" :bottom-all-loaded="isLoadedAll" ref="loadmore">
            <div class="historyDesign" v-for="(item, index) in historyList" :key="index">
                <div class="title">{{ item.order }}</div>
                <div class="designInfo">
                    <!-- <div class="evaluate">
                        <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                        <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                        <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                        <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                        <img src="../../assets/images/homestart.png" alt="homestart">
                    </div> -->
                    <!-- <span class="score">5.00</span> -->
                    <span class="date">2018年08月</span>
                </div>
                <p class="talkAbout">{{ item.comment }}</p>
            </div>
        </mt-loadmore>
        <!-- 工作者作品 -->
        <mu-slide-left-transition>
            <browWork v-if="isShowBrowWork" @callBack='callBack'></browWork>
        </mu-slide-left-transition>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import browWork from './browWork'
export default {
  data () {
    return {
      isShowBrowWork: false,
      isLoadedAll: false
    }
  },
  props: ['detailData'],
  computed: {
    ...mapGetters('home', ['userInfo', 'historyList', 'historyPageInfo'])
  },
  async created () {
    this.getUserInfo(this.detailData)
  },
  methods: {
    ...mapActions('home', ['getUserInfo', 'getHistory', 'getMoreHistory']),
    closeDetail () {
      this.$emit('callBack')
    },
    callBack () {
      this.isShowBrowWork = false
    },
    async getList () {
      if (this.isLoadedAll) {
        this.isLoadedAll = false
      }
      const dataFrom = {
        user: this.detailData,
        status: 'finished'
      }
      await this.getHistory(dataFrom)
      this.$refs.loadmore.onTopLoaded()
    },
    async load () {
      if (this.historyPageInfo.page + 1 > this.historyPageInfo.total_page) {
        this.isLoadedAll = true
        return
      }
      let dataFrom = {
        user: this.detailData,
        status: 'finished'
      }
      if (this.historyPageInfo.page) {
        dataFrom.page = this.historyPageInfo.page + 1
      }
      await this.getMoreHistory(dataFrom)
      this.$refs.loadmore.onBottomLoaded()
    }
  },
  components: {
    browWork
  }
}
</script>

<style scoped lang="scss">
.designerDetail {
  width: 100%;
  height: calc(100% - 100px);
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
  z-index: 10;
  .closeHeader{
    height: 113px;
    line-height: 113px;
    text-align: center;
    padding: 0 27px;
    position: relative;
    font-size: 44px;
    img{
        width: 22px;
        height: 41px;
        position: absolute;
        top: 50%;
        left: 27px;
        margin-top: -20.5px;
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
  .history{
    padding: 20px 10px 20px 50px;
    background-color: #f0f0f0;
    font-size: 26px;
    display: flex;
    justify-content: space-between;
    strong{
        font-weight: normal;
        margin-left: 18px;
    }
  }
  .historyDesign{
    padding: 20px 50px;
    border-bottom: 3px solid #ebebeb;
    .title{
        line-height: 50px;
        font-size: 26px;
    }
    .designInfo{
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        align-content: center;
        .evaluate{
            width: 125px;
            height: 25px;
            display: flex;
            align-content: center;
            img{
                width: 25px;
                height: 25px;
            }
        }
        .score{
            font-size: 22px;
            margin-left: 25px;
            margin-right: 25px;
        }
        .date{
            font-size: 22px;
            color: #909090;
        }
    }
    .talkAbout{
        color: #909090;
        line-height: 35px;
        font-size: 20px;
    }
  }
}
</style>
