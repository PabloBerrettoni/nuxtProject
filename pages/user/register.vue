<template>
    <div class="register-container">
        <h1>Sign up</h1>
        <form @submit.prevent="registerUser">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="user.username" required>

            <label for="email">Email:</label>
            <input type="email" id="email" v-model="user.email" required>

            <label for="password">Password:</label>
            <input type="password" id="password" v-model="user.password" required>

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
                    const response = await this.$axios.post('http://localhost:3001/createUser', this.user);
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

<style scoped>
.register-container {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
form{
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 80%;
    border: 1px solid black;
    border-radius: 5%;
    padding: 5px;
    background-color: #333;;
}
input, label {
    align-self: center;
    width: 80%;
    border-radius: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: white;
}
input {
    color: black;
}
button {
    align-self: center;
    width: 30%;
    margin-top: 10px;
    margin-bottom: 10px;
}
@media screen and (min-width: 720px) {
    form {
        width: 40%;
    }
}

@media screen and (min-width: 1100px) {
    form {
        width: 20%;
    }
}
</style>