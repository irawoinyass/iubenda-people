import Dashboard from './components/Dashboard.vue'
import LogIn from './components/LogIn.vue'
import createTask from './components/createTask.vue'
import updateProfile from './components/updateProfile.vue'
import resetPassword from './components/resetPassword.vue'
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

  },
  {
        
    name:'createTask',
    component:createTask,
    path:'/create-task'

  },
  {
        
    name:'updateProfile',
    component:updateProfile,
    path:'/update-profile'

  },
  {
        
    name:'resetPassword',
    component:resetPassword,
    path:'/reset-password'

  }
  

]


const router = createRouter({
    history:createWebHistory(),
    routes
});


export default router