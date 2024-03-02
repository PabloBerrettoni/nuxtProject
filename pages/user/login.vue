<template>
    <div class="login-container">
        <h1>Sign in</h1>
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
                    const response = await this.$axios.post("/loginUser", this.user);
                    const token = response.data.token;
                    Cookies.set("jwt", token);
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('pokeFavsUser', []);

                    let pokeFavsUser = localStorage.getItem('pokeFavsUser') ? JSON.parse(localStorage.getItem('pokeFavsUser')) : [];
                    response.data.pokeFavs.forEach(element => {
                        pokeFavsUser.push(element.pokename);
                    });
                    localStorage.setItem('pokeFavsUser', JSON.stringify(pokeFavsUser));

                    await this.$router.push('/');
                } catch (e) {
                    console.error(e);
                    this.error = "Invalid email or password";
                };
            }
        }
    }
</script>

<style scoped>
.login-container {
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