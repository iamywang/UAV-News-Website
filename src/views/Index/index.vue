<template>
  <div class="dashboard-container">
    <el-alert
      title="主页"
      type="success"
      description="这是无人机后台管理界面"
      show-icon
      style="margin: 8px"/>
    <el-row :gutter="12" style="text-align: center">
      <el-col :span="8">
        <el-card shadow="always" style="margin: 8px; color: darkblue">功能一览</el-card>
        <el-card shadow="hover" style="margin: 8px">用户管理</el-card>
        <el-card shadow="hover" style="margin: 8px">轮播图管理</el-card>
        <el-card shadow="hover" style="margin: 8px">新闻管理</el-card>
        <el-card shadow="hover" style="margin: 8px">视频管理</el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always" style="margin: 8px; color: darkblue">统计</el-card>
        <el-col :span="12">
          <div style="margin: 8px">用户数量</div>
          <el-progress :percentage="1" type="circle" style="margin: 8px"/>
          <div style="margin: 8px">新闻数量</div>
          <el-progress :percentage="14" type="circle" style="margin: 8px"/>
        </el-col>
        <el-col :span="12">
          <div style="margin: 8px">轮播图数量</div>
          <el-progress :percentage="3" type="circle" style="margin: 8px"/>
          <div style="margin: 8px">视频数量</div>
          <el-progress :percentage="2" type="circle" style="margin: 8px"/>
        </el-col>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always" style="margin: 8px; color: darkblue">其他</el-card>
        <div class="block" style="margin: 8px">
          <span class="demonstration" style="margin: 8px">评分</span>
          <el-rate style="margin: 8px"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
