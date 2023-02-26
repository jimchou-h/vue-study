import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { adminRouter } from './admin.router'

const routes: Array<RouteRecordRaw> = [
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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
