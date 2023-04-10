import { createRouter, createWebHashHistory } from 'vue-router';

const Home = () => import('./pages/Home.vue')
const About = () => import('./pages/about.vue')
const RoleList = () => import('./pages/role-list.vue')

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/role-list', component: RoleList },
  ]
  const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })
  export default router;