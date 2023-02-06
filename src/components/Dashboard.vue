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
          <router-link to="/" class="active"
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
          <router-link to="/create-task"
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
              <router-link to="/tasks"
                >Sell all <span class="fa fa-arrow-right"></span
              ></router-link>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table width="100%">
                  <thead>
                    <tr>
                      <td>S/N</td>
                      <td>Headline</td>
                      <td>Description</td>
                      <td>Due Date</td>
                      <td>Collaborators</td>
                      <td>Solved</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="task in tasks" :key="task.task_id">
                      <td>{{ task.row_id }}</td>
                      <td>{{ task.headline }}</td>
                      <td>{{ task.description }}</td>
                      <td>{{ task.due_date }}</td>
                      <td>{{ task.collaborators }}</td>
                      <td>
                        <span class=""></span>
                        {{ task.solved }}
                      </td>
                      <td>
                        <router-link
                          :to="'/update-task/' + task.task_id"
                          class="button"
                          >update</router-link
                        >
                        <button
                          class="button"
                          v-on:click="deleteBtn(task.task_id)"
                          style="background-color: red; border: 1px solid red"
                        >
                          delete
                        </button>
                      </td>
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
import axios from "axios";

export default {
  name: "Dashboard",
  data() {
    return {
      name: "",
      position: "",
      tasks: [],
    };
  },
  methods: {
    async deleteBtn(id) {
      if (confirm("Are you sure ?")) {
        const result = await axios.post(
          "http://localhost/iubenda_backend/api/people/task/delete.php",
          {
            id: id,
          }
        );

        if (result.data.message == "success" && result.status == 200) {
          this.loadData();
        }
      }
    },
    logOut() {
      localStorage.clear();
      this.$router.push({ name: "LogIn" });
    },
    async loadData() {
      let user = localStorage.getItem("user-details");
      this.name = JSON.parse(user).name;
      this.position = JSON.parse(user).position;

      const result = await axios.post(
        "http://localhost/iubenda_backend/api/people/task/dashboard_list.php",
        {
          p_id: JSON.parse(user).people_id,
        }
      );

      this.tasks = result.data.data;
      //console.warn(this.tasks);
    },
  },
  mounted() {
    let tokens = localStorage.getItem("user-tokens");
    if (tokens == null) {
      this.$router.push({ name: "LogIn" });
    } else {
      this.loadData();
    }
  },
};
</script>

<style>
@import "../assets/css/style.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css";
</style>
