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
        component: () => import('@/views/logic-flow/index.vue'),
      },
      {
        path: 'custom-form',
        name: 'CustomForm',
        meta: {
          title: '自定义表单',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/custom-form/index.vue'),
      },
      {
        path: 'big-screen',
        name: 'BigScreen',
        meta: {
          title: '可视化大屏',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/big-screen/index.vue'),
      },
      {
        path: 'd3',
        name: 'D3',
        meta: {
          title: 'D3',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/d3/index.vue'),
      },
      {
        path: 'konva',
        name: 'Konva',
        meta: {
          title: 'Konva',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/konva/index.vue'),
      },
      {
        path: 'bpmn',
        name: 'Bpmn',
        meta: {
          title: 'Bpmn',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/bpmn/index.vue'),
      },
      {
        path: '/function',
        name: 'Function',
        redirect: '/function/index',
        children: [
          {
            path: 'large-file-upload',
            name: 'LargeFileUpload',
            meta: {
              title: 'LargeFileUpload',
              keepAlive: true,
              requireAuth: true,
            },
            component: () => import('@/views/function/large-file-upload/index.vue'),
          },
          {
            path: 'virtual-list',
            name: 'VirtualList',
            meta: {
              title: 'VirtualList',
              keepAlive: true,
              requireAuth: true,
            },
            component: () => import('@/views/function/virtual-list/index.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/data-chart',
    name: 'DataChart',
    meta: {},
    component: () => import('@/views/big-screen/data-chart.vue'),
  },
]
