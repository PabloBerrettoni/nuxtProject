<template>
    <div>
        <img :src="pkmSprite"/>
        <p> Name: {{ pkmName }} </p>
        <p> Type1: {{ pkmType1 }} </p>
        <p> Type2: {{ pkmType2 }} </p>
        <p> Health: {{ pkmHealth }} </p>
        <p> Attack: {{ pkmAttack }} </p>
        <p> Defense: {{ pkmDefense }} </p>
        <p> Speed: {{ pkmSpeed }} </p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pkmSprite: {},
                pkmName: {},
                pkmType1: {},
                pkmType2: {},
                pkmHealth: {},
                pkmAttack: {},
                pkmDefense: {},
                pkmSpeed: {}
            }
        },
        async created() {
            try {
                let pokeFetch = await this.$axios.get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.name}`);
                this.pkmSprite = pokeFetch.data.sprites.front_default;
                this.pkmName = pokeFetch.data.name;
                this.pkmType1 = pokeFetch.data.types[0].type.name;
                this.pkmType2 = pokeFetch.data.types[1] ? pokeFetch.data.types[1].type.name : undefined;
                this.pkmHealth = pokeFetch.data.stats[0].base_stat;
                this.pkmAttack = pokeFetch.data.stats[1].base_stat;
                this.pkmDefense = pokeFetch.data.stats[2].base_stat;
                this.pkmSpeed = pokeFetch.data.stats[5].base_stat;
            } catch(error) {
                console.log('error: ' + error);
            };
        }
    }
</script>

<style>

</style>
