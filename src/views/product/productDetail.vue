<template>
    <div class="productDetail" >
        <div class="closeHeader">
            <img @click="$router.back()" src="../../assets/images/back.png" alt="back">
            <h3>作品详情</h3>
        </div>
        <div class="detailContainer">
            <div v-if="!isMy" class="desingerInfo">
                <div class="header">
                    <div class="header-img">
                        <img :src="userInfo.thumb" alt="avatar">
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
                <div v-if="userInfo.role" class="skill">
                    <div class="skillSort">
                        <span v-for="(childItem, idx) in userInfo.role.split(',')" :key="idx">
                            【{{ childItem }}】
                        </span>
                    </div>
                    <div class="doSomething">
                        <p>{{ userInfo.desc }}</p>
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
                    <mt-loadmore :top-method="getList" :bottom-method="load" :bottom-all-loaded="isLoadedAll" ref="loadmore">
                        <div class="talkBox" v-for="(item, index) in galleryCommentList" :key="index">
                            <div class="talk-headImg">
                                <img :src="item.user_avatar" alt="avatar">
                            </div>
                            <div class="talk-content">
                                <p class="talkerName">{{ item.username }}</p>
                                <div class="talkerContent">
                                    <p>{{ item.content }}</p>
                                    <!-- <div class="talk-good">
                                        <img src="../../assets/images/good.png" alt="good">
                                        <span>88</span>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </mt-loadmore>
                </div>
            </div>
        </div>
        <div v-if="!isMy" class="DetailFooter">
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
      nowDicator: 1,
      isLoadedAll: false,
      commentValue: '',
      isMy: false
    }
  },
  computed: {
    ...mapGetters('productDetail', ['userInfo', 'galleryList', 'galleryCommentList', 'commentPageInfo'])
  },
  async created () {
    this.userid = this.$route.params.userid
    this.galleryid = this.$route.params.galleryid
    if (this.$route.params.isMy) {
      this.isMy = true
    }
    const dataForm = {
      user: this.userid,
      gallery: this.galleryid
    }
    await this.getUserInfo(dataForm)
    await this.getGalleryList(dataForm)
    this.allPicture = this.galleryList.length
  },
  methods: {
    ...mapActions('productDetail', ['getUserInfo', 'getGalleryList', 'getCommentList', 'getMoreComment', 'addGalleryComment']),
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
      await this.getCommentList(dataForm)
      this.$refs.loadmore.onTopLoaded()
    },
    async load () {
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
      const dataFrom = {
        uid: this.userid,
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
        padding: 30px 50px 60px 50px;
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
            margin-top: 30px;
            .doSomething{
                margin-top: 10px;
                p{
                    font-size: 20px;
                    color: #808080;
                    line-height: 35px;
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
                margin-top: 20px;
                .talk-headImg{
                    display: block;
                    width: 66px;
                    height: 66px;
                    border-radius: 50%;
                    overflow: hidden;
                    float: left;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .talk-content{
                    display: inline-block;
                    width: 570px;
                    font-size: 20px;
                    margin-left: 14px;
                    .talkerName{
                        color: #848484;
                        margin-bottom: 14px;
                    }
                    .talkerContent{
                        p{
                            line-height: 32px;
                            width: 490px;
                            display: inline-block;
                        }
                        .talk-good{
                            display: inline-block;
                            margin-left: 10px;
                            width: 70px;
                            position: relative;
                            vertical-align: top;
                            img{
                                width: 27px;
                                height: 27px;
                            }
                            span{
                                color: #8a96ba;
                                font-size: 16px;
                                height: 27px;
                                margin-left: 2px;
                                line-height: 5px;
                                position: absolute;
                                top: 0px;
                                left: 27px;
                            }
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
