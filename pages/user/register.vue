<template>
    <div>
        <h1>Register a new user</h1>
        <form @submit.prevent="registerUser">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="user.username">

            <label for="email">Email:</label>
            <input type="email" id="email" v-model="user.email">

            <label for="password">Password:</label>
            <input type="password" id="password" v-model="user.password">

            <button type="submit">Register</button>
        </form>
        <div v-if="error" class="error-message">{{ error }}</div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    export default {
        data() {
            return {
                user: {
                    username: '',
                    email: '',
                    password: ''
                },
                error: null,
            }
        },
        mounted() {
            if (Cookies.get('jwt')) {
                alert('You are already logged in!');
                this.$router.push('/');
            }
        },
        methods: {
            async registerUser() {
                try {
                    const response = await this.$axios.post('http://localhost:3001/createUser', {params: { email: this.user.email, password: this.user.password }});
                    console.log(response.data);
                    await this.$router.push('/user/login');
                } catch (error) {
                    console.error(error);
                    this.error = 'Invalid username or email';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>