<template>
    <h1>Welcome To Home Page</h1>
</template>

<script>
export default {
    name: 'HomePage',
    mounted() {
        let tokens = localStorage.getItem('user-tokens');
       // console.warn(tokens)
        if (tokens == null) {

            this.$router.push({ name: 'LogIn' })
        }

    }
}
</script>