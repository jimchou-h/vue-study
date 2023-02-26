import { createApp } from 'vue'
import '@/assets/css/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './input.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(store).use(router)

app.mount('#app')

// 全局注册element icon组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
