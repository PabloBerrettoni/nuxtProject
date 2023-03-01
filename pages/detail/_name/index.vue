<template>
    <div>
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
.container {
    min-height: 70vh;
    display: flex;
    justify-content: center;
}
</style>
