<template>
  <div class="containers">
    <div class="header">
      <img @click="$router.back()" src="../../assets/images/back.png" alt="">
      <h3>雇主订单进行中</h3>
    </div>
    <div class="main">
      <div class="user-info">
        <div class="avatar">
          <img src="" alt="">
        </div>
        <div class="info">
          <div class="title_exp">
            <div class="title">姓名</div>
            <div class="exp">10年工作经验</div>
          </div>
          <div class="address">北京 - 立水桥</div>
          <div class="post">雇主</div>
        </div>
        <a href="tel:123" class="tel">
          <img src="../../assets/images/ico_tel.png" alt="">
        </a>
      </div>
      <div class="project-info">
        <div class="title">asd asd asd asd asd </div>
        <div class="info">
          <div>
            <div>交稿剩余时间：</div>
            <div>123</div>
          </div>
          <div>
            <div>交稿剩余时间：</div>
            <div>123</div>
          </div>
          <div>
            <div>交稿剩余时间：</div>
            <div>123</div>
          </div>
        </div>
      </div>
      <div class="user-info worker">
        <div class="avatar">
          <img src="" alt="">
        </div>
        <div class="info">
          <div class="title_exp">
            <div class="title">姓名</div>
            <div class="exp">10年工作经验</div>
          </div>
          <div class="address">北京 - 立水桥</div>
          <div class="post">雇主</div>
        </div>
        <a href="tel:123" class="tel">
          <img src="../../assets/images/ico_tel.png" alt="">
        </a>
      </div>
      <div class="txt">
        <p>工作者已提交项目文件，请您在PC端下载浏览文件</p>
      </div>
      <div class="txt">
        <h4>请在PC端上传您的作品</h4>
        <p>注：雇主有2次发起改稿的选择，如需改稿我们将会第一时间告诉您</p>
      </div>
      <div class="txt left">
        <p>雇主发起了改1稿，请您修改文件并在PC端提交文件</p>
        <p>需修改内容如下：</p>
        <p>1、门头logo字改为亚克力材质</p>
        <p>2、地面改为800*800mm灰色地砖</p>
        <div class="files">请在PC端下载附件</div>
      </div>
      <div class="tips">
        <p>注：您可以选择确认并评价或者发起改稿</p>
        <p>（为保证双方权益，仅允许发起改稿2次）</p>
      </div>
      <div class="tips">
        <p>恭喜您已完成此订单，佣金已转入您的积分账户请单击确认此订单即将转为历史订单</p>
      </div>
      <div class="btns">
        <div class="btn-redraft">发起改稿</div>
        <div class="btn-sumbit">确认并评价</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.containers {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
}
.header {
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
.main {
  min-height: 100%;
  padding-top: 116px;
  padding-bottom: 100px;

  .user-info {
    position: relative;
    display: flex;
    align-items: center;
    padding: 28px 70px;
    border-bottom: 4px solid #ebebeb;

    .tel {
      position: absolute;
      right: 100px;
      top: 50%;
      width: 97px;
      height: 97px;
      transform: translateY(-50%);
      img {
        width: 100%;
        height: 100%;
      }
    }

    &.worker {
      border-bottom: none;
      background-color: #f0f0f0;
    }

    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: red;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      margin-left: 26px;
      .title_exp {
        display: flex;
        .title {
          font-size: 26px;
        }
        .exp {
          margin-left: 20px;
          font-size: 20px;
          color: #808080;
        }
      }
      .address {
        font-size: 18px;
        color: #808080;
      }
      .post {
        font-size: 22px;
        font-weight: bold;
      }
    }
  }

  .project-info {
    padding: 28px 70px;
    .title {
      font-size: 30px;
      font-weight: bold;
    }
    .info {
      margin-top: 34px;
      > div {
        display: flex;
        justify-content: space-between;
        font-size: 24px;
        >div:first-child {
          color: #818181;
        }
        >div:last-child {
          color: #ff0000;
        }
      }
    }
  }

  .txt {
    text-align: center;
    padding: 80px 0;
    margin: 0 70px;
    border-bottom: 4px solid #ebebeb;

    &.left {
      p {
        text-align: left;
      }
    }

    p {
      font-size: 24px;
      color: #808080;
    }
    .files {
      display: inline-block;
      padding: 76px 30px;
      border: 1px solid #808080;
      font-size: 20px;
      color: #808080;
      margin-top: 20px;
    }
  }

  .tips {
    text-align: center;
    font-size: 24px;
    color: #757575;
    margin: 20px 0;
    padding: 0 100px;
  }

  .btns {
    display: flex;
    justify-content: space-between;
    padding: 0 70px;
    margin-bottom: 50px;
    >div {
      color: #fff;
      font-size: 30px;
      padding: 18px 70px;
      background-color: #4195f7;
    }
  }
}
</style>
