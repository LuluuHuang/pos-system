import { createRouter, createWebHashHistory } from 'vue-router'
import HomePageView from'../views/HomePageView.vue'
import PrescriptionView from '../views/PrescriptionView.vue'
import UpdatePageView from '../views/UpdatePageView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
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
