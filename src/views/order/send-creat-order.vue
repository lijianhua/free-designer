<template>
  <div class="creat-order-container">
    <div class="header">
        <img @click="$router.push('order')" src="../../assets/images/back.png" alt="">
        <h3>{{$route.query.id ? '编辑' : '发布'}}订单</h3>
    </div>
    <div class="main">
      <div class="steps">
        <div class="step-item">
          <div class="num">1</div>
          <div class="line"></div>
          <div class="content">
            <div class="step-header">
              <div class="title">基础信息</div>
              <div class="intro">设置订单基础信息</div>
            </div>
            <div class="item">
              <div class="title">订单类型：</div>
              <div class="box">
                <mu-select :disabled="$route.query.id ? true : false" @change="stepOneChange" v-model="formData.orderType" label="请选择订单类型" :label-float="true">
                  <mu-option v-for="(item, index) in orderTypeOptions"
                    :key="index"
                    :label="item"
                    :value="`${index+1}`"></mu-option>
                </mu-select>
              </div>
            </div>
            <div class="item">
              <div class="title">项目类型：</div>
              <div class="box">
                <mu-select :disabled="$route.query.id ? true : false" @change="stepOneChange" v-model="formData.fcate" label="请选择项目类型" :label-float="true">
                  <mu-option v-for="(item, index) in categoryList.fcates"
                    :key="index"
                    :label="item"
                    :value="item"></mu-option>
                </mu-select>
              </div>
            </div>
            <div class="item">
              <div class="title">项目需求：</div>
              <div class="box">
                <mu-select :disabled="$route.query.id ? true : false" @change="handleChangeScate" v-model="formData.scate" label="请选择项目需求" :label-float="true">
                  <mu-option v-for="(item, index) in categoryList.scateList"
                    :key="index"
                    :label="item"
                    :value="item"></mu-option>
                </mu-select>
              </div>
            </div>
            <div class="item">
              <div class="title">项目地址：</div>
              <div class="box">
                <mu-text-field :disabled="$route.query.id ? true : false" @change="stepOneChange" v-model="formData.location" placeholder="请填写项目地址"></mu-text-field><br/>
              </div>
            </div>
            <div class="item">
              <div class="title">总任务量：</div>
              <div class="box two">
                <div style="width:50px;">
                  <mu-text-field :disabled="$route.query.id ? true : false" @change="stepOneChange" v-model="formData.task_count" placeholder="请输入"></mu-text-field>
                </div>
                <div class="select">
                  <mu-select :disabled="$route.query.id ? true : false" v-model="formData.task_unit">
                    <mu-option v-for="(item, index) in taskUnitOptions"
                      :key="index"
                      :label="item"
                      :value="item"></mu-option>
                  </mu-select>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="title">交稿时间：</div>
              <div class="box">
                <mu-date-input :disabled="$route.query.id ? true : false" @change="stepOneChange" v-model="formData.deadline" label="请选择交稿时间" container="dialog" label-float full-width></mu-date-input>
              </div>
            </div>
            <div class="item" v-for="(item, index) in dynamicInfoOptions" :key="index">
              <div class="title">{{item.name}}：</div>
              <div class="box" v-if="item.type === 'checkout'">
                <mu-select :disabled="$route.query.id ? true : false" @change="stepOneChange" v-model="dynamicInfo[item.key]" :label-float="true">
                  <mu-option v-for="(subItem, subIndex) in ['是','否']"
                    :key="subIndex"
                    :label="subItem"
                    :value="subItem === '是' ? true : false"></mu-option>
                </mu-select>
              </div>
              <div class="box" v-else-if="item.type === 'input'">
                <mu-text-field :disabled="$route.query.id ? true : false" @change="stepOneChange" style="width:100%;" v-model="dynamicInfo[item.key]" :placeholder="`请填写${item.name}`"></mu-text-field>
              </div>
              <div class="box" v-else-if="item.type === 'style'">
                <mu-select :disabled="$route.query.id ? true : false" @change="stepOneChange" v-model="dynamicInfo[item.key]" :label-float="true">
                  <mu-option label="前卫" value="前卫"></mu-option>
                  <mu-option label="现代" value="现代"></mu-option>
                  <mu-option label="欧式" value="欧式"></mu-option>
                  <mu-option label="中式" value="中式"></mu-option>
                  <mu-option label="简约" value="简约"></mu-option>
                  <mu-option label="其他" value="其他"></mu-option>
                </mu-select>
              </div>
              <div class="box" v-else-if="item.type === 'date'">
                <mu-date-input :disabled="$route.query.id ? true : false" @change="stepOneChange" v-model="dynamicInfo[item.key]" container="dialog" :label="`请选择${item.name}`" label-float full-width></mu-date-input>
              </div>
            </div>
          </div>
        </div>
        <div class="step-item">
          <div class="num">2</div>
          <div class="line"></div>
          <div class="content">
            <div class="step-header">
              <div class="title">价格设置</div>
              <div class="intro">设置订单积分价格</div>
            </div>
            <div class="item">
              <div class="title">添加奖金：</div>
              <div class="box two">
                <div style="width:80px;">
                  <mu-text-field v-model="formData.fee" @input="handleFeeChange" placeholder="0.00"></mu-text-field><br/>
                </div>
                <div style="width:50px;color:rgba(0,0,0,.5);">积分</div>
              </div>
            </div>
            <div class="item">
              <div class="title">系统报价：</div>
              <div class="box two">
                <div style="width:80px;">
                  <mu-text-field v-model="formData.system_cost" disabled placeholder="0.00"></mu-text-field><br/>
                </div>
                <div style="width:50px;color:rgba(0,0,0,.5);">积分</div>
              </div>
            </div>
            <div class="item">
              <div class="title">最终报价：</div>
              <div class="box two">
                <div style="width:80px;">
                  <mu-text-field :disabled="$route.query.id ? true : false" v-model="formData.pub_cost" placeholder="0.00"></mu-text-field><br/>
                </div>
                <div style="width:50px;color:rgba(0,0,0,.5);">积分</div>
              </div>
            </div>
          </div>
        </div>
        <div class="step-item">
          <div class="num">3</div>
          <div class="line"></div>
          <div class="content">
            <div class="step-header">
              <div class="title">任务要求</div>
              <div class="intro">描述项目简介以及任务的更多细节</div>
            </div>
            <div class="item">
              <mu-text-field style="width:100%;" v-model="formData.desc" placeholder="请填写任务描述" multi-line :rows="3" :rows-max="6"></mu-text-field>
            </div>
          </div>
        </div>
        <div class="step-item">
          <div class="num">4</div>
          <div class="line"></div>
          <div class="content">
            <div class="step-header">
              <div class="title">试卷设置</div>
              <div class="intro">对接单者的能力考核，以及对您的项目解决方案</div>
            </div>
            <div class="item">
              <mu-text-field style="width:100%;" v-model="question.a" placeholder="请输入第一题"></mu-text-field>
            </div>
            <div class="item">
              <mu-text-field style="width:100%;" v-model="question.b" placeholder="请输入第二题"></mu-text-field>
            </div>
            <div class="item">
              <mu-text-field style="width:100%;" v-model="question.c" placeholder="请输入第三题"></mu-text-field>
            </div>
            <div class="item">
              <mu-text-field style="width:100%;" v-model="question.d" placeholder="请输入第四题"></mu-text-field>
            </div>
            <div class="item">
              <mu-text-field style="width:100%;" v-model="question.e" placeholder="请输入第五题"></mu-text-field>
            </div>
          </div>
        </div>
        <div class="step-item">
          <div class="num">5</div>
          <div class="line"></div>
          <div class="content">
            <div class="step-header">
              <div class="title">项目资料</div>
              <div class="intro">上传您项目的资料供接单人进行准确判断</div>
            </div>
            <div class="item">
              <div class="img-box">
                <div class="img-item" v-for="(item, index) in projectFiles" :key="index">
                  <img v-if="item[3] === 'img'" :src="item[1]" alt="">
                  <span v-else>{{item[0]}}</span>
                </div>
                <div class="img-item btn" v-if="!$route.query.id" @click="uploadImg"></div>
              </div>
               <upload-img type="resource"></upload-img>
            </div>
          </div>
        </div>
      </div>
      <div class="submit" @click="submit">发布</div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Store from '@/store'
import uploadImg from '@/components/upload'
export default {
  async beforeRouteEnter (to, from, next) {
    await Store.dispatch('order/getCategory')
    if (to.query.id && Object.keys(Store.state.order.orderDetail).length) {
      await Store.dispatch('order/getQuestionList', to.query.id)
      next()
    } else if (to.query.id) {
      next(vm => vm.$router.back())
    } else {
      next()
    }
  },
  data () {
    return {
      orderTypeOptions: ['项目分包', '短期雇佣'],
      taskUnitOptions: ['张', '套', '项']
    }
  },
  computed: {
    ...mapGetters('order', ['orderDetail', 'formData', 'categoryList', 'dynamicInfoOptions', 'dynamicInfo', 'question', 'projectFiles'])
  },
  components: {
    uploadImg
  },
  methods: {
    ...mapMutations('order', ['SET_FORM_DATA', 'SET_DYNAMIC_INFO', 'SET_PUB_COST', 'SET_PROJECT_FILE']),
    ...mapActions('order', ['getSuggestCost', 'submit']),
    handleChangeScate (val) {
      this.SET_DYNAMIC_INFO(val)
    },
    stepOneChange () {
      let hasRequest = true
      const { formData, dynamicInfo } = this

      for (let key in formData) {
        const val = formData[key]
        if ((key === 'orderType' ||
        key === 'fcate' ||
        key === 'location' ||
        key === 'task_count' ||
        key === 'deadline') && val === '') {
          hasRequest = false
          break
        }
      }

      for (let key in dynamicInfo) {
        const val = dynamicInfo[key]
        if ((key === 'area' || key === 'nums' || key.indexOf('date') !== -1) && val === '') {
          hasRequest = false
          break
        }
      }

      if (!Object.keys(dynamicInfo).length) {
        hasRequest = false
      }

      if (!hasRequest) return
      this.getSuggestCost(Object.assign({}, formData, {
        deadline: new Date(formData.deadline).toLocaleDateString().split('/').join('-'),
        dynamic_info: dynamicInfo
      }))
    },
    handleFeeChange (val) {
      // this.SET_PUB_COST(val)
    },
    uploadImg () {
      this.$el.querySelector('#upload').click()
    }
  },
  mounted () {
    if (Object.keys(this.orderDetail).length && this.$route.query.id) {
      this.SET_FORM_DATA({
        formData: Object.assign({}, this.orderDetail, {
          orderType: String(this.orderDetail.order_type)
        }),
        dynamicInfo: this.orderDetail.dynamic_info
      })
    }

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
      this.SET_PROJECT_FILE(data[0])
    })
  }
}
</script>
<style lang="scss" scoped>
.creat-order-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.header {
  position: relative;
  height: 113px;
  border-bottom: 3px solid #ededed;
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
.main {
  height: calc(100% - 113px - 100px);
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
.submit {
  width: 436px;
  height: 67px;
  color: #fff;
  line-height: 67px;
  text-align: center;
  background-color: #4195f7;
  margin: 0 auto 125px;
}
.img-box {
  display: flex;
  flex-wrap: wrap;

  .img-item {
    width: 140px;
    height: 105px;
    background-color: #ececec;
    margin-right: 12px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }

    span {
      color: #959595;
    }

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

</style>
