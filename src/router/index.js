import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Auth'
    },
    component: () => import('./../layouts/MainLayout'),
    children: [
      { path: '', name: 'Index', component: () => import('./../pages/Index.vue') },
    ]
  },
  {
    path: '/guest/:roomName',
    name: 'guest', component: () => import('./../pages/Guest.vue'),
    props: true
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: () => import('./../pages/RoomSelector')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('./../pages/Auth')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('./../pages/Error404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title()
  } else {
    document.title = 'title'
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuth) {
      next()
      return
    }

    next('/')
  } else {
    next()
  }
})

export default router
