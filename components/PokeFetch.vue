<template>
    <div>
        <div class="pokeCardsHolder">
            <PokeCard v-for="pokemon in pokemons" :key="pokemon.name" :sprite="pokemon.sprite" :name="pokemon.name"
                :type1="pokemon.type1" :type2="pokemon.type2 ? pokemon.type2 : '-'" />
        </div>
        <PrevNext @prevNext="getDataOnOffset" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            pokemons: []
        }
    },
    async created() {
        this.getDataOnOffset(0);
    },
    methods: {
        async getDataOnOffset(offset) {
            try {
                this.pokemons = []
                let pokeFetch = await this.$axios.get(`http://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset}`);
                for (let pokemon of pokeFetch.data.results) {
                    let pokemonData = await this.$axios.get(pokemon.url);
                    let pkm = {
                        name: pokemon.name,
                        sprite: pokemonData.data.sprites.front_default,
                        type1: pokemonData.data.types[0].type.name,
                        type2: pokemonData.data.types[1] ? pokemonData.data.types[1].type.name : undefined
                    };
                    this.pokemons.push(pkm);
                };
            } catch (error) {
                console.log('error: ' + error);
            };
        }
    }
}
</script>

<style>
.pokeCardsHolder {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    min-height: 80vh;
}
</style>