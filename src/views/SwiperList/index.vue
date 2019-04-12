<template>
  <div class="app-container">
    <el-alert :closable="false" center title="轮播图管理" type="success" style="margin: 8px"/>
    <el-input placeholder="请输入内容" style="margin: 8px"><el-button slot="append" icon="el-icon-search" /></el-input>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      stripe
      border
      fit
      highlight-current-row>
      <el-table-column align="center" sortable label="轮播图编号" prop="_id"/>
      <el-table-column align="center" label="轮播图标题" prop="name"/>
      <el-table-column align="center" label="轮播图地址" prop="src" width="600"/>
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
      this.listLoading = true
      var that = this
      axios.get('/server/search/', {
        params: {
          key: 'pics'
        }
      }).then(function(res) {
        that.list = res.data
        that.listLoading = false
      })
    }
  }
}
</script>
