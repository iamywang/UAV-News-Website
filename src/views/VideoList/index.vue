<template>
  <div class="app-container">
    <el-card shadow="hover" style="text-align: center; margin: 8px; font-weight: bold">视频管理</el-card>
    <el-row>
      <el-col :span="6" style="margin: 8px">
        <el-input placeholder="请输入内容" size="small">
          <el-button slot="append" size="small" icon="el-icon-search" />
        </el-input>
      </el-col>
      <el-col :span="4" style="margin: 8px">
        <el-button type="plain" size="small" icon="el-icon-plus">添加视频</el-button>
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
          <el-col :span="12">
            <el-row>
              <el-tag style="margin-bottom: 8px">视频id</el-tag>
              <span>{{ scope.row._id }}</span>
            </el-row>
            <el-row>
              <el-tag style="margin-bottom: 8px">视频名称</el-tag>
              <span>{{ scope.row.name }}</span>
            </el-row>
            <el-row>
              <el-tag style="margin-bottom: 8px">发表日期</el-tag>
              <span>{{ scope.row.date }}</span>
            </el-row>
            <el-row>
              <el-tag style="margin-bottom: 8px">视频时长</el-tag>
              <span>{{ scope.row.time }}</span>
            </el-row>
            <el-row>
              <el-tag style="margin-bottom: 8px">视频阅读量</el-tag>
              <span>{{ scope.row.see }}</span>
            </el-row>
            <el-row>
              <el-tag style="margin-bottom: 8px">视频评论数</el-tag>
              <span>{{ scope.row.comment }}</span>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-tag style="margin-bottom: 8px">视频详情</el-tag>
            <div><video :src="scope.row.videosrc" controls="controls" width="400" height="225">emm</video></div>
          </el-col>
        </template>
      </el-table-column>
      <el-table-column align="center" type="index"/>
      <el-table-column align="center" sortable label="ID" prop="_id"/>
      <el-table-column align="center" label="视频名称" prop="name" width="300"/>
      <el-table-column align="center" sortable label="发表日期" prop="date"/>
      <el-table-column align="center" label="时长" prop="time"/>
      <!--      <el-table-column align="center" label="背景图" prop="videoback"/>-->
      <!--      <el-table-column align="center" label="视频地址" prop="videosrc"/>-->
      <el-table-column align="center" label="观看量" prop="see"/>
      <el-table-column align="center" label="评论数" prop="comment"/>
      <el-table-column align="center" label="选项">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)"/>
            <el-dialog :visible.sync="dialogFormVisible" title="编辑视频">
              <el-form label-width="120px" style="margin: 8px">
                <el-form-item label="视频标题"><el-input v-model="title" placeholder="请输入视频标题"/></el-form-item>
                <el-form-item label="视频发表日期" style="text-align: left">{{ date }}</el-form-item>
                <el-form-item label="视频时长"><el-input v-model="time" placeholder="请输入视频时长"/></el-form-item>
                <el-form-item label="视频背景图"><el-input v-model="videoback" placeholder="请输入视频背景图地址"/></el-form-item>
                <el-form-item label="视频地址"><el-input v-model="videosrc" placeholder="请输入视频地址"/></el-form-item>
                <el-form-item label="视频阅读量"><el-input v-model="see" placeholder="请输入阅读量"/></el-form-item>
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
      time: '',
      videoback: '',
      videosrc: '',
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
          key: 'videos'
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
      this.time = res.time
      this.videoback = res.videoback
      this.videosrc = res.videosrc
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
      axios.post('/server/updateVideo/', qs.stringify({
        id: that.id,
        name: that.title,
        date: that.date,
        time: that.time,
        videoback: that.videoback,
        videosrc: that.videosrc,
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
      axios.post('/server/deleteVideo/', qs.stringify({
        id: that.id
      })).then(function(res) {
        that.dialogFormVisible = false
        that.fetchData()
      })
    }
  }
}
</script>
