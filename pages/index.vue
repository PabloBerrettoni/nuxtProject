<template>
    <div>
        <Header :key="$route.fullPath"/>        
        <Search v-on:search-text="searchText"/>
        <h2>Welcome to my PokeApi project with Nuxt</h2>
        <PokeFetch/>
    </div>
</template>

<script>
import Search from '../components/Search';
import Header from '../components/AppHeader';
export default {
  name: 'PokeApi with Nuxt',
  components: {
    Search,
    Header
  }
}
</script>

<style>
    .body {
        min-height: 100vh;
        width: 100vw;
    }
</style>
