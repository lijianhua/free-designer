<template>
    <div class="productDetail" >
        <div class="closeHeader">
            <img @click="$router.back()" src="../../assets/images/back.png" alt="back">
            <h3>作品详情</h3>
        </div>
        <div class="detailContainer">
            <div class="desingerInfo">
                <div class="header">
                    <div class="header-img">
                        <img :src="userDetail.avatar" alt="avatar">
                    </div>
                    <div class="ownInfo">
                        <div>
                            <span class="name">{{ userDetail.name }}</span>
                            <span class="workExperience">{{ userDetail.career }}年工作经验</span>
                        </div>
                        <div v-if="userDetail.role" class="skillSort">
                            <span v-for="(childItem, idx) in userDetail.role.split(',')" :key="idx">
                                【{{ childItem }}】
                            </span>
                        </div>
                    </div>
                    <div class="evaluate">
                        <!-- <div class="follow">关注</div> -->
                        <!-- <div class="followed">已关注</div> -->
                        <!-- <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                        <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                        <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                        <img src="../../assets/images/homestartlight.png" alt="homestartlight">
                        <img src="../../assets/images/homestart.png" alt="homestart"> -->
                    </div>
                </div>
                <div class="skill">
                    <div class="title">
                        <span>{{ galleryUserInfo.name }}</span>
                        <div class="talk-good">
                            <img @click="clickLike(galleryUserInfo.id)" src="../../assets/images/good.png" alt="good">
                            <span>{{ galleryUserInfo.like_count }}</span>
                        </div>
                    </div>
                    <div class="doSomething">
                        <p>{{ galleryUserInfo.desc }}</p>
                    </div>
                </div>
            </div>
            <div class="productInfo">
                <!-- <p class="warn">压缩包内包含（注 : 请在PC端下载）</p>
                <p class="intro"><span>高清图纸13张</span><span>全部3D模型</span><span>全套施工图</span></p>
                <div class="rarFiles">
                    <img src="../../assets/images/rar.png" alt="rar">
                    <span>1000平米办公室.rar</span>
                </div> -->
                <div class="swiperBox">
                    <mt-swipe class="swiper-product" :auto="0" :showIndicators="false" @change="handleChange">
                        <mt-swipe-item class="swiperItem" v-for="(item, index) in galleryList" :key="index">
                            <img :src="item.mid_image" alt="jiaju">
                        </mt-swipe-item>
                    </mt-swipe>
                    <div class="dicators">
                        {{ nowDicator + ' / ' + allPicture}}
                    </div>
                </div>
                <!-- <div class="todos">
                    <div>
                        <img src="../../assets/images/shareIcon.png" alt="shareIcon">
                        <span>66</span>
                    </div>
                    <div>
                        <img src="../../assets/images/collect.png" alt="collect">
                        <span>77</span>
                    </div>
                    <div>
                        <img src="../../assets/images/talk.png" alt="talk">
                        <span>99</span>
                    </div>
                    <div>
                        <img src="../../assets/images/good.png" alt="good">
                        <span>88</span>
                    </div>
                </div> -->
                <div class="talk">
                    <mt-loadmore :top-method="getList" :bottom-method="load" :bottom-all-loaded="isLoadedAll" :auto-fill="false" ref="loadmore">
                        <div class="talkBox" v-for="(item, index) in galleryCommentList" :key="index">
                            <div class="talk-headImg">
                                <img :src="item.user_avatar" alt="avatar">
                            </div>
                            <div class="talk-content">
                                <div>
                                    <p class="talkerName">{{ item.username }}</p>
                                    <div class="talkerContent">
                                        <p>{{ item.content }}</p>
                                    </div>
                                </div>
                                <!-- <div class="talk-good">
                                    <img src="../../assets/images/good.png" alt="good">
                                    <span>{{ item.like_count }}</span>
                                </div> -->
                            </div>
                        </div>
                    </mt-loadmore>
                    <div class="noData" v-show="galleryCommentList.length == 0">暂无数据</div>
                </div>
            </div>
        </div>
        <div class="DetailFooter">
            <input type="text" placeholder="添加评论" v-model="commentValue">
            <img @click="addComment" src="../../assets/images/sendto.png" alt="sendto">
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      allPicture: 0,
      nowDicator: 0,
      isLoadedAll: false,
      commentValue: '',
      firstIn: true
    }
  },
  computed: {
    ...mapGetters('productDetail', ['galleryUserInfo', 'galleryList', 'galleryCommentList', 'commentPageInfo', 'userDetail']),
    ...mapGetters(['userInfo'])
  },
  async created () {
    this.userid = this.$route.params.userid
    this.galleryid = this.$route.params.galleryid
    const dataForm = {
      user: this.userid,
      gallery: this.galleryid
    }
    await this.getUserInfo(dataForm)
    await this.getGalleryList(dataForm)
    this.getUserDetail(this.userid)
    this.allPicture = this.galleryList.length
    this.nowDicator = this.galleryList.length > 0 ? 1 : 0
    this.getList()
  },
  methods: {
    ...mapActions('productDetail', ['getUserInfo', 'getGalleryList', 'getCommentList', 'getMoreComment', 'addGalleryComment', 'getUserDetail', 'clickLike']),
    handleChange (index) {
      this.nowDicator = index + 1
    },
    async getList () {
      if (this.isLoadedAll) {
        this.isLoadedAll = false
      }
      const dataForm = {
        user: this.userid,
        gallery: this.galleryid
      }
      if (this.firstIn) {
        this.firstIn = false
      }
      await this.getCommentList(dataForm)
      this.$refs.loadmore.onTopLoaded()
    },
    async load () {
      if (this.firstIn) {
        return
      }
      if (this.commentPageInfo.page + 1 > this.commentPageInfo.total_page) {
        this.isLoadedAll = true
        return
      }
      let dataFrom = {
        user: this.userid,
        gallery: this.galleryid
      }
      if (this.commentPageInfo.page) {
        dataFrom.page = this.commentPageInfo.page + 1
      }
      await this.getMoreComment(dataFrom)
      this.$refs.loadmore.onBottomLoaded()
    },
    async addComment () {
      if (!this.userInfo) {
        this.$router.push({
          name: 'login'
        })
        return
      }
      const dataFrom = {
        uid: this.userInfo.id,
        content: this.commentValue,
        gallery: this.galleryid
      }
      await this.addGalleryComment(dataFrom)
      this.commentValue = ''
      this.getList()
    }
  }
}
</script>
<style scoped lang="scss">
.productDetail {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
  z-index: 10;
  .closeHeader{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 113px;
    border-bottom: 3px solid #ededed;
    background-color: #fff;
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
  .detailContainer{
    margin-top: 113px;
    height: calc(100% - 113px - 67px);
    overflow-y: auto;
    .desingerInfo{
        border-bottom: 5px solid #ffffff;
        .header{
            display: flex;
            align-items: center;
            position: relative;
            background-color: #f0f0f0;
            padding: 15px 50px 20px 50px;
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
                height: 25px;
                position: absolute;
                top: 8px;
                right: 0;
                display: flex;
                img{
                    width: 25px;
                    height: 25px;
                }
                div{
                    padding: 0 15px;
                    height: 27px;
                    line-height: 27px;
                    text-align: center;
                    border-radius: 15px;
                    font-size: 14px;
                    margin-right: 22px;
                }
                .follow{
                    color: #f1768f;
                    border: 1px solid #f1768f;
                }
                .followed{
                    color: #c8c6c6;
                    border: 1px solid #c8c6c6;
                }
            }
        }
        .skill{
            background-color: #f0f0f0;
            padding: 15px 50px 20px 50px;
            margin-top: 10px;
            .doSomething{
                margin-top: 10px;
                p{
                    font-size: 20px;
                    color: #808080;
                    line-height: 35px;
                }
            }
            .title{
                display: flex;
                justify-content: space-between;
            }
            .talk-good{
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 27px;
                    height: 27px;
                }
                span{
                    color: #808080;
                    font-size: 24px;
                    margin-left: 10px;
                }
            }
        }
    }
    .productInfo{
        padding: 15px 50px 0px 50px;
        .warn{
            font-size: 19px;
            line-height: 29px;
        }
        .intro{
            font-size: 20px;
            line-height: 32px;
            color: #848484;
            span{
                margin-right: 12px;
            }
        }
        .rarFiles{
            margin-top: 16px;
            margin-bottom: 25px;
            font-size: 19px;
            color: #848484;
            img{
                width: 29px;
                height: 21px;
                margin-right: 15px;
            }
        }
        .swiperBox{
            position: relative;
            .swiper-product{
                width: 100%;
                height: 440px;
                background-color: #616161;
                img{
                    height: 100%;
                    display: block;
                    margin:  0 auto;
                }
            }
            .dicators{
                color: #ffffff;
                font-size: 24px;
                position: absolute;
                right: 15px;
                bottom: 15px;
            }
        }
        .todos{
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
            div{
                margin-right: 17px;
                img{
                    width: 27px;
                    height: 27px;
                }
                span{
                    color: #8a96ba;
                    font-size: 16px;
                    height: 27px;
                    vertical-align: top;
                    margin-left: 2px;
                    line-height: 17px;
                }
            }
        }
        .talk{
            .talkBox{
                margin-top: 40px;
                display: flex;
                .talk-headImg{
                    width: 77px;
                    height: 77px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 30px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .talk-content{
                    display: flex;
                    width: 543px;
                    font-size: 24px;
                    align-items: flex-start;
                    .talkerName{
                        color: #848484;
                        margin-bottom: 14px;
                    }
                    .talkerContent{
                        p{
                            line-height: 32px;
                            width: 450px;
                            display: inline-block;
                            word-wrap: break-word;
                        }
                    }
                    .talk-good{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            width: 27px;
                            height: 27px;
                        }
                        span{
                            color: #808080;
                            font-size: 24px;
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
    }
  }
  .DetailFooter{
    padding: 0px 50px 21px 50px;
    height: 43px;
    input{
        width: 580px;
        line-height: 43px;
        border: none;
        border-bottom: 3px solid #848484;
    }
    img{
        width: 61px;
        height: 53px;
        margin-left: 5px;
    }
  }
}
</style>
