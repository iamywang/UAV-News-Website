<template>
  <div class="components-container">
    <el-alert :closable="false" center title="发表新视频" type="success" style="margin: 8px"/>
    <el-form label-width="120px" style="margin: 8px">
      <el-form-item label="视频标题"><el-input v-model="title" placeholder="请输入视频标题"/></el-form-item>
      <el-form-item label="视频发表日期"><el-date-picker v-model="date" type="datetime" placeholder="选择日期时间" style="width: 100%"/></el-form-item>
      <el-form-item label="视频时长"><el-input v-model="time" placeholder="请输入视频时长"/></el-form-item>
      <el-form-item label="视频作者"><el-input v-model="author" placeholder="请输入视频作者"/></el-form-item>
      <el-form-item label="视频背景图">
        <el-upload drag action="https://jsonplaceholder.typicode.com/posts/" multiple style="width: 100%">
          <i class="el-icon-upload"/>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="视频"><el-input v-model="videosrc" placeholder="请输入视频地址"/></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addVideo">发布视频</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AddVideo',
  data() {
    return {
      title: '',
      date: '',
      time: '',
      author: '',
      videoback: '',
      videosrc: ''
    }
  },
  methods: {
    addVideo() {
      var that = this
      axios.post('/server/insertVideos/', {
        id: that.id,
        name: that.title,
        date: that.date,
        time: that.time,
        videoback: that.videoback,
        videosrc: that.videosrc
      }).then(function(response) {
        that.$message({
          message: '发表成功！',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>
.components-container{
  text-align: center;
}
</style>

