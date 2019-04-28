<template>
  <div class="app-container">
    <el-card shadow="hover" style="text-align: center; margin: 8px; font-weight: bold">评论管理</el-card>
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
          <img :src="scope.row.head" width="40" height="40" style="border-radius: 100%;">
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
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)"/>
            <el-dialog :visible.sync="dialogFormVisible" title="编辑评论">
              <el-form label-width="120px" style="margin: 8px">
                <el-form-item label="头像" style="text-align: left"><el-input v-model="logo" placeholder="请输入头像"/></el-form-item>
                <el-form-item label="昵称" style="text-align: left"><el-input v-model="name" placeholder="请输入昵称"/></el-form-item>
                <el-form-item label="楼层" style="text-align: left">{{ scope.row.level }}</el-form-item>
                <el-form-item label="评论时间" style="text-align: left">{{ scope.row.date }}</el-form-item>
                <el-form-item label="所在地" style="text-align: left"><el-input v-model="location" placeholder="请输入所在地"/></el-form-item>
                <el-form-item label="机型" style="text-align: left"><el-input v-model="model" placeholder="请输入机型"/></el-form-item>
                <el-form-item label="评论内容"><el-input v-model="commenttext" :autosize="{ minRows: 5, maxRows: 10}" type="textarea" placeholder="请输入评论"/></el-form-item>
                <el-form-item label="点赞数"><el-input v-model="likenum" placeholder="请输入点赞数"/></el-form-item>
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
      type: '',
      level: 0,
      name: '',
      logo: '',
      location: '',
      model: '',
      commenttext: '',
      likenum: 0
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
    },
    edit(res) {
      this.dialogFormVisible = true
      this.id = res._id
      this.type = res.type
      this.level = res.level
      this.name = res.name
      this.logo = res.head
      this.location = res.location
      this.model = res.model
      this.commenttext = res.text
      this.likenum = res.like
    },
    confirmEdit() {
      var that = this
      axios.post('/server/updateComment/', qs.stringify({
        id: that.id,
        type: that.type,
        level: that.level,
        name: that.name,
        logo: that.logo,
        location: that.location,
        model: that.model,
        text: that.commenttext,
        like: that.likenum
      })).then(function(res) {
        that.$notify({
          type: 'success',
          message: '编辑成功!'
        })
        that.dialogFormVisible = false
        that.fetchData()
      })
    },
    del(res) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  }
}
</script>
