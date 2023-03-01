<template>
    <div class="poke-detail-view-main">
        <PokemonDetail :pkmGetData="pkm"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pkm: [this.$route.params.name]
        }
    }
}
</script>

<style scoped>

</style>
