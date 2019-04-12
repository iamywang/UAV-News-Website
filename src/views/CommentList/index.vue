<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      stripe
      border
      fit
      highlight-current-row>
      <el-table-column align="center" sortable label="类别" prop="type"/>
      <el-table-column align="center" sortable label="ID" prop="_id"/>
      <el-table-column align="center" label="昵称" prop="name"/>
      <el-table-column align="center" sortable label="楼层" prop="level"/>
      <!--      <el-table-column align="center" sortable label="评论日期" prop="date"/>-->
      <el-table-column align="center" label="评论内容" prop="text"/>
      <!--      <el-table-column align="center" label="所在地" prop="location"/>-->
      <!--      <el-table-column align="center" label="机型" prop="model"/>-->
      <el-table-column align="center" sortable label="点赞数" prop="like"/>
      <el-table-column align="center" label="选项">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" icon="el-icon-edit"/>
            <el-button type="danger" size="mini" icon="el-icon-delete"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
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
      axios.get('/server/getComments/', {
        params: {
          key: 'all'
        }
      }).then(function(res) {
        that.list = res.data
        that.listLoading = false
      })
    }
  }
}
</script>
