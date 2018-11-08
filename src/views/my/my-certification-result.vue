<template>
  <div class="my-certification-container">
    <div class="header">
      <img @click="$router.push('my')" src="../../assets/images/back.png" alt="">
      <h3>实名认证</h3>
    </div>
    <div class="auth-info" v-if="formData.audit_status !== 2">
      <div v-if="formData.audit_status === 1">
        <p>认证审核中</p>
        <p class="intro">资料已提交认证，预计48小时内认证完成</p>
      </div>
      <div v-if="formData.audit_status === -1">
        <p>认证失败，请<span style="color:#4195f7;">重新提交</span></p>
      </div>
    </div>
    <h5 v-if="formData.audit_status !== 2">认证信息</h5>
    <div class="auth-form">
      <div class="form-item">
        <div class="name">证件类型</div>
        <div class="content">
          <span style="colo:#4195f7;">身份证</span>
        </div>
      </div>
      <div class="form-item">
        <div class="name">证件号</div>
        <div class="content">
          <mu-text-field class="input" :disabled="formData.audit_status !== 2" v-model="formData.license_id" placeholder="请填写证件号"></mu-text-field><br/>
        </div>
      </div>
      <div class="form-item uploadImg">
        <p>请上传身份证照片</p>
        <div class="img" @click="uploadImg">
          <upload-img type="work" v-if="formData.audit_status === 2"></upload-img>
          <img v-if="!formData.license_pic" src="../../assets/images/uploadImg.png" alt="">
          <img v-else :src="formData.license_pic" alt="">
        </div>
      </div>
      <div class="submit" @click="updateUserInfo" v-if="formData.audit_status === 2">提交</div>
    </div>
  </div>
</template>
<script>
import UploadImg from '@/components/upload'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Store from '@/store'
export default {
  beforeRouteEnter (to, from, next) {
    const userInfo = Store.state.userInfo
    Store.commit('my/SET_FORM_DATA', userInfo)
    next()
  },
  computed: {
    ...mapGetters('my', ['formData'])
  },
  components: {
    UploadImg
  },
  mounted () {
    this.$root.$on('uploadComplete', resp => {
      let data = resp.data
      this.SET_FORM_DATA({
        ...this.formData,
        license_pic: data[0][1]
      })
    })
  },
  methods: {
    ...mapActions('my', ['updateUserInfo']),
    ...mapMutations('my', ['SET_FORM_DATA']),
    uploadImg () {
      this.$el.querySelector('#upload').click()
    }
  }
}
</script>
<style lang="scss" scoped>
.my-certification-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow-y: scroll;
}
.header {
  position: relative;
  height: 113px;
  border-bottom: 10px solid #bababa;
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
.auth-info {
  padding-top: 160px;
  padding-bottom: 160px;
  text-align: center;
  p {
    font-size: 33px;
    font-weight: bold;
  }
  .intro {
    font-size: 24px;
    color: #bababa;
    font-weight: normal;
  }
}
h5 {
  font-size: 33px;
  background-color: #bababa;
  padding: 36px 100px;
}
.auth-form {
  .form-item {
    display: flex;
    align-items: center;
    min-height: 100px;
    padding: 0 44px;
    border-bottom: 2PX solid #bebebe;

    &.uploadImg {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-bottom: none;
      padding-top: 56px;
      color: #ddd;
      .img {
        width: 435px;
        height: 297px;
        border: 2PX solid #ddd;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .name {
      width: 266px;
    }
    .content {
      flex: 1;
      padding-left: 32px;
      .img {
        width:193px;
        height:128px;
        background:red;
      }
    }
  }
  .submit {
    width: 436px;
    text-align: center;
    padding: 18px 0;
    color: #fff;
    background-color: #4195f7;
    margin: 190px auto;
  }

}
// .container {
//   height: 100%;
//   background-color: #eee;

//   .header {
//     position: relative;
//     height: 96px;
//     background-color: #fafafa;
//     border: 2px #eee solid;

//     .back {
//       position: absolute;
//       left: 0;
//       top: 0;
//       width: 75px;
//       height: 100%;
//       text-align: center;
//       line-height: 96px;
//     }

//     h3 {
//       text-align: center;
//       font-size: 40px;
//       height: 96px;
//       line-height: 96px;
//       font-weight: normal;
//     }
//   }

//   .auth-info {
//     padding-top: 144px;
//     padding-bottom: 144px;
//     background-color: #fff;
//     .main {
//       text-align: center;
//       img {
//         width: 200px;
//         height: 200px;
//       }
//       h4 {
//         color: #333;
//         font-size: 40px;
//         line-height: 64px;
//         font-weight: normal;
//       }
//       p {
//         color: #aaa;
//         font-size: 32px;
//         line-height: 64px;
//       }
//       button {
//         margin-top: 40px;
//       }
//     }
//   }

//   .info {
//     padding: 20px;
//     margin-top: 20px;
//     background-color: #fff;

//     h3 {
//       font-size: 40px;
//       font-weight: normal;
//       text-align: left;
//       line-height: 100px;
//     }
//     .item {
//       color: #aaa;
//       font-size: 32px;
//       line-height: 64px;
//       span:nth-child(1) {
//         width: 24%;
//       }
//       span:nth-child(2) {
//         width: 76%;
//       }
//     }
//   }

// }
</style>
