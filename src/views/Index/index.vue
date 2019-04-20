<template>
  <div class="dashboard-container">
    <el-col :span="16">
      <el-row style="margin-bottom: 8px">
        <el-card>
          <h4>今日统计</h4>
          <el-tag style="margin-top: 8px; margin-bottom: 8px">用户数量</el-tag>
          <el-progress :stroke-width="18" :percentage="5"/>
          <el-tag style="margin-top: 8px; margin-bottom: 8px">文章数量</el-tag>
          <el-progress :stroke-width="18" :percentage="3"/>
          <el-tag style="margin-top: 8px; margin-bottom: 8px">新闻数量</el-tag>
          <el-progress :stroke-width="18" :percentage="12"/>
          <el-tag style="margin-top: 8px; margin-bottom: 8px">视频数量</el-tag>
          <el-progress :stroke-width="18" :percentage="2"/>
          <el-tag style="margin-top: 8px; margin-bottom: 8px">评论数量</el-tag>
          <el-progress :stroke-width="18" :percentage="18"/>
        </el-card>
      </el-row>
      <el-row>
        <el-card>
          <h4>总览统计</h4>
          <el-tag style="margin-top: 8px; margin-bottom: 8px">用户数量</el-tag>
          <el-progress :stroke-width="18" :percentage="5"/>
          <el-tag style="margin-top: 8px; margin-bottom: 8px">文章数量</el-tag>
          <el-progress :stroke-width="18" :percentage="3"/>
          <el-tag style="margin-top: 8px; margin-bottom: 8px">新闻数量</el-tag>
          <el-progress :stroke-width="18" :percentage="12"/>
          <el-tag style="margin-top: 8px; margin-bottom: 8px">视频数量</el-tag>
          <el-progress :stroke-width="18" :percentage="2"/>
          <el-tag style="margin-top: 8px; margin-bottom: 8px">评论数量</el-tag>
          <el-progress :stroke-width="18" :percentage="18"/>
        </el-card>
      </el-row>
    </el-col>
    <el-col :span="8">
      <el-timeline>
        <el-timeline-item timestamp="2019-4-18 9:46" placement="top">
          <el-card>
            <h4>TEST</h4>
            <p>TEST 提交于 2019-4-18 9:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2019-4-18 9:46" placement="top">
          <el-card>
            <h4>TEST</h4>
            <p>TEST 提交于 2019-4-18 9:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2019-4-18 9:46" placement="top">
          <el-card>
            <h4>TEST</h4>
            <p>TEST 提交于 2019-4-18 9:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
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
