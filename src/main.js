import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index.js'
import './assets/index.css'
import './assets/style.css'

createApp(App).use(store).mount('#app')
