import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect:'/dataShow',
    children: [{
      path: '/dataShow',
      name: 'dataShow',
      component: () => import('../views/navIndex/dataShow.vue')
    },{
      path: '/ups',
      name: 'ups',
      component: () => import('../views/navIndex/ups.vue')
    }],
    component: () => import('../views/Home.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
