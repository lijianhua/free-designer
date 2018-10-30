<template>
    <div class="order-container">
        <div class="header">
            <img src="../../assets/images/banner/banner1.png" alt="">
        </div>
        <div class="tab-switch">
            <div class="btn" :class="{active:tabActive === 'employer'}" @click="tabActive = 'employer'">我是雇主</div>
            <div class="btn" :class="{active:tabActive === 'worker'}" @click="tabActive = 'worker'">我是工作者</div>
        </div>
        <mt-tab-container v-model="tabActive">
            <mt-tab-container-item id="employer">
                <div class="tab-main">
                    <div class="item">
                        <div class="state">
                            <img src="../../assets/images/order/ico_true.jpg" alt="">
                        </div>
                        <div class="main">
                            <div class="title">
                                <p>办公室内工程&nbsp;施工图</p>
                                <span>2800 积分</span>
                            </div>
                            <div class="date">
                                发单时间 2018-10-10 交稿时间 2018-11-11
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="state">
                            <img src="../../assets/images/order/ico_true.jpg" alt="">
                        </div>
                        <div class="main">
                            <div class="title">
                                <p>办公室内工程&nbsp;施工图</p>
                                <span>2800 积分</span>
                            </div>
                            <div class="date">
                                发单时间 2018-10-10 交稿时间 2018-11-11
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="state">
                            <img src="../../assets/images/order/ico_true.jpg" alt="">
                        </div>
                        <div class="main">
                            <div class="title">
                                <p>办公室内工程&nbsp;施工图</p>
                                <span>2800 积分</span>
                            </div>
                            <div class="date">
                                发单时间 2018-10-10 交稿时间 2018-11-11
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="state">
                            <img src="../../assets/images/order/ico_true.jpg" alt="">
                        </div>
                        <div class="main">
                            <div class="title">
                                <p>办公室内工程&nbsp;施工图</p>
                                <span>2800 积分</span>
                            </div>
                            <div class="date">
                                发单时间 2018-10-10 交稿时间 2018-11-11
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="state">
                            <img src="../../assets/images/order/ico_true.jpg" alt="">
                        </div>
                        <div class="main">
                            <div class="title">
                                <p>办公室内工程&nbsp;施工图</p>
                                <span>2800 积分</span>
                            </div>
                            <div class="date">
                                发单时间 2018-10-10 交稿时间 2018-11-11
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="state">
                            <img src="../../assets/images/order/ico_true.jpg" alt="">
                        </div>
                        <div class="main">
                            <div class="title">
                                <p>办公室内工程&nbsp;施工图</p>
                                <span>2800 积分</span>
                            </div>
                            <div class="date">
                                发单时间 2018-10-10 交稿时间 2018-11-11
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="state">
                            <img src="../../assets/images/order/ico_true.jpg" alt="">
                        </div>
                        <div class="main">
                            <div class="title">
                                <p>办公室内工程&nbsp;施工图</p>
                                <span>2800 积分</span>
                            </div>
                            <div class="date">
                                发单时间 2018-10-10 交稿时间 2018-11-11
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="state">
                            <img src="../../assets/images/order/ico_true.jpg" alt="">
                        </div>
                        <div class="main">
                            <div class="title">
                                <p>办公室内工程&nbsp;施工图</p>
                                <span>2800 积分</span>
                            </div>
                            <div class="date">
                                发单时间 2018-10-10 交稿时间 2018-11-11
                            </div>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="worker">
                <div class="tab-main">
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <div class="btn-box">
            <div class="btn-demand">
                发需求
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.order-container {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.header {
    height: 310px;
    img {
        width: 100%;
        height: 100%;
    }
}
.tab-switch {
    display: flex;
    height: 57px;
    line-height: 57px;
    text-align: center;
    background-color: #ebebeb;
    border: 1px solid #ebebeb; //ignored
    .btn {
        flex: 1;
        &.active {
            background-color: #fff;
        }
    }
}
.tab-main {
    height: 565px;
    padding-top: 50px;
    margin-bottom: 50px;
    overflow-y: auto;
}
.item {
    display: flex;
    margin: 60px 43px 0;
    &:nth-child(1){
        margin-top: 0;
    }
    .state {
        width: 82px;
        height: 82px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        font-size: 24px;
        margin-left: 30px;
        .title {
            display: flex;
            justify-content: space-between;
            font-weight: 500;

        }
        .date {
            font-size: 21px;
            color: #a1a1a1;
        }
    }

}
.btn-box {
    border-top: 3px solid #ebebeb;
    height: 257px;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn-demand {
        border-radius: 50%;
        text-align: center;
        line-height: 142px;
        width: 143px;
        height: 143px;
        color: #fff;
        background-color: #4a94ed;
    }
}
</style>
<script>
export default {
  data () {
    return {
      tabActive: 'employer' // employer 雇主  worker 工作者
    }
  }
}
</script>
