<template>
<input type="checkbox" id="nav-toggle">
    <div class="sidebar">
        <div class="sidebar-brand">
            <h2><span class="fas fa-address-book"></span> <span>IUBENDA - User</span></h2>
        </div>
    
        <div class="sidebar-menu">
            <ul>
                <li>
                    <router-link to="/" :class="home_page_status"><span class="fa fa-home"></span> <span>Dashboard</span></router-link>
                </li>
    
                <li>
                    <a href=""><span class="fa fa-book"></span> <span>Tasks</span></a>
                </li>
                <li>
                    <a href=""><span class="fa fa-clipboard"></span> <span>Create Task</span></a>
                </li>
                <li>
                    <a href=""><span class="fa fa-user"></span> <span>Update Profile</span></a>
                </li>
                <li>
                    <a href=""><span class="fa fa-lock"></span> <span>Reset Password</span></a>
                </li>
                <li>
                    <a v-on:click="logOut" href="#"><span class="fa fa-sign-out"></span> <span>Logout</span></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sider',
    methods: {
        logOut() {

            localStorage.clear();
            this.$router.push({ name: 'LogIn' })
        }
    }
}
</script>