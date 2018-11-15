<template>
    <div class="browWork">
        <div class="closeHeader">
            <img @click="$router.push({name: 'home'})" src="../../assets/images/back.png" alt="back">
            <h3>作品浏览页</h3>
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
                        <span>{{ userInfo.province }} {{ userInfo.city }}</span>
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
            <span @click="$router.push({name: 'designerDetail',params: { userid: userid } })"><strong>《</strong>工作历史和反馈</span>
            <span>作品浏览</span>
        </div>
        <mt-loadmore :top-method="getList" :bottom-method="load" :bottom-all-loaded="isLoadedAll" ref="loadmore">
            <div class="designBox" v-for="(item, index) in pictureList" :key="index">
                <div class="title">{{ item.name }}</div>
                <div class="designImg" @click="showDetail(item)">
                    <img :src="item.thumb" alt="designImg">
                </div>
                <div class="designInfo">
                    <!-- <div class="price">本案授权 39积分/套</div> -->
                    <div class="clickGood">
                        <img @click="clickLike({id: item.id, index: index})" src="../../assets/images/good.png" alt="good">
                        <span>{{ item.like_count }}</span>
                        <!-- <img src="../../assets/images/talk.png" alt="talk"> -->
                        <!-- <span>6</span> -->
                    </div>
                </div>
            </div>
        </mt-loadmore>
        <div class="noData" v-show="pictureList.length == 0">暂无数据</div>
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
    ...mapGetters('home', ['userInfo', 'pictureList', 'picturePageInfo'])
  },
  created () {
    this.userid = this.$route.params.userid
    this.getUserInfo(this.userid)
    this.getList()
  },
  methods: {
    ...mapActions('home', ['getUserInfo', 'getPicture', 'getMorePicture', 'clickLike']),
    async getList () {
      if (this.isLoadedAll) {
        this.isLoadedAll = false
      }
      let dataForm = {
        userid: this.userid
      }
      await this.getPicture(dataForm)
      if (this.firstIn) {
        this.firstIn = false
      }
      this.$refs.loadmore.onTopLoaded()
    },
    async load () {
      if (this.firstIn) {
        return
      }
      let dataForm = {
        userid: this.userid
      }
      if (this.picturePageInfo.page + 1 > this.picturePageInfo.total_page) {
        this.isLoadedAll = true
        return
      }
      if (this.picturePageInfo.page) {
        dataForm.page = this.picturePageInfo.page + 1
      }
      await this.getMorePicture(dataForm)
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
.browWork {
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
    padding: 20px 50px 20px 5px;
    background-color: #f0f0f0;
    font-size: 26px;
    display: flex;
    justify-content: space-between;
    span{
        strong{
            font-weight: normal;
            margin-right: 18px;
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
