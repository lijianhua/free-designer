<template>
    <div class="browWork">
        <div class="closeHeader">
            <img @click="closeDetail" src="../../assets/images/back.png" alt="back">
            作品浏览页
        </div>
        <div class="desingerInfo">
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
        <div class="history">
            <span @click="closeDetail"><strong>《</strong>工作历史和反馈</span>
            <span>作品浏览</span>
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
    </div>
</template>

<script>
export default {
  created () {
  },
  methods: {
    closeDetail () {
      this.$emit('callBack')
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
