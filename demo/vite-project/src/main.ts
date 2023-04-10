import { createApp } from 'vue'
import router from './route'
import './style.css'
import App from './App.vue'
import 'vant/lib/index.css';
import vant from 'vant'
createApp(App).use(router).use(vant).mount('#app')
