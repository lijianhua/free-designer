<template>
  <div class="containers">
    <div class="header">
      <img @click="$router.push('/order')" src="../../assets/images/back.png" alt="">
      <h3>雇主{{orderDetail.status >= 90 ? '待确认' : '已确认' }}订单</h3>
    </div>
    <div class="main">
      <div class="order-info">
        <h3>{{orderDetail.title}}</h3>
        <div class="item">
          <div class="name">交单时间剩余：</div>
          <div class="content">{{orderDetail.count_down}}</div>
        </div>
        <div class="item">
          <div class="name">任务总量：</div>
          <div class="content">{{orderDetail.task_count}}{{orderDetail.task_unit}}</div>
        </div>
        <div class="item">
          <div class="name">任务价格</div>
          <div class="content">{{orderDetail.pub_cost}}</div>
        </div>
        <div class="btns">
          <div class="edit" @click="$router.push({name:'send-creat-order',query:{id:id}})">编辑</div>
          <div class="del">删除</div>
        </div>
      </div>
      <div class="user-title">
        <div>接单人&nbsp;&nbsp;{{orderDetail.apply_records.length}}</div>
        <div>浏览量&nbsp;&nbsp;35</div>
      </div>
      <div class="user-list">
        <template v-for="(item, index) in orderDetail.apply_records" >
          <router-link class="item" :to="{name:'order-user-info',params:{id:item.id}}" :key="index">
            <div class="avatar">
              <img :src="item.user.avatar" alt="">
            </div>
            <div class="info">
              <div class="item-header">
                <div class="title">{{item.user.name}}</div>
                <div class="integral">议价：{{item.user.apply_cost || 0}}积分</div>
              </div>
              <div>
                <div class="address">{{item.user.city}}</div>
                <div class="exp">{{item.user.career}}年工作经验</div>
              </div>
              <div class="skill">
                {{item.user.role | filterRole}}
              </div>
            </div>
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Store from '@/store'
import { mapGetters } from 'vuex'
export default {
  async beforeRouteEnter (to, from, next) {
    await Store.dispatch('order/getOrderDetail', to.params.id)
    next()
  },
  props: ['id'],
  computed: {
    ...mapGetters('order', ['orderDetail'])
  },
  filters: {
    filterRole (val) {
      return val.split(',').filter(v => v !== '').map(v => `【${v}】`).join('')
    }
  }
}
</script>
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

  .order-info {
    padding: 70px 76px 60px;
    border-bottom: 3px solid #ebebeb;
    h3 {
      font-size: 30px;
    }
    .item {
      display: flex;
      justify-content: space-between;
      font-size: 24px;
      margin-top: 20px;

      .name {
        color: #818181;
      }
      .content {
        color: #ff0000;
      }
    }
    .btns {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      >div {
        width: 45%;
        font-size: 30px;
        color: #fff;
        padding: 16px 0;
        text-align: center;
        background-color: #4195f7;
      }
    }
  }

  .user-title {
    display: flex;
    justify-content: space-around;
    padding: 20px 76px;
  }

  .user-list {
    .item {
      display: flex;
      padding: 44px 75px;
      background-color: #f0f0f0;
      & + .item {
        margin-top: 20px;
      }
      .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        flex: 1;
        margin-left: 25px;
        >div {
          display: flex;
          font-size: 26px;
          &.item-header {
            justify-content: space-between;
          }
          &.skill {
            font-size: 22px;
            font-weight: bold;
          }
          .title {
            font-weight: bold;
          }
          .integral {
            font-weight: bold;
            color: #ff0000;
          }
          .address {
            color: #808080;
          }
          .exp {
            color: #808080;
            padding-left: 20px;
          }
        }
      }
    }
  }
}
</style>
