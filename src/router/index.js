import Vue from 'vue'
import VueRouter from 'vue-router'
import SelectTemp from '../views/SelectTemp.vue'
import Custom from '../views/Custom.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'SelectTemp',
    component: SelectTemp
  },
  {
    path: '/custom',
    name: 'Custom',
    component: Custom
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
