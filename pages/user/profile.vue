<template>
    <div>
        <p>Username: {{this.username}}</p>
        <p>Email: {{this.email}}</p>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    export default {
    data() {
        return {
            username: "",
            email: "",
            PokeFavs: []
        };
    },
    async mounted() {
        if (!Cookies.get("jwt")) {
            alert("You are not logged in!");
            this.$router.push("/");
        }
        try {
            const userId = localStorage.getItem("userId");
            const userData = await this.$axios.post("http://localhost:3001/userData", { userId });
            this.username = userData.data.username;
            this.email = userData.data.email;
        } catch (e) {
            console.log(e);
        };
    },
    methods: {}
}
</script>

<style lang="scss" scoped>

</style>