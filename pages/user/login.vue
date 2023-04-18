<template>
    <div>
        <h1>Log in</h1>
        <form @submit.prevent="loginUser">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="user.email" required>

            <label for="password">Password:</label>
            <input type="password" id="password" v-model="user.password" required>

            <button type="submit">Sign in</button>
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
                    email: '',
                    password: ''
                },
                error: null
            }
        },
        mounted() {
            if (Cookies.get('jwt')) {
                alert('You are already logged in!');
                this.$router.push('/');
            }
        },
        methods: {
            async loginUser() {
                try {
                    const response = await this.$axios.post("http://localhost:3001/loginUser", this.user);
                    const token = response.data.token;
                    Cookies.set("jwt", token);
                    localStorage.setItem('userId', response.data.userId);
                    await this.$router.push('/');
                } catch (e) {
                    console.error(e);
                    this.error = "Invalid email or password";
                };
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>