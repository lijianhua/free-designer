<template>
    <div class="editWork">
        <div class="header">
            <img @click="$router.back()" src="../../assets/images/back.png" alt="">
            <h3>编辑作品</h3>
        </div>
        <div class="main-content">
            <div class="title">编辑作品名称:</div>
            <div class="item">
                <mu-text-field style="width:100%;" v-model="workName" placeholder="编辑作品名称"></mu-text-field>
            </div>
            <div class="title">作品描述:</div>
            <div class="item">
                <mu-text-field style="width:100%;" v-model="workDesc" placeholder="填写您作品的特点以及创意说明" multi-line :rows="6" :rows-max="6"></mu-text-field>
            </div>
        </div>
        <div class="uploadimgBox">
            <div class="title">上传作品:</div>
            <div class="item">
                <div class="img-box">
                    <div v-for="(item, index) in filesList" :key="index"  class="img-item">
                        <img :src="item.small_image" alt="">
                        <span class="delete" @click="deleteImg(index, item.gallery, item.id)">x</span>
                    </div>
                    <div class="img-item btn" @click="uploadImg"></div>
                </div>
                <upload-img type="work"></upload-img>
            </div>
        </div>
        <div class="submit" @click="submit">发布作品</div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import uploadImg from '@/components/upload'
export default {
  data () {
    return {
      filesList: [],
      userid: '',
      galleryid: '',
      workName: '',
      workDesc: ''
    }
  },
  computed: {
    ...mapGetters('my', ['workDetail', 'workImages'])
  },
  async created () {
    this.userid = this.$route.params.userid
    this.galleryid = this.$route.params.galleryid
    const dataForm = {
      user: this.userid,
      gallery: this.galleryid
    }
    await this.getWorkDetail(dataForm)
    this.workName = this.workDetail.name
    this.workDesc = this.workDetail.desc
    await this.getWorkImage(dataForm)
    this.filesList = this.workImages
  },
  methods: {
    ...mapActions('my', ['getWorkDetail', 'getWorkImage', 'fixWorkDetail', 'addWorkImage', 'deleteWorkImage']),
    uploadImg () {
      this.$el.querySelector('#upload').click()
    },
    async submit () {
      const dataForm = {
        name: this.workName,
        desc: this.workDesc,
        galleryid: this.galleryid
      }
      await this.fixWorkDetail(dataForm)
      this.$router.back()
    },
    async deleteImg (index, gallery, image) {
      const dataForm = {
        galleryid: gallery,
        imageid: image
      }
      await this.deleteWorkImage(dataForm)
      this.filesList.splice(index, 1)
    }
  },
  mounted () {
    this.$root.$on('uploadComplete', async resp => {
      let data = resp.data
      const image = {
        '200x150': data[0][1],
        '400x300': data[1][1],
        '800x600': data[2][1],
        'ori': data[3][1]
      }
      const dataForm = {
        name: this.workName,
        galleryid: this.galleryid,
        image: image
      }
      await this.addWorkImage(dataForm)
      const dataFormt = {
        user: this.userid,
        gallery: this.galleryid
      }
      await this.getWorkImage(dataFormt)
      this.filesList = this.workImages
    })
  },
  components: {
    uploadImg
  }
}
</script>

<style scoped lang="scss">
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
.editWork{
  .main-content{
    padding-left: 50px;
    padding-right: 50px;
    .item{
      .mu-input {
        font-size: 24px;
      }
    }
  }
  .uploadimgBox{
    border-top: 6px solid #ededed;
    border-bottom: 6px solid #ededed;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 30px;
    .item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 83px;
        .img-box {
            display: flex;
            flex-wrap: wrap;
            width: 444px;
            .img-item {
                width: 140px;
                height: 105px;
                background-color: #ececec;
                margin-right: 12px;
                position: relative;
                &:nth-child(3n+0){
                    margin-right: 0;
                }
                &:nth-child(n+4){
                    margin-top: 10px;
                }
                &.btn {
                    background: url('../../assets/images/add.png') no-repeat center #ececee;
                    background-size: 50%;
                }
                img{
                    width: 140px;
                    height: 105px;
                }
                .delete{
                    position: absolute;
                    right: 5px;
                    top: 5px;
                    border-radius: 50%;
                    background-color: red;
                    opacity: .5;
                    color: #fff;
                    display: block;
                    width: 30px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                }
            }
        }
    }
  }
  .title{
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 30px;
  }
  .submit {
    width: 436px;
    height: 67px;
    color: #fff;
    line-height: 67px;
    text-align: center;
    background-color: #4195f7;
    margin: 0 auto 125px;
    font-size: 35px;
    margin-top: 40px;
  }
}
</style>
