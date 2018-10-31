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
        <div class="content" style="flex:1;margin-left:10px;">
          <mu-text-field placeholder="请输入简介" multi-line :rows="3" :rows-max="10"></mu-text-field><br/>
        </div>
      </div>
      <div class="item">
        <div class="name">修改密码</div>
        <div class="content">
          <img class="go" @click="$router.push('my')" src="../../assets/images/back.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      sheetVisible: false,
      actions: [
        { name: '男', method: (val) => { console.log(val) } },
        { name: '男', method: (val) => { console.log(val) } }
      ]
    }
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
  }
}
</style>
