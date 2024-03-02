<template>
    <div class="profile-main">
        <div class="profile-user-info">
            <p>Username: {{ username }}</p>
            <p>Email: {{ email }}</p>
        </div>
        <h2>FAVOURITE POKEMONS:</h2>
        <div class="slider-container">
            <div class="poke-favs-container">
                <PokeCard v-for="pokemon in pokeFavs" :key="pokemon.name" :sprite="pokemon.sprite" :name="pokemon.name" :type1="pokemon.type1" :type2="pokemon.type2 ? pokemon.type2 : '-'" />
            </div>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    export default {
        data() {
            return {
                username: "",
                email: "",
                pokeFavs: []
            };
        },
        async mounted() {
            if (!Cookies.get("jwt")) {
                alert("You are not logged in!");
                this.$router.push("/");
            }
            try {
                const userId = localStorage.getItem("userId");
                const userData = await this.$axios.post("/userData", { userId });
                this.username = userData.data.username;
                this.email = userData.data.email;

                const userPokeFavs = localStorage.getItem("pokeFavsUser");
                const pokeFavsArray = JSON.parse(userPokeFavs);
                for (let pokemon of pokeFavsArray) {
                    const pokeData = await this.$axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
                    const pokeInfo = {
                        name: pokeData.data.name,
                        sprite: pokeData.data.sprites.front_default,
                        type1: pokeData.data.types[0].type.name,
                        type2: pokeData.data.types[1] ? pokeData.data.types[1].type.name : undefined
                    };
                    if (pokeData.data.types[1] != null && (pokeData.data.types[1].type.name == 'flying' || pokeData.data.types[1].type.name == 'fairy')) {
                        pokeInfo.type1 = pokeData.data.types[1].type.name;
                        pokeInfo.type2 = pokeData.data.types[0].type.name;
                    };
                    this.pokeFavs.push(pokeInfo);
                }
            } catch (e) {
                console.log(e);
            };
        },
        methods: {}
    }
</script>

<style scoped>
.profile-main {
    display: flex;
    justify-content: center;
    align-items: center;
}
.slider-container {
    width: 90%;
    overflow-x: auto;
    white-space: nowrap;
}
.poke-favs-container {
    display: flex;
    flex-direction: row;
}
</style>