import { createRouter, createWebHashHistory } from 'vue-router'
import SearchPriceView from'../views/SearchPriceView.vue'
import PrescriptionView from '../views/PrescriptionView.vue'
import HomeView from '../views/HomeView.vue'
import AddnDeleteView from '../views/AddnDeleteView.vue'
import SearchPresView from '../views/SearchPresView.vue'
import MainLayouotView from '../views/MainLayouotView.vue'
import LoginView from '../views/LoginView.vue'
import { useUserStore } from '../stores/user'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'  // 將根路徑重定向到 /login
    },
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
          component:HomeView,
          meta: { requiresAuth: true },
        },
        {
          path:'search',
          name:'Search',
          component:SearchPriceView,
          meta: { requiresAuth: true },
        },
        {
          path:'prescription',
          name:'Prescription',
          component:PrescriptionView,
          meta: { requiresAuth: true },
        },
        {
          path:'addndelete',
          name:'AddnDelete',
          component:AddnDeleteView,
          meta: { requiresAuth: true },
        },
        {
          path:'searchpres',
          name:'SearchPres',
          component:SearchPresView,
          meta: { requiresAuth: true },
        }
      ]
    },
  ]
})

router.beforeEach((to,from,next)=>{
  const store = useUserStore();
  if(store.user != ''){
    next();
  }else{
    next('/login');
  }
})

export default router
