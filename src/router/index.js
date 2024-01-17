import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index/index.vue')
  },
  {
    path: '/notice',
    name: 'notice',
    component: () => import('../views/index/notice.vue')
  },
  {
    path: '/msgboard',
    name: 'msgboard',
    component: () => import('../views/index/msgboard.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../views/index/chat.vue')
  },
  {
    path: '/transnav',
    name: 'transnav',
    component: () => import('../views/index/transnav.vue')
  },
  {
    path: '/seedmap',
    name: 'seedmap',
    component: () => import('../views/index/seedmap.vue')
  },
  {
    path: '/gamemap',
    name: 'gamemap',
    component: () => import('../views/index/gamemap.vue')
  },
  {
    path: '/userData',
    name: 'userData',
    component: () => import('../views/userinfo/userData.vue')
  },
  {
    path: '/gameData',
    name: 'gameData',
    component: () => import('../views/userinfo/gameData.vue')
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: () => import('../views/workbenches/userManage.vue')
  },
  {
    path: '/handleLogs',
    name: 'handleLogs',
    component: () => import('../views/workbenches/handleLogs.vue')
  },
  {
    path: '/quickCommand',
    name: 'quickCommand',
    component: () => import('../views/workbenches/quickCommand.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about.vue')
  },
]

const router = new VueRouter({
  mode:"hash",
  routes
})

export default router
