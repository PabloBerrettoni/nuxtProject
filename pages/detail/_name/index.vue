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
    margin-top: 60px;
    display: flex;
    justify-content: center;
}
</style>
