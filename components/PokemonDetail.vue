<template>
    <div class="pokemon-detail-view">
        <div v-if="succeded[0] == 200" class="container-pokemon-detail">
            <div class="left-sprite">
                <img :src="pokemons[0].pkmSprite" id="sprite-contained" />
            </div>
            <div class="right-info">
                <div class="name-class">
                    <div class="name-class-inner">
                        <h3>Name</h3>
                        <p>{{ pokemons[0].pkmName }}</p>
                    </div>
                    <div class="name-class-inner">
                        <h3>Type</h3>
                        <div class="type-spec">
                            <p>{{ pokemons[0].pkmType1 }}</p>
                            <p>{{ pokemons[0].pkmType2 }}</p>
                        </div>
                    </div>
                </div>
                <h3>Stats</h3>
                <div class="stats-container">
                    <div class="stat-individual">
                        <h5>Health: </h5>
                        <div class="stat-length">
                            <p class="stat-health" :style="{width: pokemons[0].pkmHealth + 'px'}">{{ pokemons[0].pkmHealth }}</p>
                        </div>
                    </div>
                    <div class="stat-individual">
                        <h5>Attack: </h5>
                        <div class="stat-length">
                            <p class="stat-attack" :style="{width: pokemons[0].pkmAttack + 'px'}">{{ pokemons[0].pkmAttack }}</p>
                        </div>
                    </div>
                    <div class="stat-individual">
                        <h5>Defense: </h5>
                        <div class="stat-length">
                            <p class="stat-defence" :style="{width: pokemons[0].pkmDefense + 'px'}">{{ pokemons[0].pkmDefense }}</p>
                        </div>
                    </div>
                    <div class="stat-individual">
                        <h5>Speed: </h5>
                        <div class="stat-length">
                            <p class="stat-speed" :style="{width: pokemons[0].pkmSpeed + 'px'}">{{ pokemons[0].pkmSpeed }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="container-pokemon-detail">
            <h2>Pokemon not found</h2>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['pkmGetData'],
        head () {
            return {
                title: this.pkmGetData,
            };
        },
        data() {
            return {
                pokemons: [],
                succeded: []
            };
        },
        async created() {
            try {
                let pokeFetch = await this.$axios.get(`https://pokeapi.co/api/v2/pokemon/${this.pkmGetData}`);
                let newPKM = {
                    pkmSprite: pokeFetch.data.sprites.other.dream_world.front_default,
                    pkmName: pokeFetch.data.name,
                    pkmType1: pokeFetch.data.types[0].type.name,
                    pkmType2: pokeFetch.data.types[1] ? pokeFetch.data.types[1].type.name : '',
                    pkmHealth: pokeFetch.data.stats[0].base_stat,
                    pkmAttack: pokeFetch.data.stats[1].base_stat,
                    pkmDefense: pokeFetch.data.stats[2].base_stat,
                    pkmSpeed: pokeFetch.data.stats[5].base_stat
                };
                this.pokemons.push(newPKM);
                this.succeded.push('200');
            } catch(error) {
                console.error(error);
            };
        }
    }
</script>

<style scoped>

.container-pokemon-detail {
    display: flex;
    margin: auto;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    text-transform: capitalize;
    flex-wrap: wrap;
}
.right-info {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.left-sprite img {
    width: 180px;
    height: 180px;
}
.name-class {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    height: 150px;
}
.name-class-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 150px;
}
.type-spec {
    display: flex;
    flex-direction: row;
}
.stats-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
}
.stat-individual {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90%;
}
.stat-individual h5 {
    width: 70px;
}
.stat-individual p {
    width: 10px;
    height: 20px;
}
.stat-length {
    width: 255px;
    background-color: dimgrey;
    border-radius: 5px;
}
.stat-health {
    background-color: red;
    border-radius: 5px;
    margin: 0;
    padding: 0;
    width: 0;
}
.stat-attack {
    background-color: orange;
    border-radius: 5px;
    margin: 0;
    padding: 0;
    width: 0;
}
.stat-defence {
    background-color: rgb(0, 174, 255);
    border-radius: 5px;
    margin: 0;
    padding: 0;
    width: 0;
}
.stat-speed {
    background-color: yellow;
    border-radius: 5px;
    margin: 0;
    padding: 0;
    width: 0;
}
.container-pokemon-detail {
    display: flex;
    justify-content: center;
    min-height: 91.5vh;
    margin-top: 7.5vh;
}
@media screen and (min-width: 768px) {
    .container-pokemon-detail {
        min-height: 92.5vh;
        margin-top: 6.5vh;
        width: 100%;
        flex-direction: row;
        justify-content: space-evenly;
    }
    .right-info {
        width: auto;
    }
    .pokemon-detail-view {
        width: 100%;
    }
    .left-sprite img {
        height: 400px;
        width: 400px;
    }
}

</style>