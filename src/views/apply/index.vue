<template>
    <div class="apply">
        <mt-swipe class="swiper" :auto="4000">
          <mt-swipe-item v-for="(item, index) in bannersList" :key="index">
            <img :src="item.pic" alt="banner">
          </mt-swipe-item>
        </mt-swipe>
        <div v-if="showFilter" class="selectFilter">
            <div class="sortFilter">
                <mu-select v-model="selectType" :label-float="true" @change="getList">
                  <mu-option v-for="(item, index) in filterClass"
                    :key="index"
                    :label="item"
                    :value="item"></mu-option>
                </mu-select>
            </div>
            <div class="sortFilter">
                <mu-select v-model="selectApply" :label-float="true" @change="getList">
                  <mu-option v-for="(item, index) in filterApply"
                    :key="index"
                    :label="item.name"
                    :value="item.name"></mu-option>
                </mu-select>
            </div>
        </div>
        <div class="applyContainer">
          <mt-loadmore :top-method="getList" :bottom-method="load" :bottom-all-loaded="isLoadedAll" ref="loadmore">
            <div class="send-card" v-for="(item, index) in demandsList" :key="index" @click="toOrderDetail(item.id, item.user.id)">
              <img src="../../assets/images/demand_background.png" alt="">
              <div class="card-body">
                <div class="body-left">
                  <div class="title ellipsis">{{item.title}}</div>
                  <div class="time">
                    <span>发单时间:{{item.created_on}}</span>
                    <span>交稿时间:{{item.deadline}}</span>
                  </div>
                  <div class="info">
                    <span class="price">￥{{item.pub_cost/100}}</span>
                    <span class="view">浏览:{{item.view_count}}</span>
                    <span class="accept">接单:{{item.order_type}}</span>
                  </div>
                </div>
                <div class="body-right">
                  <div class="userHeader"><img :src="item.user.avatar" alt=""></div>
                  <div class="name ellipsis">{{item.user_name}}</div>
                </div>
              </div>
            </div>
          </mt-loadmore>
          <div class="noData" v-show="demandsList.length == 0">暂无数据</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Cookie from 'js-cookie'
export default {
  data () {
    return {
      selectType: '项目分类',
      selectApply: '项目需求',
      showFilter: true,
      isLoadedAll: false,
      userId: ''
    }
  },
  computed: {
    ...mapGetters('apply', ['filterClass', 'filterApply', 'demandsList', 'demandPage', 'bannersList'])
  },
  async created () {
    this.getBanners()
    this.userId = JSON.parse(Cookie.get('user')).id
    await this.getFilterInfo()
    this.getList()
  },
  methods: {
    ...mapActions('apply', ['getFilterInfo', 'getDemandsList', 'getMoreDemands', 'getBanners']),
    async getList () {
      if (this.isLoadedAll) {
        this.isLoadedAll = false
      }
      let dataForm = {}
      if (this.selectType !== '项目分类') {
        dataForm.fcate = this.selectType
      }
      if (this.selectApply !== '项目需求') {
        dataForm.scate = this.selectApply
      }
      await this.getDemandsList(dataForm)
      this.$refs.loadmore.onTopLoaded()
    },
    async load () {
      if (this.demandPage.page + 1 > this.demandPage.total_page) {
        this.isLoadedAll = true
        return
      }
      let dataForm = {}
      if (this.selectType !== '项目分类') {
        dataForm.fcate = this.selectType
      }
      if (this.selectApply !== '项目需求') {
        dataForm.scate = this.selectApply
      }
      if (this.demandPage.page) {
        dataForm.page = this.demandPage.page + 1
      }
      await this.getMoreDemands(dataForm)
      this.$refs.loadmore.onBottomLoaded()
    },
    toOrderDetail (orderId, userId) {
      if (userId === this.userId) {
        this.$router.push({
          name: 'unconfirmed-detail',
          params: {
            id: orderId
          }
        })
      } else {
        this.$router.push({
          name: 'orderDetail',
          params: {
            orderid: orderId
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .apply{
    width: 100%;
    height: calc(100% - 100px);
    .swiper {
      height: 309px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .selectFilter{
      padding: 10px 90px;
      border-top: 3px solid #ebebeb;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .sortFilter{
        width: 250px;
        position: relative;
        .mu-input-label{
          width: 100%;
        }
        span{
          position: absolute;
          font-size: 24px;
          margin-right: 40px;
          color: #808080;
        }
        .mu-select{
          position: absolute;
        }
      }
    }
    .applyContainer{
      padding: 10px;
      height: calc(100% - 310px - 50px);
      overflow-y: auto;
      .send-card{
        width: 100%;
        text-align: left;
        margin-bottom: 60px;
        margin-top: 20px;
        line-height: 20px;
        box-shadow: 0 9px 15px #888;
        color: #2c5074;
        position: relative;
        img{
          width: 100%;
        }
        .card-body{
          width: calc(100% - 20px);
          height: calc(100% - 20px);
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          .body-left{
            width: 80%;
            .title{
              font-size: 30px;
              line-height: 40px;
            }
            .time{
              line-height: 40px;
              font-size: 14px;
              color: #758fa9;
              span{
                margin-right: 10px;
              }
            }
            .info{
              line-height: 60px;
              font-size: 14px;
              padding: 20px 0;
              color: #758fa9;
              span{
                margin-right: 10px;
              }
              .price{
                font-size: 30px;
              }
            }
          }
          .body-right{
            width: 20%;
            position: relative;
            .userHeader{
              width: 120px;
              height: 120px;
              border-radius: 50%;
              overflow: hidden;
              position: absolute;
              top: -30px;
            }
            .name{
              width: 120px;
              font-size: 22px;
              position: absolute;
              bottom: 30px;
            }
          }
        }
      }
    }
  }
</style>
