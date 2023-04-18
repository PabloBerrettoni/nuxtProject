<template>
    <form @submit.prevent="onSubmit">
        <input type="text" v-model="text" placeholder="Search for a pokemon...">
        <input type="submit" value="Search">
    </form>
</template>

<script>
    export default {
        name: 'Search',
        data() {
            return {
                text: ''
            }
        },
        methods: {
            onSubmit() {
                this.$emit('search-text', this.text.toLowerCase());
                this.$router.push(`/search/${this.text.toLowerCase()}`, { replace: true });
            }
        }
    }
</script>

<style>

</style>
