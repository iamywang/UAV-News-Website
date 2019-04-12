<template>
  <div class="app-container">
    <el-alert :closable="false" center title="文章管理" type="success" style="margin: 8px"/>
    <el-input placeholder="请输入内容" style="margin: 8px"><el-button slot="append" icon="el-icon-search" /></el-input>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      stripe
      border
      fit
      highlight-current-row>
      <el-table-column align="center" sortable label="ID" prop="_id"/>
      <el-table-column align="center" label="新闻名称" prop="name"/>
      <el-table-column align="center" sortable label="发表日期" prop="date"/>
      <el-table-column align="center" label="作者" prop="tag"/>
      <!--      <el-table-column align="center" label="背景图" prop="newsback"/>-->
      <!--      <el-table-column align="center" label="正文" prop="newstext" width="400"/>-->
      <el-table-column align="center" label="阅读量" prop="see"/>
      <el-table-column align="center" label="评论数" prop="comment"/>
      <el-table-column align="center" label="选项">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" icon="el-icon-edit"/>
            <el-button type="danger" size="mini" icon="el-icon-delete"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="100" background layout="prev, pager, next" style="float: right"/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      list: [],
      listLoading: true
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
          key: 'news'
        }
      }).then(function(res) {
        that.list = res.data
        that.listLoading = false
      })
    }
  }
}
</script>
