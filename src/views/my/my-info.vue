<template>
  <div class="my-info-container">
    <div class="header">
      <img @click="$router.push('my')" src="../../assets/images/back.png" alt="">
      <h3>个人信息</h3>
    </div>
    <div class="main">
      <div class="item">
        <div class="name">更换头像</div>
        <div class="content">
          <div class="avatar">
            <img src="http://www.free-designer.cn/M00/00/64/wKgABVt30lKAYOf6AAAz0yXWPI4179.png" alt="">
          </div>
        </div>
      </div>
      <div class="item">
        <div class="name">更改昵称</div>
        <div class="content">
          <mu-text-field placeholder="请输入昵称"></mu-text-field>
        </div>
      </div>
      <div class="item">
        <div class="name">我的年龄</div>
        <div class="content" @click="sheetVisible = true">
          20
        </div>
        <mt-actionsheet
          :actions="actions"
          v-model="sheetVisible">
        </mt-actionsheet>
      </div>
      <div class="item">
        <div class="name">我的性别</div>
        <div class="content" @click="sheetVisible = true">
          男
        </div>
        <mt-actionsheet
          :actions="actions"
          v-model="sheetVisible">
        </mt-actionsheet>
      </div>
      <div class="item">
        <div class="name">第一技能</div>
        <div class="content" @click="sheetVisible = true">
          男
        </div>
        <mt-actionsheet
          :actions="actions"
          v-model="sheetVisible">
        </mt-actionsheet>
      </div>
      <div class="item">
        <div class="name">第二技能</div>
        <div class="content" @click="sheetVisible = true">
          男
        </div>
        <mt-actionsheet
          :actions="actions"
          v-model="sheetVisible">
        </mt-actionsheet>
      </div>
      <div class="item">
        <div class="name">从业年限</div>
        <div class="content" @click="sheetVisible = true">
          男
        </div>
        <mt-actionsheet
          :actions="actions"
          v-model="sheetVisible">
        </mt-actionsheet>
      </div>
      <div class="item">
        <div class="name">我的简介</div>
        <div class="content">
          <img class="go" @click="introVisible=true" src="../../assets/images/back.png" alt="">
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
                  <mu-text-field style="width:100%;" placeholder="请添加个人简介" multi-line :rows="3" :rows-max="6"></mu-text-field>
                </div>
              </div>
              <div class="submit">确认修改</div>
        </mt-popup>
      </div>
      <div class="item">
        <div class="name">修改密码</div>
        <div class="content">
          <img class="go" @click="passwordVisible=true" src="../../assets/images/back.png" alt="">
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
                      <mu-text-field placeholder="请输入原密码"></mu-text-field>
                  </div>
                </div>
                <div class="popup-1-item">
                  <div>新密码</div>
                  <div>
                      <mu-text-field placeholder="请输入新密码"></mu-text-field>
                  </div>
                </div>
                <div class="popup-1-item">
                  <div>确认新密码</div>
                  <div>
                      <mu-text-field placeholder="请确认新密码"></mu-text-field>
                  </div>
                </div>
              </div>
              <div class="submit">确认修改</div>
        </mt-popup>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      sheetVisible: false,
      passwordVisible: false,
      introVisible: false,
      actions: [
        { name: '男', method: (val) => { console.log(val) } },
        { name: '男', method: (val) => { console.log(val) } }
      ]
    }
  },
  created () {
    // let user = JSON.parse(this.$cookie.get('user'))
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
      font-size: 30px;
      color: #a8a8a8;
      .go {
        width: 14px;
        height: 29px;
        transform: rotate(180deg);
      }
      .avatar {
        width: 60px;
        height: 60px;
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
