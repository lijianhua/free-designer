<template>
  <div class="container">
    <div class="header">
      <div class="avatar">
        <img src="http://www.free-designer.cn/M00/00/64/wKgABVt30lKAYOf6AAAz0yXWPI4179.png">
      </div>
      <div class="desc">
          <div class="info">
              <div class="tel">137****0000</div>
              <div class="exp">6年从业经验</div>
          </div>
          <div class="intro">测试一下啦</div>
      </div>
    </div>
    <div class="work-desc">
      <div class="item">
        <div>接单量</div>
        <div>3</div>
      </div>
      <div class="item">
        <div>作品下载量</div>
        <div>43</div>
      </div>
      <div class="item">
        <div>被点赞量</div>
        <div>19</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {

  .header {
    padding: 20px;
    overflow: hidden;
    background: url('~@/assets/images/my_background.png');
    background-size: cover;
    height: 440px;

    .avatar {
        overflow: hidden;
        border-radius: 50%;
        background: #eee;
        color: #fff;
        text-align: center;
        line-height: 120px;
        height: 120px;
        width: 120px;
        margin: 40px auto 0;

        img {
            height: 100%;
            width: 100%;
        }
    }

    .desc {
      display: flex;
      flex-direction: column;
      align-items: center;

      .info {
        display: flex;
        align-items: flex-end;
        .tel {
          font-size: 40px;
        }
        .exp {
          margin-left: 40px;
          font-size: 28px;
          margin-bottom: 4px;
        }
      }

      .intro {
        margin-top: 32px;
        font-size: 24px;
        line-height: 48px;
      }
    }
  }

  .work-desc {
    display: flex;
    justify-content: space-between;
    background-color: #444;
    font-size: 28px;
    color: #fff;
    border-bottom: 4px solid #aaa;
    text-align: center;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;

    .item {
      flex: 1;
    }
  }

}
</style>
