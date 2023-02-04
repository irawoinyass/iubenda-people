<template>
<input type="checkbox" id="nav-toggle">
<div class="sidebar">
    <div class="sidebar-brand">
        <h2><span class="fas fa-address-book"></span> <span>IUBENDA - User</span></h2>
    </div>

    <div class="sidebar-menu">
        <ul>
            <li>
                <router-link to="/" class="active"><span class="fa fa-home"></span>
                    <span>Dashboard</span></router-link>
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

<div class="main-content">
    <header>
        <h2>
            <label for="nav-toggle">
                <span class="fa fa-bars"></span>
            </label>
    
            Dashboard
        </h2>
    
        <div class="search-wrapper">
            <span class="fa fa-search"></span>
            <input type="search" name="" placeholder="Search here" />
        </div>
    
        <div class="user-wrapper">
            <!-- <img src="../assets/noimage.jpg" width="40px" height="40px" alt=""> -->
           <span><i class="fa fa-user"></i></span>
            <div>
                <h4>{{ name }}</h4>
                <small>{{ position }}</small>
            </div>
        </div>
    </header>

    <main>
        

        <div class="recent-grid">
            <div class="projects">
                <div class="card">
                    <div class="card-header">
                        <h2>Recent Project</h2>
                        <button>Sell all <span class="fa fa-arrow-right"></span></button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <td>Project Title</td>
                                        <td>Department</td>
                                        <td>Status</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>UI/UX Design</td>
                                        <td>UI Team</td>
                                        <td><span class="status pink"></span> review</td>
                                    </tr>

                                    <tr>
                                        <td>Web Development</td>
                                        <td>Web Team</td>
                                        <td><span class="status red"></span> in progress</td>
                                    </tr>

                                    <tr>
                                        <td>Ushop app</td>
                                        <td>UshopTeam</td>
                                        <td><span class="status orange"></span> pending</td>
                                    </tr>

                                    <tr>
                                        <td>UI/UX Design</td>
                                        <td>UI Team</td>
                                        <td><span class="status green"></span> review</td>
                                    </tr>

                                    <tr>
                                        <td>Web Development</td>
                                        <td>Web Team</td>
                                        <td><span class="status pink"></span> in progress</td>
                                    </tr>

                                    <tr>
                                        <td>Ushop app</td>
                                        <td>UshopTeam</td>
                                        <td><span class="status purple"></span> pending</td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>
</div>
</template>

<script>

export default {
    name: 'Dashboard',
    data() {
        return {
            'name': '',
            'position': ''
        }
    },
    methods: {
        logOut() {

            localStorage.clear();
            this.$router.push({ name: 'LogIn' })
        }
    },
    mounted() {

        let tokens = localStorage.getItem('user-tokens');
        let user = localStorage.getItem('user-details');
        this.name = JSON.parse(user).name;
        this.position = JSON.parse(user).position;
       // console.warn(user)
        if (tokens == null) {

            this.$router.push({ name: 'LogIn' })
        }

    }
}
</script>

<style>
@import '../assets/css/style.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css';
</style>