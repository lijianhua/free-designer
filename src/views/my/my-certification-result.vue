<template>
  <div class="my-certification-container">
    <div class="header">
      <img @click="$router.push('my')" src="../../assets/images/back.png" alt="">
      <h3>实名认证</h3>
    </div>
    <div class="auth-form">
      <div class="form-item padding">
        <div class="name">请上传身份证照片</div>
        <div class="content">
          <upload-img></upload-img>
          <div class="img" style=""></div>
        </div>
      </div>
      <div class="form-item">
        <div class="name">真实姓名</div>
        <div class="content">
          <mu-text-field class="input" v-model="formData.a" placeholder="请输入姓名"></mu-text-field><br/>
        </div>
      </div>
      <div class="form-item">
        <div class="name">证件号</div>
        <div class="content">
          <mu-text-field class="input" v-model="formData.a" placeholder="请填写证件号"></mu-text-field><br/>
        </div>
      </div>
      <div class="submit">提交</div>
    </div>
    <!-- <div class="auth-info">
      <div class="main" v-if="false">
        <img src="@/assets/images/certification_true.png" alt="">
        <h4>认证成功</h4>
        <p>恭喜你，提交的资料已成功认证</p>
      </div>
      <div class="main" v-if="false">
        <img src="@/assets/images/certification_false.png" alt="">
        <h4>还未认证</h4>
        <p>还未进行实名制认证哦，点击按钮提交资料</p>
        <mt-button type="primary" size="small">实名认证</mt-button>
      </div>
      <div class="main" v-if="false">
        <img src="@/assets/images/certification_false.png" alt="">
        <h4>认证失败</h4>
        <p>您提交的资料不完整未通过认证</p>
        <mt-button type="primary" size="small">重新提交</mt-button>
      </div>
      <div class="main" v-if="true">
        <img src="@/assets/images/certification.png" alt="">
        <h4>认证审核中</h4>
        <p>资料已提交认证，预计48小时内认证完毕</p>
      </div>
    </div>
    <div class="info">
      <h3>认证信息</h3>
      <div class="item">
        <span>真实姓名：</span>
        <span>137****0000</span>
      </div>
      <div class="item">
        <span>证件类型：</span>
        <span>身份证</span>
      </div>
      <div class="item">
        <span>证件号码：</span>
        <span>123456345723984792834</span>
      </div>
    </div> -->
  </div>
</template>
<script>
import UploadImg from '@/components/upload'
export default {
  data () {
    return {
      formData: {
        a: ''
      }
    }
  },
  components: {
    UploadImg
  },
  mounted () {
    this.$root.$on('uploadComplete', resp => {
      let data = resp.data
      this.updateUserInfo({
        avatar: data.ori
      })
    })
  },
  methods: {
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
.auth-form {
  .form-item {
    display: flex;
    align-items: center;
    min-height: 100px;
    padding: 0 44px;
    border-bottom: 2PX solid #bebebe;

    &.padding {
      padding:18px 44px;
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
