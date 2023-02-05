<template>
  <div class="container">
    <div class="wrapper">
      <div class="title">
        <span>User Form</span>
      </div>

      <div class="form">
        <div :class="alert_status">{{ error_msg }}</div>
        <div class="row">
          <i class="fa fa-user"></i>
          <input
            type="email"
            v-model="email"
            placeholder="Email Address"
            required
          />
        </div>

        <div class="row">
          <i class="fa fa-lock"></i>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>

        <div class="row button">
          <input v-on:click="loginBtn" type="submit" value="Login" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "LogIn",
  data() {
    return {
      email: "",
      password: "",
      alert_status: "",
      error_msg: "",
    };
  },
  methods: {
    async loginBtn() {
      //console.warn(this.name,this.email,this.password);

      let result = await axios.post(
        "http://localhost/iubenda_backend/api/people/auth/login.php",
        {
          email: this.email,
          password: this.password,
        }
      );

      //console.warn(result);

      if (result.data.message == "success" && result.status == 200) {
        //console.warn(result.data);
        localStorage.setItem("user-details", JSON.stringify(result.data.data));
        localStorage.setItem("user-tokens", JSON.stringify(result.data.tokens));
        this.$router.push({ name: "Dashboard" });
      } else {
        this.alert_status = "alert-danger";
        this.error_msg = result.data.message;
      }
    },
  },

  mounted() {
    let tokens = localStorage.getItem("user-tokens");
    if (tokens) {
      this.$router.push({ name: "Dashboard" });
    }
  },
};
</script>

<style>
@import "../assets/css/login.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css";
</style>
