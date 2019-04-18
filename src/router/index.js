import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/Login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'System',
    hidden: false,
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/Index/index'),
      meta: { title: '主页', icon: 'home' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/func1',
    name: 'userManagement',
    meta: { title: '用户管理', icon: 'peoples' },
    children: [
      {
        path: 'func1',
        name: 'userManage',
        component: () => import('@/views/UserList/index'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'func2',
        name: 'articleManage',
        component: () => import('@/views/ArticleList/index'),
        meta: { title: '文章管理', icon: 'manage' }
      },
      {
        path: 'func3',
        name: 'addArticle',
        component: () => import('@/views/AddArticle/index'),
        meta: { title: '添加文章', icon: 'write' }
      }
    ]
  },

  {
    path: '/news',
    component: Layout,
    redirect: '/news/func1',
    name: 'newsManagement',
    meta: { title: '新闻管理', icon: 'news' },
    children: [
      {
        path: 'func1',
        name: 'newsManage',
        component: () => import('@/views/NewsList/index'),
        meta: { title: '新闻管理', icon: 'manage' }
      },
      {
        path: 'func2',
        name: 'addNews',
        component: () => import('@/views/AddNews/index'),
        meta: { title: '添加新闻', icon: 'write' }
      },
      {
        path: 'func3',
        name: 'swiperManage',
        component: () => import('@/views/SwiperList/index'),
        meta: { title: '轮播图管理', icon: 'pic' }
      }
    ]
  },

  {
    path: '/videos',
    component: Layout,
    redirect: '/videos/func1',
    name: 'videosManagement',
    meta: { title: '视频管理', icon: 'video' },
    children: [
      {
        path: 'func1',
        name: 'videosManage',
        component: () => import('@/views/VideoList/index'),
        meta: { title: '视频管理', icon: 'manage' }
      },
      {
        path: 'func2',
        name: 'addVideos',
        component: () => import('@/views/AddVideo/index'),
        meta: { title: '添加视频', icon: 'write' }
      }
    ]
  },
  {
    path: '/comments',
    component: Layout,
    redirect: '/comments/func1',
    name: 'commentManagement',
    meta: { title: '评论管理', icon: 'comment' },
    children: [
      {
        path: 'func1',
        name: 'commentManage',
        component: () => import('@/views/CommentList/index'),
        meta: { title: '评论管理', icon: 'comment' }
      },
      {
        path: 'func2',
        name: 'addComment',
        component: () => import('@/views/AddComment/index'),
        meta: { title: '添加评论', icon: 'addcomment' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-admin-template',
        meta: { title: '项目地址', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
