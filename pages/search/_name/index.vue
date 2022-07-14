<template>
<div>
    <PokemonDetail :pkmGetData="pkm"/>
</div>
</template>

<script>
import AppHeader from '../../../components/AppHeader.vue'
import PokemonDetail from '../../../components/PokemonDetail.vue';
export default {
    components: {
        AppHeader,
        PokemonDetail
    },
    data() {
        return {
            pkm: [this.$route.params.name]
        }
    }
}
</script>

<style>

</style>
