<template>
    <div class="active">
        <div class="header">
            <img @click="$router.push({name: 'home'})" src="../assets/images/back.png" alt="back">
            <h3>竞技场</h3>
        </div>
        <img class="activeImg" src="../assets/images/active.jpg" alt="active">
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.active{
    position: fixed;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    z-index: 10;
    .activeImg{
        width: 100%;
    }
    .header {
        width: 100%;
        height: 113px;
        border-bottom: 3px solid #ededed;
        background-color: #fff;
        position: relative;
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
}
</style>
