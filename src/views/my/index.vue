<template>
    <div class="my-container">
        <div class="header">
            <div class="avatar">
                <img :src="userInfo.avatar" alt="">
            </div>
            <div class="setting" @click="$router.push('my-info')">
                <img src="~@/assets/images/my/ico_pencil.png" alt="">
                <span>编辑资料</span>
            </div>
            <div class="desc">
                <div>
                    <div>{{userInfo.available_points}}</div>
                    <div>可用积分</div>
                </div>
                <div>
                    <div>{{userInfo.available_cash_points}}</div>
                    <div>可提现积分</div>
                </div>
                <div>
                    <div>{{userInfo.career}}</div>
                    <div>工作年限</div>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="row">
                <router-link class="item" :to="{name:'my-work'}">
                    <img src="../../assets/images/my/ico_work.png" alt="">
                    <p>我的作品</p>
                </router-link>
                <router-link class="item" :to="{name:'my-certification-result'}">
                    <img src="../../assets/images/my/ico_certification.png" alt="">
                    <p>实名认证</p>
                </router-link>
                <router-link class="item" :to="{name:'my-about'}">
                    <img src="../../assets/images/my/ico_about.png" alt="">
                    <p>平台简介</p>
                </router-link>
            </div>
            <div class="row">
                <router-link class="item" :to="{name:'my-history-order'}">
                    <img src="../../assets/images/my/ico_order.png" alt="">
                    <p>历史订单</p>
                </router-link>
                <router-link class="item" :to="{name:'my-pay-new'}">
                    <img src="../../assets/images/my/ico_recharge.png" alt="">
                    <p>积分充值</p>
                </router-link>
                <router-link class="item" :to="{name:'my-points'}">
                    <img src="../../assets/images/my/ico_setting.png" alt="">
                    <p>积分管理</p>
                </router-link>
            </div>
            <div class="row">
                <div class="item" @click="logout">
                    <img src="../../assets/images/my/ico_logout.png" alt="">
                    <p>注销登录</p>
                </div>
            </div>
            <!-- <router-link class="item" :to="{name:'my-work'}">
                <img src="../../assets/images/my/ico_msg.png" alt="">
                <p>我的消息</p>
            </router-link>
            <router-link class="item" :to="{name:'my-work'}">
                <img src="../../assets/images/my/ico_start.png" alt="">
                <p>我的收藏</p>
            </router-link> -->
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Cookie from 'js-cookie'
export default {
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    logout () {
      Cookie.remove('user')
      location.reload()
    }
  }
}
</script>
<style lang="scss" scoped>
.my-container {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.header {
    padding-top: 21px;
    border-bottom: 20px solid #e5e5e5;

    .avatar {
        width: 160px;
        height: 160px;
        margin: 0 auto 25px;
        border-radius: 50%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }
    .setting {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 65px;

        img {
            width: 23px;
            height: 25px;
        }
        span {
            padding-left: 10px;
        }

    }
    .desc {
        display: flex;
        justify-content: space-between;
        margin: 0 120px 10px;

        > div {
            font-size: 25px;
            text-align: center;

            div:first-child {
                font-weight: 500;
                color: #535353;
            }
            div:last-child {
                color: #898989;

            }
        }

    }
}
.list {
    display: flex;
    flex-wrap: wrap;
    margin: 39px 118px 0;

    .row {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 50px;

        .item {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            img {
                width: 40px;
            }
            p {
                padding-top: 24px;
            }
        }
    }

}
</style>
