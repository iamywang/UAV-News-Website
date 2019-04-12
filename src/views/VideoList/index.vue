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
      <el-table-column align="center" label="ID" prop="_id"/>
      <el-table-column align="center" label="视频名称" prop="name"/>
      <el-table-column align="center" label="发表日期" prop="date"/>
      <el-table-column align="center" label="时长" prop="time"/>
      <!--      <el-table-column align="center" label="背景图" prop="videoback"/>-->
      <!--      <el-table-column align="center" label="视频地址" prop="videosrc"/>-->
      <el-table-column align="center" label="观看量" prop="see"/>
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
          key: 'videos'
        }
      }).then(function(res) {
        that.list = res.data
        that.listLoading = false
      })
    }
  }
}
</script>
