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
          <router-link to="/create-task" class="active"
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

        Create Task
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
              <h2>Create a task</h2>
            </div>
            <div class="card-body">
              <div class="main_form">
                <div :class="alert_status">{{ error_msg }}</div>
                <label for="headline">Headline</label>
                <input
                  type="text"
                  v-model="tasks.headline"
                  placeholder="Headline"
                />

                <label for="desc">Description</label>
                <textarea
                  cols=""
                  rows=""
                  v-model="tasks.description"
                  placeholder="Say something...."
                ></textarea>

                <label for="date">Due Date</label>
                <input type="date" v-model="tasks.due_date" />

                <label for="colla"
                  >Collaborators [<small
                    ><b>kindly seperates collaborator names with coma</b></small
                  >]</label
                >
                <input
                  type="text"
                  placeholder="E.g lasisisaheed@gmail.com,biodun@gmail.com"
                  v-model="tasks.collaborators"
                />

                <input type="hidden" v-model="tasks.email" />
                <label for="solved">Solved</label>
                <select id="" v-model="tasks.solved">
                  <option value="">Please select one</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                <input v-on:click="createBtn" type="submit" value="Submit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "createTask",
  data() {
    return {
      name: "",
      position: "",
      alert_status: "",
      error_msg: "",
      solved: "",
      tasks: {
        headline: "",
        description: "",
        due_date: "",
        collaborators: "",
        solved: "",
        email: "",
      },
    };
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push({ name: "LogIn" });
    },

    async createBtn() {
      if (this.tasks.headline == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Headline field is required!";
      } else if (this.tasks.description == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Description field is required!";
      } else if (this.tasks.due_date == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Due date field is required!";
      } else if (this.tasks.solved == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Solved field is required!";
      } else {
        const result = await axios.post(
          "http://localhost/iubenda_backend/api/people/task/create.php",
          {
            headline: this.tasks.headline,
            description: this.tasks.description,
            due_date: this.tasks.due_date,
            collaborators: this.tasks.collaborators,
            solved: this.tasks.solved,
            email: this.tasks.email,
          }
        );

        if (result.data.message == "success" && result.status == 200) {
          this.alert_status = "alert-success";
          this.error_msg = result.data.message;
          this.tasks.headline = "";
          this.tasks.description = "";
          this.tasks.due_date = "";
          this.tasks.collaborators = "";
          this.tasks.solved = "";
        } else {
          this.alert_status = "alert-danger";
          this.error_msg = result.data.message;
        }
      }
    },
  },
  mounted() {
    let tokens = localStorage.getItem("user-tokens");
    let user = localStorage.getItem("user-details");
    this.name = JSON.parse(user).name;
    this.position = JSON.parse(user).position;
    this.tasks.email = JSON.parse(user).email;
    // console.warn(user)
    if (tokens == null) {
      this.$router.push({ name: "LogIn" });
    }
  },
};
</script>

<style>
@import "../assets/css/style.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css";
</style>
