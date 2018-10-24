<template>
    <div class="my-container">
        <div class="header">
            <div class="avatar">
                <img src="http://www.free-designer.cn/M00/00/64/wKgABVt30lKAYOf6AAAz0yXWPI4179.png">
            </div>
            <div class="setting">
                <span>个人信息设置</span>
                <i class="fas fa-chevron-right"></i>
            </div>
            <div class="desc">
                <div class="info">
                    <div class="tel">137****0000</div>
                    <div class="exp">6年从业经验</div>
                </div>
                <div class="integral">
                    <div>可用积分：90890</div>
                    <div>可提现积分：50333</div>
                </div>
                <div class="intro">测试一下啦</div>
            </div>
        </div>
        <div class="list">
            <router-link class="item" :to="{name:'my-work'}">
                <p>我的作品</p>
                <i class="fas fa-chevron-right"></i>
            </router-link>
            <router-link class="item" :to="{name:'my-certification-result'}">
                <p>实名认证</p>
                <i class="fas fa-chevron-right"></i>
            </router-link>
            <router-link class="item" :to="{name:'my-about'}">
                <p>平台说明</p>
                <i class="fas fa-chevron-right"></i>
            </router-link>
            <router-link class="item" :to="{name:'my-work'}">
                <p>积分充值</p>
                <i class="fas fa-chevron-right"></i>
            </router-link>
            <router-link class="item" :to="{name:'my-work'}">
                <p>积分管理</p>
                <i class="fas fa-chevron-right"></i>
            </router-link>
            <router-link class="item" :to="{name:'my-work'}">
                <p>退出登录</p>
                <i class="fas fa-chevron-right"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.my-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #eee;

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
            margin: 0 auto;

            img {
                height: 100%;
                width: 100%;
            }
        }

        .setting {
            font-size: 24px;
            line-height: 48px;
            text-align: right;
            i {
                color: #2196f3;
                margin-left: 8px;
            }
        }

        .desc {
            display: flex;
            flex-direction: column;
            align-items: center;

            .info,.integral {
                display: flex;
                margin-top: 0.4rem;
            }

            .info {
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

            .integral {
                font-size: 32px;
                > div {
                    margin: 0 10px;
                }
            }

            .intro {
                margin-top: 32px;
                font-size: 24px;
                line-height: 48px;
            }
        }

    }

    .list {
        flex: 1;
        background: #fff;
        padding: 20px;
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: inline-block;
        width: 100%;
        overflow: auto;
        overflow-scrolling: touch;
        margin-top: 40px;
        font-weight: 300;
        color: #aaa;
        box-sizing: border-box;

        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 80px;
            font-size: 32px;
            color: #999;
            border-bottom: 1px solid #eee;
        }
    }
}
</style>
