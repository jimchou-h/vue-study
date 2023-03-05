import { RouteRecordRaw } from 'vue-router'

export const adminRouter: Array<RouteRecordRaw> = [
  {
    path: '/admin',
    name: 'adminLayout',
    redirect: '/admin/index',
    component: () => import('@/layout/admin/index.vue'),
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '首页',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/index/index.vue'),
      },
      {
        path: 'logic-flow',
        name: 'LogicFlow',
        meta: {
          title: '可视化拖拽',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/logic-flow/logic-flow.vue'),
      },
    ],
  },
]
