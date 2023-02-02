import HomePage from './components/HomePage.vue'
import LogIn from './components/LogIn.vue'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
        
    name:'HomePage',
    component:HomePage,
    path:'/'

   },
  {
        
    name:'LogIn',
    component:LogIn,
    path:'/login'

  }
  

]


const router = createRouter({
    history:createWebHistory(),
    routes
});


export default router