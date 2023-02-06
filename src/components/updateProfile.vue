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
          <router-link to="/update-profile" class="active"
            ><span class="fa fa-user"></span>
            <span>Update Profile</span></router-link
          >
        </li>
        <li>
          <router-link to="/reset-password"
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

        Update Profile
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
              <h2>Profile settings</h2>
            </div>
            <div class="card-body">
              <div class="main_form">
                <div :class="alert_status">{{ error_msg }}</div>
                <label for="name">Name</label>
                <input type="text" v-model="profile.name" placeholder="Name" />

                <label for="email">Email Address</label>
                <input
                  type="email"
                  v-model="profile.email"
                  placeholder="Email Address"
                />

                <label for="date">Date of birth</label>
                <input type="date" v-model="profile.date_of_birth" />

                <input type="hidden" v-model="profile.people_id" />
                <input type="hidden" v-model="profile.position" />

                <label for="gender">Gender</label>
                <select id="" v-model="profile.gender">
                  <option value="">Please select one</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <input v-on:click="submitBtn" type="submit" value="Update" />
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
  name: "updateProfile",
  data() {
    return {
      name: "",
      position: "",
      alert_status: "",
      error_msg: "",
      profile: {
        people_id: "",
        name: "",
        email: "",
        due_date: "",
        gender: "",
        date_of_birth: "",
        position: "",
      },
    };
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push({ name: "LogIn" });
    },

    async submitBtn() {
      if (this.profile.name == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Name field is required!";
      } else if (this.profile.email == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Email field is required!";
      } else if (this.profile.date_of_birth == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "DOB field is required!";
      } else if (this.profile.gender == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Gender field is required!";
      } else {
        const result = await axios.post(
          "http://localhost/iubenda_backend/api/people/auth/update.php",
          {
            name: this.profile.name,
            email: this.profile.email,
            gender: this.profile.gender,
            date_of_birth: this.profile.date_of_birth,
            people_id: this.profile.people_id,
          }
        );
        if (result.data.message == "success" && result.status == 200) {
          this.alert_status = "alert-success";
          this.error_msg = result.data.message;
          //localStorage.clear("user-details");
          localStorage.setItem("user-details", JSON.stringify(this.profile));
        } else {
          this.alert_status = "alert-danger";
          this.error_msg = result.data.message;
        }
      }
    },
  },
  mounted() {
    let tokens = localStorage.getItem("user-tokens");

    if (tokens == null) {
      this.$router.push({ name: "LogIn" });
    } else {
      let user = localStorage.getItem("user-details");
      this.name = JSON.parse(user).name;
      this.position = JSON.parse(user).position;
      this.profile.email = JSON.parse(user).email;
      this.profile.name = JSON.parse(user).name;
      this.profile.date_of_birth = JSON.parse(user).date_of_birth;
      this.profile.gender = JSON.parse(user).gender;
      this.profile.people_id = JSON.parse(user).people_id;
      this.profile.position = JSON.parse(user).position;
      // console.warn(user)
    }
  },
};
</script>

<style>
@import "../assets/css/style.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css";
</style>
