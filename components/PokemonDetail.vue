<template>
    <div>
        <img :src=" pokemons[0] ? pokemons[0].pkmSprite : null "/>
        <p> Name: {{ pokemons[0] ? pokemons[0].pkmName : null }} </p>
        <p> Type1: {{ pokemons[0] ? pokemons[0].pkmType1 : null }} </p>
        <p> Type2: {{ pokemons[0] ? pokemons[0].pkmType2 : '-' }} </p>
        <p> Health: {{ pokemons[0] ? pokemons[0].pkmHealth : null }} </p>
        <p> Attack: {{ pokemons[0] ? pokemons[0].pkmAttack : null }} </p>
        <p> Defense: {{ pokemons[0] ? pokemons[0].pkmDefense : null }} </p>
        <p> Speed: {{ pokemons[0] ? pokemons[0].pkmSpeed : null }} </p>
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
                pokemons: []
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
                console.log(this.pokemons)
            } catch(error) {
                console.log('error: ' + error);
            };
        }
    }
</script>

<style lang="scss" scoped>

</style>