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
            <div class="item">
                <p>我的作品</p>
                <i class="fas fa-chevron-right"></i>
            </div>
            <div class="item">
                <p>实名认证</p>
                <i class="fas fa-chevron-right"></i>
            </div>
            <div class="item">
                <p>平台说明</p>
                <i class="fas fa-chevron-right"></i>
            </div>
            <div class="item">
                <p>积分充值</p>
                <i class="fas fa-chevron-right"></i>
            </div>
            <div class="item">
                <p>积分管理</p>
                <i class="fas fa-chevron-right"></i>
            </div>
            <div class="item">
                <p>退出登录</p>
                <i class="fas fa-chevron-right"></i>
            </div>
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
        padding: 0.5rem;
        overflow: hidden;
        background: url('~@/assets/images/my_background.png');
        background-size: cover;
        height: 12rem;

        .avatar {
            position: relative;
            overflow: hidden;
            border-radius: 1.5rem;
            background: #eee;
            color: #fff;
            text-align: center;
            line-height: 3rem;
            height: 3rem;
            width: 3rem;
            margin: 0 auto;

            img {
                height: 101%;
                width: 102%;
                position: absolute;
                left: 0;
                margin: -1px;
            }
        }

        .setting {
            font-size: .6rem;
            line-height: 1.2rem;
            text-align: right;
            i {
                color: #2196f3;
                margin-left: 0.2rem;
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
                    font-size: 1rem;
                }
                .exp {
                    margin-left: 1rem;
                    font-size: 0.7rem;
                    margin-bottom: 0.1rem;
                }
            }

            .integral {
                font-size: 0.8rem;
                > div {
                    margin: 0 10px;
                }
            }

            .intro {
                margin-top: 0.8rem;
                font-size: 0.6rem;
                line-height: 1.2rem;
            }
        }

    }

    .list {
        flex: 1;
        background: #fff;
        font-size: 0.6rem;
        padding: 0.5rem;
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: inline-block;
        width: 100%;
        overflow: auto;
        overflow-scrolling: touch;
        margin-top: 1rem;
        font-weight: 300;
        color: #aaa;

        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 2rem;
            font-size: 0.8rem;
            color: #999;
            border-bottom: 1px solid #eee;
        }
    }
}
</style>
