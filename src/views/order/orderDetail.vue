<template>
    <div class="orderDetail" >
        <div class="closeHeader">
            <img @click="$router.back()" src="../../assets/images/back.png" alt="back">
            <h3>接单详情</h3>
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
                                <p>{{ orderInfo.title }}</p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="title">完成日期：</div>
                            <div class="box">
                                <p>{{ orderInfo.deadline }}</p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="title">总任务量：</div>
                            <div class="box">
                                <p>{{ orderInfo.task_count }}{{ orderInfo.task_unit }}</p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="title">项目地址：</div>
                            <div class="box">
                                <p>{{ orderInfo.location }}</p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="title">项目风格：</div>
                            <div class="box two">
                                <p>{{ orderInfo.order_style }}</p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="title">是否参与谈判：</div>
                            <div class="box two">
                                <p v-if="orderInfo.dynamic_info">{{ orderInfo.dynamic_info.is_negotiat ? '是' : '否'}}</p>
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
                            <div class="intro">{{ orderInfo.desc }}</div>
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
                                <div v-for="(item, index) in orderInfo.files" :key="index"  class="img-item">
                                    <img :src="item.file_path" alt="">
                                </div>
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
                        <div v-show="timing == 0 && !overAnswer" class="answer-btn" @click="beginAnswer">开始答题</div>
                        <div v-show="timing > 0 && !overAnswer" class="answering">
                            <div class="timing answer-btn">{{ timingText }}</div>
                            <div v-for="(item, index) in questionList" :key="index" v-show="index == nowIndex" class="now">
                                <div class="calc">NO.{{ index + 1 }}/5</div>
                                <div class="problem">{{ item.question }}</div>
                            </div>
                            <mt-field class="textArea" placeholder="请填写答案并说明理由" type="textarea" rows="4" v-model="answerContent"></mt-field>
                            <div class="answerBtn">
                                <div class="answer-btn" @click="giveUpAnswer">放弃答题</div>
                                <div class="answer-btn" @click="nextQuestion()">下一题</div>
                            </div>
                        </div>
                        <div v-show="overAnswer" class="overAnswer">
                            <div class="overTittle">【答题结束】</div>
                            <div class="clickMore" v-show="!showMore">
                                试卷详情
                                <img class="open" @click="showMore = true" src="../../assets/images/open.png" alt="open">
                            </div>
                            <div class="closeMore">
                                <img v-show="showMore" @click="showMore = false" class="close" src="../../assets/images/close.png" alt="close">
                            </div>
                            <div v-show="showMore" class="answersBox" v-for="(item, index) in answerList" :key="index">
                                <div class="anContent questionTop">
                                    <div class="number">第{{ index + 1 }}}题</div>
                                    <div>{{ questionList[index].question }}</div>
                                </div>
                                <div class="anContent">
                                    <img class="timeIcon" src="../../assets/images/ico_time.png" alt="ico_time">
                                    <div class="timeAnswer">
                                        <div class="time">【{{ showAnswerTime(item.start_time, item.end_time) }}】</div>
                                        <div v-show="item.answer" class="content">{{ item.answer }}</div>
                                        <div v-show="!item.answer" class="noAnswer">接单人没有回答此试题</div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                            {{ orderInfo.pub_cost }}积分<span class="priceIntro">(系统报价{{ orderInfo.system_cost }}积分，小费{{ orderInfo.fee }}积分)</span>
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
                                <div v-for="(item, index) in filesList" :key="index"  class="img-item" @click="fixUploadImg(index)">
                                    <img :src="item[1]" alt="">
                                </div>
                                <div class="img-item btn" @click="uploadImg"></div>
                            </div>
                            <upload-img type="resource"></upload-img>
                        </div>
                        <mu-text-field class="inps" placeholder="请您填写您接此单的优势" multi-line v-model="goodness"></mu-text-field>
                    </div>
                </div>
                <div class="step-item">
                    <div class="num">7</div>
                    <div class="line"></div>
                    <div class="content">
                        <div class="step-header">
                            <div class="title">我要加价</div>
                        </div>
                        <mu-text-field class="inps" placeholder="请您填写想要加的价格" multi-line v-model="addPrice"></mu-text-field>
                    </div>
                </div>
            </div>
            <div class="submit" @click="submit">提交</div>
            <div class="agree">
                <img src="../../assets/images/redyes.png" alt="redyes">
                <p>我已阅读并同意遵守<span>服务许可协议 隐私政策</span></p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import uploadImg from '@/components/upload'
export default {
  data () {
    return {
      timing: 0,
      timingText: '00:00:00',
      timer: null,
      orderInfo: {},
      answerContent: '',
      nowIndex: 0,
      startTime: '',
      endTime: '',
      answerList: [],
      goodness: '',
      addPrice: 0,
      filesList: [],
      overAnswer: false,
      showMore: false,
      orderId: '',
      fixIndex: null
    }
  },
  computed: {
    ...mapGetters('orderDetail', ['orderDetail', 'questionList', 'userQuestionList'])
  },
  async created () {
    this.orderId = this.$route.params.orderid
    await this.getOrderDetail(this.orderId)
    this.filesList = this.orderDetail.works
    this.goodness = this.orderDetail.desc
    this.addPrice = this.orderDetail.apply_cost
    this.orderInfo = this.orderDetail.order
    await this.getOrderQusetion(this.orderId)
    await this.getUserQusetion(this.orderDetail.id)
    if (this.userQuestionList.length > 0) {
      this.answerList = this.userQuestionList
      this.overAnswer = true
    }
  },
  methods: {
    ...mapActions('orderDetail', ['getOrderDetail', 'getOrderQusetion', 'setOrderAnswer', 'acceptOrder', 'getUserQusetion']),
    beginAnswer () {
      if (this.questionList.length === 0) {
        return
      }
      this.startTime = new Date().getTime()
      this.timer = setInterval(() => {
        this.timing += 1
        const hour = Math.floor(this.timing / 3600)
        const min = Math.floor(this.timing / 60) % 60
        const sec = this.timing % 60
        let t = ''
        if (hour < 10) {
          t = '0' + hour + ':'
        } else {
          t = hour + ':'
        }
        if (min < 10) { t += '0' }
        t += min + ':'
        if (sec < 10) { t += '0' }
        t += sec
        this.timingText = t
      }, 1000)
    },
    giveUpAnswer () {
      clearInterval(this.timer)
      this.timer = null
      this.timing = 0
      this.timingText = '00:00:00'
      this.nowIndex = 0
      this.answerContent = ''
      this.answerList = []
    },
    nextQuestion () {
      this.endTime = new Date().getTime()
      const dataForm = {
        answer: this.answerContent,
        start_time: this.startTime,
        end_time: this.endTime,
        aid: this.orderDetail.id,
        qid: this.questionList[this.nowIndex].qid
      }
      this.answerList.push(dataForm)
      this.answerContent = ''
      this.nowIndex += 1
      this.startTime = new Date().getTime()
      if (this.nowIndex > 4) {
        this.overAnswer = true
      }
    },
    async submit () {
      if (this.userQuestionList.length === 0) {
        for (let i = 0; i < this.answerList.length; i++) {
          await this.setOrderAnswer(this.answerList[i])
        }
      }
      const dataForm = {
        desc: this.goodness,
        apply_cost: Number(this.addPrice),
        works: this.filesList,
        aid: this.orderDetail.id,
        oid: this.orderDetail.order.id
      }
      await this.acceptOrder(dataForm)
      this.$router.push({
        name: 'order'
      })
    },
    uploadImg () {
      this.$el.querySelector('#upload').click()
    },
    fixUploadImg (index) {
      this.fixIndex = index
      this.$el.querySelector('#upload').click()
    },
    showAnswerTime (start, end) {
      const time = (end - start) / 1000
      const hour = Math.floor(time / 3600)
      const min = Math.floor(time / 60) % 60
      const sec = time % 60
      let t = ''
      if (hour > 0) {
        if (hour < 10) {
          t = '0' + hour + ':'
        } else {
          t = hour + '时'
        }
      }
      if (min < 10) { t += '0' }
      t += min + '分'
      if (sec < 10) { t += '0' }
      t += sec.toFixed(0) + '秒'
      return t
    }
  },
  mounted () {
    this.$root.$on('uploadComplete', resp => {
      let data = resp.data
      switch (data[0][0].split('.')[1]) {
        case 'png':
        case 'jpeg':
        case 'jpg':
        case 'gif':
          data[0][3] = 'img'
          break
        default:
          data[0][3] = 'file'
          break
      }
      if (this.fixIndex !== null) {
        this.$set(this.filesList, this.fixIndex, data[0])
        this.fixIndex = null
      } else {
        this.filesList.push(data[0])
      }
    })
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
                font-size: 20px;
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
                white-space:nowrap;
            }
            .box {
                &.two {
                    display: flex;
                    align-items: center;
                }
                p{
                    color: #a1a1a1;
                    font-size: 24px;
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
        .mu-input {
            font-size: 24px;
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
            img{
                width: 140px;
                height: 105px;
            }
        }
    }
    .answer-btn {
        width: 223px;
        height: 45px;
        color: #fff;
        line-height: 45px;
        text-align: center;
        background-color: #4195f7;
        margin: 30px auto 26px;
        font-size: 30px;
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
    .agree{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: #ececec;
        img{
            width: 16px;
            height: 16px;
            margin-right: 5px;
        }
        span{
            color: red;
        }
    }
    .submit {
        width: 436px;
        height: 67px;
        color: #fff;
        line-height: 67px;
        text-align: center;
        background-color: #4195f7;
        margin: 0 auto 60px;
    }
    .answering{
        .timing{
            width: 223px;
            height: 45px;
            line-height: 45px;
            background-color: #4195f7;
            text-align: center;
            color: #ffffff;
            font-size: 30px;
            margin: 0 auto;
        }
        .now{
            margin-top: 36px;
            .calc{
                font-size: 30px;
            }
            .problem{
                font-size: 26px;
                line-height: 40px;
            }
        }
        .textArea{
            margin-top: 36px;
            border: 1px solid #000;
        }
        .answerBtn{
            display: flex;
            justify-content: space-between;
        }
    }
    .overAnswer{
        .overTittle{
            color: #979797;
            font-size: 26px;
            text-align: center;
        }
        .clickMore,.closeMore{
            margin-top: 20px;
            color: #979797;
            font-size: 18px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
                width: 24px;
                height: 21px;
                margin-top: 5px;
            }
        }
        .answersBox{
            background-color: #ebebeb;
            padding: 15px;
            .questionTop{
                font-size: 20px;
                margin-top: 10px;
                margin-bottom: 30px;
            }
            .anContent{
                display: flex;
                .timeIcon{
                    width: 55px;
                    height: 56px;
                    margin-right: 18px;
                }
                .time{
                    font-size: 25px;
                    color: #ff0000;
                }
                .content,.noAnswer{
                    font-size: 22px;
                    line-height: 32px;
                    margin-top: 12px;
                }
                .noAnswer{
                    color: #ff0000;
                }
                .number{
                    width: 60px;
                    margin-right: 13px;
                }
            }
        }
    }
}
</style>
