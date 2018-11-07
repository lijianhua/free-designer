<template>
    <div class="orderDetail" >
        <div class="closeHeader">
            <img @click="closeDetail" src="../../assets/images/back.png" alt="back">
            接单详情
        </div>
        <div class="detailContainer">
            <div class="steps">
                <div class="step-item">
                    <div class="num">1</div>
                    <div class="line"></div>
                    <div class="content">
                        <div class="step-header">
                            <div class="title">基础信息</div>
                        </div>
                        <div class="item">
                            <div class="title">订单名称：</div>
                            <div class="box">
                                <p>项目分包_家庭室内工程_效果图</p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="title">完成日期：</div>
                            <div class="box">
                                <p>2018/10/03</p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="title">总任务量：</div>
                            <div class="box">
                                <p>4张</p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="title">项目地址：</div>
                            <div class="box">
                                <p>吉林四平</p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="title">项目风格：</div>
                            <div class="box two">
                                <p>简欧</p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="title">是否参与谈判：</div>
                            <div class="box two">
                                <p>否</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-item">
                    <div class="num">2</div>
                    <div class="line"></div>
                    <div class="content">
                        <div class="step-header">
                            <div class="title">任务要求</div>
                            <div class="intro">需要构思平面规划以及出效果图</div>
                        </div>
                    </div>
                </div>
                <div class="step-item">
                    <div class="num">3</div>
                    <div class="line"></div>
                    <div class="content">
                        <div class="step-header">
                            <div class="title">任务参考图</div>
                            <div class="warn">提示：后期答题可能需要参考图作为参考，请提前保存</div>
                        </div>
                        <div class="item">
                            <div class="img-box">
                                <div class="img-item"></div>
                                <div class="img-item"></div>
                                <div class="img-item"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-item">
                    <div class="num">4</div>
                    <div class="line"></div>
                    <div class="content">
                        <div class="step-header">
                            <div class="title">问题解答</div>
                            <div class="warn">提示：答题阶段将会计时，答题界面退出之后将直接退出答题</div>
                        </div>
                        <div class="begin">开始答题</div>
                    </div>
                </div>
                <div class="step-item">
                    <div class="num">5</div>
                    <div class="line"></div>
                    <div class="content">
                        <div class="step-header">
                            <div class="title">项目价格</div>
                        </div>
                        <div class="price">
                            1200积分<span class="priceIntro">(系统报价1200积分，消费0积分)</span>
                        </div>
                        <div class="bottomLine"></div>
                    </div>
                </div>
                <div class="step-item">
                    <div class="num">6</div>
                    <div class="line"></div>
                    <div class="content">
                        <div class="step-header">
                            <div class="title">竞标说明</div>
                            <div class="intro">请描述您接此单的优势以及在下方添加图片</div>
                        </div>
                        <div class="item">
                            <div class="img-box">
                                <div class="img-item">

                                </div>
                                <div class="img-item">

                                </div>
                                <div class="img-item">

                                </div>
                                <div class="img-item btn">

                                </div>
                            </div>
                            <!-- <div class="upload-txt">未选择文件</div> -->
                            <!-- <div class="upload">选择文件</div> -->
                            <upload-img type="resource"></upload-img>
                            <!-- <input id="upload" type="file" accept="image/png, image/jpeg, image/jpg, image/gif"> -->
                        </div>
                        <mu-text-field class="inps" placeholder="请您填写您接此单的优势" multi-line></mu-text-field>
                    </div>
                </div>
                <div class="step-item">
                    <div class="num">7</div>
                    <div class="line"></div>
                    <div class="content">
                        <div class="step-header">
                            <div class="title">我要加价</div>
                        </div>
                        <mu-text-field class="inps" placeholder="请您填写想要加的价格" multi-line></mu-text-field>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import uploadImg from '@/components/upload'
export default {
  data () {
    return {
    }
  },
  props: ['detailData'],
  async created () {},
  methods: {
    closeDetail () {
      this.$emit('callBack')
    }
  },
  components: {
    uploadImg
  }
}
</script>
<style scoped lang="scss">
.orderDetail {
  width: 100%;
  height: 100%;
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
  .detailContainer{
    height: calc(100% - 113px - 67px);
    overflow-y: auto;
  }
  .steps {
    padding-top: 27px;
    padding-bottom: 80px;
  }
  .step-item {
    position: relative;
    display: flex;
    margin-left: 27px;
    margin-right: 64px;
    &:last-child {
        .line {
            display: none;
        }
    }
    .num {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        text-align: center;
        line-height: 75px;
        border: 2px solid #959595;
        color: #959595;
        font-size: 55px;
        font-weight: 500;
        z-index: 2;
        background-color: #fff;
        margin-right: 28px;
    }
    .line {
        position: absolute;
        left: 37.5px;
        top: 0;
        width: 3px;
        height: 100%;
        background-color: #929598;
    }
    .content {
        flex: 1;
        line-height: 1;
        .step-header {
            padding-top: 18px;
            padding-bottom: 18px;
            .title {
                font-size: 30px;
            }
            .intro {
                padding-top: 20px;
                font-size: 24px;
                color: #959595;
            }
            .warn{
                padding-top: 20px;
                font-size: 18px;
                color: #959595;
            }
        }
        .item {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1PX solid #eee;
            min-height: 83px;
            margin-right: 52px;
            &:last-child {
                margin-bottom: 20px;
            }
            .title {
                font-size: 24px;
                font-weight: 500;
            }
            .box {
                &.two {
                    display: flex;
                    align-items: center;
                }
                p{
                    color: #a1a1a1;
                }
            }
            .upload-txt {
                flex: 1;
                font-size: 24px;
                color: #959595;
            }
            .upload {
                font-size: 24px;
                color: #fff;
                width: 223px;
                padding: 14px 0;
                text-align: center;
                background-color: #4195f7;
            }
            #upload {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
            }
        }
    }
  }
    .img-box {
        display: flex;
        flex-wrap: wrap;
        .img-item {
            width: 140px;
            height: 105px;
            background-color: #ececec;
            margin-right: 12px;
            &:nth-child(3n+0){
                margin-right: 0;
            }
            &:nth-child(n+4){
                margin-top: 10px;
            }
            &.btn {
                background: url('../../assets/images/add.png') no-repeat center #ececee;
                background-size: 50%;
            }
        }
    }
    .begin {
        width: 223px;
        height: 45px;
        color: #fff;
        line-height: 45px;
        text-align: center;
        background-color: #4195f7;
        margin: 30px auto 26px;
        font-size: 24px;
    }
    .price{
        font-size: 30px;
        color: red;
        .priceIntro{
            font-size: 14px;
            color: #959595;
            margin-left: 30px;
        }
    }
    .bottomLine{
        margin-top: 30px;
        margin-bottom: 30px;
        margin-left: -8%;
        width: 100%;
        border-bottom: 10px solid #ececec;
    }
    .inps{
        width: 100%;
        margin-top: 30px;
        margin-bottom: 30px;
        line-height: 50px;
        height: 50px;
    }
}
</style>
