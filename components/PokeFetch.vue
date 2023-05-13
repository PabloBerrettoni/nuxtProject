<template>
    <div class="main-div-pokefetch">
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
    async mounted() {
        let lastOffset = localStorage.getItem('lastKnownOffset');
        if (lastOffset !== null && lastOffset !== 0) {
            this.lastOffsetKnown = lastOffset;
            this.getDataOnOffset(lastOffset);
        } else {
            this.getDataOnOffset(0);
        }
    },
    methods: {
        async getDataOnOffset(offset) {
            try {
                this.pokemons = []
                let pokeFetch = await this.$axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset}`);
                const promises = pokeFetch.data.results.map(pokemon => this.$axios.get(pokemon.url));
                const pokemonData = await Promise.all(promises);
                for (let pokemon of pokemonData) {
                    let pkm = {
                        name: pokemon.data.name,
                        sprite: pokemon.data.sprites.front_default,
                        type1: pokemon.data.types[0].type.name,
                        type2: pokemon.data.types[1] ? pokemon.data.types[1].type.name : undefined
                    };
                    if (pokemon.data.types[1] != null && (pokemon.data.types[1].type.name == 'flying' || pokemon.data.types[1].type.name == 'fairy')) {
                        pkm.type1 = pokemon.data.types[1].type.name;
                        pkm.type2 = pokemon.data.types[0].type.name;
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
.main-div-pokefetch {
    min-height: 100%;
    min-width: 100%;
}
.pokeCardsHolder {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    min-width: 100%;
    min-height: 90vh;
    margin: auto;
    max-width: 1550px;
}
</style>