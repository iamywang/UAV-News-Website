<template>
  <div class="components-container">
    <el-alert :closable="false" center title="发表新闻" type="success" style="margin: 8px"/>
    <el-form label-width="120px" style="margin: 8px">
      <el-form-item label="新闻id" style="text-align: left">{{ id }}</el-form-item>
      <el-form-item label="新闻标题"><el-input v-model="title" placeholder="请输入新闻标题"/></el-form-item>
      <el-form-item label="新闻发表日期" style="text-align: left">{{ date }}</el-form-item>
      <el-form-item label="新闻作者"><el-input v-model="author" placeholder="请输入新闻作者"/></el-form-item>
      <el-form-item label="新闻背景图"><el-input v-model="newsback" placeholder="请输入新闻背景图地址"/></el-form-item>
      <el-form-item label="新闻正文"><el-input v-model="newstext" :autosize="{ minRows: 5, maxRows: 10}" type="textarea" placeholder="请输入正文"/></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addNews">发布文章</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'AddNews',
  data() {
    return {
      id: '',
      title: '',
      date: '',
      author: '',
      newsback: '',
      newstext: ''
    }
  },
  created() {
    var tdate = new Date()
    this.date = this.formatTime(tdate)
    this.id = 'news' + tdate.getFullYear() + this.formatNumber(tdate.getMonth() + 1) + this.formatNumber(tdate.getDate()) + this.formatNumber(tdate.getHours()) + this.formatNumber(tdate.getMinutes())
  },
  methods: {
    addNews() {
      var that = this
      axios.post('/server/insertNews/', qs.stringify({
        id: that.id,
        name: that.title,
        date: that.date,
        tag: that.author,
        newsback: that.newsback,
        newstext: that.newstext
      })).then(function(response) {
        that.$message({
          message: '发表成功！',
          type: 'success'
        })
        that.id = ''
        that.title = ''
        that.date = ''
        that.author = ''
        that.newsback = ''
        that.newstext = ''
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

