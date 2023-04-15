<template>
    <div>
        <h1>Register a new user</h1>
        <form @submit.prevent="registerUser">
            <label for="name">Username:</label>
            <input type="text" id="userName" v-model="user.name">

            <label for="email">Email:</label>
            <input type="email" id="email" v-model="user.email">

            <label for="password">Password:</label>
            <input type="password" id="password" v-model="user.password">

            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    username: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            async registerUser() {
                try {
                    const response = await this.$axios.post('http://localhost:3001/createUser', this.user);
                    console.log(response.data);
                    // redirect the user to the dashboard or a success page
                } catch (error) {
                    console.error(error);
                    // display an error message to the user
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>