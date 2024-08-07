import { createRouter, createWebHashHistory } from 'vue-router'
import SearchPriceView from'../views/SearchPriceView.vue'
import PrescriptionView from '../views/PrescriptionView.vue'
import HomeView from '../views/HomeView.vue'
import AddnDeleteView from '../views/AddnDeleteView.vue'
import SearchPresView from '../views/SearchPresView.vue'
import MainLayouotView from '../views/MainLayouotView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login',
      name:'Login',
      component:LoginView
    },
    {
      path:'/',
      component: MainLayouotView,
      children:[
        {
          path:'home',
          name:'Home',
          component:HomeView
        },
        {
          path:'search',
          name:'Search',
          component:SearchPriceView
        },
        {
          path:'prescription',
          name:'Prescription',
          component:PrescriptionView
        },
        {
          path:'addndelete',
          name:'AddnDelete',
          component:AddnDeleteView
        },
        {
          path:'searchpres',
          name:'SearchPres',
          component:SearchPresView
        }
      ]
    },
  ]
})

export default router
