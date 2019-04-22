<template>
  <div class="app-container">
    <el-alert :closable="false" center title="评论管理" type="success" style="margin: 8px"/>
    <el-row>
      <el-col :span="6" style="margin: 8px">
        <el-input placeholder="请输入内容" size="small">
          <el-button slot="append" size="small" icon="el-icon-search" />
        </el-input>
      </el-col>
      <el-col :span="4" style="margin: 8px">
        <el-button type="plain" size="small" icon="el-icon-plus">添加评论</el-button>
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
        <template slot-scope="props">
          <el-col :span="6">
            <el-row>
              <el-tag style="margin-bottom: 8px">新闻/视频id</el-tag>
              <span>{{ props.row._id }}</span>
            </el-row>
            <el-row>
              <el-tag>用户所在地</el-tag>
              <span>{{ props.row.location }}</span>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-tag style="margin-bottom: 8px">用户昵称</el-tag>
              <span>{{ props.row.name }}</span>
            </el-row>
            <el-row>
              <el-tag>用户机型</el-tag>
              <span>{{ props.row.model }}</span>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-tag style="margin-bottom: 8px">评论楼层</el-tag>
              <span>{{ props.row.level }}</span>
            </el-row>
            <el-row>
              <el-tag>评论内容</el-tag>
              <span>{{ props.row.text }}</span>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-tag style="margin-bottom: 8px">评论时间</el-tag>
              <span>{{ props.row.date }}</span>
            </el-row>
            <el-row>
              <el-tag>点赞数</el-tag>
              <span>{{ props.row.like }}</span>
            </el-row>
          </el-col>
        </template>
      </el-table-column>
      <el-table-column align="center" type="index"/>
      <el-table-column align="center" sortable label="类别" prop="type" width="100"/>
      <el-table-column align="center" sortable label="ID" prop="_id"/>
      <el-table-column align="center" label="头像" width="72">
        <template slot-scope="scope">
          <img :src="scope.row.head" width="40" height="40">
        </template>
      </el-table-column>
      <el-table-column align="center" label="昵称" prop="name"/>
      <!--      <el-table-column align="center" sortable label="楼层" prop="level"/>-->
      <!--      <el-table-column align="center" sortable label="评论日期" prop="date"/>-->
      <el-table-column align="center" label="评论内容" prop="text"/>
      <!--      <el-table-column align="center" label="所在地" prop="location"/>-->
      <!--      <el-table-column align="center" label="机型" prop="model"/>-->
      <el-table-column align="center" sortable label="点赞数" prop="like" width="100"/>
      <el-table-column align="center" label="选项" width="180">
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
