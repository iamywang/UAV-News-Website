<template>
  <div class="app-container">
    <el-card shadow="hover" style="text-align: center; margin: 8px; font-weight: bold">轮播图管理</el-card>
    <el-carousel trigger="click" type="card" style="text-align: center">
      <el-carousel-item v-for="item in list" :key="item">
        <img :src="item.src" style="width: 600px">
      </el-carousel-item>
    </el-carousel>
    <el-row>
      <el-col :span="6" style="margin: 8px">
        <el-input v-model="searchItem" placeholder="请输入内容" size="small">
          <el-button slot="append" size="small" icon="el-icon-search" />
        </el-input>
      </el-col>
      <el-col :span="4" style="margin: 8px">
        <el-button type="plain" size="small" icon="el-icon-plus" @click="addSwiper">添加轮播图</el-button>
        <el-dialog :visible.sync="swiperFormVisible" title="添加轮播图">
          <el-form label-width="120px" style="margin: 8px">
            <el-form-item label="ID">{{ id }}</el-form-item>
            <el-form-item label="标题"><el-input v-model="title" placeholder="请输入标题"/></el-form-item>
            <el-form-item label="图片地址">
              <el-input v-model="src" placeholder="请输入图片地址">
                <el-button slot="append" size="small">预览</el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="swiperFormVisible = false">取消</el-button>
              <el-button type="primary" @click="confirmAddSwiper">确定</el-button>
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
      <el-table-column align="center" type="expand">
        <template slot-scope="scope">
          <el-tag style="margin-bottom: 8px">图片详情</el-tag>
          <div><img :src="scope.row.src" width="320" height="160"></div>
        </template>
      </el-table-column>
      <el-table-column align="center" type="index"/>
      <el-table-column align="center" sortable label="轮播图编号" prop="_id"/>
      <el-table-column align="center" label="轮播图标题" prop="name"/>
      <el-table-column align="center" label="轮播图地址" prop="src" width="600"/>
      <el-table-column align="center" label="选项">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)"/>
            <el-dialog :visible.sync="dialogFormVisible" title="编辑轮播图">
              <el-form label-width="120px" style="margin: 8px">
                <el-form-item label="轮播图标题"><el-input v-model="title" placeholder="请输入轮播图标题"/></el-form-item>
                <el-form-item label="轮播图地址">
                  <el-input v-model="src" placeholder="请输入轮播图地址">
                    <el-button slot="append" size="small">预览</el-button>
                  </el-input>
                </el-form-item>
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
    <el-pagination :total="10" background layout="prev, pager, next" style="float: right"/>
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
      swiperFormVisible: false,
      id: '',
      title: '',
      src: '',
      searchItem: ''
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
    },
    addSwiper() {
      this.swiperFormVisible = true
      this.id = Math.floor(Math.random() * 100) + 1
    },
    confirmAddSwiper() {
      var that = this
      axios.post('/server/insertPic/', qs.stringify({
        id: that.id,
        name: that.title,
        src: that.src
      })).then(function(res) {
        that.$notify({
          message: '添加成功!',
          type: 'success'
        })
        that.id = ''
        that.title = ''
        that.src = ''
        that.swiperFormVisible = false
        that.fetchData()
      })
    },
    edit(res) {
      this.dialogFormVisible = true
      this.id = res._id
      this.title = res.name
      this.src = res.src
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
          message: '删除成功!',
          type: 'success'
        })
      })
    },
    confirmEdit() {
      var that = this
      axios.post('/server/updatePic/', qs.stringify({
        id: that.id,
        name: that.title,
        src: that.src
      })).then(function(res) {
        that.$notify({
          message: '编辑成功!',
          type: 'success'
        })
        that.dialogFormVisible = false
        that.fetchData()
      })
    },
    confirmDel() {
      var that = this
      axios.post('/server/deletePic/', qs.stringify({
        id: that.id
      })).then(function(res) {
        that.dialogFormVisible = false
        that.fetchData()
      })
    }
  }
}
</script>
