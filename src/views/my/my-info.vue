<template>
  <div class="my-info-container">
    <div class="header">
      <img @click="$router.push('my')" src="../../assets/images/back.png" alt="">
      <h3>个人信息</h3>
    </div>
    <div class="main">
      <div class="item">
        <div class="name">更换头像</div>
        <div class="content" @click="uploadImg">
          <upload-img type="work"></upload-img>
          <div class="avatar">
            <img :src="formData.avatar" alt="">
          </div>
        </div>
      </div>
      <div class="item">
        <div class="name">更改昵称</div>
        <div class="content">
          <mu-text-field v-model="formData.name" @blur="updateUserInfo" placeholder="请输入昵称"></mu-text-field>
        </div>
      </div>
      <div class="item">
        <div class="name">我的年龄</div>
        <div class="content" @click="ageVisible = true">
          {{formData.age || '未设置'}}
        </div>
        <mt-popup
          v-model="ageVisible"
          position="bottom">
          <mt-picker :slots="ageDataSlots" @change="handleAgeChange"></mt-picker>
        </mt-popup>
      </div>
      <div class="item">
        <div class="name">我的性别</div>
        <div class="content" @click="genderVisible = true">
          {{formData.gender === 'M' ? '男' : '女' || '未设置'}}
        </div>
        <mt-popup
          v-model="genderVisible"
          position="bottom">
          <mt-picker :slots="genderDataSlots" @change="handleGenderChange"></mt-picker>
        </mt-popup>
      </div>
      <div class="item">
        <div class="name">第一技能</div>
        <div class="content" @click="role1Visible = true">
          {{formData.roles[0]}}
        </div>
        <mt-popup
          v-model="role1Visible"
          position="bottom">
          <mt-picker :slots="role1DataSlots" @change="handleRole1Change"></mt-picker>
        </mt-popup>
      </div>
      <div class="item">
        <div class="name">第二技能</div>
        <div class="content" @click="role2Visible = true">
          {{formData.roles[1]}}
        </div>
        <mt-popup
          v-model="role2Visible"
          position="bottom">
          <mt-picker :slots="role2DataSlots" @change="handleRole2Change"></mt-picker>
        </mt-popup>
      </div>
      <div class="item">
        <div class="name">从业年限</div>
        <div class="content" @click="careerVisible = true">
          {{formData.career}}年
        </div>
        <mt-popup
          v-model="careerVisible"
          position="bottom">
          <mt-picker :slots="careerDataSlots" @change="handleCareerChange"></mt-picker>
        </mt-popup>
      </div>
      <div class="item">
        <div class="name">我的简介</div>
        <div class="content txt" @click="introVisible = true">
          {{formData.desc}}
        </div>
        <mt-popup
          v-model="introVisible"
          :modal="false"
          class="mint-popup-3"
          position="right">
              <div class="header">
                <img @click="introVisible = false" src="../../assets/images/back.png" alt="">
                <h3>修改简介</h3>
              </div>
              <div class="popup-1-main">
                <div class="popup-1-item">
                  <mu-text-field v-model="introValue" style="width:100%;" placeholder="请添加个人简介" multi-line :rows="3" :rows-max="6"></mu-text-field>
                </div>
              </div>
              <div class="submit" @click="handleSaveIntro">确认修改</div>
        </mt-popup>
      </div>
      <div class="item">
        <div class="name">修改密码</div>
        <div class="content">
          <img class="go" @click="passwordVisible = true" src="../../assets/images/back.png" alt="">
        </div>
        <mt-popup
          v-model="passwordVisible"
          :modal="false"
          class="mint-popup-3"
          position="right">
              <div class="header">
                <img @click="passwordVisible = false" src="../../assets/images/back.png" alt="">
                <h3>修改密码</h3>
              </div>
              <div class="popup-1-main">
                <div class="popup-1-item">
                  <div>原密码</div>
                  <div>
                      <mu-text-field type="password" v-model="password" placeholder="请输入原密码"></mu-text-field>
                  </div>
                </div>
                <div class="popup-1-item">
                  <div>新密码</div>
                  <div>
                      <mu-text-field type="password" v-model="newPassword" placeholder="请输入新密码"></mu-text-field>
                  </div>
                </div>
                <div class="popup-1-item">
                  <div>确认新密码</div>
                  <div>
                      <mu-text-field type="password" v-model="confirmPassword" placeholder="请确认新密码"></mu-text-field>
                  </div>
                </div>
              </div>
              <div class="submit" @click="handleChangePassword">确认修改</div>
        </mt-popup>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Store from '@/store'
import UploadImg from '@/components/upload'

export default {
  beforeRouteEnter (to, from, next) {
    const userInfo = Store.state.userInfo
    Store.commit('my/SET_FORM_DATA', userInfo)
    next()
  },
  data () {
    return {
      ageVisible: false,
      ageDataSlots: [],
      genderVisible: false,
      genderDataSlots: [],
      role1Visible: false,
      role1DataSlots: [],
      role2Visible: false,
      role2DataSlots: [],
      careerVisible: false,
      careerDataSlots: [],
      introVisible: false,
      introValue: '',
      passwordVisible: false,
      password: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  components: {
    UploadImg
  },
  watch: {
    ageVisible (val) {
      if (!val) {
        this.updateUserInfo()
      }
    },
    genderVisible (val) {
      if (!val) {
        this.updateUserInfo()
      }
    },
    role1Visible (val) {
      if (!val) {
        this.updateUserInfo()
      }
    },
    role2Visible (val) {
      if (!val) {
        this.updateUserInfo()
      }
    },
    careerVisible (val) {
      if (!val) {
        this.updateUserInfo()
      }
    }
  },
  computed: {
    ...mapGetters('my', ['formData'])
  },
  methods: {
    ...mapActions('my', ['updateUserInfo', 'changePassword']),
    ...mapMutations('my', ['SET_FORM_DATA']),
    handleAgeChange (picker, values) {
      if (!values[0]) return
      this.SET_FORM_DATA({
        ...this.formData,
        age: values[0]
      })
    },
    handleGenderChange (picker, values) {
      if (!values[0]) return
      this.SET_FORM_DATA({
        ...this.formData,
        gender: values[0] === '男' ? 'M' : 'F'
      })
    },
    handleRole1Change (picker, values) {
      if (!values[0]) return
      let roles = this.formData.roles
      roles[0] = values[0]
      this.SET_FORM_DATA({
        ...this.formData,
        roles
      })
    },
    handleRole2Change (picker, values) {
      if (!values[0]) return
      let roles = this.formData.roles
      roles[1] = values[0]
      this.SET_FORM_DATA({
        ...this.formData,
        roles
      })
    },
    handleCareerChange (picker, values) {
      if (!values[0]) return
      this.SET_FORM_DATA({
        ...this.formData,
        career: values[0]
      })
      this.careerVisible = false
    },
    handleSaveIntro () {
      this.introVisible = false
      this.updateUserInfo({ desc: this.introValue })
    },
    handleChangePassword () {
      this.changePassword({
        origin: this.password,
        new_passwd: this.newPassword,
        again_passwd: this.confirmPassword
      })
    },
    uploadImg () {
      this.$el.querySelector('#upload').click()
    }
  },
  created () {
    const ageDataSlots = () => {
      let arr = [
        {
          flex: 1,
          values: [],
          className: 'slots',
          textAlign: 'center',
          defaultIndex: this.formData.age - 1
        }
      ]
      for (let i = 1; i <= 100; i++) {
        arr[0].values.push(i)
      }
      return arr
    }
    const genderDataSlots = () => ([
      {
        flex: 1,
        values: ['男', '女'],
        className: 'slots',
        textAlign: 'center',
        defaultIndex: this.formData.gender === 'M' ? 0 : 1
      }
    ])
    const role1DataSlots = () => {
      const arr = [
        {
          flex: 1,
          values: [
            '主案设计',
            '软装配饰',
            '造价预算',
            '施组编制',
            '效果图',
            '施工图',
            '项目经理',
            '风水设计',
            '平面规划',
            '声学设计',
            '灯光设计',
            '施工工长',
            '强电系统',
            '弱电系统',
            '水系统',
            '暖通系统',
            '消防系统',
            'PPT标书'
          ],
          className: 'slots',
          textAlign: 'center'
        }
      ]
      arr[0].defaultIndex = arr[0].values.findIndex(v => v === this.formData.roles[0])
      return arr
    }
    const role2DataSlots = () => {
      const arr = [
        {
          flex: 1,
          values: [
            '主案设计',
            '软装配饰',
            '造价预算',
            '施组编制',
            '效果图',
            '施工图',
            '项目经理',
            '风水设计',
            '平面规划',
            '声学设计',
            '灯光设计',
            '施工工长',
            '强电系统',
            '弱电系统',
            '水系统',
            '暖通系统',
            '消防系统',
            'PPT标书'
          ],
          className: 'slots',
          textAlign: 'center'
        }
      ]
      arr[0].defaultIndex = arr[0].values.findIndex(v => v === this.formData.roles[1])
      return arr
    }
    const careerDataSlots = () => {
      let arr = [
        {
          flex: 1,
          values: [],
          className: 'slots',
          textAlign: 'center',
          defaultIndex: this.formData.career - 1
        }
      ]
      for (let i = 1; i <= 50; i++) {
        arr[0].values.push(i)
      }
      return arr
    }
    this.ageDataSlots = ageDataSlots()
    this.genderDataSlots = genderDataSlots()
    this.role1DataSlots = role1DataSlots()
    this.role2DataSlots = role2DataSlots()
    this.careerDataSlots = careerDataSlots()
    this.introValue = this.formData.desc
  },
  mounted () {
    this.$root.$on('uploadComplete', resp => {
      let data = resp.data
      this.updateUserInfo({
        avatar: data['168x168'] || data.ori
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.my-info-container {
  width: 100%;
  height: 100%;
  background-color: #e5e5e5;
}
.header {
  position: relative;
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
.main {
  background-color: #fff;
  margin-top: 20px;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 70px;
    padding: 0 50px;
    border-bottom: 1PX solid #e5e5e5;
    .name {
      font-size: 30px;
      color: #a8a8a8;
    }
    .content {
      flex: 1;
      text-align: right;

      &.txt {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-left: 20px;
      }
      font-size: 30px;
      color: #a8a8a8;
      .go {
        width: 14px;
        height: 29px;
        transform: rotate(180deg);
      }
      .avatar {
        display: inline-block;
        width: 60px;
        height: 60px;
        overflow: hidden;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .mint-popup-3 {
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }
}
.popup-1-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    min-height: 100px;
    border-bottom: 1px solid #eee;

    >div:first-child {
      font-size: 32px;
      width: 25%;
      color: #aaa;
    }
    >div:last-child {
      padding-left: 30px;
      flex: 1;
      font-size: 32px;
    }
}
.submit {
  width: 436px;
  height: 67px;
  color: #fff;
  line-height: 67px;
  text-align: center;
  background-color: #4195f7;
  margin: 40px auto 0;
}
</style>
