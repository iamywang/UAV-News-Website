<template>
  <div class="components-container">
    <el-alert :closable="false" center title="发表新视频" type="success" style="margin: 8px"/>
    <el-form label-width="120px" style="margin: 8px">
      <el-form-item label="视频id"><el-input v-model="id" placeholder="请输入视频id"/></el-form-item>
      <el-form-item label="视频标题"><el-input v-model="title" placeholder="请输入视频标题"/></el-form-item>
      <el-form-item label="视频发表日期"><el-date-picker v-model="date" type="datetime" placeholder="选择日期时间" style="width: 100%"/></el-form-item>
      <el-form-item label="视频时长"><el-input v-model="time" placeholder="请输入视频时长"/></el-form-item>
      <el-form-item label="视频作者"><el-input v-model="author" placeholder="请输入视频作者"/></el-form-item>
      <el-form-item label="视频背景图"><el-input v-model="videoback" placeholder="请输入视频背景图"/></el-form-item>
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
import qs from 'qs'
export default {
  name: 'AddVideo',
  data() {
    return {
      id: '',
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
      axios.post('/server/insertVideos/', qs.stringify({
        id: that.id,
        name: that.title,
        date: that.date,
        time: that.time,
        videoback: that.videoback,
        videosrc: that.videosrc
      })).then(function(response) {
        that.$message({
          message: '发表成功！',
          type: 'success'
        })
        that.id = ''
        that.name = ''
        that.date = ''
        that.time = ''
        that.videoback = ''
        that.videosrc = ''
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

