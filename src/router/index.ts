import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
  {
    path: '/admin',
    name: 'adminLayout',
    component: () => import('@/layout/admin/index.vue'),
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: '首页',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/index/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
