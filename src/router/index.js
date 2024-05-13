import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomePageView from'../views/HomePageView.vue'
import PrescriptionView from '../views/PrescriptionView.vue'
import UpdatePageView from '../views/UpdatePageView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/homepage',
      component:HomePageView
    },
    {
      path:'/prescription',
      component:PrescriptionView
    },
    {
      path:'/update',
      component:UpdatePageView
    }
  ]
})

export default router
