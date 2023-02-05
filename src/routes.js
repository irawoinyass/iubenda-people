import Dashboard from './components/Dashboard.vue'
import LogIn from './components/LogIn.vue'
import createTask from './components/createTask.vue'
import updateProfile from './components/updateProfile.vue'
import resetPassword from './components/resetPassword.vue'
import updateTask from './components/updateTask.vue'
import Tasks from './components/Tasks.vue'
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
        
    name:'Tasks',
    component:Tasks,
    path:'/tasks'

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

  },
  {
        
    name:'updateTask',
    component:updateTask,
    path:'/update-task/:id'

  }
  

]


const router = createRouter({
    history:createWebHistory(),
    routes
});


export default router