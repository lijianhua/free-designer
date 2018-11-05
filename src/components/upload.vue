<template>
  <input id="upload" style="width:0;height:0;display:none;" type="file" :accept="accept" @change="uploadImage">
</template>
<script>

export default {
  props: ['maxsize', 'type', 'subtype'],
  created () {
    this.MAX_SIZE = this.maxsize * 1024 // *KB
    this.FILE_NAME_NOT_CONTAINS = [';'] // 文件名不能包含的内容
  },
  computed: {
    accept () {
      let accept = '*'
      switch (this.type) {
        case 'work':
          accept = 'image/png, image/jpeg, image/jpg, image/gif'
          break
        case 'resource':
          accept = '*'
          break
      }
      return accept
    }
  },
  methods: {
    onUploadComplete (e) {
      let resp = e.target.responseText
      let ret = JSON.parse(resp)
      this.$root.$emit('uploadComplete', {
        data: ret.data,
        fname: this.fname,
        subtype: this.subtype
      })
    },
    onUploadProgress (e) {
      this.$root.$emit('uploadProgress', e)
    },
    uploadImage (e) {
      let files = e.target.files
      let file = files[0]
      let fileName = file.name
      let fileSize = file.size
      this.fname = fileName
      // 文件大小不能为0
      if (fileSize === 0) {
        window.alert('文件大小不能为0')
        this.value = ''
        return false
      }
      if (fileSize > this.MAX_SIZE) {
        window.alert('文件不能超过' + this.MAX_SIZE)
        return
      }
      let fd = new FormData()
      fd.append('content', file)
      fd.append('type', this.type)
      let xhr = new XMLHttpRequest()
      xhr.upload.addEventListener('progress', this.onUploadProgress)
      xhr.addEventListener('load', this.onUploadComplete)
      xhr.addEventListener('error', this.onUploadFailed)
      // xhr.addEventListener('abort', this.onUploadCanceled)
      xhr.open('POST', '/api/upload_file/')
      xhr.send(fd)
      e.target.value = ''
    }
  },
  data () {
    return {
      fname: ''
    }
  }
}
</script>
