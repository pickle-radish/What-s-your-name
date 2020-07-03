import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import SelectTemp from '../views/SelectTemp.vue'
import Custom from '../views/Custom.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/selectTemp',
    name: 'SelectTemp',
    component: SelectTemp
  },
  {
    path: '/custom/',
    name: 'Custom',
    component: Custom,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
