<template>
    <div>
        <div v-if="succeded[0] == 200" class="container-pokemon-detail">
            <div class="left-sprite">
                <img :src=" pokemons[0].pkmSprite " id="sprite-contained" />
            </div>
            <div class="right-info">
                <div class="name-class">
                    <div class="name-class-inner">
                        <h3>Name</h3>
                        <p> {{ pokemons[0].pkmName  }} </p>
                    </div>
                    <div class="name-class-inner">
                        <h3>Type</h3>
                        <div class="type-spec">
                            <p> {{ pokemons[0].pkmType1  }} </p>
                            <p> {{ pokemons[0].pkmType2 }} </p>
                        </div>
                    </div>
                </div>
                <h3>Stats</h3>
                <div class="stats-container">
                    <div class="stat-individual">
                        <h5>Health: </h5>
                        <div class="stat-length">
                            <p class="stat-health" :style="{width: pokemons[0].pkmHealth + 'px' }" > {{ pokemons[0].pkmHealth  }}</p>
                        </div>
                    </div>
                    <div class="stat-individual">
                        <h5>Attack: </h5>
                        <div class="stat-length">
                            <p class="stat-attack" :style="{width: pokemons[0].pkmAttack + 'px' }" > {{ pokemons[0].pkmAttack  }} </p>
                        </div>
                    </div>
                    <div class="stat-individual">
                        <h5>Defense: </h5>
                        <div class="stat-length">
                            <p class="stat-defence" :style="{width: pokemons[0].pkmDefense + 'px' }" > {{ pokemons[0].pkmDefense  }} </p>
                        </div>
                    </div>
                    <div class="stat-individual">
                        <h5>Speed: </h5>
                        <div class="stat-length">
                            <p class="stat-speed" :style="{width: pokemons[0].pkmSpeed + 'px' }" > {{ pokemons[0].pkmSpeed  }} </p>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
        <div v-else>
            <h2>No se encontró el pokemon que buscaste</h2>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['pkmGetData'],
        head () {
            return {
                title: `${ this.pkmGetData }`,
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
                    pkmType2: pokeFetch.data.types[1] ? pokeFetch.data.types[1].type.name : '-',
                    pkmHealth: pokeFetch.data.stats[0].base_stat,
                    pkmAttack: pokeFetch.data.stats[1].base_stat,
                    pkmDefense: pokeFetch.data.stats[2].base_stat,
                    pkmSpeed: pokeFetch.data.stats[5].base_stat
                };
                this.pokemons.push(newPKM);
                this.succeded.push('200');
            } catch(error) {
                this.succeded.push('404');
                console.log('error: ' + error);
            };
        },
        mounted() {
            /* let pokemonEl = document.querySelectorAll('.left-sprite');
            console.log(pokemonEl)
            let type1val = this.pokemons
            switch (type1val) {
                case 'grass':
                    pokeCardAvailable.firstChild.style.backgroundColor = "#4DAD5B"
                    break;
                case 'fire':
                    pokeCardAvailable.firstChild.style.backgroundColor = "#EE8130"   
                    break;
                case 'water':
                    pokeCardAvailable.firstChild.style.backgroundColor = "#1B53BA"           
                    break;
                case 'bug':
                    pokeCardAvailable.firstChild.style.backgroundColor = "#A6B91A"           
                    break;
                case 'poison':
                    pokeCardAvailable.firstChild.style.backgroundColor = "#A33EA1"           
                    break;
                case 'electric':
                    pokeCardAvailable.firstChild.style.backgroundColor = "#F7D02C"           
                    break;
                case 'ground':
                    pokeCardAvailable.firstChild.style.backgroundColor = "#E2BF65"           
                    break;
                case 'fairy':
                    pokeCardAvailable.firstChild.style.backgroundColor = "#D685AD"           
                    break;
                case 'fighting':
                    pokeCardAvailable.firstChild.style.backgroundColor = "#C22E28"           
                    break;
                case 'psychic':
                    pokeCardAvailable.firstChild.style.backgroundColor = "#F95587"           
                    break;
                case 'rock':
                    pokeCardAvailable.firstChild.style.backgroundColor = "#B6A136"           
                    break;
                case 'ghost':
                    pokeCardAvailable.firstChild.style.backgroundColor = "#735797"           
                    break;
                case 'ice':
                    pokeCardAvailable.firstChild.style.backgroundColor = "#96D9D6"           
                    break;
                case 'dragon':
                    pokeCardAvailable.firstChild.style.backgroundColor = "#6F35FC"           
                    break;
                default:
                    pokeCardAvailable.firstChild.style.backgroundColor = "#A8A77A"   
                    break;
            } */
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

</style>