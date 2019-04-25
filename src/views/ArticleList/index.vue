<template>
  <div class="app-container">
    <el-card shadow="hover" style="text-align: center; margin: 8px; font-weight: bold">文章管理</el-card>
    <el-row>
      <el-col :span="6" style="margin: 8px">
        <el-input placeholder="请输入内容" size="small">
          <el-button slot="append" size="small" icon="el-icon-search" />
        </el-input>
      </el-col>
      <el-col :span="4" style="margin: 8px">
        <el-button type="plain" size="small" icon="el-icon-plus">添加文章</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      stripe
      border
      fit
      highlight-current-row>
      <el-table-column align="center" type="expand">
        <template slot-scope="scope">
          <el-col :span="14">
            <el-row>
              <el-tag style="margin-bottom: 8px">文章id</el-tag>
              <span>{{ scope.row._id }}</span>
            </el-row>
            <el-row>
              <el-tag style="margin-bottom: 8px">文章名称</el-tag>
              <span>{{ scope.row.name }}</span>
            </el-row>
            <el-row>
              <el-tag style="margin-bottom: 8px">发表日期</el-tag>
              <span>{{ scope.row.date }}</span>
            </el-row>
            <el-row>
              <el-tag style="margin-bottom: 8px">文章作者</el-tag>
              <span>{{ scope.row.tag }}</span>
            </el-row>
            <el-row>
              <el-tag style="margin-bottom: 8px">文章阅读量</el-tag>
              <span>{{ scope.row.see }}</span>
            </el-row>
            <el-row>
              <el-tag style="margin-bottom: 8px">文章评论数</el-tag>
              <span>{{ scope.row.comment }}</span>
            </el-row>
          </el-col>
          <el-col :span="10">
            <el-tag style="margin-bottom: 8px">背景图详情</el-tag>
            <div><img :src="scope.row.newsback" width="300" height="200"></div>
          </el-col>
        </template>
      </el-table-column>
      <el-table-column align="center" type="index"/>
      <el-table-column align="center" sortable label="ID" prop="_id" width="160"/>
      <el-table-column align="center" label="文章名称" prop="name" width="300"/>
      <el-table-column align="center" sortable label="发表日期" prop="date"/>
      <el-table-column align="center" label="作者" prop="tag"/>
      <!--      <el-table-column align="center" label="背景图" prop="newsback"/>-->
      <!--      <el-table-column align="center" label="正文" prop="newstext" width="400"/>-->
      <el-table-column align="center" label="阅读量" prop="see"/>
      <el-table-column align="center" label="评论数" prop="comment"/>
      <el-table-column align="center" label="选项">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)"/>
            <el-dialog :visible.sync="dialogFormVisible" title="编辑文章">
              <el-form label-width="120px" style="margin: 8px">
                <el-form-item label="文章标题"><el-input v-model="title" placeholder="请输入文章标题"/></el-form-item>
                <el-form-item label="文章发表日期" style="text-align: left">{{ date }}</el-form-item>
                <el-form-item label="文章作者"><el-input v-model="author" placeholder="请输入文章作者"/></el-form-item>
                <el-form-item label="文章背景图"><el-input v-model="newsback" placeholder="请输入文章背景图地址"/></el-form-item>
                <el-form-item label="文章正文"><el-input v-model="newstext" :autosize="{ minRows: 5, maxRows: 10}" type="textarea" placeholder="请输入正文"/></el-form-item>
                <el-form-item label="文章阅读量"><el-input v-model="see" placeholder="请输入阅读量"/></el-form-item>
                <el-form-item>
                  <el-button @click="dialogFormVisible = false">取消</el-button>
                  <el-button type="primary" @click="confirmEdit">确定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="100" background layout="prev, pager, next" style="float: right"/>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data() {
    return {
      list: [],
      listLoading: true,
      dialogFormVisible: false,
      id: '',
      title: '',
      date: '',
      author: '',
      newsback: '',
      newstext: '',
      see: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      var that = this
      this.listLoading = true
      axios.get('/server/search/', {
        params: {
          key: 'article'
        }
      }).then(function(res) {
        that.list = res.data
        that.listLoading = false
      })
    },
    edit(res) {
      this.dialogFormVisible = true
      this.id = res._id
      this.title = res.name
      this.date = res.date
      this.author = res.tag
      this.newsback = res.newsback
      this.newstext = res.newstext
      this.see = res.see
    },
    del(res) {
      this.id = res._id
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.confirmDel()
        this.$notify({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    confirmEdit() {
      var that = this
      axios.post('/server/updateNews/', qs.stringify({
        id: that.id,
        name: that.title,
        date: that.date,
        tag: that.author,
        newsback: that.newsback,
        newstext: that.newstext,
        see: that.see
      })).then(function(res) {
        that.$notify({
          type: 'success',
          message: '编辑成功!'
        })
        that.dialogFormVisible = false
        that.fetchData()
      })
    },
    confirmDel() {
      var that = this
      axios.post('/server/deleteNews/', qs.stringify({
        id: that.id
      })).then(function(res) {
        that.dialogFormVisible = false
        that.fetchData()
      })
    }
  }
}
</script>
