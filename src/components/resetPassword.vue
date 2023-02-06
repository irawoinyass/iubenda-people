<template>
  <input type="checkbox" id="nav-toggle" />
  <div class="sidebar">
    <div class="sidebar-brand">
      <h2>
        <span class="fas fa-address-book"></span> <span>IUBENDA - User</span>
      </h2>
    </div>

    <div class="sidebar-menu">
      <ul>
        <li>
          <router-link to="/" class=""
            ><span class="fa fa-home"></span>
            <span>Dashboard</span></router-link
          >
        </li>

        <li>
          <router-link to="/tasks"
            ><span class="fa fa-book"></span> <span>Tasks</span></router-link
          >
        </li>
        <li>
          <router-link to="/create-task" class=""
            ><span class="fa fa-clipboard"></span>
            <span>Create Task</span></router-link
          >
        </li>
        <li>
          <router-link to="/update-profile"
            ><span class="fa fa-user"></span>
            <span>Update Profile</span></router-link
          >
        </li>
        <li>
          <router-link to="/reset-password" class="active"
            ><span class="fa fa-lock"></span>
            <span>Reset Password</span></router-link
          >
        </li>
        <li>
          <a v-on:click="logOut" href="#"
            ><span class="fa fa-sign-out"></span> <span>Logout</span></a
          >
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

        Reset Password
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
              <h2>Password settings</h2>
            </div>
            <div class="card-body">
              <div class="main_form">
                <div :class="alert_status">{{ error_msg }}</div>
                <label for="password">Old Pasword</label>
                <input
                  type="password"
                  v-model="old_password"
                  placeholder="Old Password"
                />

                <label for="password">New Pasword</label>
                <input
                  type="password"
                  v-model="password"
                  placeholder="New Password"
                />

                <label for="password">Confirm Pasword</label>
                <input
                  type="password"
                  v-model="confirm_password"
                  placeholder="Confirm Password"
                />

                <input type="hidden" v-model="people_id" />

                <input v-on:click="resetBtn" type="submit" value="Reset" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// import axios from 'axios';

import axios from "axios";

export default {
  name: "resetPassword",
  data() {
    return {
      name: "",
      position: "",
      alert_status: "",
      error_msg: "",
      old_password: "",
      password: "",
      people_id: "",
      confirm_password: "",
    };
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push({ name: "LogIn" });
    },

    async resetBtn() {
      if (this.old_password == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Old Password field is required!";
      } else if (this.password == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "New Password field is required!";
      } else if (this.password != this.confirm_password) {
        this.alert_status = "alert-danger";
        this.error_msg = "Password does not match!";
      } else {
        const result = await axios.post(
          "http://localhost/iubenda_backend/api/people/auth/password_reset.php",
          {
            people_id: this.people_id,
            old_password: this.old_password,
            password: this.password,
          }
        );
        if (result.data.message == "success" && result.status == 200) {
          this.alert_status = "alert-success";
          this.error_msg = result.data.message;
          this.old_password = "";
          this.password = "";
          this.confirm_password = "";
        } else {
          this.alert_status = "alert-danger";
          this.error_msg = result.data.message;
        }
      }
    },
  },
  mounted() {
    let tokens = localStorage.getItem("user-tokens");
    // console.warn(user)
    if (tokens == null) {
      this.$router.push({ name: "LogIn" });
    } else {
      let user = localStorage.getItem("user-details");
      this.name = JSON.parse(user).name;
      this.position = JSON.parse(user).position;
      this.people_id = JSON.parse(user).people_id;
    }
  },
};
</script>

<style>
@import "../assets/css/style.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css";
</style>
