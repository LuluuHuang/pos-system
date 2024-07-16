import { createRouter, createWebHashHistory } from 'vue-router'
import SearchPriceView from'../views/SearchPriceView.vue'
import PrescriptionView from '../views/PrescriptionView.vue'
import UpdatePageView from '../views/UpdatePageView.vue'
import HomeView from '../views/HomeView.vue'
import AddnDeleteView from '../views/AddnDeleteView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:HomeView
    },
    {
      path:'/search',
      component:SearchPriceView
    },
    {
      path:'/prescription',
      component:PrescriptionView
    },
    {
      path:'/update',
      component:UpdatePageView
    },
    {
      path:'/addndelete',
      component:AddnDeleteView
    }
  ]
})

export default router
