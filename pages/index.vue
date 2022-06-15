<template>
    <div>
        <h2>Welcome to my PokeApi project with Nuxt</h2>
        <div class="pokeCardsHolder">
            <Pokemon v-for="pokemon in pokemons" :key="pokemon.name" :sprite="pokemon.sprite" :name="pokemon.name" :type1="pokemon.type1" :type2="pokemon.type2 ? pokemon.type2 : '-' " />
        </div>
    </div>
</template>

<script>
import Pokemon from '../components/Pokemon';
export default {
  name: 'PokeApi with Nuxt',

  components: {
    Pokemon
  },

  data() {
    return {
      pokemons: []
    }
  },

  async created() {
    try {
      let offsetValue = 0;
      let pokeFetch = await this.$axios.get(`http://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offsetValue}`);
      for ( let pokemon of pokeFetch.data.results ) {
          let pokemonData = await this.$axios.get(pokemon.url);
          console.log(pokemonData)
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
</script>

<style>
    .body {
        min-height: 100vh;
        with: 100vw;
    }
    .pokeCardsHolder {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>
