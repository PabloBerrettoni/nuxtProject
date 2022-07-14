<template>
    <div>
        <div v-if="succeded[0] == 200">
            <img :src=" pokemons[0].pkmSprite "/>
            <p> Name: {{ pokemons[0].pkmName  }} </p>
            <p> Type1: {{ pokemons[0].pkmType1  }} </p>
            <p> Type2: {{ pokemons[0] ? pokemons[0].pkmType2 : '-' }} </p>
            <p> Health: {{ pokemons[0].pkmHealth  }} </p>
            <p> Attack: {{ pokemons[0].pkmAttack  }} </p>
            <p> Defense: {{ pokemons[0].pkmDefense  }} </p>
            <p> Speed: {{ pokemons[0].pkmSpeed  }} </p>
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
            console.log('ruta: ' + this.$route.params)
            try {
                let pokeFetch = await this.$axios.get(`https://pokeapi.co/api/v2/pokemon/${this.pkmGetData}`);
                let newPKM = {
                    pkmSprite: pokeFetch.data.sprites.front_default,
                    pkmName: pokeFetch.data.name,
                    pkmType1: pokeFetch.data.types[0].type.name,
                    pkmType2: pokeFetch.data.types[1] ? pokeFetch.data.types[1].type.name : undefined,
                    pkmHealth: pokeFetch.data.stats[0].base_stat,
                    pkmAttack: pokeFetch.data.stats[1].base_stat,
                    pkmDefense: pokeFetch.data.stats[2].base_stat,
                    pkmSpeed: pokeFetch.data.stats[5].base_stat
                };
                this.pokemons.push(newPKM);
                this.succeded.push('200');
                console.log(this.pokemons)
            } catch(error) {
                this.succeded.push('404');
                console.log('error: ' + error);
            };
        }
    }
</script>

<style lang="scss" scoped>

</style>