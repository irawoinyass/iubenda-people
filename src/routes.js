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
    path:'/',
    meta: {
        title: "Dashboard",
    },

   },
  {
        
    name:'LogIn',
    component:LogIn,
    path:'/login',
    meta: {
        title: "Log in",
    },

  },
  {
        
    name:'createTask',
    component:createTask,
    path:'/create-task',
    meta: {
        title: "create Task",
    },

  },
  {
        
    name:'Tasks',
    component:Tasks,
    path:'/tasks',
    meta: {
        title: "Tasks List",
    },

  },
  {
        
    name:'updateProfile',
    component:updateProfile,
    path:'/update-profile',
    meta: {
        title: "update Profile",
    },

  },
  {
        
    name:'resetPassword',
    component:resetPassword,
    path:'/reset-password',
    meta: {
        title: "reset Password",
    },

  },
  {
        
    name:'updateTask',
    component:updateTask,
    path:'/update-task/:id',
    meta: {
        title: "update Task",
    },

  }
  

]


const router = createRouter({
    history:createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
})



export default router