<template>
    <div class="designerDetail">
        <div class="closeHeader">
            <img @click="$router.push({name: 'home'})" src="../../assets/images/back.png" alt="back">
            <h3>工作者详情</h3>
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
                    <div v-if="userInfo.role" class="skillSort">
                        <span v-for="(childItem, idx) in userInfo.role.split(',')" :key="idx">
                            【{{ childItem }}】
                        </span>
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
                <div class="doSomething">
                    <p>{{ userInfo.desc }}</p>
                </div>
                <div class="worked">
                    <div>
                        <span>接单量</span>
                        {{ userInfo.apply_count }}
                    </div>
                    <div>
                        <span>作品展示/套</span>
                        {{ userInfo.gallery_count }}
                    </div>
                </div>
            </div>
        </div>
        <div class="history">
            <span>工作历史和反馈</span>
            <span @click="$router.push({name: 'browWork',params: { userid: userid } })">作品浏览<strong>》</strong></span>
        </div>
        <mt-loadmore :top-method="getList" :bottom-method="load" :bottom-all-loaded="isLoadedAll" :auto-fill="false" ref="loadmore">
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
        <div class="noData" v-show="historyList.length == 0">暂无数据</div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      isLoadedAll: false,
      userid: '',
      firstIn: true
    }
  },
  computed: {
    ...mapGetters('home', ['userInfo', 'historyList', 'historyPageInfo'])
  },
  created () {
    this.userid = this.$route.params.userid
    this.getUserInfo(this.userid)
    this.getList()
  },
  methods: {
    ...mapActions('home', ['getUserInfo', 'getHistory', 'getMoreHistory']),
    callBack () {
      this.isShowBrowWork = false
    },
    async getList () {
      if (this.isLoadedAll) {
        this.isLoadedAll = false
      }
      const dataFrom = {
        user: this.userid,
        status: 'finished'
      }
      await this.getHistory(dataFrom)
      if (this.firstIn) {
        this.firstIn = false
      }
      this.$refs.loadmore.onTopLoaded()
    },
    async load () {
      if (this.firstIn) {
        return
      }
      let dataFrom = {
        user: this.userid,
        status: 'finished'
      }
      if (this.historyPageInfo.page + 1 > this.historyPageInfo.total_page) {
        this.isLoadedAll = true
        return
      }
      if (this.historyPageInfo.page) {
        dataFrom.page = this.historyPageInfo.page + 1
      }
      await this.getMoreHistory(dataFrom)
      this.$refs.loadmore.onBottomLoaded()
    }
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
  overflow-y: auto;
  .closeHeader{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 113px;
    border-bottom: 3px solid #ededed;
    background-color: #fff;
    z-index: 2;
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
  .desingerInfo{
    margin-top: 113px;
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
                font-size: 24px;
                color: #808080;
            }
            .skillSort{
                margin-top: 20px;
                color: #4195f7;
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
                margin-right: 130px;
                span{
                    font-size: 20px;
                    line-height: 35px;
                    margin-right: 30px;
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
