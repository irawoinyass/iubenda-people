<template>
    <img id="logo" src="../assets/logo.png" />
    <h3>User Login</h3>
    <div class="login">
        <p class="error_msg"></p>
        <input type="email" placeholder="Enter Email" v-model="email" @blur="validateEmail" required>
        <input type="password" placeholder="Enter Password" v-model="password" required>
        <button v-on:click="loginBtn">Login</button>
    </div>

</template>
<script>
import axios from 'axios'
export default {
    name: "LogIn",
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async loginBtn() {
            //console.warn(this.name,this.email,this.password);

            let result = await axios.post("http://localhost/iubenda_backend/api/people/auth/login.php", {
                email: this.email,
                password: this.password
            });

            
            if (result.data.message == 'success') {
                //console.warn(result.data);
                localStorage.setItem("user-details", JSON.stringify(result.data.data));
                localStorage.setItem("user-tokens", JSON.stringify(result.data.tokens));
                this.$router.push({ name: 'HomePage' })
            } else {
                //this.error_msg(result.data.message)
                alert(result.data.message);
            }

            // if (result.status == 201) {
            //     alert('Registered Successfully !!!');
            // }

            // localStorage.setItem("user-info", JSON.stringify(result.data));
            // this.$router.push({ name: 'HomePage' })
        }
    },

    mounted() {
        let tokens = localStorage.getItem('user-tokens');
        if (tokens) {
            this.$router.push({ name: 'HomePage' })
        }
    }
}
</script>

<style>
#logo {
    width: 100px;
}
.login input {

    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin: auto;
    margin-bottom: 30px;
    border: 1px solid skyblue;
}

.login button {

    width: 320px;
    height: 40px;
    border: 1px solid skyblue;
    color: #fff;
    background-color: skyblue;
    cursor: pointer;

}

.error_msg{
    width: 300px;
        
        padding-left: 20px;
        display: block;
        margin: auto;
        margin-bottom: 10px;
        color: red;
        display: none;

}
</style>