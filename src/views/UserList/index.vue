<template>
  <div class="app-container">
    <el-card shadow="hover" style="text-align: center; margin: 8px; font-weight: bold">用户管理</el-card>
    <el-row>
      <el-col :span="6" style="margin: 8px">
        <el-input placeholder="请输入内容" size="small">
          <el-button slot="append" size="small" icon="el-icon-search" />
        </el-input>
      </el-col>
      <el-col :span="4" style="margin: 8px">
        <el-button type="plain" size="small" icon="el-icon-plus" @click="addUser">添加用户</el-button>
        <el-dialog :visible.sync="registerFormVisible" title="注册新用户">
          <el-form label-width="120px" style="margin: 8px">
            <el-form-item label="ID">{{ id }}</el-form-item>
            <el-form-item label="昵称"><el-input v-model="nick" placeholder="请输入昵称"/></el-form-item>
            <el-form-item label="用户类型" style="text-align: left">普通用户</el-form-item>
            <el-form-item label="注册时间">{{ regdate }}</el-form-item>
            <el-form-item label="最后登录时间">{{ logindate }}</el-form-item>
            <el-form-item>
              <el-button @click="registerFormVisible = false">取消</el-button>
              <el-button type="primary" @click="confirmAddUser">确定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
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
      <el-table-column align="center" type="index"/>
      <el-table-column align="center" sortable label="ID" prop="_id"/>
      <el-table-column align="center" label="头像" width="72">
        <template slot-scope="scope">
          <img v-if="scope.row._id!==1" src="https://www.easyicon.net/download/png/1164661/64/" width="40" height="40" style="border-radius: 100%">
          <img v-if="scope.row._id===1" src="https://wx.qlogo.cn/mmopen/vi_32/kIW2xO2OGd5Oqt8dYCJUXibav0cLJGb914HhmA8z0BfQLErwVIsVwNkmP3NIRLThmsicWjmftDI8MK6NrwGGFjTQ/132" width="40" height="40" style="border-radius: 100%">
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户昵称" prop="name"/>
      <el-table-column align="center" label="用户类型">
        <template slot-scope="scope">
          <div v-if="scope.row._id!==1">普通用户</div>
          <div v-if="scope.row._id===1">超级管理员</div>
        </template>
      </el-table-column>
      <el-table-column align="center" sortable label="注册时间" prop="regdate"/>
      <el-table-column align="center" sortable label="最后登录时间" prop="logindate"/>
      <el-table-column align="center" label="选项">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)"/>
            <el-dialog :visible.sync="dialogFormVisible" title="编辑用户">
              <el-form label-width="120px" style="margin: 8px">
                <el-form-item label="昵称"><el-input v-model="nick" placeholder="请输入昵称"/></el-form-item>
                <el-form-item label="用户类型" style="text-align: left">普通用户</el-form-item>
                <el-form-item label="注册时间" style="text-align: left">{{ regdate }}</el-form-item>
                <el-form-item label="最后登录时间" style="text-align: left">{{ logindate }}</el-form-item>
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
      registerFormVisible: false,
      id: '',
      nick: '',
      regdate: '',
      logindate: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      var that = this
      axios.get('/server/getUsers/', {
        params: {
          key: 'all'
        }
      }).then(function(res) {
        that.list = res.data
        that.listLoading = false
      })
    },
    addUser() {
      this.registerFormVisible = true
      this.id = Math.floor(Math.random() * 100000) + 1
      var tdate = new Date()
      this.regdate = this.formatTime(tdate)
      this.logindate = this.formatTime(tdate)
    },
    confirmAddUser() {
      var that = this
      axios.post('/server/insertUser/', qs.stringify({
        id: that.id,
        name: that.nick,
        regdate: that.regdate,
        logindate: that.logindate
      })).then(function(res) {
        that.$notify({
          type: 'success',
          message: '添加成功!'
        })
        that.nick = ''
        that.registerFormVisible = false
        that.fetchData()
      })
    },
    edit(res) {
      this.dialogFormVisible = true
      this.id = res._id
      this.nick = res.name
      this.regdate = res.regdate
      this.logindate = res.logindate
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
      axios.post('/server/updateUser/', qs.stringify({
        id: that.id,
        name: that.nick,
        regdate: that.regdate,
        logindate: that.logindate
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
      axios.post('/server/deleteUser/', qs.stringify({
        id: that.id
      })).then(function(res) {
        that.dialogFormVisible = false
        that.fetchData()
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
      var seconds = date.getSeconds()

      return [year, month, day].join('-') + ' ' + [hour, minute, seconds].map(this.formatNumber).join(':')
    }
  }
}
</script>
