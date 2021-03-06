import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import SelectTemp from '../views/SelectTemp.vue'
import Custom from '../views/Custom.vue'
import Manual from '../views/Manual.vue'
import Guide from '../views/Guide.vue'

import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/selectTemp',
    name: 'SelectTemp',
    component: SelectTemp
  },
  {
    path: '/custom/:idx',
    name: 'Custom',
    component: Custom,
    props: true
  },
  {
    path: '/manual',
    name: 'Manual',
    component: Manual,
  },
  {
    path: '/guide',
    name: 'Guide',
    component: Guide,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, form, next) =>{
  const authRequiredPages = [
    'SelectTemp',
  ]
  const authRequired = authRequiredPages.includes(to.name)
  const { isLoggedIn } = store.getters

  if (authRequired && !isLoggedIn){
    alert("로그인 후에 이용해주세요!")
    next('/')
  } else {
    next()
  }
  
  store.commit('setPage', to.name)
  
})

export default router
