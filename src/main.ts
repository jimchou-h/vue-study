import { createApp } from 'vue'
import '@/assets/css/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './input.css'

const app = createApp(App)

app.use(store).use(router)

app.mount('#app')
