<template>
  <div class="components-container">
    <el-card shadow="hover" style="text-align: center; margin: 8px; font-weight: bold">添加评论</el-card>
    <el-form label-width="120px" style="margin: 8px">
      <el-form-item label="类别">
        <el-select v-model="type" placeholder="请选择" style="width: 100%">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="文章/视频编号"><el-input v-model="id" placeholder="请输入编号"/></el-form-item>
      <el-form-item label="评论发表日期" style="text-align: left">{{ date }}</el-form-item>
      <el-form-item label="昵称"><el-input v-model="name" placeholder="请输入昵称"/></el-form-item>
      <el-form-item label="头像"><el-input v-model="head" placeholder="请输入头像地址"/></el-form-item>
      <el-form-item label="所在地"><el-input v-model="location" placeholder="请输入所在地"/></el-form-item>
      <el-form-item label="机型"><el-input v-model="model" placeholder="请输入机型"/></el-form-item>
      <el-form-item label="评论"><el-input v-model="text" :autosize="{ minRows: 5, maxRows: 10}" type="textarea" placeholder="请输入评论"/></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addComment">发表评论</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'AddComment',
  data() {
    return {
      options: [{
        value: 'news',
        label: '新闻'
      }, {
        value: 'videos',
        label: '视频'
      }],
      id: '',
      type: '',
      name: '',
      head: '',
      date: '',
      location: '',
      model: '',
      text: ''
    }
  },
  created() {
    var tdate = new Date()
    this.date = this.formatTime(tdate)
  },
  methods: {
    addComment() {
      var that = this
      axios.post('/server/addComment/', qs.stringify({
        id: that.id,
        type: that.type,
        head: that.head,
        name: that.name,
        date: that.date,
        location: that.location,
        model: that.model,
        text: that.text
      })).then(function(response) {
        that.$notify({
          message: '发表成功！',
          type: 'success'
        })
        that.id = ''
        that.type = ''
        that.head = ''
        that.name = ''
        that.date = ''
        that.location = ''
        that.model = ''
        that.text = ''
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

