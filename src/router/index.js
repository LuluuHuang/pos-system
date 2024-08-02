import { createRouter, createWebHashHistory } from 'vue-router'
import SearchPriceView from'../views/SearchPriceView.vue'
import PrescriptionView from '../views/PrescriptionView.vue'
import HomeView from '../views/HomeView.vue'
import AddnDeleteView from '../views/AddnDeleteView.vue'
import SearchPresView from '../views/SearchPresView.vue'

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
      path:'/addndelete',
      component:AddnDeleteView
    },
    {
      path:'/searchpres',
      component:SearchPresView
    }
  ]
})

export default router
