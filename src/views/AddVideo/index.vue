<template>
  <div class="components-container">
    <el-alert :closable="false" center title="发表新视频" type="success" style="margin: 8px"/>
    <el-form label-width="120px" style="margin: 8px">
      <el-form-item label="视频id" style="text-align: left">{{ id }}</el-form-item>
      <el-form-item label="视频标题"><el-input v-model="title" placeholder="请输入视频标题"/></el-form-item>
      <el-form-item label="视频发表日期" style="text-align: left">{{ date }}</el-form-item>
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
  created() {
    var tdate = new Date()
    this.date = this.formatTime(tdate)
    this.id = 'video' + tdate.getFullYear() + this.formatNumber(tdate.getMonth() + 1) + this.formatNumber(tdate.getDate()) + this.formatNumber(tdate.getHours()) + this.formatNumber(tdate.getMinutes())
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
        that.title = ''
        that.date = ''
        that.time = ''
        that.author = ''
        that.videoback = ''
        that.videosrc = ''
      })
    },
    formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    formatTime(date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()

      var hour = date.getHours()
      var minute = date.getMinutes()

      return [year, month, day].join('.') + ' ' + [hour, minute].map(this.formatNumber).join(':')
    }
  }
}
</script>

<style scoped>
.components-container{
  text-align: center;
}
</style>

