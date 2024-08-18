import { createRouter, createWebHashHistory } from 'vue-router'
import SearchPriceView from'../views/SearchPriceView.vue'
import PrescriptionView from '../views/PrescriptionView.vue'
// import HomeView from '../views/HomeView.vue'
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
      redirect: '/login',  // Redirect root path to /login
      meta: { requiresAuth: false },
    },
    {
      path:'/login',
      name:'Login',
      component:LoginView,
      meta: { requiresAuth: false },
    },
    {
      path:'/',
      component: MainLayouotView,
      children:[
        // {
        //   path:'home',
        //   name:'Home',
        //   component:HomeView,
        //   meta: { requiresAuth: true },
        // },
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
  // const isLogIn = store.user;
  // if(isLogIn && to.path === '/login'){
  //   console.log(1);
  //   next('/main/search');
  // }else if(!isLogIn && to.meta.requiresAuth){
  //   console.log(2);
  //   next('/login');
  // }else{
  //   console.log(3);
  //   next();
  // }
  if(store.user != ''){
    next();
  }else{
    next('/login')
  }
})

export default router