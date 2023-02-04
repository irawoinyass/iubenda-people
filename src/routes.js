import Dashboard from './components/Dashboard.vue'
import LogIn from './components/LogIn.vue'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
        
    name:'Dashboard',
    component:Dashboard,
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