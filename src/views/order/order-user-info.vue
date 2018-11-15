<template>
  <div class="containers">
    <div class="header">
      <img @click="$router.back()" src="../../assets/images/back.png" alt="">
      <h3>接单人详情</h3>
    </div>
    <div class="main">
      <div class="main-header">
        <div class="user-info">
          <div class="avatar">
            <img :src="userInfo.user.avatar" alt="">
          </div>
          <div class="info">
            <div class="item-header">
              <div class="title">{{userInfo.user.name}}</div>
              <div class="integral">议价：{{userInfo.apply_cost}}积分</div>
            </div>
            <div>
              <div class="exp">{{userInfo.user.career}}年工作经验</div>
            </div>
            <div class="skill">
              {{userInfo.user.role | filterRole}}
            </div>
          </div>
        </div>
        <div class="explain">
          <h3>竞标说明</h3>
          <p>{{userInfo.desc || '暂无'}}</p>
        </div>
      </div>
      <div class="case">
        <h3>同类案例</h3>
        <div class="box">
          <div v-if="userInfo.works.length" class="scroll" :style="{width:userInfo.works.length + '00%'}">
            <div class="item" v-for="(item, index) in userInfo.works" :key="index">
              <img :src="item[1]" alt="">
            </div>
          </div>
          <div v-else>暂无</div>
        </div>
      </div>
      <div class="test-paper">
        <div class="paper-header">
          <h3>答题试卷<span>【您设置了{{userQuestionList.length}}道试题】</span></h3>
        </div>
        <div class="paper-main">
          <div class="item" v-for="(item, index) in userQuestionList" :key="index">
            <h4>第{{ index + 1 }}题：{{ item.order_question.question }}</h4>
            <div class="time">
              <img src="../../assets/images/ico_time.png" alt="">【{{ showAnswerTime(item.start_time, item.end_time) }}】
            </div>
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
      <div class="tel-check">
        <h3>电话考核</h3>
        <a :href="`tel:${userInfo.user.mobile}`"><img src="../../assets/images/ico_tel.png" alt=""></a>
      </div>
      <div class="footer">
        <h4 class="total-price">服务总价：{{orderDetail.pub_cost + orderDetail.apply_cost + orderDetail.system_cost}}积分</h4>
        <div class="price-info">【系统报价{{orderDetail.system_cost}}+增加奖金{{orderDetail.fee}}+接单人加价{{orderDetail.apply_cost}}】</div>
        <div class="submit" @click="surePay">确定合作并付款</div>
        <div class="agree" @click="showAgree">
          <img src="../../assets/images/redyes.png" alt="redyes">
          <span>我已阅读并同意遵守本次服务协议</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import Store from '@/store'
import { mapGetters, mapActions } from 'vuex'
export default {
  async beforeRouteEnter (to, from, next) {
    await Store.dispatch('order/getUserQusetion', to.params.id)
    next()
  },
  props: ['id'],
  computed: {
    ...mapGetters('order', ['orderDetail', 'userQuestionList'])
  },
  data () {
    return {
      userInfo: {},
      title: '自由工程协作平台服务协议',
      txt: `
<p>本平台依据本服务协议提供服务，平台注册用户注册成功即代表您已经阅读并同意《自由工程协作平台服务协议》。请在发布服务和需求之前认真阅读本协议。在本平台已经操作发布服务或需求、即代表您已经认真阅读并同意本协议全部条款。本条款生效版本以平台线上为最终版本。</p>
<h3>一、定义和释义</h3>
<p>在本服务协议及本平台其它协议相关规定中所使用的下列词语，除非另有定义，应具有以下含义：</p>
<p>1．1 “本平台”指自由工程协作平台官网、H5页面、公众号功能等自由工程协作平台官方相关全部产品。</p>
<p>1．2 “用户”指符合《自由工程协作平台使用协议》所规定的条件，并根据《自由工程协作平台使用协议》在本平台注册，同意遵守本平台各种规则、条款（包括但不限于本服务协议），并使用本平台的个人。</p>
<p>1．3 “本服务协议”指本平台根据本服务协议而提供的网上交易服务协议以及自由工程协作平台包括的《自由工程协作平台使用协议》等及本平台其他相关规定。同时，本平台有权随时变更和修改以上规定，并以线上版本作为生效版本。</p>
<p>1．4 “工作者”是指注册成为平台的用户，在符合《自由工程协作平台使用协议》的用户。</p>
<p>1．5 “服务”是指符合平台规范，以提供正规服务为诉求并在平台通过提供劳动的形式满足他人在平台上的合法诉求的行为。</p>
<p>1．6 “雇主”是指注册成为平台的用户，在符合《自由工程协作平台使用协议》下发布需求的用户。</p>
<p>1．7 “订单”又称“需求”，是指雇主在平台对服务者劳动的合法诉求。</p>
<h3>二、关于本平台</h3>
<p>2．1本平台仅为用户提供一个互通信息、劳务交易的平台，充当买卖双方之间的交流及撮合媒介。</p>
<p>2．2公布在本平台上的交易标的是用户自行发布的劳动服务，并非本平台所有。平台所有服务者与本平台无劳动雇佣关系、平台不对劳务关系主体所涉及的各方承担责任。对于用户发布在本平台的服务、提供的信息、参与应邀及竞标的过程，本平台对产生的信息已做相关审核，并对违反本平台相关规定的信息（包括但不限于色情、反动、违法）等做相应处理，但不对用户产品信息的真伪性进行负责。对于因交易产生的任何纠纷， 平台作为信息撮合平台，可提供介入调停，但不对最后结果负责。若用户对调停结果有异议，自由工程协作平台有义务向相关司法部门提供纠纷用户在平台交易的相关资料，协助相关司法部门判决。</p>
<p>用户使用本平台进行交易时，必须了解且遵守以下事项：</p>
<p>a）服务者和雇主必须通过自己的谨慎判断来确定交易标的、服务者和雇主信息的真实性、合法性以及准确性。</p>
<p>b）服务者和雇主必须对交易负完全责任。</p>
<p>c）服务者和雇主必须自行解决由交易所引起的纠纷。平台仅义务提供调停，但不对纠纷结果负责。</p>
<p>d）服务者和雇主必须自行负担因交易而产生的费用。</p>
<p>e）服务者和雇主必须了解并遵守中华人民共和国的相关法律规定。</p>
<p>2．3用户同意遵守《全国人民代表大会常务委员会关于维护互联网安全的决定》、《互联网信息服务管理办法》、《中华人民共和国保密法》、《计算机信息系统国际联网保密管理规定》、《中华人民共和国计算机信息系统安全保护条例》、《计算机信息网络国际联网安全保护管理办法》、《中华人民共和国计算机信息网络国际联网管理暂行规定》及其实施办法等相关法律法规的规定，并对注册本人以任何方式使用本平台的任何行为及其结果承担全部责任。在任何情况下，如果本平台有理由认定用户的行为，包括但不限于用户的任何言论和其它行为，违反或可能违反上述法律和法规的任何规定，本平台可在任何时候不经任何事先通知终止向用户提供本平台的服务。</p>
<p>进入本平台进行交易，即代表接受本平台的各项服务协议、规则和公告并接受本平台系统提供的服务与规范，通过电子协议的形式缔结平台所有相关协议。</p>
<p>2.4服务者的权利与义务</p>
<p>2.4.1做为服务者，用户在发布服务时，应该根据《限制与禁止出售规则》先行判断是否有出售该标的的权利、交易标的是否合法。按照《商品刊登和发布规则》的规定，提供正确的服务名称和准确、真实、完整说明内容与图片和其他信息。在确认提交出售标的后，即代表服务者同意。</p>
<p>2.4.2服务者注册自由工程协作平台，发布服务即代表同意提供合规、真实、合法服务。服务者需根据任务总额的积分中20%缴纳平台管理费。</p>
<p>2.4.3应邀雇主后，服务者有义务就雇主的问题、交易所涉及事项通过平台进行售前沟通解答。服务者不得在沟通中诱骗雇主转至其他第三方平台以索要红包、交通费等名义要求雇主平台外付款。</p>
<p>2.4.4服务者和雇主确认交易事项，达成交易共识后，即代表服务者同意提供服务，在未提前告知雇主时，不得单方面爽约。否则雇主有权追究因此产生的相关损失。</p>
<p>2.4.5服务者承接订单即代表同意保证服务上传信息的真实性，并保证提供的服务（包括线上服务和线下服务）为本人并与在平台发布的服务一致。若不一致，雇主有权举报，平台不排除追究服务者相关法律责任。</p>
<p>2.4.6服务者应邀报价后，应按照报价或约定价格进行服务交易。不得擅自变更服务项目或改价。若未协商一致的，需在开始服务前终止交易，若未终止即代表同意按照应邀信息进行服务。若由于服务者原因中途变更或终止服务，雇主及平台有权追究相关法律责任。</p>
<p>2.5雇主的权利与义务</p>
<p>2.5.1雇主发布需求后，即代表授权本平台向卖家披露您的必要信息并同意接受自由工程协作平台平台提供的撮合服务。</p>
<p>2.5.2做为雇主，出价前，应详细审阅及评估服务者个人资料（包括不限于昵称、头像、我的简介、教育经历、竞争描述、工作经历、服务介绍、荣誉资质、专业文档等图、文资、影音资料），在充分了解服务者信息后发布需求，一经发布即代表雇主已经了解并同意服务者的服务信息和服务内容。</p>
<p>2.5.3为更好的满足雇主的需求，平台有义务在有效期内为雇主发布的需求提供广播，形式包括但不限于推送、平台系统消息、短信、电话等方式。</p>
<p>2.5.4雇主有权利在订单有效期内享受服务者应邀，直至所发布订单应邀满为止。订单在有效期内，为保证服务者的服务，若与服务者发生分歧可发邮件至1776261265@qq.com投诉，经平台核实后可申请退回至自由工程协作平台用户“积分管理”账户。</p>
<h3>三、出售及购买服务</h3>
<p>本平台用户在进行买卖交易时，必须依照以下服务协议进行：</p>
<p>3.1 用户在非本平台之外的所有操作及交易，自由工程协作平台平台无权干涉，若因此产生的任何纠纷自由工程协作平台无权负责。</p>
<p>3.2不得提供禁止、限制出售的物品和服务作为出交易标的及赠品。</p>
<p>3.3不得在交易的刊登内容中发布任何不符合本服务协议精神的交易要求，包括但不限于平台发布的平台所有协议。</p>
<p>3.4不得利用本平台进行任何欺诈或欺骗的行为；服务者必须保证对于出售的物品或服务具有合法处分的权利，没有涉及侵害他人权利的情形，如有需要，服务者有义务向雇主提供关于该出售物品或服务的相关证明文件（包括但不限于身份认证、技能认证等）。</p>
<p>3.5如依法律规定，特定物品或服务的买卖或持有需先取得相关执照或许可时，服务者和雇主必须持有或取得相关执照或许可，方可进行交易。</p>
<p>3.6用户不得操纵交易，如：故意压低出价，以免费服务为噱头等其他非正当营销手段。 </p>
<p>3.7不得干扰正在进行中的订单，例如在其他服务者正在接洽或者交易时，服务者不得干扰雇主决策或以诋毁、阻拦等方式阻碍其他服务者沟通服务。</p>
<p>3.8对于确认交易的服务，如雇主已经支付积分的，既视为服务开始，服务者有责任按照应邀报价或双方约定的价格进行交易，除非雇主资料不实导致服务者无法确认其身份；对于已经确定开始的服务，雇主有责任按照服务者报价或双方约定的价格进行交易，除非服务者资料不实导致雇主无法确认其身份。</p>
<p>3.9所有利用本平台从事经营性活动的注册用户，应遵守《电子商务监督管理暂行办法》。</p>
<h3>四、商品刊登和发布条款</h3>
<p>4.1为了保证交易的顺利进行，用户注册即代表了解并同意遵守本平台使用手册中所有协议及平台所有规范，用户一旦使用违反相关规定的，本平台保留给予相关用户警告，冻结或终止其帐户的权利，由此类行为所引起的法律责任由相关用户完全承担，与本平台无关。</p>
<h3>五、会员的权利和义务</h3>
<p>5.1本平台用户不得出售国家法律、法规或本平台禁止交易的物品和服务。对国家法律、法规限制交易的物品和服务，应符合有关法律、法规所规定的条件。一旦本平台发现有任何禁止交易物品或不符合特殊交易条件的限制交易物品和服务，有权将发布相关信息予以删除，并保留给予相关用户警告、冻结或终止其帐户的权利。在用户准备应用本平台进行交易之前，应仔细阅读本平台使用手册中所有协议及平台相关规定。由于违规交易所引起的法律责任由相关用户完全承担，与本平台无关。</p>
<h3>六、授权</h3>
<p>6.1任何交易服务的资料一经上传、输入或提供至本平台之时，视为用户已允许本平台可以以宣传本平台或交易（包括您的或他人的）为目的，无条件在本平台及以外的其它平台重制、散布、修改、展示、公开播送、公开传输这些资料，并且用户对此不会向本平台提出异议。</p>
<h3>七、安全交易</h3>
<p>7.1平台提供手机认证、身份认证，对于无认证信息用户产生的违规行为，与平台无关。</p>
<h3>八、效力</h3>
<p>8.1 本平台上所公布的所有规范及使用说明均构成本服务协议的一部分，所有用户应该予以遵守。</p>
<p>8.2本平台有权于任何时间修改或变更本服务协议、及其它相关规定。上述规定若有任何重大变更或修改，修订后的上述规定自公布时起生效，用户若在上述规定修改之后，仍继续使用本平台，则视为接受和自愿遵守修订后的规定。</p>
<h3>九、违反使用规范</h3>
<p>9.1本平台对于用户所发布的买卖物品及信息（ 以下称“买卖信息”）将会进行审核，如果发现包含有禁售、限售物品或非法信息，本平台有权随时不通知用户的情况下删除该买卖信息。但是，用户本人仍需对所发布的信息承担法律责任，若用户违反本使用规范或任何公告于本平台的服务使用说明，本平台有权在不通知用户的情况下立即删除用户所发布信息，情节严重的终止使用本平台的权利。若用户的行为如有触犯相关法律，本平台并可以提请相关单位进行调查并追究责任。</p>
<p>9.2本平台若因用户发布的信息侵害了除该用户本人、自由工程协作平台平台之外的第三人权利或违反了相关规定，而受到第三人的追偿或受到主管机关的处分时，发布信息者应赔偿本平台因此所产生的一切损失及费用。</p>
<h3>十、本平台的责任范围</h3>
<p>10.1当用户使用本平台并享受平台服务时，即代表用户已经阅读并接受本协议全部条款。并且承诺使用本平台的风险由用户本人负担。本平台是在现有技术基础上提供的。本平台不保证以下事项∶</p>
<p>a)本平台将符合您的要求。</p>
<p>b)本平台不受干扰、能够及时提供、安全可靠或免于出错。</p>
<p>c)本服务使用权的取得结果是正确或可靠的。</p>
<p>d)您经由本平台购买或取得的任何商品或服务将符合您的期望。</p>
<p>10.2是否经由本平台下载或取得任何资料，由用户自行考虑、衡量并且自负风险。</p>
<p>10.3用户自本平台或经由本平台取得的信息和咨询，无论其为书面或口头，绝不包含或以任何方式构成本服务协议未明示规定的任何保证。</p>
<p>10.4基于以下原因而造成的利益、名义、使用、资料损失或其它无形损失，本平台不承担任何直接、间接、附带、特别、衍生性或惩罚性赔偿：</p>
<p>a)本平台的使用或无法使用。</p>
<p>b)经由或通过本平台购买或取得的任何商品，或接收之讯息，或进行交易所随之产生的替代商品及服务的购买成本。</p>
<p>c)用户的传输或资料遭到未获授权的存取或变更。</p>
<p>d)本平台中任何第三人的声明或行为。</p>
<p>e)本平台其它相关事宜。</p>
<p>10.5本平台只是为用户提供一个信息撮合的平台，对于用户所刊登的交易物品或信息的合法性、真实性及其品质，以及用户履行交易的能力等，本平台一律不负任何担保责任。用户如果因使用本平台，或因购买刊登于本平台的任何物品或服务而受到损害时，本平台不负任何补偿或赔偿责任。</p>
<h3>十一、知识产权的保护</h3>
<p>11.1本平台及本平台所使用的任何相关软件、程序、内容，包括但不限于作品、图片、档案、资料、网站构架、网站版面的安排、网页设计、经由本平台或广告商向用户呈现的广告或资讯，均由本平台或其它权利人依法享有相应的知识产权，包括但不限于著作权、商标权、专利权或其它专属权利等，受到相关法律的保护。未经本平台或权利人明示授权，您保证不修改、出租、出借、出售、散布本平台及本平台所使用的上述任何资料和资源，或根据上述资料和资源制作成任何种类物品。本平台授予您个人、不可转移及非专属的使用权，使您可以通过单机计算机使用本平台的目标代码（以下简称“软件”），但用户不得且不得允许任何第三人，复制、修改、创作衍生作品、进行还原工程、反向组译，或以其它方式破译或试图破译源代码，或出售、转让“软件”或对“软件”进行再授权，或以其它方式移转“软件”之任何权利。用户同意不以任何方式修改“软件”，或使用修改后的“软件”。用户不得经由非本平台所提供的界面使用本平台。</p>
<h3>十二、通知方式</h3>
<p>12.1就本服务协议项下的有关事项，或本平台提供的服务而涉及的有关事项，均将通过平台本身做公示且公示即视为生效。</p>
    `
    }
  },
  filters: {
    filterRole (val) {
      return val.split(',').filter(v => v !== '').map(v => `【${v}】`).join('')
    }
  },
  created () {
    if (!Object.keys(this.orderDetail).length) {
      this.$router.back()
      return
    }
    this.userInfo = this.orderDetail.apply_records.find(v => v.id === this.id)
  },
  methods: {
    ...mapActions('order', ['pleaseAcceptOrder']),
    showAnswerTime (start, end) {
      const time = (end - start) / 1000
      const hour = Math.floor(time / 3600)
      const min = Math.floor(time / 60) % 60
      const sec = time % 60
      let t = ''
      if (hour > 0) {
        if (hour < 10) {
          t = '0' + hour + ':'
        } else {
          t = hour + '时'
        }
      }
      if (min < 10) { t += '0' }
      t += min + '分'
      if (sec < 10) { t += '0' }
      t += sec.toFixed(0) + '秒'
      return t
    },
    async surePay () {
      const dataForm = {
        goods_id: this.id,
        goods_type: 'pre_order',
        price_type: 'all'
      }
      await this.pleaseAcceptOrder(dataForm)
      this.$router.push({
        name: 'order'
      })
    },
    showAgree () {
      MessageBox.alert(this.txt, this.title)
    }
  },
  mounted () {
    console.log(this.userInfo)
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
  background-color: #f0f0f0;
  >div {
    padding: 0 75px;
  }

  .main-header {
    padding-top: 44px;
    padding-bottom: 44px;
    border-bottom: 10px solid #fff;
    .user-info {
      display: flex;
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
          .exp {
            color: #808080;
          }
        }
      }
    }
    .explain {
      margin-top: 28px;
      h3 {
        font-size: 30px;
      }
      p {
        font-size: 22px;
        margin-top: 24px;
      }
    }
  }

  .case {
    width: 100%;
    overflow: hidden;
    padding-right: 0;
    padding-bottom: 33px;
    border-bottom: 10px solid #fff;
    h3 {
      font-size: 30px;
      padding: 36px 0 30px;
    }
    .box {
      width: 100%;
      overflow-x: scroll;
      .item {
        display: inline-block;
        width: 578px;
        height: 449px;
        // background-color: red;
        img {
          width: 100%;
          height: 100%;
        }

        & + .item {
          margin-left: 44px;
        }
      }
    }

  }

  .test-paper {
    padding: 0;
    padding-bottom: 50px;
    background-color: #fff;
    .paper-header {
      font-weight: bold;
      font-size: 30px;
      padding: 20px 75px;
      background-color: #f0f0f0;
      span{
        color: #808080;
      }
    }
    .paper-main {
      padding: 0 75px;
      .item {
        margin-top: 40px;
        h4 {
          font-size: 22px;
          font-weight: bold;
        }
        .time {
          margin-top: 50px;
          font-size: 24px;
          color: #ff0000;
          img {
            width: 55px;
            height: 55px;
          }
        }
        p {
          padding-left: 68px;
        }
      }
    }
  }

  .tel-check {
    text-align: center;
    h3 {
      font-size: 28px;
      font-weight: bold;
      margin: 40px 0;
    }
    img {
      width: 97px;
      height: 97px;
      margin-bottom: 40px;
    }
  }

  .footer {
    text-align: center;
    padding: 0;
    padding-top: 60px;
    padding-bottom: 60px;
    margin-bottom: 40px;
    background-color: #fff;

    .total-price {
      font-size: 34px;
      color: #4195f7;
    }
    .price-info {
      margin-top: 14px;
      font-size: 16px;
      color: #4195f7;
    }
    .submit {
      margin-top: 40px;
      display: inline-block;
      font-size: 30px;
      color: #fff;
      padding: 20px 118px;
      background-color: #4195f7;
    }
    .agree {
      margin-top: 20px;
      img {
        width: 18px;
        height: 18px;
      }
      span {
        padding-left: 14px;
        font-size: 18px;
        color: #818181;
      }
    }
  }

}
</style>
