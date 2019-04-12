<template>
  <div class="components-container">
    <el-alert :closable="false" center title="发表新闻" type="success" style="margin: 8px"/>
    <el-form label-width="120px" style="margin: 8px">
      <el-form-item label="新闻id"><el-input v-model="id" placeholder="请输入新闻id"/></el-form-item>
      <el-form-item label="新闻标题"><el-input v-model="title" placeholder="请输入新闻标题"/></el-form-item>
      <el-form-item label="新闻发表日期"><el-date-picker v-model="date" type="datetime" placeholder="选择日期时间" style="width: 100%"/></el-form-item>
      <el-form-item label="新闻作者"><el-input v-model="author" placeholder="请输入新闻作者"/></el-form-item>
      <el-form-item label="新闻背景图">
        <el-upload drag action="https://jsonplaceholder.typicode.com/posts/" multiple style="width: 100%">
          <i class="el-icon-upload"/>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
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
  methods: {
    addNews() {
      var that = this
      axios.post('/server/insertNews/', {
        id: that.id,
        name: that.title,
        date: that.date,
        tag: that.author,
        newsback: that.newsback,
        newstext: that.newstext
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

