<template>
  <div class="work-container">
    <div class="header">
      <img @click="$router.push('my')" src="../../assets/images/back.png" alt="">
      <h3>平台简介</h3>
    </div>
    <div class="main">
      <h2>关于「自由工程协作平台」</h2>
      <h3>「自由工程协作平台」是什么？</h3>
      <p>「自由工程协作平台」是装饰行业内领先的时间与技能共享平台。将项目分包、众包给业内同伴，进行协作，让需求完美实现。「自由工程协作平台」拥有众多装饰项目行业注册用户，吸引业内达人入驻。「自由工程协作平台」提供线下服务和线上服务两种方式，您可以在这里找到您需要的服务，也可以用您的时间和技能去赚钱，平台会撮合最适合的双方进行交易。</p>
      <h3>「自由工程协作平台」工作者来自哪里？</h3>
      <p>「自由工程协作平台」来自纯粹的建筑装饰行业内人士，至少3年以上工作经验，他们包括：</p>
      <p>1、建筑装饰施工企业；</p>
      <p>2、设计院及设计工作室；</p>
      <p>3、行业内自由个体；</p>
      <p>4、行业内的各种技术人才：</p>
      <p style="text-indent:2em;">业务员、商务谈判师、主案设计师、平面规划设计师、结构设计师、配饰设计师、声学设计师、光学设计师、强弱电系统设计师、消防系统设计师、给排水及暖通工程师、效果图表现师、施工图制图师、造价师、风水师、PPT标书制作、测量师……，分布在全国400多个城市。他们在行业和领域有着出色的技能，希望可以用闲暇时间提供技能服务，实现自己的个人价值；也有一些服务者是拥有大量闲暇时间，可以提供自己的时间来赚钱。目前，「自由工程协作平台」上的服务者，全部由「自由工程协作平台」进行审核，以确保服务的质量。</p>
      <h3>分包的流程是怎么样的？</h3>
      <p>用户发需求→「自由工程协作平台」需求池中→工作者承接订单→雇主从应邀的服务者中选择一个最喜欢的服务者（可以通过「自由工程协作平台」打电话功能进行沟通具体的细节）→双方开启项目对接以及服务。</p>
      <h3>规范是怎么样的？</h3>
      <p>为了保证双方良好的交易体验，自由工程协作平台服务者为您提供正规的服务，我们希望双方能够彼此尊重，遵守如下基本规范：</p>
      <p>• 1.用户在发布需求时，尽量按照需求表单填写清楚，以便我们给您推荐最合适的服务者；</p>
      <p>• 2.服务者应邀后，在「自由工程协作平台」通过电话功能与用户沟通具体服务细节；</p>
      <p>• 3.正式服务时，服务者按照约定内容进行服务；</p>
      <p>• 4.双方见面不迟到，不爽约；</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.work-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.header {
  position: relative;
  height: 113px;
  border-bottom: 10px solid #ededed;
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
  flex: 1;
  overflow: scroll;
  padding: 20px 42px 100px;

  h2 {
    text-align: center;
    font-size: 34px;
    margin-bottom: 56px;
  }
  h3 {
    font-size: 28px;
    margin-bottom: 20px;
  }
  p {
    font-size: 24px;
    color: #bababa;
    line-height: 50px;
    margin-bottom: 20px;
  }
}
</style>
