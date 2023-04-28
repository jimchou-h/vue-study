import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { adminRouter } from './admin.router'
import { commonRouter } from './common.router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/admin',
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('@/views/login/index.vue'),
  },
  ...adminRouter,
  ...commonRouter,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
